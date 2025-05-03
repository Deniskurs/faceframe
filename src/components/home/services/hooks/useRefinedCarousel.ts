import { useState, useRef, useEffect, useCallback } from "react";

// Refined carousel hook - optimized for luxury mobile experiences with centered cards
export function useRefinedCarousel(totalSlides: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate slide metrics based on container size with centering information
  const getSlideMetrics = useCallback(() => {
    if (!containerRef.current) return { width: 0, gap: 16, containerWidth: 0 };

    const containerWidth = containerRef.current.clientWidth;
    // Use 80% width - common in luxury sites for mobile (balances visibility and peek)
    const slideWidth = containerWidth * 0.8;
    const gap = 16; // Standard gap

    return { width: slideWidth, gap, containerWidth };
  }, []);

  // Calculate the active index based on scroll position with center consideration
  const calculateActiveIndex = useCallback(() => {
    if (!containerRef.current) return 0;

    const { width, gap, containerWidth } = getSlideMetrics();
    const scrollLeft = containerRef.current.scrollLeft;

    // Calculate the center point of the viewport
    const viewportCenter = containerWidth / 2;
    // Find which slide center is closest to the viewport center
    const slideUnit = width + gap;

    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < totalSlides; i++) {
      const slideCenter = i * slideUnit + width / 2;
      const distance = Math.abs(scrollLeft + viewportCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    return Math.max(0, Math.min(closestIndex, totalSlides - 1));
  }, [getSlideMetrics, totalSlides]);

  // Handle scroll events with debounce for better performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Update active index after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        const newIndex = calculateActiveIndex();
        setActiveIndex(newIndex);
        setIsScrolling(false);
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      container.removeEventListener("scroll", handleScroll);
    };
  }, [calculateActiveIndex]);

  // Programmatically navigate to a specific slide with perfect centering
  const navigateTo = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      // Ensure index is within bounds
      const safeIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const { width, gap, containerWidth } = getSlideMetrics();

      // Calculate the center point of each slide
      const slideCenter = safeIndex * (width + gap) + width / 2;
      // Calculate scroll position to center slide in viewport
      const scrollLeft = slideCenter - containerWidth / 2;

      // Set scrolling state
      setIsScrolling(true);

      // Scroll to perfectly center the target slide
      containerRef.current.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });

      // Update active index
      setActiveIndex(safeIndex);

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    },
    [getSlideMetrics, totalSlides]
  );

  // Effect to initialize slide positions on mount
  useEffect(() => {
    // Minor delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Make sure active slide is properly centered initially
      navigateTo(activeIndex);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeIndex, navigateTo]);

  return {
    containerRef,
    activeIndex,
    isScrolling,
    navigateTo,
    getSlideMetrics,
  };
}
