/**
 * Luxury Animations Utility
 *
 * Standardized animation patterns inspired by Chanel design principles.
 * This file contains reusable animation configurations to maintain
 * consistency throughout the FaceFrame Beauty experience.
 */

// CHANEL-inspired luxury easing curve for consistent motion design
export const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

// Standard animation variants for framer-motion
export const standardAnimations = {
  // Fade in (standard)
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: LUXURY_EASING },
  },

  // Fade in up (for content entries)
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: LUXURY_EASING },
  },

  // Fade in down (for headers, titles)
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: LUXURY_EASING },
  },

  // Line reveal (for decorative elements)
  lineReveal: {
    initial: { width: 0 },
    animate: { width: 64 },
    transition: { duration: 0.7, ease: LUXURY_EASING, delay: 0.3 },
  },

  // Scale reveal (for featured elements)
  scaleReveal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: LUXURY_EASING },
  },

  // Hover transition (for interactive elements)
  hoverTransition: {
    duration: 0.6,
    ease: LUXURY_EASING,
  },

  // Stagger delay calculator for list items
  getStaggerDelay: (index: number, baseDelay = 0.2, increment = 0.05) => {
    return baseDelay + index * increment;
  },
};

// Standard viewport settings for animations
export const standardViewport = {
  once: true,
  margin: "-100px",
};

// Standard animation durations - Chanel-inspired precision
export const animationDurations = {
  short: 0.6,
  medium: 0.7,
  long: 0.7,
  extraLong: 0.9,
};

// Animation sequence timing - refined for better user experience
export const sequenceTimings = {
  title: 0.2,
  subtitle: 0.2,
  content: 0.3,
  cta: 0.4,
};

// Accessibility: Reduced motion support (WCAG 2.1 compliance)
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAnimationDuration = (defaultDuration: number): number => {
  return shouldReduceMotion() ? 0 : defaultDuration;
};

export const getAnimationDelay = (defaultDelay: number): number => {
  return shouldReduceMotion() ? 0 : defaultDelay;
};

export const getAccessibleTransition = (
  duration: number,
  delay: number = 0,
  ease: readonly number[] = LUXURY_EASING
) => ({
  duration: getAnimationDuration(duration),
  delay: getAnimationDelay(delay),
  ease,
});
