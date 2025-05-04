import { useState, useRef, useEffect, useCallback } from "react";

// Simple debounce implementation to avoid external dependencies
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface CarouselOptions {
  initialSlide?: number;
  debounceTime?: number; // Debounce time in ms
}

export function useOptimizedCarousel(options: CarouselOptions = {}) {
  const { initialSlide = 0, debounceTime = 150 } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Store scroll state
  const scrollingRef = useRef(false);
  const touchActiveRef = useRef(false);

  // Calculate which card is most visible
  const calculateActiveIndex = useCallback(() => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const containerCenter = scrollLeft + containerWidth / 2;

    // Find the slide that is most centered in view
    let closestIndex = 0;
    let closestDistance = Infinity;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slide.offsetLeft + slideRect.width / 2;
      const distance = Math.abs(containerCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }

    // Reset scrolling state
    scrollingRef.current = false;
  }, [activeIndex, containerWidth]);

  // Debounced version to improve performance with explicit dependencies
  const debouncedCalculateActiveIndex = useCallback(() => {
    const debouncedFn = debounce(() => {
      calculateActiveIndex();
    }, debounceTime);

    debouncedFn();
  }, [calculateActiveIndex, debounceTime]);

  // Navigate to a specific slide programmatically
  const navigateTo = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      // Ensure index is within bounds
      const safeIndex = Math.max(
        0,
        Math.min(index, slideRefs.current.length - 1)
      );

      const slide = slideRefs.current[safeIndex];
      if (!slide) return;

      // Calculate the center position for the slide
      const slideRect = slide.getBoundingClientRect();
      const targetPosition =
        slide.offsetLeft - (containerWidth - slideRect.width) / 2;

      // Apply smooth scrolling
      containerRef.current.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });

      setActiveIndex(safeIndex);
    },
    [containerWidth]
  );

  // Handle scroll events with optimized performance
  const handleScroll = useCallback(() => {
    if (!containerRef.current || touchActiveRef.current) return;

    // Mark that we're scrolling to prevent excessive calculations
    scrollingRef.current = true;

    // Use debounced function for better performance
    debouncedCalculateActiveIndex();
  }, [debouncedCalculateActiveIndex]);

  // Handle touch events for better mobile experience
  const handleTouchStart = useCallback(() => {
    touchActiveRef.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchActiveRef.current = false;

    // Small delay to ensure animation has settled
    setTimeout(calculateActiveIndex, 50);
  }, [calculateActiveIndex]);

  // Initialize and attach event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add listeners for scroll and touch events
    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
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
      container.removeEventListener("touchend", handleTouchEnd);
      resizeObserver.disconnect();
    };
  }, [handleScroll, handleTouchStart, handleTouchEnd]);

  // Navigate to initial slide on mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (initialSlide > 0) {
        navigateTo(initialSlide);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [initialSlide, navigateTo]);

  // Return the necessary values and methods
  return {
    containerRef,
    slideRefs,
    activeIndex,
    navigateTo,
    setActiveIndex,
    containerWidth,
  };
}
