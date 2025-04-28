"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  height?: number;
  showLabels?: boolean;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  height = 400,
  showLabels = false,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle slider change from input
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // Handle mouse/touch drag events
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  // Auto-animate on hover for added luxury effect
  const handleMouseEnter = () => {
    // Animate slider to show transformation and then back
    const timer1 = setTimeout(() => {
      setSliderPosition(95);

      const timer2 = setTimeout(() => {
        setSliderPosition(50);
      }, 1500);

      return () => clearTimeout(timer2);
    }, 800);

    return () => clearTimeout(timer1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseLeave}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={`After: ${alt}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`Before: ${alt}`}
          className="w-full h-full object-cover"
          style={{
            width: containerRef.current
              ? `${containerRef.current.offsetWidth}px`
              : "100%",
            objectPosition: "left center",
          }}
        />
      </div>

      {/* Optional Labels */}
      {showLabels && (
        <>
          <motion.div
            className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-alta text-sm">Before</span>
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-alta text-sm">After</span>
          </motion.div>
        </>
      )}

      {/* Slider Control */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="relative w-full">
          {/* Slider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          />

          {/* Slider Handle */}
          <motion.div
            className="absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none"
            style={{
              left: `${sliderPosition}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              boxShadow: isDragging
                ? "0 0 0 3px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.3)"
                : "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5L3 10L8 15M16 5L21 10L16 15"
                stroke="#7F5539"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Hidden Range Input For Accessibility */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full h-full opacity-0 cursor-grab active:cursor-grabbing absolute inset-0"
            aria-label="Slider control to reveal before and after images"
          />
        </div>
      </div>

      {/* Hint Text */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="font-alta text-xs text-white">Slide to reveal</span>
      </motion.div>
    </div>
  );
}
