"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  distance?: number;
}

export default function FadeInSection({
  children,
  delay = 0,
  threshold = 0.1,
  direction = "up",
  className = "",
  distance = 20,
}: FadeInSectionProps) {
  // Calculate the transform value based on direction
  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  // Define the animation variants
  const variants = {
    hidden: {
      opacity: 0,
      transform: getTransform(),
    },
    visible: {
      opacity: 1,
      transform: "translate(0, 0)",
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth, luxurious animations
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
