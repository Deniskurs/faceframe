import { useState, useRef, useEffect, useCallback } from "react";

// Golden ratio-based widths
const GOLDEN_RATIO = 0.618;
const CARD_GAP = 16;

export function useSimpleCarousel(totalSlides: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate card dimensions based on container size
  const getCardDimensions = useCallback(() => {
    if (!containerRef.current) {
      return { width: 0, gap: CARD_GAP };
    }

    const containerWidth = containerRef.current.clientWidth;
    // Golden ratio based card width (~62% of container width)
    const cardWidth = containerWidth * GOLDEN_RATIO;

    return { width: cardWidth, gap: CARD_GAP };
  }, []);

  // Determine active index with improved precision
  const calculateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;

    const { width, gap } = getCardDimensions();
    const scrollLeft = container.scrollLeft;

    // Calculate the most visible card index with higher precision
    const slideUnit = width + gap;
    const indexFloat = scrollLeft / slideUnit;
    const indexRounded = Math.round(indexFloat);

    // Ensure index is within bounds
    return Math.max(0, Math.min(indexRounded, totalSlides - 1));
  }, [getCardDimensions, totalSlides]);

  // Handle scroll events with debouncing for performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Mark as actively scrolling
      setIsScrolling(true);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to update active index after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        const newIndex = calculateActiveIndex();
        setActiveIndex(newIndex);
        setIsScrolling(false);
      }, 150); // Short delay gives a premium feel
    };

    // Add scroll event listener with passive flag for performance
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      container.removeEventListener("scroll", handleScroll);
    };
  }, [calculateActiveIndex]);

  // Navigate to specific index with refined animation
  const navigateTo = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      // Ensure index is within bounds
      const safeIndex = Math.max(0, Math.min(index, totalSlides - 1));

      // Get precise card dimensions
      const { width, gap } = getCardDimensions();

      // Set to scrolling state
      setIsScrolling(true);

      // Premium smooth scrolling with better timing
      containerRef.current.scrollTo({
        left: safeIndex * (width + gap),
        behavior: "smooth",
      });

      // Wait for animation to complete to update state
      // This creates a more premium feel by not updating until scroll is done
      setTimeout(() => {
        setActiveIndex(safeIndex);
        setIsScrolling(false);
      }, 400); // Slight delay after scroll animation
    },
    [getCardDimensions, totalSlides]
  );

  return {
    containerRef,
    activeIndex,
    isScrolling,
    navigateTo,
    getCardDimensions,
  };
}
