import { useState, useRef, useEffect, useCallback } from "react";

interface TouchInfo {
  startX: number;
  startTime: number;
  lastX: number;
  velocity: number;
}

interface CarouselOptions {
  initialSlide?: number;
  // Only keeping options we actually use
}

export function useEnhancedCarousel(options: CarouselOptions = {}) {
  const {
    initialSlide = 0,
    // Removed unused options
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Touch tracking state
  const touchInfo = useRef<TouchInfo>({
    startX: 0,
    startTime: 0,
    lastX: 0,
    velocity: 0,
  });

  const isDraggingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const previousScrollRef = useRef(0);
  const scrollDirectionRef = useRef<"left" | "right" | null>(null);

  // Calculate slide positions and widths
  const getSlideMetrics = useCallback(() => {
    const slides: Array<{
      element: HTMLDivElement;
      left: number;
      center: number;
      width: number;
    }> = [];

    slideRefs.current.forEach((slide) => {
      if (!slide) return;

      const rect = slide.getBoundingClientRect();
      slides.push({
        element: slide,
        left: slide.offsetLeft,
        center: slide.offsetLeft + rect.width / 2,
        width: rect.width,
      });
    });

    return slides;
  }, []);

  // Calculate the active index based on scroll position
  const calculateActiveIndex = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerCenter = scrollLeft + containerWidth / 2;

    // Find the slide that is most centered in view
    let closestIndex = 0;
    let closestDistance = Infinity;

    const slides = getSlideMetrics();
    slides.forEach((slide, index) => {
      const distance = Math.abs(containerCenter - slide.center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }

    return closestIndex;
  }, [activeIndex, containerWidth, getSlideMetrics]);

  // Navigate to a specific slide
  const navigateTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      if (!containerRef.current) return;

      // Prevent navigation during animation
      if (isAnimatingRef.current && behavior === "smooth") return;

      // Set animating state
      if (behavior === "smooth") {
        isAnimatingRef.current = true;
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 300); // Animation duration
      }

      // Ensure index is within bounds
      const totalSlides = slideRefs.current.filter(Boolean).length;
      const safeIndex = Math.max(0, Math.min(index, totalSlides - 1));

      const slide = slideRefs.current[safeIndex];
      if (!slide) return;

      // Get all slide metrics
      const slides = getSlideMetrics();
      if (!slides[safeIndex]) return;

      // Calculate target position (centered)
      const targetPosition = Math.max(
        0,
        slides[safeIndex].left - (containerWidth - slides[safeIndex].width) / 2
      );

      // Apply smooth scrolling
      containerRef.current.scrollTo({
        left: targetPosition,
        behavior: behavior,
      });

      setActiveIndex(safeIndex);
    },
    [containerWidth, getSlideMetrics]
  );

  // Detect and handle scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isDraggingRef.current) return;

    const container = containerRef.current;
    const currentScroll = container.scrollLeft;

    // Determine scroll direction
    if (currentScroll > previousScrollRef.current) {
      scrollDirectionRef.current = "right";
    } else if (currentScroll < previousScrollRef.current) {
      scrollDirectionRef.current = "left";
    }

    previousScrollRef.current = currentScroll;

    // Only recalculate when we're not actively touching
    if (!isDraggingRef.current && !isAnimatingRef.current) {
      requestAnimationFrame(() => {
        calculateActiveIndex();
      });
    }
  }, [calculateActiveIndex]);

  // Touch event handlers with velocity tracking
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!containerRef.current) return;

    isDraggingRef.current = true;
    isAnimatingRef.current = false;

    // Record start position and time
    const touch = e.touches[0];
    touchInfo.current = {
      startX: touch.clientX,
      lastX: touch.clientX,
      startTime: Date.now(),
      velocity: 0,
    };

    // Disable snap while dragging for smoother experience
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "none";
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - touchInfo.current.lastX;
    const deltaTime = Date.now() - touchInfo.current.startTime;

    // Only update velocity if we've moved a reasonable amount
    if (Math.abs(deltaX) > 2 && deltaTime > 0) {
      // Calculate velocity (pixels per millisecond)
      touchInfo.current.velocity = deltaX / deltaTime;
    }

    touchInfo.current.lastX = currentX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!containerRef.current || !isDraggingRef.current) return;

    isDraggingRef.current = false;

    // Re-enable snap after dragging
    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "x mandatory";
    }

    // Get current active index
    const currentIndex = calculateActiveIndex() ?? activeIndex;

    // Use velocity to determine if we should move to next/prev slide
    const velocity = touchInfo.current.velocity;
    const absVelocity = Math.abs(velocity);

    // If we have significant velocity, use it to determine direction
    if (absVelocity > 0.2) {
      // 0.2 pixels per ms threshold
      if (velocity < 0 && currentIndex < slideRefs.current.length - 1) {
        // Fast swipe right - go to next slide
        navigateTo(currentIndex + 1);
      } else if (velocity > 0 && currentIndex > 0) {
        // Fast swipe left - go to previous slide
        navigateTo(currentIndex - 1);
      } else {
        // Snap to current if we can't go further
        navigateTo(currentIndex);
      }
    } else {
      // Slow or no velocity - just snap to closest
      navigateTo(currentIndex);
    }

    // Reset velocity
    touchInfo.current.velocity = 0;
  }, [activeIndex, calculateActiveIndex, navigateTo]);

  // Initialize and attach event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Apply scroll snap inline for finer control
    container.style.scrollSnapType = "x mandatory";
    container.style.scrollPaddingLeft = "10%"; // Add padding for better snap positions
    container.style.scrollPaddingRight = "10%";

    // Add listeners for scroll and touch events
    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Add a resize observer to handle screen size changes
    const resizeObserver = new ResizeObserver(() => {
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    });

    resizeObserver.observe(container);

    // Set initial width values
    setContainerWidth(container.clientWidth);

    // Cleanup function
    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      resizeObserver.disconnect();
    };
  }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Navigate to initial slide on mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (initialSlide > 0) {
        navigateTo(initialSlide, "auto");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [initialSlide, navigateTo]);

  return {
    containerRef,
    slideRefs,
    activeIndex,
    navigateTo,
    setActiveIndex,
  };
}
