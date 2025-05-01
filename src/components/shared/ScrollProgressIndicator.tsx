"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressIndicatorProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  zIndex?: number;
}

/**
 * A component that displays a progress indicator based on page scroll position
 */
const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  color = "#7F5539",
  height = 3,
  position = "top",
  zIndex = 50,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Use spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show indicator only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 origin-left"
      style={{
        top: position === "top" ? 0 : "auto",
        bottom: position === "bottom" ? 0 : "auto",
        height,
        background: color,
        scaleX,
        opacity: isVisible ? 1 : 0,
        zIndex,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default ScrollProgressIndicator;
