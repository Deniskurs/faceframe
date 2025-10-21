"use client";

/**
 * @file Luxury Shadcn Button Component
 * A wrapper around shadcn's Button component with FaceFrame's CHANEL-inspired luxury styling
 */

import React, { useState, useEffect } from "react";
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
    dark: "bg-elegant-mocha text-white border border-elegant-mocha shadow-sm hover:bg-deep-bronze hover:border-deep-bronze",
    light:
      "bg-light-cream text-elegant-mocha border-2 border-elegant-mocha/40 shadow-sm hover:bg-elegant-mocha hover:text-white",
    transparent:
      "bg-white/75 text-elegant-mocha border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:bg-white/85 hover:border-white/95 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
  },
  outline: {
    dark: "border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
    light:
      "border border-elegant-mocha/30 text-elegant-mocha hover:bg-elegant-mocha hover:text-white",
    transparent: "border-2 border-white/80 text-white bg-black/40 hover:bg-white/15 hover:border-white/95",
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
  small: "py-3 px-6 text-xs sm:py-3 sm:px-8",
  medium: "py-3 px-6 text-xs sm:py-4 sm:px-10 sm:text-sm",
  large: "py-4 px-8 text-sm sm:py-5 sm:px-12 sm:text-base",
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
  enableMobilePatternInterrupt?: boolean;
  isLoading?: boolean;
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
  enableMobilePatternInterrupt = false,
  isLoading = false,
  ...props
}: LuxuryShadcnButtonProps) {
  // Track hover state for enhanced animations
  const [isHovered, setIsHovered] = useState(false);
  const lineAnimation = useAnimation();

  // Mobile pattern interrupt state
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const glowAnimation = useAnimation();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile pattern interrupt animation logic
  useEffect(() => {
    if (!enableMobilePatternInterrupt || !isMobile || !isInView) {
      return;
    }

    const maxInitialCycles = 1;

    // Initial animation cycles when button enters view
    const runInitialCycles = async () => {
      for (let i = 0; i < maxInitialCycles; i++) {
        await glowAnimation.start({
          opacity: [0.2, 0.8, 0.2],
          transition: {
            duration: 2.8,
            ease: LUXURY_EASING,
          },
        });
      }
    };

    runInitialCycles();

    // Periodic animation every 8 seconds after initial cycles
    const periodicInterval = setInterval(() => {
      glowAnimation.start({
        opacity: [0.2, 0.8, 0.2],
        transition: {
          duration: 2.8,
          ease: LUXURY_EASING,
        },
      });
    }, 8000);

    return () => clearInterval(periodicInterval);
  }, [enableMobilePatternInterrupt, isMobile, isInView, glowAnimation]);

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
    "font-alta tracking-[0.25em] uppercase relative overflow-hidden group whitespace-nowrap inline-flex items-center justify-center transition-all duration-700 ease-luxury",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-bronze/50 focus-visible:outline-none",
    "active:scale-[0.98] active:shadow-[0_4px_15px_rgba(0,0,0,0.25)]",
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
        className="relative z-20 flex items-center justify-center gap-2"
        animate={{
          letterSpacing: isHovered ? "0.28em" : "0.25em",
        }}
        transition={{ duration: 0.8, ease: LUXURY_EASING }}
      >
        {isLoading && (
          <motion.span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        <LuxuryTextBackdrop
          intensity={luxuryTheme === "dark" ? "light" : "medium"}
          isHeading={false}
        >
          {isLoading ? "PROCESSING..." : text}
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
      <div className="absolute top-0 left-0 w-[0.25px] h-0 bg-deep-bronze/40 group-hover:h-[8px] transition-all duration-700 ease-luxury z-30"></div>
      <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze/40 group-hover:w-[8px] transition-all duration-700 ease-luxury z-30"></div>
      <div className="absolute bottom-0 right-0 w-[0.25px] h-0 bg-deep-bronze/40 group-hover:h-[8px] transition-all duration-700 ease-luxury z-30"></div>
      <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze/40 group-hover:w-[8px] transition-all duration-700 ease-luxury z-30"></div>

      {/* Bottom accent line animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-deep-bronze/50 z-30"
        style={{ width: "0%" }}
        animate={lineAnimation}
      />
    </>
  );

  // Render the button wrapped with optional glow effect
  const buttonElement = href ? (
    <motion.div
      variants={buttonMotionVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="inline-block relative"
    >
      <Link
        href={href}
        className={luxuryClasses}
        onClick={(e) => {
          if (isLoading) e.preventDefault();
        }}
        aria-disabled={isLoading}
      >
        {content}
      </Link>
    </motion.div>
  ) : (
    <motion.div
      variants={buttonMotionVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="inline-block relative"
    >
      <Button className={luxuryClasses} asChild={asChild} disabled={isLoading} {...props}>
        {content}
      </Button>
    </motion.div>
  );

  // Always render with wrapper to prevent hydration mismatch
  // Control glow visibility via CSS and animation state
  return (
    <motion.div
      className="relative inline-block"
      onViewportEnter={
        enableMobilePatternInterrupt ? () => setIsInView(true) : undefined
      }
      onViewportLeave={
        enableMobilePatternInterrupt ? () => setIsInView(false) : undefined
      }
      viewport={enableMobilePatternInterrupt ? { once: false, amount: 0.5 } : undefined}
      suppressHydrationWarning
    >
      {/* Mobile Pattern Interrupt - Border Glow Pulse */}
      {/* Hidden on desktop (md:hidden) or when not enabled */}
      <motion.div
        className={`absolute inset-0 pointer-events-none rounded-lg ${
          enableMobilePatternInterrupt ? "md:hidden" : "hidden"
        }`}
        style={{
          boxShadow: `
            0 0 30px 6px ${
              luxuryTheme === "light"
                ? "rgba(155, 118, 83, 0.7)" // deep-bronze
                : "rgba(234, 172, 139, 0.7)" // soft-blush
            },
            0 0 50px 10px ${
              luxuryTheme === "light"
                ? "rgba(155, 118, 83, 0.4)" // deep-bronze
                : "rgba(234, 172, 139, 0.4)" // soft-blush
            }
          `,
        }}
        initial={{ opacity: 0 }}
        animate={glowAnimation}
      />
      {buttonElement}
    </motion.div>
  );
}
