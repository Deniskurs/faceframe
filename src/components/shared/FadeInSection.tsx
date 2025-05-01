"use client";

import React, { ReactNode } from "react";
import { motion, Variant, Variants } from "framer-motion";

// CHANEL-inspired luxury easing curve
const LUXURY_EASING = [0.19, 1, 0.22, 1];

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  className?: string;
  distance?: number;
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  onAnimationComplete?: () => void;
  once?: boolean;
  intensity?: "subtle" | "moderate" | "standard";
  viewportMargin?: string;
}

export default function FadeInSection({
  children,
  delay = 0,
  threshold = 0.1,
  direction = "up",
  className = "",
  distance,
  duration,
  staggerChildren = false,
  staggerDelay = 0.08, // Slower, more elegant stagger
  onAnimationComplete,
  once = true,
  intensity = "moderate",
  viewportMargin = "-30px",
}: FadeInSectionProps) {
  // Map intensity to distances and durations for a more refined feel
  const intensityMap = {
    subtle: {
      distance: 10,
      duration: 0.9,
    },
    moderate: {
      distance: 15,
      duration: 0.7,
    },
    standard: {
      distance: 20,
      duration: 0.6,
    },
  };

  // Use the intensity values if specific values aren't provided
  const effectiveDistance = distance ?? intensityMap[intensity].distance;
  const effectiveDuration = duration ?? intensityMap[intensity].duration;

  // Get more refined transform property based on direction
  const getTransformValue = (): Variant => {
    // Initialize with a more complete type definition to avoid TypeScript errors
    const transform: {
      opacity: number;
      y?: number;
      x?: number;
      scale?: number;
    } = { opacity: 0 };

    switch (direction) {
      case "up":
        transform.y = effectiveDistance;
        break;
      case "down":
        transform.y = -effectiveDistance;
        break;
      case "left":
        transform.x = effectiveDistance;
        break;
      case "right":
        transform.x = -effectiveDistance;
        break;
      case "scale":
        transform.scale = 0.95;
        break;
      // "fade" is just opacity which is already included
    }

    return transform;
  };

  // CHANEL-inspired container animation variants
  const containerVariants: Variants = {
    hidden: getTransformValue(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: effectiveDuration,
        ease: LUXURY_EASING,
        delay,
        ...(staggerChildren && {
          staggerChildren: staggerDelay,
          delayChildren: delay,
          when: "beforeChildren",
        }),
      },
    },
  };

  // Refined child animation variants
  const childVariants: Variants = {
    hidden: getTransformValue(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: effectiveDuration * 0.9, // Slightly faster than container
        ease: LUXURY_EASING,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: viewportMargin }}
      variants={containerVariants}
      onAnimationComplete={onAnimationComplete}
    >
      {staggerChildren
        ? React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={childVariants}
              className="overflow-visible"
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
