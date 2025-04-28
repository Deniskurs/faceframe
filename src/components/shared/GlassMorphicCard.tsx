"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassMorphicCardProps {
  children: ReactNode;
  intensity?: "light" | "medium" | "strong";
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassMorphicCard({
  children,
  intensity = "medium",
  className = "",
  hoverEffect = true,
}: GlassMorphicCardProps) {
  // Intensity presets
  const intensityMap = {
    light: {
      blur: "5px",
      opacity: "0.9",
      shadow: "0 4px 20px rgba(126, 85, 57, 0.07)",
    },
    medium: {
      blur: "10px",
      opacity: "0.85",
      shadow: "0 8px 32px rgba(126, 85, 57, 0.1)",
    },
    strong: {
      blur: "15px",
      opacity: "0.8",
      shadow: "0 12px 48px rgba(126, 85, 57, 0.15)",
    },
  };

  const settings = intensityMap[intensity];

  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
      style={{
        background: `rgba(237, 224, 212, ${settings.opacity})`,
        backdropFilter: `blur(${settings.blur})`,
        WebkitBackdropFilter: `blur(${settings.blur})`,
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: settings.shadow,
      }}
    >
      {children}
    </motion.div>
  );
}
