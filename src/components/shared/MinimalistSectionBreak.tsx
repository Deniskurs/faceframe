"use client";

import React from "react";
import { motion } from "framer-motion";

interface MinimalistSectionBreakProps {
  variant?: "standard" | "enhanced" | "deluxe";
  hasTonalShift?: boolean;
  hasDecorativeElement?: boolean;
  hasSideElements?: boolean;
  hasGradientEdge?: boolean;
  className?: string;
}

/**
 * A Chanel/Dior-inspired minimalist section break component.
 * Uses sophisticated design principles from luxury fashion websites:
 * - Ultra-thin lines with mathematically precise spacing
 * - Subtle tonal shifts in background for depth
 * - Delicate, refined decorative elements inspired by high fashion
 * - Optional gradient-edge treatment for elevated visual appeal
 */
export default function MinimalistSectionBreak({
  variant = "standard",
  hasTonalShift = true,
  hasDecorativeElement = true,
  hasSideElements = false,
  hasGradientEdge = false,
  className = "",
}: MinimalistSectionBreakProps) {
  // Luxury motion timing
  const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

  // Determine height based on variant
  const heightClasses = {
    standard: "py-16 md:py-20",
    enhanced: "py-20 md:py-24",
    deluxe: "py-24 md:py-32",
  };

  // Determine width based on variant
  const lineWidths = {
    standard: "max-w-[120px] md:max-w-[160px]",
    enhanced: "max-w-[160px] md:max-w-[180px]",
    deluxe: "max-w-[180px] md:max-w-[220px]",
  };

  return (
    <div
      className={`w-full ${heightClasses[variant]} relative ${
        hasTonalShift ? "bg-elegant-mocha/[0.01]" : ""
      } ${className}`}
    >
      {/* Gradient edge treatment for premium look */}
      {hasGradientEdge && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/20 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/20 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Center alignment container with precise positioning */}
        <div className="relative h-[1px] flex items-center justify-center">
          {/* Primary separator line with golden ratio proportions - perfectly centered */}
          <motion.div 
            className={`${lineWidths[variant]} h-[0.25px] bg-elegant-mocha/15 absolute`}
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LUXURY_EASING }}
          ></motion.div>

          {/* Side elements for enhanced luxury appeal - mathematically positioned */}
          {hasSideElements && (
            <>
              <motion.div 
                className="absolute left-0 w-12 h-[0.25px] bg-elegant-mocha/10 hidden md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 1.1, ease: LUXURY_EASING, delay: 0.2 }}
              ></motion.div>
              
              <motion.div 
                className="absolute right-0 w-12 h-[0.25px] bg-elegant-mocha/10 hidden md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "right" }}
                transition={{ duration: 1.1, ease: LUXURY_EASING, delay: 0.2 }}
              ></motion.div>
            </>
          )}

          {/* Decorative center element - perfectly aligned with zero offset */}
          {hasDecorativeElement && variant === "standard" && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: LUXURY_EASING, delay: 0.1 }}
            >
              <div className="w-1.5 h-1.5 rotate-45 border border-elegant-mocha/15"></div>
            </motion.div>
          )}

          {/* Enhanced decorative element - precisely positioned */}
          {hasDecorativeElement && variant === "enhanced" && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: LUXURY_EASING, delay: 0.1 }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rotate-45 border border-elegant-mocha/15"></div>
                <div className="absolute inset-0 w-2 h-2 rotate-0 border border-elegant-mocha/10 scale-[0.6]"></div>
              </div>
            </motion.div>
          )}

          {/* Deluxe decorative element - mathematically centered */}
          {hasDecorativeElement && variant === "deluxe" && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: LUXURY_EASING, delay: 0.1 }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 border-[0.5px] border-elegant-mocha/10 rounded-full"></div>
                <div className="absolute w-2 h-2 border-[0.5px] border-elegant-mocha/15 rounded-full"></div>
                <div className="absolute w-[1px] h-[1px] bg-elegant-mocha/20"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
