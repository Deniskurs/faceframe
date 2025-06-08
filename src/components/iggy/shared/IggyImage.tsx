/**
 * IggyImage Component
 *
 * Optimized image component with consistent styling, animations,
 * and responsive behavior using the design token system.
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { iggyTokens } from "../design/tokens";
import { iggyAnimations, viewportConfigs } from "../design/animations";
import { IggyImageProps } from "../design/types";

const IggyImage: React.FC<IggyImageProps> = ({
  src,
  alt,
  aspectRatio = "landscape",
  priority = false,
  quality = 95,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "empty",
  overlay,
  border = false,
  shadow = "subtle",
  animate = true,
  delay = "none",
  duration = "normal",
  easing = "luxury",
  className,
  id,
  ...props
}) => {
  // Get aspect ratio class
  const getAspectRatioClass = () => {
    return iggyTokens.aspectRatios[aspectRatio];
  };

  // Get shadow class
  const getShadowClass = () => {
    return iggyTokens.shadows[shadow];
  };

  // Get overlay styles
  const getOverlayStyles = () => {
    if (!overlay) return {};

    if (overlay.type === "solid") {
      return {
        backgroundColor: overlay.color
          ? iggyTokens.colors.background[overlay.color]
          : iggyTokens.colors.background.overlay,
        opacity: overlay.opacity || 0.1,
      };
    }

    if (overlay.type === "gradient") {
      const baseColor = overlay.color
        ? iggyTokens.colors.background[overlay.color]
        : iggyTokens.colors.background.overlay;

      return {
        background: `linear-gradient(to bottom, transparent 0%, ${baseColor} 100%)`,
        opacity: overlay.opacity || 0.3,
      };
    }

    return {};
  };

  // Create animation variant with custom timing
  const imageAnimation = {
    ...iggyAnimations.scaleIn,
    transition: {
      duration: iggyTokens.animations.duration[duration],
      delay: iggyTokens.animations.delay[delay],
      ease: iggyTokens.animations.easing[easing],
    },
  };

  const containerClasses = cn(
    // Base layout
    "relative overflow-hidden",
    // Aspect ratio
    !fill && getAspectRatioClass(),
    // Border
    border && "border border-elegant-mocha/15",
    // Shadow
    getShadowClass(),
    // Custom className
    className
  );

  const imageClasses = cn(
    // Base image styles
    "transition-transform duration-700 ease-luxury",
    // Object fit
    objectFit === "cover" && "object-cover",
    objectFit === "contain" && "object-contain",
    objectFit === "fill" && "object-fill",
    objectFit === "none" && "object-none",
    objectFit === "scale-down" && "object-scale-down"
  );

  const motionProps = animate
    ? {
        ...imageAnimation,
        viewport: viewportConfigs.standard,
        whileHover: {
          scale: 1.02,
          transition: {
            duration: iggyTokens.animations.duration.fast,
            ease: iggyTokens.animations.easing.refined,
          },
        },
      }
    : {};

  const imageProps = {
    src,
    alt,
    priority,
    quality,
    sizes,
    className: imageClasses,
    style: { objectPosition },
    ...(fill ? { fill: true } : {}),
    ...(placeholder === "blur" ? { placeholder: "blur" as const } : {}),
  };

  return (
    <motion.div
      id={id}
      className={containerClasses}
      {...motionProps}
      {...props}
    >
      {/* Main Image */}
      {fill ? (
        <Image {...imageProps} alt={alt} />
      ) : (
        <div className={getAspectRatioClass()}>
          <Image {...imageProps} fill alt={alt} />
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={getOverlayStyles()}
        />
      )}

      {/* Optional content overlay */}
      {props.children && (
        <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-6 lg:p-8">
          {props.children}
        </div>
      )}
    </motion.div>
  );
};

export default IggyImage;
