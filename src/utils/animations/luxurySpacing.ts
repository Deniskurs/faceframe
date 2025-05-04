/**
 * Luxury Spacing Utility
 *
 * This utility provides spacing calculations based on the golden ratio,
 * creating mathematically harmonious spacing for a premium aesthetic.
 */

// The golden ratio constant
export const GOLDEN_RATIO = 1.618;

// Base spacing unit in pixels
const BASE_UNIT = 8;

/**
 * Generates a spacing value based on the golden ratio
 * @param multiplier The multiplier to apply to the base unit
 * @returns The calculated spacing value in pixels
 */
export const luxurySpace = (multiplier: number): number => {
  return Math.round(BASE_UNIT * Math.pow(GOLDEN_RATIO, multiplier));
};

/**
 * Predefined luxury spacing values
 */
export const luxurySpacing = {
  xs: `${luxurySpace(0)}px`, // 8px
  sm: `${luxurySpace(1)}px`, // 13px
  md: `${luxurySpace(2)}px`, // 21px
  lg: `${luxurySpace(3)}px`, // 34px
  xl: `${luxurySpace(4)}px`, // 55px
  xxl: `${luxurySpace(5)}px`, // 89px

  // Negative space variants (for margins)
  negXs: `${-luxurySpace(0)}px`, // -8px
  negSm: `${-luxurySpace(1)}px`, // -13px
  negMd: `${-luxurySpace(2)}px`, // -21px
  negLg: `${-luxurySpace(3)}px`, // -34px

  // Micro adjustments for fine details
  micro1: `${luxurySpace(0) / 2}px`, // 4px
  micro2: `${luxurySpace(0) / 4}px`, // 2px
  micro3: `${luxurySpace(0) / 8}px`, // 1px
  hairline: "0.5px", // Ultra-fine line
};

/**
 * Creates a staggered animation delay based on the golden ratio
 * @param index The index of the element in a sequence
 * @param baseDelay The base delay in seconds
 * @returns Calculated delay in seconds
 */
export const luxuryStaggerDelay = (
  index: number,
  baseDelay: number = 0.1
): number => {
  return baseDelay + index * (baseDelay / GOLDEN_RATIO);
};

/**
 * Luxury easing curves inspired by high-end fashion animations
 */
export const luxuryEasing = {
  // Chanel-inspired slow, elegant curve
  elegant: [0.19, 1, 0.22, 1] as const,

  // Subtle, refined movement
  refined: [0.25, 0.8, 0.25, 1] as const,

  // Dramatic entrance
  dramatic: [0.15, 1.15, 0.2, 1] as const,

  // Gentle, barely perceptible
  subtle: [0.4, 0.6, 0.4, 1] as const,
};
