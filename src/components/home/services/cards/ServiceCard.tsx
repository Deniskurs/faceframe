"use client";

/**
 * @file Premium Service Card Component
 * Chanel/Dior inspired luxury card with fixed height and responsive design
 */

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { ServiceCategory, LUXURY_EASING, SUBTLE_EASE } from "../core/types";

export interface ServiceCardProps {
  category: ServiceCategory;
  index: number;
  isActive?: boolean;
  registerRef?: (element: HTMLDivElement | null) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  index,
  isActive = false,
  registerRef,
}) => {
  // Enhanced state for premium interactions
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageControls = useAnimation();
  const titleControls = useAnimation();
  const contentControls = useAnimation();

  // Register for equal heights if provided
  useEffect(() => {
    if (registerRef && cardRef.current) {
      registerRef(cardRef.current);
    }
  }, [registerRef]);

  // Premium transition timings
  const transitionBase = {
    duration: 0.85,
    ease: LUXURY_EASING,
  };

  const subtleTransition = {
    duration: 0.65,
    ease: SUBTLE_EASE,
  };

  // Initialize animations
  useEffect(() => {
    if (isActive) {
      // Staggered premium animations when card becomes active
      titleControls.start({
        opacity: 1,
        y: 0,
        transition: { ...transitionBase, delay: 0.1 },
      });
      contentControls.start({
        opacity: 1,
        y: 0,
        transition: { ...transitionBase, delay: 0.2 },
      });
      imageControls.start({
        scale: 1,
        filter: "brightness(1)",
        transition: { ...transitionBase, duration: 1.2 },
      });
    } else {
      // Subtle recessive animations for inactive cards
      titleControls.start({
        opacity: 0.9,
        y: 4,
        transition: subtleTransition,
      });
      contentControls.start({
        opacity: 0.85,
        y: 6,
        transition: subtleTransition,
      });
      imageControls.start({
        scale: 0.99,
        filter: "brightness(0.98)",
        transition: subtleTransition,
      });
    }
  }, [isActive, titleControls, contentControls, imageControls]);

  // Mouse parallax effect handler - Dior website inspired
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate normalized position (-1 to 1) from center for parallax
    const normalizedX = (e.clientX - rect.left - centerX) / centerX;
    const normalizedY = (e.clientY - rect.top - centerY) / centerY;

    // Apply subtle parallax movement to image - Dior-inspired subtle effect
    imageControls.start({
      x: normalizedX * 4, // 4px max shift
      y: normalizedY * 4, // 4px max shift
      transition: { duration: 0.8, ease: SUBTLE_EASE },
    });
  };

  // Reset parallax when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);

    imageControls.start({
      x: 0,
      y: 0,
      transition: { duration: 1.2, ease: LUXURY_EASING },
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full will-change-transform service-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1 : 0.98,
        transition: {
          opacity: { duration: 0.9, ease: LUXURY_EASING, delay: index * 0.1 },
          y: { duration: 1.1, ease: LUXURY_EASING, delay: index * 0.1 },
          scale: { duration: 0.85, ease: LUXURY_EASING },
        },
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ scale: { duration: 0.8, ease: LUXURY_EASING } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "1200px", // Premium 3D perspective
        willChange: "transform, opacity",
      }}
    >
      {/* Premium Card Container - Equal height with flexbox */}
      <div
        className={`relative overflow-hidden flex flex-col bg-white transition-all w-full h-full
          ${
            isActive
              ? "shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
              : "shadow-[0_8px_25px_rgba(0,0,0,0.035)]"
          }`}
        style={{
          transitionProperty: "transform, box-shadow, background-color",
          transitionDuration: "700ms, 900ms, 800ms",
          transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
          borderRadius: "1px", // Ultra subtle Chanel-like radius
        }}
      >
        {/* Ultra-fine top border accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[0.25px] z-10 bg-black/5"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: isHovered ? 1 : isActive ? 0.7 : 0 }}
          transition={{ duration: 1.1, ease: LUXURY_EASING }}
        />

        {/* L-shaped corner accent (top left) - Chanel signature */}
        <div className="absolute top-0 left-0 z-10 pointer-events-none">
          <motion.div
            className="w-[50px] h-[0.25px] bg-black/5"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ ...transitionBase, delay: 0.1 }}
          />
          <motion.div
            className="w-[0.25px] h-[50px] bg-black/5"
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ ...transitionBase, delay: 0.15 }}
          />
        </div>

        {/* Premium Image Container - Fixed aspect ratio */}
        <div className="relative w-full pb-[65%] overflow-hidden flex-shrink-0">
          {/* Ultra-thin image border */}
          <div className="absolute inset-0 border-[0.25px] border-white/8 z-20 pointer-events-none"></div>

          {/* Image with motion controls */}
          <motion.div className="absolute inset-0" animate={imageControls}>
            <Image
              src={category.imageUrl}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              quality={92}
              priority={index < 2}
            />
            {/* Chanel-style image treatments */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15 opacity-40"></div>
            <div className="absolute inset-0 bg-black/2"></div>{" "}
            {/* Ultra-subtle color grading */}
            {/* Ultra-thin vignette */}
            <div className="absolute inset-0 box-border border-[8px] border-black/[0.03] pointer-events-none"></div>
            {/* Luxury hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.05 : 0 }}
              transition={{ duration: 0.7, ease: LUXURY_EASING }}
            />
          </motion.div>

          {/* Title container with perfect positioning */}
          <motion.div
            className="absolute bottom-0 inset-x-0 px-6 pb-5 pt-16 z-10"
            animate={titleControls}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
            }}
          >
            {/* Main premium title with perfect letter spacing */}
            <motion.h3
              className="font-alta text-white text-xl tracking-[0.35em] uppercase leading-relaxed"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.8, ease: LUXURY_EASING }}
            >
              {category.title}
            </motion.h3>
          </motion.div>
        </div>

        {/* Content section with refined spacing - flex layout for consistent height */}
        <motion.div
          className="flex flex-col px-8 py-8 flex-grow"
          animate={contentControls}
          style={{ minHeight: "280px" }} /* Ensure minimum content height */
        >
          {/* Elegant description with premium typography and consistent height */}
          <p className="font-alta text-elegant-mocha/75 text-[15px] tracking-[0.03em] leading-[1.8] mb-8 line-clamp-3">
            {category.description}
          </p>

          {/* Premium features - grouped together without justify-between */}
          <div className="mb-8 flex-grow">
            {/* Features container - keeps bullet points together */}
            <div className="space-y-6">
              {/* Feature with Dior-style line detail - consistently visible */}
              <div className="relative pl-8">
                <motion.div
                  className="absolute left-0 top-[0.65em] h-[0.5px] bg-deep-bronze/80"
                  initial={{ width: 20 }}
                  animate={{ width: 22 }}
                  transition={{ duration: 0.8, ease: LUXURY_EASING }}
                />
                <p className="font-alta text-elegant-mocha/85 text-[13px] tracking-[0.05em] leading-[1.4]">
                  {category.exclusivity}
                </p>
              </div>

              {/* Feature with staggered animation - consistently visible */}
              <div className="relative pl-8">
                <motion.div
                  className="absolute left-0 top-[0.65em] h-[0.5px] bg-deep-bronze/80"
                  initial={{ width: 20 }}
                  animate={{ width: 22 }}
                  transition={{
                    duration: 0.8,
                    ease: LUXURY_EASING,
                    delay: 0.05,
                  }}
                />
                <p className="font-alta text-elegant-mocha/85 text-[13px] tracking-[0.05em] leading-[1.4]">
                  {category.result}
                </p>
              </div>
            </div>

            {/* Add flex-grow div to push the button to the bottom */}
            <div className="flex-grow mt-8"></div>
          </div>

          {/* Premium call-to-action with CHANEL-inspired hover effects */}
          <Link
            href={`/services/${category.id}`}
            className="group relative font-alta tracking-[0.3em] text-[10px] sm:text-xs uppercase text-elegant-mocha/90 px-10 py-4 inline-block border border-elegant-mocha/20 overflow-hidden text-center w-full mt-auto"
          >
            {/* Button background with elegant hover effect */}
            <motion.div
              className="absolute inset-0 bg-elegant-mocha/0 group-hover:bg-elegant-mocha/5"
              initial={false}
              transition={{ duration: 0.7, ease: LUXURY_EASING }}
            />

            {/* Button text with animation */}
            <span className="relative z-10 group-hover:text-elegant-mocha transition-colors duration-700">
              Explore Service
            </span>

            {/* Subtle bottom border animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] w-0 bg-soft-blush/60 group-hover:w-full"
              transition={{ duration: 0.8, ease: LUXURY_EASING }}
            />
          </Link>
        </motion.div>

        {/* L-shaped corner accent (bottom right) - Chanel signature */}
        <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
          <motion.div
            className="absolute bottom-0 right-0 w-[50px] h-[0.25px] bg-black/5"
            initial={{ scaleX: 0, transformOrigin: "right" }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ ...transitionBase, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[0.25px] h-[50px] bg-black/5"
            initial={{ scaleY: 0, transformOrigin: "bottom" }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ ...transitionBase, delay: 0.15 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

ServiceCard.displayName = "ServiceCard";
