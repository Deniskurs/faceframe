import { useState, useRef, useEffect, useCallback } from "react";

interface PagedCarouselOptions {
  initialPage?: number;
  slideCount: number;
  slideGap?: number;
  swipeThreshold?: number; // Minimum distance to consider a swipe (px)
  animationDuration?: number; // Duration of the slide transition in ms
}

interface SwipeInfo {
  startX: number;
  startY: number;
  startTime: number;
  isVerticalSwipe: boolean;
  isSwiping: boolean;
}

export function usePagedCarousel(options: PagedCarouselOptions) {
  const {
    initialPage = 0,
    slideCount,
    slideGap = 16,
    swipeThreshold = 50,
    animationDuration = 300,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchInfo = useRef<SwipeInfo>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isVerticalSwipe: false,
    isSwiping: false,
  });

  // Calculate the width of a single slide
  const getSlideWidth = useCallback(() => {
    if (slideRefs.current[0]) {
      const slideRect = slideRefs.current[0].getBoundingClientRect();
      return slideRect.width;
    }
    // If no slide available yet, make an assumption based on container width
    return containerWidth * 0.8; // 80% of container width as fallback
  }, [containerWidth]);

  // Navigate to a specific page programmatically
  const navigateTo = useCallback(
    (pageIndex: number) => {
      if (isAnimating) return;

      // Ensure pageIndex is within bounds
      const safeIndex = Math.max(0, Math.min(pageIndex, slideCount - 1));

      if (safeIndex === currentPage) return;

      setIsAnimating(true);
      setCurrentPage(safeIndex);

      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    },
    [currentPage, slideCount, isAnimating, animationDuration]
  );

  // Handle touch/swipe events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
      if (isAnimating) return;

      // Use touches regardless of event type
      const touch = e.touches[0];

      touchInfo.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        isVerticalSwipe: false,
        isSwiping: true,
      };

      // Reset drag offset
      setDragOffset(0);
    },
    [isAnimating]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
      if (!touchInfo.current.isSwiping || isAnimating) return;

      // Use touches regardless of event type
      const touch = e.touches[0];

      const deltaX = touch.clientX - touchInfo.current.startX;
      const deltaY = touch.clientY - touchInfo.current.startY;

      // Detect if this is primarily a vertical swipe (to allow page scrolling)
      if (
        !touchInfo.current.isVerticalSwipe &&
        Math.abs(deltaY) > Math.abs(deltaX) * 1.5
      ) {
        touchInfo.current.isVerticalSwipe = true;
      }

      // If it's a vertical swipe, don't interfere with page scrolling
      if (touchInfo.current.isVerticalSwipe) return;

      // Prevent default to stop page scrolling during horizontal swipe
      if ("touches" in e) e.preventDefault();

      // Apply resistance when trying to swipe past the first or last slide
      let newOffset = deltaX;
      if (
        (currentPage === 0 && deltaX > 0) ||
        (currentPage === slideCount - 1 && deltaX < 0)
      ) {
        newOffset = deltaX * 0.3; // Apply resistance
      }

      setDragOffset(newOffset);
    },
    [currentPage, slideCount, isAnimating]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchInfo.current.isSwiping || isAnimating) return;

    touchInfo.current.isSwiping = false;

    const deltaX = dragOffset;
    // Remove unused variable

    // Calculate swipe time
    const swipeTime = Date.now() - touchInfo.current.startTime;
    const isQuickSwipe = swipeTime < 300;

    // Only consider horizontal swipes, not vertical ones
    if (!touchInfo.current.isVerticalSwipe) {
      // Determine if we should change page based on swipe distance or speed
      if (
        Math.abs(deltaX) > swipeThreshold ||
        (isQuickSwipe && Math.abs(deltaX) > 20)
      ) {
        // Swipe direction
        if (deltaX > 0 && currentPage > 0) {
          // Right swipe (previous)
          navigateTo(currentPage - 1);
        } else if (deltaX < 0 && currentPage < slideCount - 1) {
          // Left swipe (next)
          navigateTo(currentPage + 1);
        } else {
          // Reset to current position if at boundaries
          setDragOffset(0);
        }
      } else {
        // Not enough movement to trigger page change
        setDragOffset(0);
      }
    } else {
      // Reset for vertical swipes
      setDragOffset(0);
    }
  }, [
    currentPage,
    dragOffset,
    navigateTo,
    slideCount,
    swipeThreshold,
    getSlideWidth,
    isAnimating,
  ]);

  // Update translateX when current page changes
  useEffect(() => {
    const slideWidth = getSlideWidth();
    const gapAdjustment = slideGap * currentPage;

    // Calculate new position
    const newTranslateX = -(currentPage * slideWidth) - gapAdjustment;
    setTranslateX(newTranslateX);
  }, [currentPage, getSlideWidth, slideGap]);

  // Initialize and setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set up resize observer to update dimensions
    const resizeObserver = new ResizeObserver(() => {
      setContainerWidth(container.clientWidth);
    });

    resizeObserver.observe(container);
    setContainerWidth(container.clientWidth);

    // Add touch event listeners to the document with proper typing
    document.addEventListener(
      "touchmove",
      (e) => handleTouchMove(e as TouchEvent),
      { passive: false }
    );
    document.addEventListener("touchend", () => handleTouchEnd());

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("touchmove", (e) =>
        handleTouchMove(e as TouchEvent)
      );
      document.removeEventListener("touchend", () => handleTouchEnd());
    };
  }, [handleTouchMove, handleTouchEnd]);

  // Calculate the final transform, including any current drag
  const finalTransform = translateX + dragOffset;

  return {
    containerRef,
    slideRefs,
    currentPage,
    navigateTo,
    handleTouchStart,
    transform: finalTransform,
    animationDuration,
    isAnimating,
  };
}
