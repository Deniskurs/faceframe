/**
 * Iggy Page Design Tokens
 *
 * Master design system that consolidates existing luxury spacing,
 * animations, and brand colors into a unified token system.
 * This ensures consistency across all Iggy page components.
 */

import { luxurySpacing, GOLDEN_RATIO } from "@/utils/animations/luxurySpacing";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

// ========== COLORS ==========
export const iggyColors = {
  // Primary brand colors
  primary: {
    cream: "#FAF7F2", // light-cream
    blush: "#F5E6D3", // soft-blush
    mocha: "#7F5539", // elegant-mocha
  },

  // Text colors with opacity variants
  text: {
    primary: "rgba(127, 85, 57, 0.95)", // elegant-mocha/95
    secondary: "rgba(127, 85, 57, 0.80)", // elegant-mocha/80
    tertiary: "rgba(127, 85, 57, 0.70)", // elegant-mocha/70
    subtle: "rgba(127, 85, 57, 0.65)", // elegant-mocha/65
    accent: "rgba(127, 85, 57, 0.50)", // elegant-mocha/50
  },

  // Background variations
  background: {
    primary: "#FAF7F2", // light-cream
    subtle: "rgba(245, 230, 211, 0.03)", // soft-blush/3%
    accent: "rgba(127, 85, 57, 0.015)", // elegant-mocha/1.5%
    overlay: "rgba(127, 85, 57, 0.08)", // elegant-mocha/8%
  },

  // Border and divider colors
  border: {
    subtle: "rgba(127, 85, 57, 0.12)", // elegant-mocha/12%
    medium: "rgba(127, 85, 57, 0.25)", // elegant-mocha/25%
    strong: "rgba(127, 85, 57, 0.40)", // elegant-mocha/40%
  },
} as const;

// ========== SPACING ==========
// Golden ratio-based spacing system from existing luxurySpacing
export const iggySpacing = {
  // Standard spacing scale
  ...luxurySpacing,

  // Section-specific spacing
  section: {
    xs: "2rem", // 32px
    sm: "4rem", // 64px
    md: "6rem", // 96px
    lg: "8rem", // 128px
    xl: "12rem", // 192px
    xxl: "16rem", // 256px
  },

  // Container spacing
  container: {
    xs: "1rem", // 16px
    sm: "1.5rem", // 24px
    md: "2rem", // 32px
    lg: "3rem", // 48px
    xl: "5rem", // 80px
  },
} as const;

// ========== TYPOGRAPHY ==========
export const iggyTypography = {
  // Font families
  fonts: {
    primary: "font-alice", // Alice for headings and emphasis
    secondary: "font-alta", // Alta for body text
  },

  // Font sizes (mobile-first, responsive)
  sizes: {
    // Display sizes
    display: {
      xs: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      sm: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
      md: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
      lg: "text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]",
      xl: "text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem]",
    },

    // Heading sizes
    heading: {
      xs: "text-lg sm:text-xl lg:text-2xl",
      sm: "text-xl sm:text-2xl lg:text-3xl",
      md: "text-2xl sm:text-3xl lg:text-4xl",
      lg: "text-3xl sm:text-4xl lg:text-5xl",
      xl: "text-4xl sm:text-5xl lg:text-6xl",
    },

    // Body text sizes
    body: {
      xs: "text-sm sm:text-base",
      sm: "text-base sm:text-lg",
      md: "text-lg sm:text-xl lg:text-2xl",
      lg: "text-xl sm:text-2xl lg:text-3xl",
    },
  },

  // Font weights
  weights: {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
  },

  // Letter spacing
  tracking: {
    tight: "tracking-tight",
    normal: "tracking-normal",
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest",
    custom: {
      xs: "tracking-[0.15em]",
      sm: "tracking-[0.2em]",
      md: "tracking-[0.25em]",
      lg: "tracking-[0.3em]",
      xl: "tracking-[0.35em]",
      xxl: "tracking-[0.4em]",
    },
  },

  // Line heights
  leading: {
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
    custom: {
      xs: "leading-[0.9]",
      sm: "leading-[1.1]",
      md: "leading-[1.3]",
      lg: "leading-[1.5]",
    },
  },
} as const;

// ========== ANIMATIONS ==========
export const iggyAnimations = {
  // Easing curves
  easing: {
    luxury: LUXURY_EASING,
    elegant: [0.19, 1, 0.22, 1],
    refined: [0.25, 0.8, 0.25, 1],
    dramatic: [0.15, 1.15, 0.2, 1],
    subtle: [0.4, 0.6, 0.4, 1],
  },

  // Durations (in seconds)
  duration: {
    instant: 0.1,
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    slower: 1.2,
    slowest: 1.8,
    cinematic: 2.5,
  },

  // Delays (in seconds)
  delay: {
    none: 0,
    xs: 0.1,
    sm: 0.2,
    md: 0.4,
    lg: 0.6,
    xl: 0.8,
    xxl: 1.0,
  },

  // Stagger calculations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    dramatic: 0.2,
  },
} as const;

// ========== BREAKPOINTS ==========
export const iggyBreakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",
} as const;

// ========== Z-INDEX SCALE ==========
export const iggyZIndex = {
  hide: -1,
  base: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  dropdown: 40,
  tooltip: 50,
  fixed: 100,
} as const;

// ========== ASPECT RATIOS ==========
export const iggyAspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  ultraWide: "aspect-[21/9]",
  editorial: "aspect-[5/7]",
} as const;

// ========== SHADOWS ==========
export const iggyShadows = {
  subtle: "shadow-sm",
  medium: "shadow-md",
  large: "shadow-lg",
  luxury: "shadow-[0_4px_20px_rgba(127,85,57,0.1)]",
  editorial: "shadow-[0_8px_40px_rgba(127,85,57,0.12)]",
} as const;

// ========== EXPORTS ==========
export const iggyTokens = {
  colors: iggyColors,
  spacing: iggySpacing,
  typography: iggyTypography,
  animations: iggyAnimations,
  breakpoints: iggyBreakpoints,
  zIndex: iggyZIndex,
  aspectRatios: iggyAspectRatios,
  shadows: iggyShadows,
  golden: GOLDEN_RATIO,
} as const;

// Type for the entire token system
export type IggyTokens = typeof iggyTokens;
