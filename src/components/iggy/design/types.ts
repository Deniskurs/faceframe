/**
 * Iggy Page TypeScript Interfaces
 *
 * Type definitions for all Iggy components to ensure consistency
 * and provide excellent developer experience with IntelliSense.
 */

import { ReactNode } from "react";
import { MotionProps } from "framer-motion";
import { iggyTokens } from "./tokens";

// ========== BASE COMPONENT PROPS ==========

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animate?: boolean;
  delay?: keyof typeof iggyTokens.animations.delay;
  duration?: keyof typeof iggyTokens.animations.duration;
  easing?: keyof typeof iggyTokens.animations.easing;
}

// ========== TYPOGRAPHY COMPONENT PROPS ==========

export interface IggyTypographyProps extends AnimatedComponentProps {
  variant:
    | "display-xs"
    | "display-sm"
    | "display-md"
    | "display-lg"
    | "display-xl"
    | "heading-xs"
    | "heading-sm"
    | "heading-md"
    | "heading-lg"
    | "heading-xl"
    | "body-xs"
    | "body-sm"
    | "body-md"
    | "body-lg";
  font?: keyof typeof iggyTokens.typography.fonts;
  color?: keyof typeof iggyTokens.colors.text;
  tracking?:
    | keyof typeof iggyTokens.typography.tracking
    | keyof typeof iggyTokens.typography.tracking.custom;
  leading?:
    | keyof typeof iggyTokens.typography.leading
    | keyof typeof iggyTokens.typography.leading.custom;
  weight?: keyof typeof iggyTokens.typography.weights;
  italic?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

// ========== SECTION COMPONENT PROPS ==========

export interface IggySectionProps extends AnimatedComponentProps {
  spacing?: keyof typeof iggyTokens.spacing.section;
  background?: keyof typeof iggyTokens.colors.background;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centerContent?: boolean;
  as?: "section" | "div" | "article" | "main";
}

// ========== IMAGE COMPONENT PROPS ==========

export interface IggyImageProps extends AnimatedComponentProps {
  src: string;
  alt: string;
  aspectRatio?: keyof typeof iggyTokens.aspectRatios;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "empty";
  overlay?: {
    type: "gradient" | "solid";
    color?: keyof typeof iggyTokens.colors.background;
    opacity?: number;
  };
  border?: boolean;
  shadow?: keyof typeof iggyTokens.shadows;
}

// ========== DIVIDER COMPONENT PROPS ==========

export interface IggyDividerProps extends AnimatedComponentProps {
  variant: "line" | "dot" | "gradient";
  width?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  color?: keyof typeof iggyTokens.colors.border;
  orientation?: "horizontal" | "vertical";
  thickness?: "hairline" | "thin" | "medium";
}

// ========== HERO SECTION PROPS ==========

export interface IggyHeroProps extends IggySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    position?: "left" | "right" | "center" | "background";
  };
  whisperWords?: string[];
  scrollIndicator?: boolean;
}

// ========== ESSENCE REVEAL PROPS ==========

export interface EssenceRevealProps extends IggySectionProps {
  greeting?: string;
  openingLines?: string[];
  emotionalCore?: {
    statement: string;
    details: string[];
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

// ========== EDITORIAL PORTRAIT PROPS ==========

export interface EditorialPortraitProps extends IggySectionProps {
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  quote?: {
    text: string;
    lines: string[];
    signature?: string;
  };
  manifesto?: {
    statement: string;
    details: string[];
  };
}

// ========== TRANSFORMATION MANIFESTO PROPS ==========

export interface TransformationManifestoProps extends IggySectionProps {
  title?: {
    negative: string[];
    positive: string;
  };
  journey?: {
    destinations: string[];
    description: string;
  };
}

// ========== SACRED PROMISE PROPS ==========

export interface SacredPromiseProps extends IggySectionProps {
  promise?: {
    opening: string[];
    core: string[];
    experience: string[];
  };
  expertise?: {
    years: number;
    focus: string;
  };
  transformation?: {
    feeling: string[];
    revelation: string[];
  };
  signature?: string;
}

// ========== EMOTIONAL CTA PROPS ==========

export interface EmotionalCTAProps extends IggySectionProps {
  headline?: string[];
  description?: string[];
  button?: {
    text: string;
    href: string;
    variant?: "primary" | "secondary";
  };
}

// ========== QUOTE COMPONENT PROPS ==========

export interface IggyQuoteProps extends AnimatedComponentProps {
  quote: string | string[];
  author?: string;
  variant: "inline" | "block" | "highlight";
  size?: "sm" | "md" | "lg" | "xl";
  italic?: boolean;
}

// ========== SIGNATURE COMPONENT PROPS ==========

export interface IggySignatureProps extends AnimatedComponentProps {
  name: string;
  variant: "simple" | "decorated" | "editorial";
  size?: "sm" | "md" | "lg";
  position?: "left" | "center" | "right";
}

// ========== BUTTON COMPONENT PROPS ==========

export interface IggyButtonProps extends AnimatedComponentProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

// ========== ANIMATION CONFIGURATION ==========

export interface AnimationConfig {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: number[];
    staggerChildren?: number;
    delayChildren?: number;
  };
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
}

// ========== RESPONSIVE CONFIGURATION ==========

export interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}

// ========== LAYOUT PROPS ==========

export interface LayoutProps {
  grid?: {
    cols?: ResponsiveConfig<number>;
    gap?: keyof typeof iggyTokens.spacing;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  };
  flex?: {
    direction?: "row" | "column";
    wrap?: boolean;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  };
  spacing?: {
    padding?: keyof typeof iggyTokens.spacing;
    margin?: keyof typeof iggyTokens.spacing;
  };
}

// ========== UTILITY TYPES ==========

export type IggyColor = keyof typeof iggyTokens.colors.text;
export type IggySpacing = keyof typeof iggyTokens.spacing;
export type IggyAnimation = keyof typeof iggyTokens.animations.easing;
export type IggyTypographySize =
  | keyof typeof iggyTokens.typography.sizes.display
  | keyof typeof iggyTokens.typography.sizes.heading
  | keyof typeof iggyTokens.typography.sizes.body;

// ========== FRAMER MOTION EXTENSIONS ==========

export interface IggyMotionProps extends MotionProps {
  iggyAnimation?: {
    variant?: "fadeIn" | "fadeInUp" | "fadeInDown" | "scaleIn" | "slideIn";
    delay?: keyof typeof iggyTokens.animations.delay;
    duration?: keyof typeof iggyTokens.animations.duration;
    easing?: keyof typeof iggyTokens.animations.easing;
    stagger?: keyof typeof iggyTokens.animations.stagger;
  };
}

// All types are exported above with their individual export statements
