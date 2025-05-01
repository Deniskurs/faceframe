"use client";

import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

// CHANEL-inspired luxury easing curve
const LUXURY_EASING = [0.19, 1, 0.22, 1];

interface GlassMorphicCardProps {
  children: ReactNode;
  intensity?: "ultra-light" | "light" | "medium" | "strong";
  className?: string;
  hoverEffect?: boolean;
  animateOnScroll?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  customAnimation?: MotionProps;
  delayAnimation?: number;
  decorativeElement?: "corner-line" | "thin-border" | "none";
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
  decorativeElement = "none",
}: GlassMorphicCardProps) {
  // Ultra-refined intensity presets with CHANEL-inspired subtlety
  const intensityMap = {
    "ultra-light": {
      blur: "2px",
      opacity: "0.98",
      shadow: "0 1px 2px rgba(126, 85, 57, 0.02)",
      border: "rgba(126, 85, 57, 0.03)",
    },
    light: {
      blur: "4px",
      opacity: "0.97",
      shadow: "0 1px 3px rgba(126, 85, 57, 0.03)",
      border: "rgba(126, 85, 57, 0.04)",
    },
    medium: {
      blur: "6px",
      opacity: "0.95",
      shadow: "0 1px 4px rgba(126, 85, 57, 0.04)",
      border: "rgba(126, 85, 57, 0.06)",
    },
    strong: {
      blur: "8px",
      opacity: "0.92",
      shadow: "0 2px 6px rgba(126, 85, 57, 0.05)",
      border: "rgba(126, 85, 57, 0.08)",
    },
  };

  const settings = intensityMap[intensity];

  // CHANEL-inspired animation variants with refined timing
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: LUXURY_EASING,
        delay: delayAnimation,
      },
    },
  };

  // More subtle, refined hover animation
  const hoverAnimation = hoverEffect
    ? {
        y: -5,
        boxShadow: settings.shadow.replace(
          /rgba\(126, 85, 57, ([\d.]+)\)/,
          (_, opacity) => `rgba(126, 85, 57, ${parseFloat(opacity) * 1.5})`
        ),
        transition: { duration: 0.7, ease: LUXURY_EASING },
      }
    : undefined;

  // Base style for the card with more refined defaults
  const cardStyle = {
    backgroundColor:
      backgroundColor || `rgba(237, 224, 212, ${settings.opacity})`,
    backdropFilter: `blur(${settings.blur})`,
    WebkitBackdropFilter: `blur(${settings.blur})`,
    border: borderColor
      ? `1px solid ${borderColor}`
      : `1px solid rgba(255, 255, 255, 0.12)`,
    boxShadow: settings.shadow,
    transition: `all 0.7s cubic-bezier(${LUXURY_EASING.join(",")})`,
    position: "relative" as const, // For decorative elements
  };

  // Combine props with defaults
  const motionProps: MotionProps = {
    ...(animateOnScroll && {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-30px" },
      variants: defaultVariants,
    }),
    whileHover: hoverAnimation,
    ...(customAnimation || {}),
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={cardStyle}
      {...motionProps}
      onClick={onClick}
    >
      {/* Optional CHANEL-inspired decorative elements */}
      {decorativeElement === "corner-line" && (
        <>
          <div className="absolute top-0 left-0 w-6 h-[1px] bg-soft-blush/40"></div>
          <div className="absolute top-0 left-0 w-[1px] h-6 bg-soft-blush/40"></div>
          <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-soft-blush/40"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-soft-blush/40"></div>
        </>
      )}

      {decorativeElement === "thin-border" && (
        <div className="absolute inset-[3px] border border-soft-blush/20 pointer-events-none"></div>
      )}

      {children}
    </motion.div>
  );
}
