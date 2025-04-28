"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export default function ParallaxContainer({
  children,
  speed = 0.2,
  direction = "up",
  className = "",
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Determine the direction of parallax effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [`${speed * 100}%`, "0%"] : ["0%", `${speed * 100}%`]
  );

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
