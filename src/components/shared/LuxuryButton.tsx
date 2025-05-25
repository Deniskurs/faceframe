"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface LuxuryButtonProps {
  href: string;
  text: string;
  variant: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
}

/**
 * LuxuryButton Component
 *
 * A Chanel-inspired button component with consistent styling and animations
 * across the FaceFrame Beauty experience.
 *
 * Variants:
 * - primary: Full background with border (for main CTAs like booking)
 * - secondary: Bordered transparent button (for "View All" links)
 * - text: Minimal text link with bottom border animation
 */
export function LuxuryButton({
  href,
  text,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
}: LuxuryButtonProps) {
  // Consistent button styles based on variant
  const buttonStyles = {
    primary:
      "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20",
    secondary:
      "group relative bg-white/15 backdrop-blur-[1px] border-2 border-white/30 text-white hover:bg-white/20 hover:text-white overflow-hidden shadow-sm",
    text: "text-elegant-mocha hover:text-deep-bronze border-b border-elegant-mocha/30 hover:border-deep-bronze",
  };

  // Text size based on button size
  const textSizes = {
    small: "text-xs",
    medium: "text-xs md:text-sm",
    large: "text-sm md:text-base",
  };

  // Padding styles based on variant and size
  const paddingStyles = {
    primary: {
      small: "px-8 py-2.5",
      medium: "px-10 py-3",
      large: "px-12 py-4",
    },
    secondary: {
      small: "px-10 py-3",
      medium: "px-14 py-4",
      large: "px-16 py-5",
    },
    text: {
      small: "pb-1",
      medium: "pb-1",
      large: "pb-1",
    },
  };

  // Determine if we need to include motion div for hover effects
  const includeHoverEffect = variant === "secondary";

  const buttonContent = (
    <span className="relative z-10 transition-colors duration-700">{text}</span>
  );

  return (
    <Link
      href={href}
      className={`inline-block font-alta tracking-refined ${textSizes[size]} uppercase ${buttonStyles[variant]} ${paddingStyles[variant][size]} transition-all duration-700 ${className}`}
      onClick={onClick}
    >
      {/* Only include hover animation for secondary buttons */}
      {includeHoverEffect && (
        <>
          <motion.div
            className="absolute inset-0 bg-white/0 group-hover:bg-white/25"
            initial={false}
            transition={{ duration: 0.7, ease: LUXURY_EASING }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-0 bg-white/70 group-hover:w-full"
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
          />
          <motion.div
            className="absolute top-0 right-0 h-[1px] w-0 bg-white/70 group-hover:w-full"
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASING }}
          />
        </>
      )}

      {buttonContent}
    </Link>
  );
}
