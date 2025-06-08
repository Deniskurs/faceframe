/**
 * IggyDivider Component
 *
 * Elegant divider component for section breaks and visual separation
 * using the design token system for consistent styling.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { iggyTokens } from "../design/tokens";
import { iggyAnimations, viewportConfigs } from "../design/animations";
import { IggyDividerProps } from "../design/types";

const IggyDivider: React.FC<IggyDividerProps> = ({
  variant = "line",
  width = "md",
  color = "subtle",
  orientation = "horizontal",
  thickness = "thin",
  animate = true,
  delay = "none",
  duration = "slower",
  easing = "luxury",
  className,
  id,
  ...props
}) => {
  // Get width classes
  const getWidthClass = () => {
    const widthClasses = {
      xs: "w-16",
      sm: "w-24",
      md: "w-32",
      lg: "w-48",
      xl: "w-64",
      full: "w-full",
    };
    return widthClasses[width];
  };

  // Get height classes for vertical orientation
  const getHeightClass = () => {
    if (orientation === "vertical") {
      const heightClasses = {
        xs: "h-16",
        sm: "h-24",
        md: "h-32",
        lg: "h-48",
        xl: "h-64",
        full: "h-full",
      };
      return heightClasses[width]; // Use width value for height when vertical
    }
    return "";
  };

  // Get thickness
  const getThickness = () => {
    const thicknessMap = {
      hairline: orientation === "horizontal" ? "h-px" : "w-px",
      thin: orientation === "horizontal" ? "h-[1px]" : "w-[1px]",
      medium: orientation === "horizontal" ? "h-[2px]" : "w-[2px]",
    };
    return thicknessMap[thickness];
  };

  // Get color style
  const getColorStyle = () => {
    return { backgroundColor: iggyTokens.colors.border[color] };
  };

  // Create animation variant with custom timing
  const dividerAnimation = {
    ...iggyAnimations.lineReveal,
    transition: {
      duration: iggyTokens.animations.duration[duration],
      delay: iggyTokens.animations.delay[delay],
      ease: iggyTokens.animations.easing[easing],
    },
  };

  const dividerClasses = cn(
    // Base styles
    "relative",
    // Orientation and dimensions
    orientation === "horizontal" ? getWidthClass() : getHeightClass(),
    orientation === "horizontal" ? getThickness() : getThickness(),
    // Custom className
    className
  );

  const motionProps = animate
    ? {
        ...dividerAnimation,
        viewport: viewportConfigs.standard,
      }
    : {};

  // Line variant (simple line)
  if (variant === "line") {
    return (
      <motion.div
        id={id}
        className={dividerClasses}
        style={getColorStyle()}
        {...motionProps}
        {...props}
      />
    );
  }

  // Dot variant (line with center dot)
  if (variant === "dot") {
    return (
      <motion.div
        id={id}
        className={cn("relative flex items-center justify-center", className)}
        {...motionProps}
        {...props}
      >
        <div
          className={cn(
            orientation === "horizontal" ? getWidthClass() : getHeightClass(),
            getThickness()
          )}
          style={getColorStyle()}
        />
        <motion.div
          className="absolute w-2 h-2 bg-current rounded-full"
          style={getColorStyle()}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: iggyTokens.animations.duration.normal,
            delay: iggyTokens.animations.delay[delay] + 0.3,
            ease: iggyTokens.animations.easing[easing],
          }}
        />
      </motion.div>
    );
  }

  // Gradient variant (fade out on edges)
  if (variant === "gradient") {
    const gradientStyle =
      orientation === "horizontal"
        ? {
            background: `linear-gradient(to right, transparent 0%, ${iggyTokens.colors.border[color]} 50%, transparent 100%)`,
          }
        : {
            background: `linear-gradient(to bottom, transparent 0%, ${iggyTokens.colors.border[color]} 50%, transparent 100%)`,
          };

    return (
      <motion.div
        id={id}
        className={dividerClasses}
        style={gradientStyle}
        {...motionProps}
        {...props}
      />
    );
  }

  // Default fallback
  return (
    <motion.div
      id={id}
      className={dividerClasses}
      style={getColorStyle()}
      {...motionProps}
      {...props}
    />
  );
};

export default IggyDivider;
