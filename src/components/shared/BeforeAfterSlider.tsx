"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_EASING } from "../home/services/core/types";

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
  categoryLabel?: string;
  showClientResult?: boolean;
  clientResultText?: string;
  onDragStateChange?: (
    isDragging: boolean,
    wasDraggingRecently: boolean
  ) => void;
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
  categoryLabel,
  showClientResult = false,
  clientResultText = "Real Client Result",
  onDragStateChange,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true); // Initialize as visible by default
  const [wasRecentlyDragging, setWasRecentlyDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const [showInteractionHint, setShowInteractionHint] = useState(false);

  // Reference for animation timeouts and slider container
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

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
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
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
  const handleDragStart = () => {
    // Stop any running animations
    if (isAnimating) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsAnimating(false);
    }

    // Hide interaction hint when user starts interacting
    setShowInteractionHint(false);
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }

    setIsDragging(true);
    if (onDragStateChange) {
      onDragStateChange(true, wasRecentlyDragging);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setWasRecentlyDragging(true);

    // Clear any existing timeout
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }

    // Set a timeout to reset the wasRecentlyDragging state after 300ms
    dragTimeoutRef.current = setTimeout(() => {
      setWasRecentlyDragging(false);
      if (onDragStateChange) {
        onDragStateChange(false, false);
      }
    }, 300);

    if (onDragStateChange) {
      onDragStateChange(false, true);
    }
  };

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

  // Improved UX: One-time subtle animation with better interaction cues
  const runHoverAnimation = () => {
    if (!autoAnimateOnHover || isDragging || isAnimating || hasAnimated) return;

    // Mark as animating to prevent re-triggering
    setIsAnimating(true);
    setHasAnimated(true);

    // Clear any existing animation timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Shorter, more subtle animation
    hoverTimeoutRef.current = setTimeout(() => {
      // Quick peek at the "after" position (reduced from 95 to 75)
      setSliderPosition(75);

      // Shorter pause (reduced from 1500ms to 800ms)
      hoverTimeoutRef.current = setTimeout(() => {
        // Return to initial position
        setSliderPosition(initialPosition);

        // Animation complete
        hoverTimeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
          // Show interaction hint after animation
          setShowInteractionHint(true);
          
          // Hide hint after 3 seconds
          hintTimeoutRef.current = setTimeout(() => {
            setShowInteractionHint(false);
          }, 3000);
        }, 300);
      }, 800);
    }, 300);
  };

  // Handle hover animation
  const handleMouseEnter = () => {
    setIsHovering(true);
    runHoverAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsDragging(false);

    // Only stop animations if user hasn't started interacting
    if (!wasRecentlyDragging) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsAnimating(false);

      // Only animate back to initial position if user hasn't interacted
      if (!hasAnimated && Math.abs(sliderPosition - initialPosition) > 5) {
        setSliderPosition(initialPosition);
      }
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

  // Convert LUXURY_EASING array to cubic-bezier string for CSS transitions
  const cubicBezier = `cubic-bezier(${LUXURY_EASING.join(",")})`;

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none overflow-hidden shadow-lg ${className}`}
      style={{
        ...getAspectRatioStyle(),
        cursor: isDragging ? "grabbing" : "pointer",
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        transition: { duration: 0.5 },
      }}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleMouseLeave}
      onMouseMove={isDragging ? handleDragMove : undefined}
      onMouseEnter={handleMouseEnter}
      onTouchEnd={handleDragEnd}
      onTouchCancel={handleMouseLeave}
      onTouchMove={isDragging ? handleDragMove : undefined}
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
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <Image
          src={afterImage}
          alt={`After: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover select-none"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none" /* For Safari */,
            MozUserSelect: "none" /* For Firefox */,
            msUserSelect: "none" /* For IE/Edge */,
          }}
          draggable={false}
          onLoad={handleImagesLoaded}
          priority
        />
      </div>

      {/* Before Image (Clipped) with elegant transition */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          width: `${sliderPosition}%`,
          pointerEvents: "none",
          transition: isAnimating
            ? `width 2s ${cubicBezier}`
            : isDragging
            ? "none"
            : `width 0.6s ${cubicBezier}`,
        }}
      >
        <Image
          src={beforeImage}
          alt={`Before: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover select-none"
          style={{
            objectPosition: "left center",
            userSelect: "none",
            WebkitUserSelect: "none" /* For Safari */,
            MozUserSelect: "none" /* For Firefox */,
            msUserSelect: "none" /* For IE/Edge */,
          }}
          draggable={false}
          onLoad={handleImagesLoaded}
          priority
        />
      </motion.div>

      {/* Premium Category Label with proper overlay */}
      {categoryLabel && (
        <motion.div
          className="absolute top-[36px] left-[36px] z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Sophisticated backdrop for legibility */}
            <div className="absolute inset-0 -m-1 bg-gradient-to-r from-black/50 to-transparent blur-[3px] rounded-sm"></div>

            {/* Elegant label with proper spacing and letter tracking */}
            <p className="font-alta text-[11px] tracking-[0.25em] uppercase text-white/95 relative px-2 py-1">
              {categoryLabel}
            </p>

            {/* Subtle accent line */}
            <motion.div
              className="absolute bottom-[-4px] left-0 h-[0.5px] bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </div>
        </motion.div>
      )}

      {/* Client Result indicator with premium styling */}
      {showClientResult && (
        <motion.div
          className="absolute bottom-[36px] right-[36px] z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative px-2 py-1">
            {/* Elegant backdrop with directional gradient */}
            <div className="absolute inset-0 -m-1 bg-gradient-to-l from-black/50 to-transparent blur-[3px] rounded-sm"></div>

            {/* Horizontal alignment of bullet and text on the same baseline */}
            <div className="relative flex items-baseline">
              {/* Bullet point set exactly where it should be */}
              <div className="w-[10px] h-[0.5px] bg-white/60 self-center mr-2"></div>

              {/* Text with precise alignment - inline-block to maintain text metrics */}
              <span
                className="font-alta text-[10px] tracking-[0.2em] uppercase text-white/90 inline-block align-middle leading-[0.95]"
                style={{ transform: "translateY(-0.5px)" }}
              >
                {clientResultText}
              </span>
            </div>
          </div>
        </motion.div>
      )}

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
      <div className="absolute inset-0 flex items-center">
        <div className="relative w-full pointer-events-none">
          {/* Slider Handle Line - Chanel's 2px standard for interactive elements */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-white"
            style={{
              left: `${sliderPosition}%`,
              transition: isAnimating
                ? `left 2s ${cubicBezier}`
                : isDragging
                ? "none"
                : `left 0.6s ${cubicBezier}`,
            }}
            animate={{
              opacity: isDragging ? 1 : 0.7,
            }}
            transition={{ duration: 0.6 }} // Chanel's standard animation timing
          />

          {/* Enhanced interactive slider handle with improved grab area */}
          <motion.div
            className="absolute top-1/2 w-12 h-12 flex items-center justify-center z-10 pointer-events-auto"
            style={{
              left: `${sliderPosition}%`,
              y: "-50%",
              x: "-50%",
              cursor: isDragging ? "grabbing" : "grab",
              transition: isAnimating
                ? `left 2s ${cubicBezier}`
                : isDragging
                ? "none"
                : `left 0.6s ${cubicBezier}`,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDragStart();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleDragStart();
            }}
          >
            {/* Visual handle component - refined with no square border */}
            <motion.div
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center"
              animate={{
                scale: isDragging ? 1.08 : isHovering ? 1.04 : 1,
                boxShadow: isDragging
                  ? "0 0 15px rgba(0,0,0,0.3)"
                  : isHovering
                  ? "0 0 10px rgba(0,0,0,0.2)"
                  : "0 0 5px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Refined grab indicator lines - more minimal and elegant */}
              <div className="flex flex-col justify-center items-center w-3 gap-[2px]">
                <div className="h-[1px] w-full bg-elegant-mocha/80 rounded-full"></div>
                <div className="h-[1px] w-full bg-elegant-mocha/80 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Elegant Interaction Cue - Chanel-inspired minimal design */}
          <AnimatePresence>
            {showInteractionHint && !isDragging && (
              <motion.div
                className="absolute top-1/2 pointer-events-none z-20"
                style={{
                  left: `${sliderPosition}%`,
                  transform: "translate(-50%, -130%)",
                }}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94] // Luxury easing
                }}
              >
                {/* Sophisticated backdrop with gradient overlay */}
                <div className="relative">
                  {/* Main container with refined styling */}
                  <div className="relative px-4 py-2 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md">
                    {/* Subtle border enhancement */}
                    <div className="absolute inset-0 border border-elegant-mocha/10 rounded-sm"></div>
                    
                    {/* Content with proper typography hierarchy */}
                    <div className="relative flex items-center justify-center">
                      {/* Refined drag icon - more minimal */}
                      <div className="flex items-center gap-1 mr-2">
                        <div className="w-[3px] h-[3px] bg-elegant-mocha/40 rounded-full"></div>
                        <div className="w-[6px] h-[1px] bg-elegant-mocha/60"></div>
                        <div className="w-[3px] h-[3px] bg-elegant-mocha/40 rounded-full"></div>
                      </div>
                      
                      {/* Typography matching the luxury brand standards */}
                      <span className="font-alta text-[10px] tracking-[0.15em] uppercase text-elegant-mocha/80 leading-none">
                        Drag to Compare
                      </span>
                    </div>
                    
                    {/* Subtle accent line - Chanel signature detail */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[0.5px] bg-elegant-mocha/20"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  
                  {/* Elegant pointing indicator - more refined than arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                    <motion.div
                      className="w-[1px] h-3 bg-gradient-to-b from-elegant-mocha/20 to-transparent"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 12, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    />
                    <motion.div
                      className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[2px] h-[2px] bg-elegant-mocha/30 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
    </motion.div>
  );
}
