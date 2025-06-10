"use client";

/**
 * @file Luxury Shadcn Button Component
 * A wrapper around shadcn's Button component with FaceFrame's CHANEL-inspired luxury styling
 */

import React, { useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { cn } from "@/lib/utils";
import LuxuryTextBackdrop from "@/components/shared/LuxuryTextBackdrop";
import { type VariantProps } from "class-variance-authority";

// Custom LUXURY variants to override shadcn defaults
const LUXURY_VARIANTS = {
  elegant: {
    dark: "bg-elegant-mocha text-white border border-elegant-mocha shadow-sm",
    light:
      "bg-light-cream text-elegant-mocha border-2 border-elegant-mocha/40 shadow-sm",
    transparent:
      "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20",
  },
  outline: {
    dark: "border border-white/30 text-white hover:bg-white/10",
    light:
      "border border-elegant-mocha/20 text-elegant-mocha/90 hover:text-elegant-mocha",
    transparent: "border border-white/20 text-white/90 hover:bg-white/5",
  },
  text: {
    dark: "text-white hover:text-white/80 border-b border-white/30 hover:border-white",
    light:
      "text-elegant-mocha hover:text-deep-bronze border-b border-elegant-mocha/30 hover:border-deep-bronze",
    transparent:
      "text-white hover:text-white/80 border-b border-white/30 hover:border-white",
  },
};

// Custom size classes with Alta font and tracking
const LUXURY_SIZES = {
  small: "py-3 px-6 text-xs sm:py-3 sm:px-9",
  medium: "py-4 px-8 text-[11px] sm:py-4 sm:px-12 sm:text-sm",
  large: "py-4 px-8 text-[11px] sm:py-5 sm:px-16 sm:text-base",
};

export interface LuxuryShadcnButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  href?: string;
  text: string;
  luxuryVariant?: keyof typeof LUXURY_VARIANTS;
  luxuryTheme?: keyof typeof LUXURY_VARIANTS.elegant;
  luxurySize?: keyof typeof LUXURY_SIZES;
  className?: string;
  asChild?: boolean;
}

/**
 * LuxuryShadcnButton - Combines shadcn's Button with FaceFrame's CHANEL-inspired styling
 */
export function LuxuryShadcnButton({
  href,
  text,
  luxuryVariant = "elegant",
  luxuryTheme = "light",
  luxurySize = "medium",
  className = "",
  asChild = false,
  ...props
}: LuxuryShadcnButtonProps) {
  // Track hover state for enhanced animations
  const [isHovered, setIsHovered] = useState(false);
  const lineAnimation = useAnimation();

  // Animate the line on hover
  const handleHoverStart = () => {
    setIsHovered(true);
    lineAnimation.start({
      width: "100%",
      transition: { duration: 0.7, ease: LUXURY_EASING },
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    lineAnimation.start({
      width: "0%",
      transition: { duration: 0.5, ease: LUXURY_EASING },
    });
  };

  // Combined classes with luxury styling
  const luxuryClasses = cn(
    LUXURY_VARIANTS[luxuryVariant][luxuryTheme],
    LUXURY_SIZES[luxurySize],
    "font-alta tracking-[0.3em] uppercase relative overflow-hidden group whitespace-nowrap",
    className
  );

  // Animation variants for hover effect
  const buttonMotionVariants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -3,
      scale: 1.01,
      transition: {
        y: { duration: 0.5, ease: LUXURY_EASING },
        scale: { duration: 0.7, ease: LUXURY_EASING },
      },
    },
  };

  // If href is provided, render as Link, otherwise as Button
  const content = (
    <>
      {/* Text with luxury backdrop for improved readability */}
      <motion.span
        className="relative z-20"
        animate={{
          letterSpacing: isHovered ? "0.32em" : "0.3em",
        }}
        transition={{ duration: 0.8, ease: LUXURY_EASING }}
      >
        <LuxuryTextBackdrop
          intensity={luxuryTheme === "dark" ? "light" : "medium"}
          isHeading={false}
        >
          {text}
        </LuxuryTextBackdrop>
      </motion.span>

      {/* Elegant hover effect with refined animation */}
      <motion.div
        className="absolute inset-0 bg-black/0 z-10"
        animate={{
          backgroundColor: isHovered
            ? luxuryTheme === "dark"
              ? "rgba(0,0,0,0.15)"
              : "rgba(0,0,0,0.05)"
            : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.7, ease: LUXURY_EASING }}
      />

      {/* CHANEL-inspired corner accents */}
      <div className="absolute top-0 left-0 w-[0.25px] h-0 bg-deep-bronze/40 group-hover:h-[8px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30"></div>
      <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze/40 group-hover:w-[8px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30"></div>
      <div className="absolute bottom-0 right-0 w-[0.25px] h-0 bg-deep-bronze/40 group-hover:h-[8px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30"></div>
      <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze/40 group-hover:w-[8px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30"></div>

      {/* Bottom accent line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-deep-bronze/50 z-30"
        style={{ width: "0%" }}
        animate={lineAnimation}
      />
    </>
  );

  if (href) {
    return (
      <motion.div
        variants={buttonMotionVariants}
        initial="initial"
        whileHover="hover"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="inline-block"
      >
        <Link href={href} className={luxuryClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={buttonMotionVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="inline-block"
    >
      <Button className={luxuryClasses} asChild={asChild} {...props}>
        {content}
      </Button>
    </motion.div>
  );
}
