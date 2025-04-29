"use client";

import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface GlassMorphicCardProps {
  children: ReactNode;
  intensity?: "light" | "medium" | "strong";
  className?: string;
  hoverEffect?: boolean;
  animateOnScroll?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  customAnimation?: MotionProps;
  delayAnimation?: number;
}

export default function GlassMorphicCard({
  children,
  intensity = "medium",
  className = "",
  hoverEffect = true,
  animateOnScroll = true,
  onClick,
  backgroundColor,
  borderColor,
  customAnimation,
  delayAnimation = 0,
}: GlassMorphicCardProps) {
  // Intensity presets with improved shadows and opacities
  const intensityMap = {
    light: {
      blur: "5px",
      opacity: "0.92",
      shadow: "0 4px 20px rgba(126, 85, 57, 0.07)",
    },
    medium: {
      blur: "10px",
      opacity: "0.87",
      shadow: "0 8px 32px rgba(126, 85, 57, 0.1)",
    },
    strong: {
      blur: "15px",
      opacity: "0.82",
      shadow: "0 12px 48px rgba(126, 85, 57, 0.15)",
    },
  };

  const settings = intensityMap[intensity];

  // Default animation variants
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0],
        delay: delayAnimation,
      },
    },
  };

  // Hover animation
  const hoverAnimation = hoverEffect
    ? {
        y: -8,
        boxShadow: settings.shadow.replace("0.1", "0.15"),
        transition: { duration: 0.3, ease: "easeOut" },
      }
    : undefined;

  // Base style for the card
  const cardStyle = {
    backgroundColor:
      backgroundColor || `rgba(237, 224, 212, ${settings.opacity})`,
    backdropFilter: `blur(${settings.blur})`,
    WebkitBackdropFilter: `blur(${settings.blur})`,
    border: borderColor
      ? `1px solid ${borderColor}`
      : "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: settings.shadow,
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
  };

  // Combine props with defaults
  const motionProps: MotionProps = {
    ...(animateOnScroll && {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-50px" },
      variants: defaultVariants,
    }),
    whileHover: hoverAnimation,
    ...(customAnimation || {}),
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${className}`}
      style={cardStyle}
      {...motionProps}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
