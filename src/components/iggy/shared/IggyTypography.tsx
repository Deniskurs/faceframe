/**
 * IggyTypography Component
 *
 * Standardized typography component that enforces consistent text styling
 * across all Iggy page sections using the design token system.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { iggyTokens } from "../design/tokens";
import { iggyAnimations, viewportConfigs } from "../design/animations";
import { IggyTypographyProps } from "../design/types";

const IggyTypography: React.FC<IggyTypographyProps> = ({
  children,
  variant,
  font = "primary",
  color = "primary",
  tracking = "normal",
  leading = "normal",
  weight = "normal",
  italic = false,
  as: Component = "div",
  className,
  animate = true,
  delay = "none",
  duration = "normal",
  easing = "luxury",
  id,
  ...props
}) => {
  // Get font size classes based on variant
  const getFontSizeClass = () => {
    // Display variants
    if (variant.startsWith("display-")) {
      const size = variant.split(
        "-"
      )[1] as keyof typeof iggyTokens.typography.sizes.display;
      return iggyTokens.typography.sizes.display[size];
    }

    // Heading variants
    if (variant.startsWith("heading-")) {
      const size = variant.split(
        "-"
      )[1] as keyof typeof iggyTokens.typography.sizes.heading;
      return iggyTokens.typography.sizes.heading[size];
    }

    // Body variants
    if (variant.startsWith("body-")) {
      const size = variant.split(
        "-"
      )[1] as keyof typeof iggyTokens.typography.sizes.body;
      return iggyTokens.typography.sizes.body[size];
    }

    return iggyTokens.typography.sizes.body.md;
  };

  // Get font family class
  const getFontClass = () => {
    return iggyTokens.typography.fonts[font];
  };

  // Get color style
  const getColorStyle = () => {
    return { color: iggyTokens.colors.text[color] };
  };

  // Get tracking class
  const getTrackingClass = () => {
    // Check if it's a custom tracking value
    if (tracking in iggyTokens.typography.tracking.custom) {
      return iggyTokens.typography.tracking.custom[
        tracking as keyof typeof iggyTokens.typography.tracking.custom
      ];
    }
    return iggyTokens.typography.tracking[
      tracking as keyof typeof iggyTokens.typography.tracking
    ];
  };

  // Get leading class
  const getLeadingClass = () => {
    // Check if it's a custom leading value
    if (leading in iggyTokens.typography.leading.custom) {
      return iggyTokens.typography.leading.custom[
        leading as keyof typeof iggyTokens.typography.leading.custom
      ];
    }
    return iggyTokens.typography.leading[
      leading as keyof typeof iggyTokens.typography.leading
    ];
  };

  // Get weight class
  const getWeightClass = () => {
    return iggyTokens.typography.weights[weight];
  };

  // Determine default HTML element based on variant
  const getDefaultElement = () => {
    if (Component !== "div") return Component;

    if (variant.startsWith("display-")) return "h1";
    if (variant === "heading-xl") return "h1";
    if (variant === "heading-lg") return "h2";
    if (variant === "heading-md") return "h3";
    if (variant === "heading-sm") return "h4";
    if (variant === "heading-xs") return "h5";
    return "p";
  };

  const ActualComponent = getDefaultElement();

  // Create animation variant with custom timing
  const textAnimation = {
    ...iggyAnimations.fadeInUp,
    transition: {
      duration: iggyTokens.animations.duration[duration],
      delay: iggyTokens.animations.delay[delay],
      ease: iggyTokens.animations.easing[easing],
    },
  };

  const typographyClasses = cn(
    // Font family
    getFontClass(),
    // Font size (responsive)
    getFontSizeClass(),
    // Font weight
    getWeightClass(),
    // Letter spacing
    getTrackingClass(),
    // Line height
    getLeadingClass(),
    // Italic
    italic && "italic",
    // Custom className
    className
  );

  const motionProps = animate
    ? {
        ...textAnimation,
        viewport: viewportConfigs.standard,
      }
    : {};

  return (
    <motion.div className="contents" {...motionProps}>
      <ActualComponent
        id={id}
        className={typographyClasses}
        style={getColorStyle()}
        {...props}
      >
        {children}
      </ActualComponent>
    </motion.div>
  );
};

export default IggyTypography;
