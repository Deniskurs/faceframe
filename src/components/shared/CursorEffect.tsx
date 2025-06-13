"use client";

import React from "react";
import { motion } from "framer-motion";
import useCursorEffect from "@/utils/animations/useCursorEffect";

interface CursorEffectProps {
  color?: string;
  backgroundColor?: string;
  size?: number;
  borderWidth?: number;
  showOnMobile?: boolean;
}

/**
 * A premium custom cursor effect component
 * Should be added once in the layout component
 */
const CursorEffect: React.FC<CursorEffectProps> = ({
  color = "#7F5539",
  backgroundColor = "rgba(127, 85, 57, 0.1)",
  size = 32,
  borderWidth = 1,
  showOnMobile = false,
}) => {
  const { cursorStyles, shouldRender } = useCursorEffect({
    color,
    backgroundColor,
    size,
    borderWidth,
    showOnMobile,
    ringScale: 1.5,
    springMass: 0.8,
    springStiffness: 400,
    springDamping: 28,
    hideNativeCursor: true,
    mixBlendMode: "difference",
  });

  if (!shouldRender) return null;

  return (
    <>
      {/* Main Cursor Circle */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: 0,
          top: 0,
          width: cursorStyles.size,
          height: cursorStyles.size,
          backgroundColor: cursorStyles.backgroundColor,
          border: `${cursorStyles.borderWidth}px solid ${cursorStyles.borderColor}`,
          mixBlendMode:
            cursorStyles.mixBlendMode as React.CSSProperties["mixBlendMode"],
          opacity: cursorStyles.opacity,
          x: cursorStyles.x - cursorStyles.size / 2,
          y: cursorStyles.y - cursorStyles.size / 2,
        }}
        animate={{
          x: cursorStyles.x - cursorStyles.size / 2,
          y: cursorStyles.y - cursorStyles.size / 2,
          width: cursorStyles.size,
          height: cursorStyles.size,
          opacity: cursorStyles.opacity,
        }}
        transition={{
          type: "spring",
          ...cursorStyles.springConfig,
        }}
      />

      {/* Small Dot for Precise Cursor Center */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: 0,
          top: 0,
          width: 4,
          height: 4,
          backgroundColor: cursorStyles.isHovering
            ? "transparent"
            : cursorStyles.borderColor,
          opacity: cursorStyles.opacity,
          x: cursorStyles.x - 2,
          y: cursorStyles.y - 2,
        }}
        animate={{
          x: cursorStyles.x - 2,
          y: cursorStyles.y - 2,
          opacity: cursorStyles.opacity,
        }}
        transition={{
          type: "spring",
          mass: 0.2, // Lighter mass for faster following
          stiffness: 800,
          damping: 15,
        }}
      />
    </>
  );
};

export default CursorEffect;
