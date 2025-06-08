/**
 * Iggy Page Animation Patterns
 *
 * Standardized animation patterns using the design tokens to ensure
 * consistent, luxury-grade animations throughout all Iggy components.
 */

import { Variants } from "framer-motion";
import { iggyTokens } from "./tokens";

// ========== STANDARD ANIMATION VARIANTS ==========

export const iggyAnimations = {
  // ========== FADE ANIMATIONS ==========
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: iggyTokens.animations.duration.normal,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: {
      duration: iggyTokens.animations.duration.normal,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: {
      duration: iggyTokens.animations.duration.normal,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  // ========== SCALE ANIMATIONS ==========
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      duration: iggyTokens.animations.duration.slow,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  scaleInDramatic: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.dramatic,
    },
  } as Variants,

  // ========== SLIDE ANIMATIONS ==========
  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
    transition: {
      duration: iggyTokens.animations.duration.slow,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  slideInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: {
      duration: iggyTokens.animations.duration.slow,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  // ========== REVEAL ANIMATIONS ==========
  lineReveal: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    exit: { scaleX: 0 },
    transition: {
      duration: iggyTokens.animations.duration.slower,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  maskReveal: {
    initial: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
    animate: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    exit: { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  // ========== EDITORIAL ANIMATIONS ==========
  editorialEntry: {
    initial: {
      opacity: 0,
      y: 80,
      scale: 0.98,
      clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    exit: {
      opacity: 0,
      y: 80,
      scale: 0.98,
      clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
    },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.luxury,
    },
  } as Variants,

  // ========== TYPEWRITER ANIMATION ==========
  typewriter: {
    initial: { width: 0 },
    animate: { width: "auto" },
    transition: {
      duration: iggyTokens.animations.duration.slower,
      ease: iggyTokens.animations.easing.refined,
    },
  } as Variants,

  // ========== PARALLAX VARIANTS ==========
  parallaxSlow: {
    initial: { y: 0 },
    animate: { y: -100 },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.subtle,
    },
  } as Variants,

  parallaxMedium: {
    initial: { y: 0 },
    animate: { y: -200 },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.subtle,
    },
  } as Variants,

  parallaxFast: {
    initial: { y: 0 },
    animate: { y: -400 },
    transition: {
      duration: iggyTokens.animations.duration.cinematic,
      ease: iggyTokens.animations.easing.subtle,
    },
  } as Variants,
};

// ========== STAGGER CONTAINERS ==========

export const staggerContainers = {
  // Standard stagger for lists/grid items
  standard: {
    animate: {
      transition: {
        staggerChildren: iggyTokens.animations.stagger.normal,
        delayChildren: iggyTokens.animations.delay.sm,
      },
    },
  } as Variants,

  // Dramatic stagger for hero elements
  dramatic: {
    animate: {
      transition: {
        staggerChildren: iggyTokens.animations.stagger.dramatic,
        delayChildren: iggyTokens.animations.delay.md,
      },
    },
  } as Variants,

  // Fast stagger for subtle animations
  fast: {
    animate: {
      transition: {
        staggerChildren: iggyTokens.animations.stagger.fast,
        delayChildren: iggyTokens.animations.delay.xs,
      },
    },
  } as Variants,

  // Editorial stagger for magazine-style layouts
  editorial: {
    animate: {
      transition: {
        staggerChildren: iggyTokens.animations.stagger.slow,
        delayChildren: iggyTokens.animations.delay.lg,
      },
    },
  } as Variants,
};

// ========== VIEWPORT CONFIGURATIONS ==========

export const viewportConfigs = {
  // Standard viewport config
  standard: {
    once: true,
    margin: "-100px",
    amount: 0.1,
  },

  // For hero sections that need immediate triggering
  immediate: {
    once: true,
    margin: "0px",
    amount: 0.05,
  },

  // For sections that need most content visible
  mostVisible: {
    once: true,
    margin: "-50px",
    amount: 0.4,
  },

  // For fine-tuned editorial reveals
  editorial: {
    once: true,
    margin: "-150px",
    amount: 0.2,
  },
};

// ========== HOVER ANIMATIONS ==========

export const hoverAnimations = {
  // Subtle hover for text elements
  textHover: {
    scale: 1.02,
    transition: {
      duration: iggyTokens.animations.duration.fast,
      ease: iggyTokens.animations.easing.refined,
    },
  },

  // Image hover with scale
  imageHover: {
    scale: 1.05,
    transition: {
      duration: iggyTokens.animations.duration.normal,
      ease: iggyTokens.animations.easing.luxury,
    },
  },

  // Button hover with luxury feel
  buttonHover: {
    scale: 1.03,
    y: -2,
    transition: {
      duration: iggyTokens.animations.duration.fast,
      ease: iggyTokens.animations.easing.refined,
    },
  },

  // Editorial element hover
  editorialHover: {
    scale: 1.01,
    y: -4,
    transition: {
      duration: iggyTokens.animations.duration.slow,
      ease: iggyTokens.animations.easing.luxury,
    },
  },
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Creates a custom animation with specified delay
 */
export const createDelayedAnimation = (
  baseAnimation: Variants,
  delay: keyof typeof iggyTokens.animations.delay
) => ({
  ...baseAnimation,
  transition: {
    ...baseAnimation.transition,
    delay: iggyTokens.animations.delay[delay],
  },
});

/**
 * Creates a custom animation with specified duration
 */
export const createTimedAnimation = (
  baseAnimation: Variants,
  duration: keyof typeof iggyTokens.animations.duration
) => ({
  ...baseAnimation,
  transition: {
    ...baseAnimation.transition,
    duration: iggyTokens.animations.duration[duration],
  },
});

/**
 * Creates a stagger delay for list items
 */
export const createStaggerDelay = (
  index: number,
  staggerType: keyof typeof iggyTokens.animations.stagger = "normal"
) => {
  return (
    iggyTokens.animations.delay.sm +
    index * iggyTokens.animations.stagger[staggerType]
  );
};

/**
 * Gets the appropriate animation variant based on component type
 */
export const getAnimationVariant = (
  type: "hero" | "section" | "text" | "image" | "editorial",
  entrance: "fade" | "slide" | "scale" | "reveal" = "fade"
) => {
  const variants = {
    hero: {
      fade: iggyAnimations.fadeInUp,
      slide: iggyAnimations.slideInLeft,
      scale: iggyAnimations.scaleInDramatic,
      reveal: iggyAnimations.editorialEntry,
    },
    section: {
      fade: iggyAnimations.fadeIn,
      slide: iggyAnimations.slideInLeft,
      scale: iggyAnimations.scaleIn,
      reveal: iggyAnimations.maskReveal,
    },
    text: {
      fade: iggyAnimations.fadeInUp,
      slide: iggyAnimations.slideInLeft,
      scale: iggyAnimations.scaleIn,
      reveal: iggyAnimations.typewriter,
    },
    image: {
      fade: iggyAnimations.fadeIn,
      slide: iggyAnimations.slideInRight,
      scale: iggyAnimations.scaleIn,
      reveal: iggyAnimations.maskReveal,
    },
    editorial: {
      fade: iggyAnimations.fadeInUp,
      slide: iggyAnimations.slideInLeft,
      scale: iggyAnimations.scaleInDramatic,
      reveal: iggyAnimations.editorialEntry,
    },
  };

  return variants[type][entrance];
};

// All exports are declared above with their individual export statements
