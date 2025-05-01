"use client";

import { useState, useEffect, RefObject } from "react";

interface AnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animateWhenVisible?: boolean;
  animationDelay?: number;
}

/**
 * A custom hook for scroll-triggered animations
 *
 * @param ref - The reference to the element that will be animated on scroll
 * @param options - Configuration options for the scroll-triggered animation
 * @returns Boolean indicating whether the element is visible in the viewport
 */
export default function useAnimateOnScroll(
  ref: RefObject<HTMLElement>,
  options: AnimateOnScrollOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    animateWhenVisible = true,
    animationDelay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current;

    // Initialize intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // If element is visible
        if (entry.isIntersecting) {
          // Apply animation after delay if configured
          if (animateWhenVisible && !hasAnimated) {
            if (animationDelay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                setHasAnimated(true);
              }, animationDelay);
            } else {
              setIsVisible(true);
              setHasAnimated(true);
            }
          } else {
            setIsVisible(true);
          }

          // Unobserve if we only need to trigger once
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          // If element is not visible and we're not in triggerOnce mode
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    // Start observing
    observer.observe(currentRef);

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    ref,
    threshold,
    rootMargin,
    triggerOnce,
    animateWhenVisible,
    animationDelay,
    hasAnimated,
  ]);

  return isVisible;
}
