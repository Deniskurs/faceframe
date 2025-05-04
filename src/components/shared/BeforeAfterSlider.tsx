"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  height?: number;
  showLabels?: boolean;
  className?: string;
  autoAnimateOnHover?: boolean;
  initialPosition?: number;
  labelStyle?: "minimal" | "standard" | "elegant";
  onSlideComplete?: (value: number) => void;
  aspectRatio?: "1:1" | "4:3" | "16:9" | "auto";
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  height = 400,
  showLabels = false,
  className = "",
  autoAnimateOnHover = true,
  initialPosition = 50,
  labelStyle = "standard",
  onSlideComplete,
  aspectRatio = "auto",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true); // Initialize as visible by default
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate aspect ratio for responsive sizing
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case "1:1":
        return { aspectRatio: "1 / 1" };
      case "4:3":
        return { aspectRatio: "4 / 3" };
      case "16:9":
        return { aspectRatio: "16 / 9" };
      default:
        return { height: `${height}px` };
    }
  };

  // Cleanup any running animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Notify when slide is complete
  useEffect(() => {
    if (onSlideComplete && !isDragging) {
      onSlideComplete(sliderPosition);
    }
  }, [sliderPosition, isDragging, onSlideComplete]);

  // Handle slider change from input
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // Mouse/touch event handlers
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Handle both mouse and touch events
    let clientX: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  // Handle hover animation
  const handleMouseEnter = () => {
    setIsHovering(true);

    if (autoAnimateOnHover) {
      // Clear any existing animation
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }

      // Set a sequence of animations
      animationRef.current = setTimeout(() => {
        // Animate to "after" state
        setSliderPosition(95);

        // Then animate back to center
        animationRef.current = setTimeout(() => {
          setSliderPosition(initialPosition);
        }, 1500);
      }, 800);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsDragging(false);

    // Clear animation if mouse leaves during animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Handle image loading complete
  const handleImagesLoaded = () => {
    setIsLoaded(true);
  };

  // Ensure images become visible even if load events don't fire properly
  useEffect(() => {
    // Force isLoaded to true after a timeout as a fallback
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get label styles based on the selected style
  const getLabelStyles = () => {
    switch (labelStyle) {
      case "minimal":
        return "px-2 py-0.5 text-xs bg-black bg-opacity-30 rounded";
      case "elegant":
        return "px-4 py-1.5 text-sm bg-elegant-mocha text-white rounded-lg shadow-md";
      default: // standard
        return "px-3 py-1 text-sm bg-black bg-opacity-50 text-white rounded-full";
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none overflow-hidden shadow-lg ${className}`}
      style={getAspectRatioStyle()}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        transition: { duration: 0.5 },
      }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleDragMove}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchCancel={handleMouseLeave}
      onTouchMove={handleDragMove}
    >
      {/* Loading state */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-light-cream"
            exit={{ opacity: 0 }}
          >
            <div className="w-12 h-12 border-4 border-elegant-mocha border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`After: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onLoad={handleImagesLoaded}
          priority
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeImage}
          alt={`Before: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{
            objectPosition: "left center",
          }}
          onLoad={handleImagesLoaded}
          priority
        />
      </div>

      {/* Optional Labels */}
      {showLabels && (
        <>
          <motion.div
            className={`absolute top-4 left-4 ${getLabelStyles()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-alta">Before</span>
          </motion.div>
          <motion.div
            className={`absolute top-4 right-4 ${getLabelStyles()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-alta">After</span>
          </motion.div>
        </>
      )}

      {/* Chanel-standard Slider Control with 2px divider */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="relative w-full">
          {/* Slider Handle Line - Chanel's 2px standard for interactive elements */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-white"
            style={{ left: `${sliderPosition}%` }}
            animate={{
              opacity: isDragging ? 1 : 0.7,
            }}
            transition={{ duration: 0.6 }} // Chanel's standard animation timing
          />

          {/* Chanel-inspired minimal slider handle */}
          <motion.div
            className="absolute top-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
            style={{
              left: `${sliderPosition}%`,
              y: "-50%",
              x: "-50%",
            }}
            animate={{
              scale: isDragging ? 1.06 : isHovering ? 1.03 : 1,
              boxShadow: isDragging
                ? "0 0 0 2px rgba(255,255,255,0.7)"
                : isHovering
                ? "0 0 0 1px rgba(255,255,255,0.5)"
                : "0 0 0 1px rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.6 }} // Chanel's standard animation timing
          >
            {/* Minimal indicator - Chanel rarely uses icons in interactive elements */}
            <div className="w-[4px] h-[4px] bg-elegant-mocha rounded-full"></div>
          </motion.div>

          {/* Hidden Range Input For Accessibility */}
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full h-full opacity-0 cursor-grab active:cursor-grabbing absolute inset-0"
            aria-label="Slider control to reveal before and after images"
          />
        </div>
      </div>

      {/* Hint Text */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-alta text-xs text-white">
              Slide to reveal
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
