"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { luxuryEasing } from "./luxurySpacing";

interface LuxuryTransitionOptions {
  /** Determines when the element starts animating based on its position in the viewport (0-1) */
  threshold?: number;
  /** The delay before the animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** Type of easing to use from luxuryEasing */
  easingType?: keyof typeof luxuryEasing;
  /** Custom animation variants (optional) */
  customVariants?: {
    hidden: Record<string, unknown>;
    visible: Record<string, unknown>;
  };
  /** When true, will play animation once and not repeat when scrolling back into view */
  once?: boolean;
}

/**
 * Hook that provides luxury-inspired transitions with precise timing and easing
 * Designed for creating elegant, high-end animations with Chanel-like refinement
 */
export const useLuxuryTransition = <T extends HTMLElement = HTMLElement>({
  threshold = 0.2,
  delay = 0,
  duration = 1.2,
  easingType = "elegant",
  customVariants,
  once = true,
}: LuxuryTransitionOptions = {}) => {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Set animation state when element comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Generate default variants if custom ones aren't provided
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: luxuryEasing[easingType],
      },
    },
  };

  // Use custom variants if provided, otherwise use defaults
  const variants = customVariants || defaultVariants;

  return {
    ref,
    variants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    isInView,
    hasAnimated,
  };
};

/**
 * Hook for creating staggered children animations with luxury timing
 */
export const useLuxuryStaggerEffect = <T extends HTMLElement = HTMLElement>({
  staggerDelay = 0.1,
  childrenCount = 0,
  parentDelay = 0.1,
  easingType = "elegant",
  once = true,
}: {
  staggerDelay?: number;
  childrenCount: number;
  parentDelay?: number;
  easingType?: keyof typeof luxuryEasing;
  once?: boolean;
}) => {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once });

  // Calculate delays for each child
  const childDelays = Array.from(
    { length: childrenCount },
    (_, i) => parentDelay + i * staggerDelay
  );

  // Create a container variant with staggered children
  const staggerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: parentDelay,
        ease: luxuryEasing[easingType],
      },
    },
  };

  // Default child variant
  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        delay: childDelays[i] || 0,
        ease: luxuryEasing[easingType],
      },
    }),
  };

  return {
    ref,
    staggerVariants,
    childVariants,
    isInView,
    childDelays,
  };
};

/**
 * Hook that creates a luxury reveal effect with customizable directions
 */
export const useLuxuryReveal = <T extends HTMLElement = HTMLElement>({
  direction = "up",
  threshold = 0.1,
  delay = 0,
  duration = 1.2,
  distance = 40,
  easingType = "elegant",
  once = true,
}: {
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  easingType?: keyof typeof luxuryEasing;
  once?: boolean;
}) => {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  // Set initial and animate values based on direction
  let initialProps = {};
  switch (direction) {
    case "up":
      initialProps = { y: distance };
      break;
    case "down":
      initialProps = { y: -distance };
      break;
    case "left":
      initialProps = { x: distance };
      break;
    case "right":
      initialProps = { x: -distance };
      break;
  }

  // Create reveal variants
  const revealVariants = {
    hidden: {
      opacity: 0,
      ...initialProps,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: luxuryEasing[easingType],
      },
    },
  };

  return {
    ref,
    variants: revealVariants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    isInView,
  };
};
