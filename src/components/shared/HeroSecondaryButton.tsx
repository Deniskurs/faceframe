"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface HeroSecondaryButtonProps {
  href: string;
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
}

/**
 * HeroSecondaryButton Component
 *
 * A specialized button for hero/dark background sections with enhanced visibility.
 * This is a variant of the LuxuryButton specifically designed to be more visible
 * against dark backgrounds like in the hero section.
 */
export function HeroSecondaryButton({
  href,
  text,
  size = "medium",
  className = "",
  onClick,
}: HeroSecondaryButtonProps) {
  // Text size based on button size
  const textSizes = {
    small: "text-xs",
    medium: "text-xs md:text-sm",
    large: "text-sm md:text-base",
  };

  // Padding styles based on size
  const paddingStyles = {
    small: "px-10 py-3",
    medium: "px-14 py-4",
    large: "px-16 py-5",
  };

  return (
    <Link
      href={href}
      className={`inline-block font-alta tracking-refined ${textSizes[size]} uppercase group relative border-2 border-white/60 text-white hover:text-white bg-black/30 hover:bg-black/40 backdrop-blur-sm overflow-hidden ${paddingStyles[size]} transition-all duration-700 ${className}`}
      onClick={onClick}
    >
      {/* Enhanced hover effects for dark backgrounds */}
      <>
        <motion.div
          className="absolute inset-0 bg-white/0 group-hover:bg-white/10"
          initial={false}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] w-0 bg-white/80 group-hover:w-full"
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
        />
      </>

      {/* Button content with enhanced shadow for better visibility */}
      <span className="relative z-10 transition-colors duration-700 text-shadow-sm">
        {text}
      </span>
    </Link>
  );
}
