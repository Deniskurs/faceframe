/**
 * @file Centralized Embla Carousel configurations
 * Standard configurations for different carousel view modes
 */

// Embla carousel option types
type EmblaOptionsType = {
  loop?: boolean;
  axis?: "x" | "y";
  dragFree?: boolean;
  align?: "start" | "center" | "end";
  containScroll?: boolean | "trimSnaps" | "keepSnaps";
  slidesToScroll?: number;
  skipSnaps?: boolean;
};

/**
 * Mobile carousel configuration with center alignment
 * Optimized for touch interactions on smaller screens
 */
export const mobileCarouselConfig: EmblaOptionsType = {
  loop: false,
  align: "center",
  skipSnaps: false,
  dragFree: false,
  containScroll: "trimSnaps",
};

/**
 * Desktop carousel configuration with multi-item view
 * Shows more items and provides smooth behavior
 */
export const desktopCarouselConfig: EmblaOptionsType = {
  loop: false,
  align: "start",
  skipSnaps: false,
  slidesToScroll: 1,
  containScroll: "trimSnaps",
};

/**
 * Standard CSS classes for Embla carousel elements
 * Ensures consistent styling across different views
 */
export const carouselClassNames = {
  container: "embla__container",
  slide: "embla__slide",
  slideInner: "embla__slide_inner",
  slideLuxury: "embla__slide--luxury",
  slideSelected: "embla__slide--selected",
  viewport: "embla__viewport",
  wrapper: "embla",
};

/**
 * Fixed aspect ratio for card image containers
 * Ensures consistent visual proportions across all devices
 */
export const cardImageAspectRatio = {
  desktop: 0.65, // 65% width-to-height ratio
  mobile: 0.75, // 75% width-to-height ratio
};

/**
 * Animation timing constants (in ms)
 * For consistent timing across all carousel animations
 */
export const animationTiming = {
  initialDelay: 300,
  staggered: 100,
  baseTransition: 850,
  swipeHint: 1500,
};
