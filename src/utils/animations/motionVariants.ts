/**
 * Centralized animation variants and transitions for Framer Motion
 * This ensures consistent animations across the entire site
 */

// Standard durations
export const durations = {
  fast: 0.2,
  default: 0.3,
  medium: 0.5,
  slow: 0.8,
  extraSlow: 1.2,
};

// Easing functions
export const easing = {
  // A smooth, elegant easing for luxury feel
  gentle: [0.19, 1.0, 0.22, 1.0],
  // A subtle bounce at the end
  bounce: [0.175, 0.885, 0.32, 1.275],
  // Slight pullback before animating (anticipation)
  anticipate: [0.65, 0, 0.35, 1],
  // Standard smooth easing
  smooth: [0.4, 0, 0.2, 1],
  // Quick start, slow end
  easeOut: [0, 0, 0.2, 1],
  // Slow start, quick end
  easeIn: [0.4, 0, 1, 1],
};

// Standard fade animations
export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: durations.default,
    ease: easing.gentle,
  },
};

// Fade up animation (common for page elements)
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Fade down animation
export const fadeDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Fade right animation
export const fadeRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Fade left animation
export const fadeLeft = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Scale animation
export const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Stagger children animation container
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Child item for stagger animations
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easing.gentle,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: durations.fast,
      ease: easing.easeIn,
    },
  },
};

// Button hover animations
export const buttonHover = {
  scale: 1.03,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: durations.fast,
    ease: easing.gentle,
  },
};

// Button tap/active animations
export const buttonTap = {
  scale: 0.97,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: durations.fast / 2,
    ease: easing.easeIn,
  },
};

// Image hover effect
export const imageHover = {
  scale: 1.05,
  transition: {
    duration: durations.medium,
    ease: easing.gentle,
  },
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easing.gentle,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: durations.fast,
      ease: easing.easeIn,
    },
  },
};

// Hero section text animation
export const heroText = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easing.gentle,
    },
  },
};

// Utility function to create staggered text animation
export const createStaggeredText = (delay = 0) => {
  return {
    container: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: delay,
        },
      },
    },
    letter: {
      initial: { opacity: 0, y: 15 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: durations.medium,
          ease: easing.gentle,
        },
      },
    },
  };
};
