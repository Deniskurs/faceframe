"use client";

/**
 * @file Screen Size Hook
 * Responsive breakpoint detection for optimal rendering
 */

import { useState, useEffect } from "react";

// Screen size breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

/**
 * Custom hook to detect screen size and provide responsive flags
 * Enables proper rendering across breakpoints
 */
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<
    "sm" | "md" | "lg" | "xl" | "xxl"
  >("lg");

  // Derived properties
  const isCarouselView = screenSize === "sm" || screenSize === "md";
  const isMobile = screenSize === "sm" || screenSize === "md";
  const isMidDesktop = screenSize === "lg";

  useEffect(() => {
    // Initial size detection
    handleResize();

    // Add window resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);

    function handleResize() {
      const width = window.innerWidth;

      if (width < breakpoints.sm) {
        setScreenSize("sm");
      } else if (width < breakpoints.md) {
        setScreenSize("md");
      } else if (width < breakpoints.lg) {
        setScreenSize("lg");
      } else if (width < breakpoints.xl) {
        setScreenSize("xl");
      } else {
        setScreenSize("xxl");
      }
    }
  }, []);

  return {
    screenSize,
    isCarouselView,
    isMobile,
    isMidDesktop,
  };
}
