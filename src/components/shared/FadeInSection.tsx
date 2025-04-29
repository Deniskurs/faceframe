"use client";

import React, { ReactNode } from "react";
import { motion, Variant, Variants } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number;
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  onAnimationComplete?: () => void;
  once?: boolean;
}

export default function FadeInSection({
  children,
  delay = 0,
  threshold = 0.1,
  direction = "up",
  className = "",
  distance = 20,
  duration = 0.8,
  staggerChildren = false,
  staggerDelay = 0.1,
  onAnimationComplete,
  once = true,
}: FadeInSectionProps) {
  // Get transform property based on direction
  const getTransformValue = (): Variant => {
    if (direction === "none") {
      return { opacity: 0 };
    }

    let transform = {};

    switch (direction) {
      case "up":
        transform = { y: distance };
        break;
      case "down":
        transform = { y: -distance };
        break;
      case "left":
        transform = { x: distance };
        break;
      case "right":
        transform = { x: -distance };
        break;
    }

    return {
      opacity: 0,
      ...transform,
    };
  };

  const containerVariants: Variants = {
    hidden: getTransformValue(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.19, 1.0, 0.22, 1.0], // Luxury easing curve
        delay,
        ...(staggerChildren && {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        }),
      },
    },
  };

  const childVariants: Variants = {
    hidden: getTransformValue(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      onAnimationComplete={onAnimationComplete}
    >
      {staggerChildren &&
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="overflow-visible"
          >
            {child}
          </motion.div>
        ))}

      {!staggerChildren && children}
    </motion.div>
  );
}
