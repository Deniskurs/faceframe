"use client";

import React, { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

// Define available text variants
type TextVariant =
  | "heading-primary"
  | "heading-secondary"
  | "subtitle"
  | "body"
  | "caption";

// Define available letter spacing presets for cross-device consistency
type LetterSpacingPreset =
  | "standard"
  | "expanded"
  | "ultra-expanded"
  | "elegant"
  | "refined"
  | "editorial";

// Props interface for our luxury text component
interface LuxuryTextProps {
  children: ReactNode;
  variant?: TextVariant;
  letterSpacing?: LetterSpacingPreset;
  as?: React.ElementType;
  className?: string;
  animateEntrance?: boolean;
  motionProps?: MotionProps;
  color?: string;
  withBackdrop?: boolean;
  backdropIntensity?: "subtle" | "medium" | "strong";
  customBackdrop?: React.ReactNode;
  weight?: "light" | "regular" | "medium";
  responsive?: boolean;
}

// Get font weight value based on weight name
const getFontWeightValue = (weight: LuxuryTextProps["weight"]) => {
  switch (weight) {
    case "light":
      return 325; // Fine-tuned for cross-device consistency
    case "regular":
      return 400;
    case "medium":
      return 450;
    default:
      return 325;
  }
};

// Get letter spacing value based on preset name
const getLetterSpacingValue = (preset: LetterSpacingPreset) => {
  switch (preset) {
    case "standard":
      return "0.15em";
    case "expanded":
      return "0.22em";
    case "ultra-expanded":
      return "0.3em";
    case "elegant":
      return "0.25em";
    case "refined":
      return "0.2em";
    case "editorial":
      return "0.18em";
    default:
      return "0.15em";
  }
};

// Get appropriate classes based on variant
const getVariantClasses = (variant: TextVariant) => {
  switch (variant) {
    case "heading-primary":
      return "text-2xl sm:text-3xl md:text-4xl font-alice";
    case "heading-secondary":
      return "text-xl sm:text-2xl md:text-3xl font-alice";
    case "subtitle":
      return "text-sm sm:text-base md:text-lg font-alice";
    case "body":
      return "text-xs sm:text-sm md:text-base font-alta leading-relaxed";
    case "caption":
      return "text-xs font-alta";
    default:
      return "text-base";
  }
};

// Get backdrop styles based on intensity
const getBackdropStyles = (intensity: LuxuryTextProps["backdropIntensity"]) => {
  switch (intensity) {
    case "subtle":
      return "bg-gradient-to-b from-black/5 via-black/10 to-black/5 backdrop-blur-[0.5px]";
    case "medium":
      return "bg-gradient-to-b from-black/10 via-black/20 to-black/10 backdrop-blur-[1px]";
    case "strong":
      return "bg-gradient-to-b from-black/20 via-black/30 to-black/20 backdrop-blur-[1.5px]";
    default:
      return "bg-gradient-to-b from-black/10 via-black/15 to-black/10 backdrop-blur-[1px]";
  }
};

// Comprehensive text enhancement for cross-platform consistency
const LuxuryText: React.FC<LuxuryTextProps> = ({
  children,
  variant = "body",
  letterSpacing = "standard",
  as: Component = motion.div,
  className = "",
  animateEntrance = false,
  motionProps = {},
  color = "white",
  withBackdrop = false,
  backdropIntensity = "medium",
  customBackdrop,
  weight = "light",
  responsive = true,
}) => {
  // Calculate typography styles with cross-device consistency in mind
  const baseClasses = getVariantClasses(variant);
  const fontWeight = getFontWeightValue(weight);
  const letterSpacingValue = getLetterSpacingValue(letterSpacing);

  // Prepare essential text enhancement for cross-device consistency
  const textEnhancement = {
    // Precise text shadow for legibility
    textShadow:
      color === "white"
        ? "0 0.5px 1.5px rgba(0,0,0,0.25), 0 0 5px rgba(255,255,255,0.15)"
        : "0 0.5px 1px rgba(0,0,0,0.1)",
    // Ensure consistent font weight rendering
    fontWeight,
    // Apply letter spacing
    letterSpacing: letterSpacingValue,
    // Optimize text rendering
    textRendering: "geometricPrecision",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  // Apply text color
  const colorClass =
    color === "white"
      ? "text-white"
      : color === "soft-blush"
      ? "text-soft-blush"
      : color;

  // Combine all classes
  const combinedClassNames = `
    ${baseClasses} 
    ${colorClass} 
    ${className}
    ${responsive ? "luxury-text-responsive" : ""}
  `.trim();

  // Setup entrance animation
  const entranceAnimation = animateEntrance
    ? {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: LUXURY_EASING },
      }
    : {};

  return (
    <div className={`relative ${withBackdrop ? "luxury-text-backdrop" : ""}`}>
      {withBackdrop && !customBackdrop && (
        <div
          className={`absolute inset-0 -mx-4 -my-2 ${getBackdropStyles(
            backdropIntensity
          )} rounded-[1px] opacity-90 pointer-events-none z-0`}
        />
      )}

      {customBackdrop && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {customBackdrop}
        </div>
      )}

      <Component
        className={combinedClassNames}
        style={textEnhancement}
        {...entranceAnimation}
        {...motionProps}
      >
        {children}
      </Component>
    </div>
  );
};

export default LuxuryText;
