/**
 * IggySection Component
 *
 * Reusable section wrapper that provides consistent spacing, backgrounds,
 * animations, and responsive behavior across all Iggy page sections.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { iggyTokens } from "../design/tokens";
import { iggyAnimations, viewportConfigs } from "../design/animations";
import { IggySectionProps } from "../design/types";

const IggySection: React.FC<IggySectionProps> = ({
  children,
  className,
  spacing = "lg",
  background = "primary",
  maxWidth = "full",
  centerContent = false,
  animate = true,
  delay = "none",
  duration = "normal",
  easing = "luxury",
  as: Component = "section",
  id,
  ...props
}) => {
  // Get spacing values from tokens
  const getSpacing = () => {
    return {
      paddingTop: iggyTokens.spacing.section[spacing],
      paddingBottom: iggyTokens.spacing.section[spacing],
    };
  };

  // Get background color from tokens
  const getBackground = () => {
    if (background === "primary") return iggyTokens.colors.background.primary;
    if (background === "subtle") return iggyTokens.colors.background.subtle;
    if (background === "accent") return iggyTokens.colors.background.accent;
    if (background === "overlay") return iggyTokens.colors.background.overlay;
    return iggyTokens.colors.background.primary;
  };

  // Get max width classes
  const getMaxWidthClass = () => {
    const widthClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-none",
    };
    return widthClasses[maxWidth];
  };

  // Create animation variant with custom timing
  const sectionAnimation = {
    ...iggyAnimations.fadeIn,
    transition: {
      duration: iggyTokens.animations.duration[duration],
      delay: iggyTokens.animations.delay[delay],
      ease: iggyTokens.animations.easing[easing],
    },
  };

  const sectionClasses = cn(
    // Base layout
    "relative w-full",
    // Content centering
    centerContent && "flex items-center justify-center",
    // Max width
    getMaxWidthClass(),
    // Center horizontally if not full width
    maxWidth !== "full" && "mx-auto",
    // Responsive padding
    "px-4 sm:px-6 lg:px-8",
    // Custom className
    className
  );

  const motionProps = animate
    ? {
        ...sectionAnimation,
        viewport: viewportConfigs.standard,
      }
    : {};

  return (
    <Component
      id={id}
      className="relative w-full"
      style={{
        backgroundColor: getBackground(),
        ...getSpacing(),
      }}
      {...props}
    >
      <motion.div className={sectionClasses} {...motionProps}>
        {children}
      </motion.div>
    </Component>
  );
};

export default IggySection;
