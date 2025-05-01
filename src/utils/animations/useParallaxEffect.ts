"use client";

import { useState, useEffect, RefObject } from "react";

interface ParallaxOptions {
  intensity?: number;
  reverse?: boolean;
  easing?: string;
  scale?: boolean;
  transitionDuration?: number;
}

/**
 * A custom hook for creating parallax effects on mouse movement
 * @param ref - The reference to the element that will have the parallax effect
 * @param options - Configuration options for the parallax effect
 * @returns Object containing methods and state for the parallax effect
 */
export default function useParallaxEffect(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const {
    intensity = 15,
    reverse = false,
    easing = "cubic-bezier(0.33, 1, 0.68, 1)",
    scale = true,
    transitionDuration = 0.6,
  } = options;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse movement to calculate parallax effect
  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate position values between -0.5 and 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setPosition({ x, y });
  };

  // Reset position when mouse leaves
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Set hovered state when mouse enters
  const setHovered = () => {
    setIsHovered(true);
  };

  // Apply the transform effect
  useEffect(() => {
    if (!ref.current) return;

    // Store a reference to the element to prevent stale closures in cleanup
    const element = ref.current;
    const { x, y } = position;
    const directionFactor = reverse ? 1 : -1;

    // Calculate the transform value
    let transform = `translate(${x * intensity * directionFactor}px, ${
      y * intensity * directionFactor
    }px)`;

    // Add scale effect if enabled
    if (scale) {
      transform = `${transform} scale(${isHovered ? 1.05 : 1})`;
    }

    // Apply the transform with proper transition
    element.style.transform = transform;
    element.style.transition = `transform ${transitionDuration}s ${easing}`;

    return () => {
      // Use the stored element reference in the cleanup function
      element.style.transform = "";
      element.style.transition = "";
    };
  }, [
    position,
    intensity,
    reverse,
    easing,
    scale,
    isHovered,
    transitionDuration,
    ref, // Add ref to dependencies
  ]);

  return {
    handleMouseMove,
    resetPosition,
    setHovered,
    position,
    isHovered,
  };
}
