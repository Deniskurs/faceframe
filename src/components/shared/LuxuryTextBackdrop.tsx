"use client";

/**
 * @file LuxuryTextBackdrop Component
 * Enhanced readability component for Alice font on mobile devices
 */

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface LuxuryTextBackdropProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
  isHeading?: boolean;
}

/**
 * LuxuryTextBackdrop - Improves readability of text (especially Alice font)
 * Creates a subtle backdrop effect and enhanced text shadows for better contrast
 */
const LuxuryTextBackdrop: React.FC<LuxuryTextBackdropProps> = ({
  children,
  className = "",
  intensity = "medium",
  isHeading = true,
}) => {
  // Intensity mapping for backdrop effect
  const intensityMap = {
    light: {
      backdropFilter: "blur(0.5px)",
      background: "rgba(0, 0, 0, 0.03)",
      textShadow:
        "0 0.5px 1px rgba(0, 0, 0, 0.25), 0 0 3px rgba(255, 255, 255, 0.15)",
    },
    medium: {
      backdropFilter: "blur(1px)",
      background: "rgba(0, 0, 0, 0.06)",
      textShadow:
        "0 1px 2px rgba(0, 0, 0, 0.3), 0 0 5px rgba(255, 255, 255, 0.2)",
    },
    strong: {
      backdropFilter: "blur(1.5px)",
      background: "rgba(0, 0, 0, 0.12)",
      textShadow:
        "0 1.5px 2.5px rgba(0, 0, 0, 0.35), 0 0 8px rgba(255, 255, 255, 0.25)",
    },
  };

  // Determine font weight class based on whether it's a heading
  const fontWeightClass = isHeading
    ? "font-weight-premium-light"
    : "font-weight-premium-regular";

  return (
    <motion.span
      className={`relative isolate enhanced-text-contrast ${fontWeightClass} ${className}`}
      style={{
        textShadow: intensityMap[intensity].textShadow,
      }}
      whileHover={{
        textShadow: intensityMap.strong.textShadow,
        transition: { duration: 0.5 },
      }}
    >
      {/* iPhone-specific backdrop for improved readability */}
      <span
        className="absolute inset-0 -m-1 rounded-sm z-[-1] opacity-0 @supports(-webkit-touch-callout: none):opacity-70"
        style={{
          backdropFilter: intensityMap[intensity].backdropFilter,
          background: intensityMap[intensity].background,
        }}
      />
      {children}
    </motion.span>
  );
};

export default LuxuryTextBackdrop;
