"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  CSSProperties,
} from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  scale?: boolean | number;
  rotation?: number;
  opacity?: boolean | [number, number];
  style?: CSSProperties;
  overflow?: "visible" | "hidden" | "clip";
  responsive?: boolean;
}

export default function ParallaxContainer({
  children,
  speed = 0.2,
  direction = "up",
  className = "",
  scale = false,
  rotation = 0,
  opacity = false,
  style = {},
  overflow = "hidden",
  responsive = true,
}: ParallaxContainerProps) {
  // State to track if we should disable effects (on mobile)
  const [disableEffects, setDisableEffects] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    if (!responsive) return;

    // Function to check window size and disable effects on mobile
    const checkMobileView = () => {
      setDisableEffects(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView);
  }, [responsive]);
  const ref = useRef<HTMLDivElement>(null);

  // Define scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Pre-define all transforms to avoid conditional hook calls
  const yUp = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, "0%"]);
  const yDown = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${speed * 100}%`]
  );
  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, "0%"]
  );
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${speed * 100}%`]
  );

  // Scale, rotation and opacity transforms
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 1],
    [typeof scale === "number" ? 1 - scale : 0.9, 1]
  );

  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, rotation]);

  const [opacityStart, opacityEnd] = Array.isArray(opacity)
    ? opacity
    : [0.5, 1];
  const opacityValue = useTransform(
    scrollYProgress,
    [0, 1],
    [opacityStart, opacityEnd]
  );

  // Construct the style object - applying effects only if not disabled
  const motionStyle: MotionStyle = {};

  if (!disableEffects) {
    // Apply appropriate transformations based on direction
    if (direction === "up") {
      motionStyle.y = yUp;
    } else if (direction === "down") {
      motionStyle.y = yDown;
    } else if (direction === "left") {
      motionStyle.x = xLeft;
    } else if (direction === "right") {
      motionStyle.x = xRight;
    }

    // Apply scale if needed
    if (scale !== false) {
      motionStyle.scale = scaleValue;
    }

    // Apply rotation if needed
    if (rotation !== 0) {
      motionStyle.rotate = rotateValue;
    }

    // Apply opacity if needed
    if (opacity !== false) {
      motionStyle.opacity = opacityValue;
    }
  }

  // Define the overflow class based on the prop
  const overflowClass =
    overflow === "hidden"
      ? "overflow-hidden"
      : overflow === "visible"
      ? "overflow-visible"
      : "overflow-clip";

  return (
    <motion.div
      ref={ref}
      className={`relative ${overflowClass} ${className}`}
      style={style}
    >
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
