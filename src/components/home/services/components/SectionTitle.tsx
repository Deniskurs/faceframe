import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../core/types";

export interface SectionTitleProps {
  title?: string;
  subtitle?: string;
  isRevealed?: boolean;
  align?: "center" | "left";
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Premium Section Title Component
 * A Chanel/Dior-inspired luxury section title with precise animations and sophisticated design
 */
export function SectionTitle({ 
  title = "Services", 
  subtitle = "The Experience",
  isRevealed = true, 
  align = "center",
  variant = "dark",
  className = ""
}: SectionTitleProps) {
  // Color schemes based on variant
  const colorScheme = {
    dark: {
      title: "text-elegant-mocha",
      subtitle: "text-deep-bronze/80",
      line: "bg-elegant-mocha/25",
      sideLine: "bg-elegant-mocha/10"
    },
    light: {
      title: "text-white",
      subtitle: "text-white/80",
      line: "bg-white/25",
      sideLine: "bg-white/15"
    }
  };

  // Text alignment
  const alignmentClasses = {
    center: "text-center mx-auto items-center",
    left: "text-left items-start"
  };

  return (
    <div className={`mb-16 md:mb-20 lg:mb-24 relative ${className}`}>
      {/* Luxury section title - Chanel/Dior inspired */}
      <div className={`flex flex-col ${alignmentClasses[align]}`}>
        {/* Elegant subtitle with perfect letter spacing */}
        <motion.div
          className="overflow-hidden relative mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{
            duration: 1.1,
            ease: LUXURY_EASING,
            delay: 0.2,
          }}
        >
          <motion.h3
            className={`font-alta text-sm tracking-[0.35em] ${colorScheme[variant].subtitle} uppercase`}
            initial={{ y: 20 }}
            animate={{ y: isRevealed ? 0 : 20 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.15,
            }}
          >
            {subtitle}
          </motion.h3>
        </motion.div>

        {/* Minimalist header with precise letter spacing and timing */}
        <motion.div
          className="overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{
            duration: 1.4,
            ease: LUXURY_EASING,
            delay: 0.3,
          }}
        >
          <motion.h2
            className={`font-alice ${colorScheme[variant].title} text-3xl sm:text-4xl lg:text-[2.75rem] tracking-[0.28em] uppercase font-[350]`}
            initial={{ y: 50 }}
            animate={{ y: isRevealed ? 0 : 50 }}
            transition={{
              duration: 1.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Ultra-minimal line separator - mathematically positioned */}
        <motion.div
          className={`h-[0.25px] ${colorScheme[variant].line} mt-6 md:mt-8`}
          initial={{ width: 0 }}
          animate={{ width: isRevealed ? 64 : 0 }}
          transition={{
            duration: 1.2,
            ease: LUXURY_EASING,
            delay: 0.7,
          }}
        />
      </div>

      {/* Subtle absolute positioning for luxury feel - visible on all devices */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 left-0 w-12 sm:w-16 h-[0.25px] ${colorScheme[variant].sideLine}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isRevealed ? 1 : 0 }}
        style={{ transformOrigin: "left" }}
        transition={{
          duration: 1.2,
          ease: LUXURY_EASING,
          delay: 1,
        }}
      />

      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 right-0 w-12 sm:w-16 h-[0.25px] ${colorScheme[variant].sideLine}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isRevealed ? 1 : 0 }}
        style={{ transformOrigin: "right" }}
        transition={{
          duration: 1.2,
          ease: LUXURY_EASING,
          delay: 1,
        }}
      />
    </div>
  );
}
