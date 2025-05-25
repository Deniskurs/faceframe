"use client";

/**
 * @file Mobile Services View Component
 * Premium mobile services carousel with Chanel/Dior-inspired design elements
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ServiceCard } from "../../cards/ServiceCard";
import { FEATURED_CATEGORIES, LUXURY_EASING } from "../../core/types";
import { SectionTitle } from "../../components/SectionTitle";
import { ViewAllButton } from "../../components/ViewAllButton";
import styles from "@/styles/embla.module.css";
import { useCardHeight } from "../../cards/useCardHeight";

// Define the minimal interface we need for the Embla API
interface EmblaApi {
  scrollSnapList: () => number[];
  selectedScrollSnap: () => number;
  scrollTo: (index: number) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
}

/**
 * Luxury Premium dots indicator component inspired by Chanel.com
 */
function EmblaDots({ api }: { api: EmblaApi | undefined }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback(() => {
    if (!api) return;
    // Get all snap points but filter out the buffer slides
    const allSnaps = api.scrollSnapList();

    // Skip the first and last items (buffer slides)
    const filteredSnaps = allSnaps.slice(1, allSnaps.length - 1);
    setScrollSnaps(filteredSnaps);
  }, [api]);

  const onSelect = useCallback(() => {
    if (!api) return;
    // Get the actual index and adjust for the buffer slide at the start
    const rawIndex = api.selectedScrollSnap();
    // Adjust the index to account for the first buffer slide
    const adjustedIndex = Math.max(0, rawIndex - 1);
    setSelectedIndex(adjustedIndex);
  }, [api]);

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

  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;
      // Add 1 to account for the buffer slide at the start
      api.scrollTo(index + 1);
    },
    [api]
  );

  return (
    <div className="flex items-center justify-center space-x-4">
      {scrollSnaps.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => scrollTo(index)}
          className={`focus:outline-none`}
          aria-label={`Go to slide ${index + 1}`}
        >
          <motion.div
            className={`${
              selectedIndex === index
                ? "w-7 h-[1.5px] bg-elegant-mocha/50"
                : "w-3 h-[1.5px] bg-elegant-mocha/20"
            }`}
            animate={{
              width: selectedIndex === index ? 28 : 12,
              opacity: selectedIndex === index ? 1 : 0.6,
            }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
          />
        </motion.button>
      ))}
    </div>
  );
}

export interface MobileServicesViewProps {
  hideTitle?: boolean;
}

export function MobileServicesView({
  hideTitle = false,
}: MobileServicesViewProps) {
  // State and refs
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
  });

  // Card height equalization for consistent card heights
  const { registerCard } = useCardHeight({
    containerRef: carouselRef,
    minHeight: 500,
    equalizeOnMount: true,
    equalizeOnResize: true,
  });

  // Initialize Embla Carousel with premium luxury settings - NO LOOP
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    skipSnaps: false,
    loop: false,
    containScroll: "keepSnaps", // Allow scrolling but will create a hard stop at the edge
  });

  // Set revealed state for initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle selection to ensure we never stop on buffer slides
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const currentIndex = emblaApi.selectedScrollSnap();

      // If we're at a buffer slide, force scroll to nearest real slide
      if (currentIndex === 0) {
        // First buffer slide - go to first real slide
        emblaApi.scrollTo(1);
      } else if (currentIndex === emblaApi.scrollSnapList().length - 1) {
        // Last buffer slide - go to last real slide
        emblaApi.scrollTo(emblaApi.scrollSnapList().length - 2);
      }
    };

    // Register the select event
    emblaApi.on("select", handleSelect);

    // Initialize to the correct slide
    emblaApi.scrollTo(1, false);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  // Scroll to previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Scroll to next slide
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative" ref={sectionRef}>
      {/* Section Title - Consistently displayed for mobile */}
      {!hideTitle && (
        <div className="mb-12 mx-4">
          <SectionTitle
            title="Services"
            subtitle="The Experience"
            isRevealed={isInView}
            align="center"
          />
        </div>
      )}

      {/* Swipe hint animation - elegant and subtle */}
      <motion.div
        className="absolute left-1/2 top-[220px] -translate-x-1/2 z-10 pointer-events-none flex items-center space-x-1"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isInView && isRevealed ? [0.7, 0] : 0,
          x: isInView && isRevealed ? [0, 20, 0] : 0,
        }}
        transition={{
          opacity: { duration: 1.5, delay: 1 },
          x: {
            duration: 1.5,
            ease: LUXURY_EASING,
            times: [0, 0.5, 1],
            repeat: 2,
            delay: 0.8,
          },
        }}
      >
        <div className="text-white/70 text-xs font-alta tracking-widest uppercase">
          Swipe
        </div>
        <svg
          width="20"
          height="8"
          viewBox="0 0 20 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
            fill="rgba(255,255,255,0.7)"
          />
        </svg>
      </motion.div>

      {/* Clean negative space - Chanel-inspired minimalism */}

      {/* Premium Luxury Carousel with refined edge-to-edge design */}
      <motion.div
        className="relative mx-[-16px] sm:mx-[-24px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          ease: LUXURY_EASING,
          delay: 0.2,
        }}
      >
        {/* Embla carousel container */}
        <div className={styles.embla} ref={carouselRef}>
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={styles.embla__container}>
              {/* Invisible buffer slide for visual centering - not navigable */}
              <div
                className={`${styles.embla__slide}`}
                style={{ opacity: 0, pointerEvents: "none" }}
                aria-hidden="true"
                data-buffer="true"
              >
                <div className={styles.embla__slide_inner}></div>
              </div>

              {/* Actual service cards */}
              {FEATURED_CATEGORIES.map((category, index) => (
                <div
                  key={category.id}
                  className={`${styles.embla__slide} ${styles["embla__slide--luxury"]}`}
                  data-index={index}
                >
                  <div className={styles.embla__slide_inner}>
                    <ServiceCard
                      category={category}
                      index={index}
                      isActive={true} // Managed automatically by Embla's CSS
                      registerRef={registerCard}
                    />
                  </div>
                </div>
              ))}

              {/* Invisible buffer slide for visual centering - not navigable */}
              <div
                className={`${styles.embla__slide}`}
                style={{ opacity: 0, pointerEvents: "none" }}
                aria-hidden="true"
                data-buffer="true"
              >
                <div className={styles.embla__slide_inner}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Indicators and Arrows - refined with luxury precision */}
      <motion.div
        className="flex justify-center items-center mt-12 relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 10,
        }}
        transition={{
          duration: 0.7,
          ease: LUXURY_EASING,
          delay: 0.4,
        }}
      >
        {/* Left arrow - Chanel-inspired elegant minimal style */}
        <motion.button
          onClick={scrollPrev}
          className="absolute left-0 sm:left-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
          aria-label="Previous service"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, x: -2 }}
          transition={{ duration: 0.4, ease: LUXURY_EASING }}
        >
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM16 3.5L1 3.5V4.5L16 4.5V3.5Z"
              fill="currentColor"
            />
          </svg>
        </motion.button>

        {/* Enhanced luxury indicators - inspired by Chanel.com */}
        <EmblaDots api={emblaApi as EmblaApi} />

        {/* Right arrow - Chanel-inspired elegant minimal style */}
        <motion.button
          onClick={scrollNext}
          className="absolute right-0 sm:right-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
          aria-label="Next service"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, x: 2 }}
          transition={{ duration: 0.4, ease: LUXURY_EASING }}
        >
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4.5H15V3.5H0V4.5Z"
              fill="currentColor"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Clean negative space - classic Chanel restraint */}
      <div className="mt-16"></div>

      {/* View All Services Button with Chanel-inspired styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 20,
        }}
        transition={{
          duration: 0.9,
          delay: 0.8,
          ease: LUXURY_EASING,
        }}
        className="mt-14 md:mt-16"
      >
        <ViewAllButton />
      </motion.div>
    </div>
  );
}
