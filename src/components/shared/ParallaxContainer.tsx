"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  CSSProperties,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionStyle,
  useSpring,
} from "framer-motion";

// CHANEL-inspired luxury easing curve
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

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
  intensity?: "ultra-subtle" | "subtle" | "moderate" | "standard";
  springEffect?: boolean;
  offset?: ["start end", "end start"];
  perspective?: boolean | number;
}

export default function ParallaxContainer({
  children,
  speed,
  direction = "up",
  className = "",
  scale = false,
  rotation = 0,
  opacity = false,
  style = {},
  overflow = "hidden",
  responsive = true,
  intensity = "subtle",
  springEffect = false,
  offset = ["start end", "end start"],
  perspective = false,
}: ParallaxContainerProps) {
  // Refined intensity levels for more subtle, CHANEL-like animations
  const intensityMap = {
    "ultra-subtle": 0.05,
    subtle: 0.1,
    moderate: 0.15,
    standard: 0.2,
  };

  // Use the specified speed or the intensity-based speed
  const effectiveSpeed = speed ?? intensityMap[intensity];

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

  // Define scroll progress with custom offset
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Fix for conditional hook warning - always call hooks, but only use the result when needed
  const springY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const effectiveScrollY = springEffect ? springY : scrollYProgress;

  // Pre-define all transforms with fixed easing
  const yUp = useTransform(
    effectiveScrollY,
    [0, 1],
    [`${effectiveSpeed * 100}%`, "0%"]
  );

  const yDown = useTransform(
    effectiveScrollY,
    [0, 1],
    ["0%", `${effectiveSpeed * 100}%`]
  );

  const xLeft = useTransform(
    effectiveScrollY,
    [0, 1],
    [`${effectiveSpeed * 100}%`, "0%"]
  );

  const xRight = useTransform(
    effectiveScrollY,
    [0, 1],
    ["0%", `${effectiveSpeed * 100}%`]
  );

  // More refined scale, rotation and opacity transforms
  const scaleValue = useTransform(
    effectiveScrollY,
    [0, 1],
    [typeof scale === "number" ? 1 - scale * 0.5 : 0.95, 1] // More subtle scaling
  );

  const rotateValue = useTransform(effectiveScrollY, [0, 1], [0, rotation]);

  const [opacityStart, opacityEnd] = Array.isArray(opacity)
    ? opacity
    : [0.7, 1]; // More subtle opacity change

  const opacityValue = useTransform(
    effectiveScrollY,
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

    // Apply perspective if needed (CHANEL-inspired 3D effect)
    if (perspective !== false) {
      const perspectiveValue =
        typeof perspective === "number" ? perspective : 1000;
      motionStyle.perspective = perspectiveValue;
      // Apply transform style using a more specific type
      (motionStyle as Record<string, string | number>).transformStyle =
        "preserve-3d";
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
      <motion.div
        style={motionStyle}
        className="w-full h-full transition-all duration-700"
        transition={{ duration: 0.7, ease: LUXURY_EASING }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
