"use client";

import { useState, useEffect } from "react";

export interface TextAnimationOptions {
  type?: "fade" | "typing" | "character" | "word";
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  loop?: boolean;
  pauseTime?: number;
  ease?: number[] | string;
}

/**
 * Hook for creating sophisticated text animations configurations
 * that can be used with Framer Motion in components
 *
 * @param text - The text to animate
 * @param options - Animation options
 * @returns Animation configurations and state
 */
export default function useTextAnimation(
  text: string,
  options: TextAnimationOptions = {}
) {
  const {
    type = "character",
    delay = 0,
    duration = 0.5,
    staggerDelay = 0.03,
    loop = false,
    pauseTime = 3000,
  } = options;

  const [startAnimation, setStartAnimation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // Initial delay before starting animation
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (loop && isComplete) {
      const restartTimer = setTimeout(() => {
        setIsComplete(false);
        setStartAnimation(false);

        // Brief delay before restarting
        setTimeout(() => {
          setStartAnimation(true);
        }, 300);
      }, pauseTime);

      return () => clearTimeout(restartTimer);
    }
  }, [isComplete, loop, pauseTime]);

  // Handle typing animation
  useEffect(() => {
    if (type !== "typing" || !startAnimation) {
      return;
    }

    let currentIndex = 0;
    const typing = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typing);
        setIsComplete(true);
      }
    }, staggerDelay * 1000);

    return () => clearInterval(typing);
  }, [startAnimation, text, staggerDelay, type]);

  const handleAnimationComplete = () => {
    setIsComplete(true);
  };

  // Character-by-character animation config
  const getCharacterAnimation = () => {
    const letters = Array.from(text);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    };

    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };

    return {
      containerVariants,
      childVariants,
      letters,
      isAnimating: startAnimation,
      onAnimationComplete: handleAnimationComplete,
    };
  };

  // Word-by-word animation config
  const getWordAnimation = () => {
    const words = text.split(" ");

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay * 10,
          delayChildren: delay,
        },
      },
    };

    const childVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };

    return {
      containerVariants,
      childVariants,
      words,
      isAnimating: startAnimation,
      onAnimationComplete: handleAnimationComplete,
    };
  };

  // Typing animation config
  const getTypingAnimation = () => {
    const cursorAnimation = {
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 0.8,
      },
    };

    return {
      displayText,
      cursorAnimation,
      fadeInTransition: { duration },
      isAnimating: startAnimation,
    };
  };

  // Simple fade animation config
  const getFadeAnimation = () => {
    const variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
        },
      },
    };

    return {
      variants,
      isAnimating: startAnimation,
      onAnimationComplete: handleAnimationComplete,
    };
  };

  // Return the appropriate animation config based on type
  const getAnimationConfig = () => {
    switch (type) {
      case "character":
        return getCharacterAnimation();
      case "word":
        return getWordAnimation();
      case "typing":
        return getTypingAnimation();
      case "fade":
      default:
        return getFadeAnimation();
    }
  };

  return {
    ...getAnimationConfig(),
    animationType: type,
    isComplete,
    startAnimation,
    text,
  };
}
