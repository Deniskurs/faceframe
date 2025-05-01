"use client";

import { useState, useEffect } from "react";

interface CursorEffectOptions {
  showOnMobile?: boolean;
  size?: number;
  borderWidth?: number;
  color?: string;
  backgroundColor?: string;
  mixBlendMode?: string;
  springMass?: number;
  springStiffness?: number;
  springDamping?: number;
  ringScale?: number;
  hideNativeCursor?: boolean;
}

/**
 * A hook for creating a custom cursor effect
 *
 * @param options - Configuration options for the cursor effect
 * @returns Object containing cursor position and state
 */
export default function useCursorEffect(options: CursorEffectOptions = {}) {
  const {
    showOnMobile = false,
    size = 32,
    borderWidth = 1,
    color = "#7F5539",
    backgroundColor = "rgba(127, 85, 57, 0.1)",
    mixBlendMode = "normal",
    springMass = 0.5,
    springStiffness = 400,
    springDamping = 28,
    ringScale = 1.5,
    hideNativeCursor = true,
  } = options;

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Detect if on mobile device
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isMobileViewport = window.innerWidth < 1024;

      setIsMobile(isTouchDevice || isMobileViewport);

      // Should only render if not mobile or explicitly enabled for mobile
      setShouldRender(!isMobile || showOnMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [showOnMobile, isMobile]);

  useEffect(() => {
    if (!shouldRender) return;

    // If hiding native cursor, apply to document
    if (hideNativeCursor) {
      document.documentElement.style.cursor = "none";
    }

    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [shouldRender, hideNativeCursor]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Explicitly return a boolean value
      const isInteractive: boolean =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        !!target.closest("button") ||
        !!target.closest("a") ||
        target.dataset.cursorHover === "true";

      setIsHovering(isInteractive);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [shouldRender]);

  // Calculate cursor styles and animations
  const getCursorStyles = () => {
    // Base size calculations
    const baseSize = size;
    const hoverSize = baseSize * ringScale;
    const activeSize = baseSize * 0.9;

    // Current size based on state
    const currentSize = isClicking
      ? activeSize
      : isHovering
      ? hoverSize
      : baseSize;

    // Spring configuration for smooth movement
    const springConfig = {
      mass: springMass,
      stiffness: springStiffness,
      damping: springDamping,
    };

    return {
      // Position and size
      x: position.x,
      y: position.y,
      size: currentSize,

      // Appearance
      backgroundColor: isHovering ? "transparent" : backgroundColor,
      borderColor: color,
      borderWidth,
      mixBlendMode,

      // Animation config
      springConfig,
      opacity: visible ? 1 : 0,

      // States
      isHovering,
      isClicking,
    };
  };

  return {
    cursorStyles: getCursorStyles(),
    visible,
    shouldRender,
    isHovering,
    isClicking,
  };
}
