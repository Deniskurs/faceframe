export function useServiceCarousel(
  carouselRef: React.RefObject<HTMLDivElement>,
  activeCategory: number,
  setActiveCategory: (index: number) => void
) {
  const navigateCarousel = (index: number) => {
    setActiveCategory(index);

    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const containerWidth = scrollContainer.clientWidth;

      // Get all cards
      const cards = Array.from(scrollContainer.children) as HTMLElement[];

      // Calculate the position based on card dimensions
      // This approach takes into account the variable card widths
      let scrollOffset = 0;

      // Add up widths of all cards before the target one
      for (let i = 0; i < index; i++) {
        if (cards[i]) {
          // Include the full width of previous cards
          scrollOffset += cards[i].offsetWidth;
        }
      }

      // Center the target card by adding half of the current card's width
      // minus half of the container width
      if (cards[index]) {
        const cardWidth = cards[index].offsetWidth;
        scrollOffset += cardWidth / 2;
        scrollOffset -= containerWidth / 2;

        // Ensure we don't scroll past the beginning
        scrollOffset = Math.max(0, scrollOffset);
      }

      // Scroll with smooth behavior
      scrollContainer.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return { navigateCarousel };
}
