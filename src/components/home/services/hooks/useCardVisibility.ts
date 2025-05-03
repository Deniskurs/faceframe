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
        root: carouselRef.current,
        threshold: [0.1, 0.5, 0.8],
        rootMargin: "0px",
      }
    );

    // Observe all card elements
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return { activeCategory, setActiveCategory, cardRefs };
}
