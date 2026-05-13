"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

export interface PageHeroProps {
  title: string;
  description?: string;
  label?: string;
  height?: "minimal" | "functional" | "showcase";
  backgroundGradient?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Unified Page Hero Component
 * Light, clean, functional hero system for consistent experience across all pages
 * Crossbreed between FAQ and Contact hero styles
 */
export function PageHero({
  title,
  description,
  label,
  height = "functional",
  backgroundGradient,
  children,
  className = "",
}: PageHeroProps) {
  // Height configurations
  const heightClasses = {
    minimal: "min-h-[25vh] sm:min-h-[30vh] py-12 sm:py-16",
    functional: "min-h-[35vh] sm:min-h-[40vh] md:min-h-[45vh] py-16 sm:py-20 md:py-24",
    showcase: "min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] py-20 sm:py-24 md:py-28",
  };

  // Default gradient backgrounds
  const defaultGradients = {
    minimal: "bg-gradient-to-b from-light-cream via-white to-soft-blush/5",
    functional: "bg-gradient-to-b from-soft-blush/10 via-white to-light-cream/5",
    showcase: "bg-gradient-to-b from-soft-blush/8 via-light-cream/15 to-white",
  };

  const bgGradient = backgroundGradient || defaultGradients[height];

  return (
    <section className={`relative ${bgGradient} ${heightClasses[height]} ${className}`}>
      {/* CHANEL Corner Accents - Top Left */}
      <motion.div
        className="absolute top-8 sm:top-12 left-8 sm:left-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-elegant-mocha/25"></div>
        <div className="w-[0.5px] h-12 bg-elegant-mocha/25"></div>
      </motion.div>

      {/* CHANEL Corner Accents - Bottom Right */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-elegant-mocha/25 ml-auto"></div>
        <div className="w-[0.5px] h-12 bg-elegant-mocha/25 ml-auto"></div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 sm:px-8 h-full flex items-center justify-center">
        <motion.div
          className="max-w-4xl mx-auto text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
        >
          {/* Optional Label */}
          {label && (
            <motion.p
              className="font-alta text-xs sm:text-sm tracking-[0.3em] uppercase text-elegant-mocha/75 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASING }}
            >
              {label}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            className="font-alice text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-elegant-mocha tracking-wide mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASING }}
          >
            {title}
          </motion.h1>

          {/* Separator Line */}
          <motion.div
            className="h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
          />

          {/* Description */}
          {description && (
            <motion.p
              className="font-alice text-base sm:text-lg md:text-xl text-elegant-mocha/80 leading-relaxed tracking-wide max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASING }}
            >
              {description}
            </motion.p>
          )}

          {/* Page-Specific Content Slot */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASING }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
