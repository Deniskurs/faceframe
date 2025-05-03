import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRefinedCarousel } from "./hooks/useRefinedCarousel";
import { ServiceCard } from "./components/ServiceCard";
import { ServiceIndicators } from "./components/ServiceIndicators";
import { FEATURED_CATEGORIES } from "./types";

export function MobileServicesView() {
  const [isRevealed, setIsRevealed] = useState(false);

  // Use our refined carousel optimized for luxury mobile experience
  const {
    containerRef,
    activeIndex,
    isScrolling,
    navigateTo,
    getSlideMetrics,
  } = useRefinedCarousel(FEATURED_CATEGORIES.length);

  // Ensure metrics are calculated on render
  getSlideMetrics();

  // Set revealed state for initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Swipe hint animation */}
      <motion.div
        className="absolute left-1/2 top-[200px] -translate-x-1/2 z-10 pointer-events-none flex items-center space-x-1"
        style={{ opacity: isRevealed ? undefined : 0 }} // Use isRevealed to prevent lint error
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0, x: [0, 20, 0] }}
        transition={{
          opacity: { duration: 1.5, delay: 2 },
          x: {
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: 2,
            delay: 1.2,
          },
        }}
      >
        <div className="text-white/70 text-xs font-alta tracking-wide">
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

      {/* Edge-to-Edge Premium Luxury Carousel */}
      <div className="relative mx-[-16px] sm:mx-[-24px]">
        {" "}
        {/* Negative margin to go edge-to-edge */}
        {/* Ultra-subtle edge gradients - Chanel-inspired */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(247,243,240,0.8) 0%, rgba(247,243,240,0) 100%)",
            opacity: isScrolling ? 0.2 : 0.3,
            transition: "opacity 0.5s ease-out",
          }}
        />
        {/* Edge-to-Edge Carousel Container with Phantom Padding */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-14 snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2.5rem",
            scrollSnapType: "x mandatory",
            willChange: "scroll-position, transform",
          }}
        >
          {/* Refined phantom padding for first card centering in edge-to-edge layout */}
          <div
            className="flex-none pl-4 sm:pl-6"
            style={{
              width: "calc((100% - 80%) / 2)", // Half of the remaining space
              height: "1px", // Keep it effectively invisible
              minWidth: "16px", // Ensure padding doesn't collapse on small screens
            }}
          />

          {FEATURED_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="flex-none px-2 sm:px-3"
              style={{
                width: "80%", // 80% width - better mobile proportions
                scrollSnapAlign: "center",
                transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                opacity: activeIndex === index ? 1 : 0.85,
                transform: `scale(${activeIndex === index ? 1 : 0.98})`,
              }}
            >
              <ServiceCard
                category={category}
                index={index}
                isActive={activeIndex === index}
              />
            </div>
          ))}

          {/* Refined phantom padding for last card centering in edge-to-edge layout */}
          <div
            className="flex-none pr-4 sm:pr-6"
            style={{
              width: "calc((100% - 80%) / 2)", // Half of the remaining space
              height: "1px", // Keep it effectively invisible
              minWidth: "16px", // Ensure padding doesn't collapse on small screens
            }}
          />
        </div>
        {/* Right edge gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(247,243,240,0.8) 0%, rgba(247,243,240,0) 100%)",
            opacity: isScrolling ? 0.2 : 0.3,
            transition: "opacity 0.5s ease-out",
          }}
        />
      </div>

      {/* Premium Navigation Indicators with refined transitions - extra top margin to compensate for edge-to-edge */}
      <div className="flex justify-center items-center mt-12 relative">
        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            onClick={() => navigateTo(activeIndex - 1)}
            className="absolute left-0 sm:left-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
            aria-label="Previous service"
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
          </button>
        )}

        {/* Dot indicators - Simple and reliable */}
        <ServiceIndicators
          totalCount={FEATURED_CATEGORIES.length}
          activeIndex={activeIndex}
          onClick={navigateTo}
        />

        {/* Right arrow */}
        {activeIndex < FEATURED_CATEGORIES.length - 1 && (
          <button
            onClick={() => navigateTo(activeIndex + 1)}
            className="absolute right-0 sm:right-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
            aria-label="Next service"
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
          </button>
        )}
      </div>
    </div>
  );
}
