"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ParallaxContainer from "./ParallaxContainer";

interface BrandedDividerProps {
  className?: string;
  style?: "image" | "gradient" | "simple";
  height?: "sm" | "md" | "lg";
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  text?: string;
  image?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function BrandedDivider({
  className = "",
  style = "image",
  height = "md",
  overlay = true,
  overlayOpacity = 0.15,
  overlayColor = "elegant-mocha",
  text,
  image = "/images/brand/IMG_5460.jpg",
  parallax = true,
  parallaxSpeed = 0.2,
}: BrandedDividerProps) {
  // Height classes - reduced for a more elegant, understated look
  const heightClasses = {
    sm: "h-8 md:h-10",
    md: "h-12 md:h-16",
    lg: "h-16 md:h-24",
  };

  // Get overlay gradient based on color
  const getOverlayGradient = () => {
    // If using a Tailwind color
    if (overlayColor.indexOf("#") === -1) {
      return `linear-gradient(to right, rgba(var(--${overlayColor}-rgb), ${overlayOpacity}), rgba(var(--${overlayColor}-rgb), ${
        overlayOpacity * 0.5
      }))`;
    }

    // If using hex color
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const formattedHex = hex.replace(
        shorthandRegex,
        (_, r, g, b) => r + r + g + g + b + b
      );
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        formattedHex
      );
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
          ]
        : [0, 0, 0];
    };

    const [r, g, b] = hexToRgb(overlayColor);
    return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, ${overlayOpacity}), rgba(${r}, ${g}, ${b}, ${
      overlayOpacity * 0.5
    }))`;
  };

  // Render simple divider style (just a gradient line)
  if (style === "simple") {
    return (
      <motion.div
        className={`w-full ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="elegant-divider"></div>
      </motion.div>
    );
  }

  // Render gradient style (color gradient background)
  if (style === "gradient") {
    return (
      <motion.div
        className={`relative w-full overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className={`${heightClasses[height]} w-full relative bg-gradient-to-r from-elegant-mocha to-deep-bronze`}
        >
          {text && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-alice text-white text-sm md:text-base tracking-widest uppercase border-b border-white/20 pb-1">
                {text}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Render image style (with image background)
  const content = (
    <motion.div
      className={`relative w-full overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className={`${heightClasses[height]} w-full relative`}>
        <Image
          src={image}
          alt="FaceFrame Beauty brand element"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {overlay && (
          <div
            className="absolute inset-0"
            style={{ background: getOverlayGradient() }}
          ></div>
        )}

        {text && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-alice text-white text-sm md:text-base tracking-widest uppercase border-b border-white/20 pb-1 drop-shadow-md">
              {text}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Add parallax if needed
  if (parallax) {
    return (
      <ParallaxContainer speed={parallaxSpeed} direction="up" responsive={true}>
        {content}
      </ParallaxContainer>
    );
  }

  return content;
}
