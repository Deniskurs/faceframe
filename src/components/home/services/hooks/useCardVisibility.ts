import { useRef, useState, useEffect } from "react";

export function useCardVisibility(
  carouselRef: React.RefObject<HTMLDivElement>
) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  // Setup Intersection Observer to detect which card is most visible
  useEffect(() => {
    if (typeof window === "undefined" || !carouselRef.current) return;

    // Reset scroll position and active card
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
    setActiveCategory(0);

    // Store a reference to cardRefs.current to use in cleanup
    // This addresses the React Hook exhaustive-deps warning about ref values changing
    const currentCardRefs = cardRefs.current;
    const currentCarouselRef = carouselRef.current;

    // Setup intersection observer for each card
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (visibleEntry && visibleEntry.intersectionRatio > 0.5) {
          const target = visibleEntry.target as HTMLElement;
          const index = Number(target.dataset.index || 0);
          setActiveCategory(index);
        }
      },
      {
        root: currentCarouselRef,
        threshold: [0.1, 0.5, 0.8],
        rootMargin: "0px",
      }
    );

    // Observe all card elements
    currentCardRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      // Use the captured reference in cleanup to avoid stale ref issues
      currentCardRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [carouselRef]); // carouselRef is already properly listed as a dependency

  return { activeCategory, setActiveCategory, cardRefs };
}
