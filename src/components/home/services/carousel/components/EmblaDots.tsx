/**
 * @file Embla Carousel Dots Component
 * Luxury-styled pagination indicators for the carousel
 */

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../../core/types";

// Define the minimum API interface we need
interface EmblaCarouselApi {
  scrollSnapList: () => number[];
  selectedScrollSnap: () => number;
  scrollTo: (index: number) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
}

interface EmblaDotsProp {
  api: EmblaCarouselApi | undefined;
}

export const EmblaDots: React.FC<EmblaDotsProp> = ({ api }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Get the current slide index and scroll snap positions
  const onInit = useCallback(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
  }, [api]);

  // Update selected index when the slide changes
  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  // Register for carousel events
  useEffect(() => {
    if (!api) return;
    onInit();
    onSelect();
    api.on("reInit", onInit);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onInit);
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onInit, onSelect]);

  // Scroll to a specific slide when a dot is clicked
  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  // Premium dot animations and styling
  const dotVariants = {
    inactive: {
      scale: 1,
      width: 8,
      backgroundColor: "rgba(127, 85, 57, 0.2)",
    },
    active: {
      scale: 1,
      width: 24,
      backgroundColor: "rgba(127, 85, 57, 0.4)",
    },
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {scrollSnaps.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => scrollTo(index)}
          className="h-2 rounded-full focus:outline-none"
          initial="inactive"
          animate={selectedIndex === index ? "active" : "inactive"}
          variants={dotVariants}
          transition={{
            duration: 0.85,
            ease: LUXURY_EASING,
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
