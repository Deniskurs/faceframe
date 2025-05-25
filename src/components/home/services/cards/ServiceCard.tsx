"use client";

/**
 * @file Premium Service Card Component
 * Chanel/Dior inspired luxury card with fixed height and responsive design
 */

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { ServiceCategory, LUXURY_EASING, SUBTLE_EASE } from "../core/types";
import LuxuryTextBackdrop from "@/components/shared/LuxuryTextBackdrop";

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

  // Premium transition timings - memoized to prevent recreation on each render
  const transitionBase = useMemo(
    () => ({
      duration: 0.85,
      ease: LUXURY_EASING,
    }),
    []
  );

  const subtleTransition = useMemo(
    () => ({
      duration: 0.65,
      ease: SUBTLE_EASE,
    }),
    []
  );

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
  }, [
    isActive,
    titleControls,
    contentControls,
    imageControls,
    subtleTransition,
    transitionBase,
  ]);

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
          opacity: { duration: 0.6, ease: LUXURY_EASING, delay: index * 0.1 },
          y: { duration: 0.6, ease: LUXURY_EASING, delay: index * 0.1 },
          scale: { duration: 0.6, ease: LUXURY_EASING },
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

        {/* Removing corner decorative elements for cleaner, more Chanel-inspired aesthetics */}

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
            {/* Main premium title with enhanced readability */}
            <motion.h3
              className="font-alta text-white text-xl tracking-[0.35em] uppercase leading-relaxed"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.8, ease: LUXURY_EASING }}
            >
              <LuxuryTextBackdrop intensity="medium" isHeading={true}>
                {category.title}
              </LuxuryTextBackdrop>
            </motion.h3>
          </motion.div>
        </div>

        {/* Content section with refined spacing - flex layout for consistent height */}
        <motion.div
          className="flex flex-col px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-grow"
          animate={contentControls}
          style={{ minHeight: "240px" }} /* Minimum content height */
        >
          {/* Editorial-style description with enhanced typographic refinement */}
          <p className="font-alta text-elegant-mocha/90 text-[13px] sm:text-[14px] tracking-[0.04em] leading-[1.8] sm:leading-[1.9] mb-7 sm:mb-9 line-clamp-3 font-light">
            {category.description}
          </p>

          {/* Premium features - grouped together without justify-between */}
          <div className="mb-6 sm:mb-8 flex-grow">
            {/* Features container - keeps bullet points together with improved mobile spacing */}
            <div className="space-y-4 sm:space-y-6">
              {/* Feature with precisely positioned Chanel-style dash - using inline-flex for perfect alignment */}
              <div className="relative mt-[2px] mb-[6px]">
                <div className="flex">
                  <div className="relative w-[8px] sm:w-[10px] flex-shrink-0 mr-[10px] sm:mr-[14px]">
                    <motion.div
                      className="absolute top-[0.52em] left-0 h-[0.25px] bg-deep-bronze/60"
                      style={{ top: "calc(0.52em + 0.5px)" }}
                      initial={{ width: 8 }}
                      animate={{ width: isHovered ? 12 : 10 }}
                      transition={{ duration: 1.1, ease: LUXURY_EASING }}
                    />
                  </div>
                  <p className="font-alta text-elegant-mocha/90 text-[11px] sm:text-[12px] tracking-[0.07em] leading-[1.6] font-light">
                    {category.exclusivity}
                  </p>
                </div>
              </div>

              {/* Feature with meticulously positioned dash - absolute precision measurement */}
              <div className="relative mt-[2px] mb-[6px]">
                <div className="flex">
                  <div className="relative w-[8px] sm:w-[10px] flex-shrink-0 mr-[10px] sm:mr-[14px]">
                    <motion.div
                      className="absolute top-[0.52em] left-0 h-[0.25px] bg-deep-bronze/60"
                      style={{ top: "calc(0.52em + 0.5px)" }}
                      initial={{ width: 8 }}
                      animate={{ width: isHovered ? 12 : 10 }}
                      transition={{
                        duration: 1.1,
                        ease: LUXURY_EASING,
                        delay: 0.05,
                      }}
                    />
                  </div>
                  <p className="font-alta text-elegant-mocha/90 text-[11px] sm:text-[12px] tracking-[0.07em] leading-[1.6] font-light">
                    {category.result}
                  </p>
                </div>
              </div>

              {/* Availability indicator - precise dash positioning for Chanel elegance */}
              <div className="relative mt-[10px] sm:mt-[12px]">
                <div className="flex">
                  <div className="relative w-[8px] sm:w-[10px] flex-shrink-0 mr-[10px] sm:mr-[14px]">
                    <motion.div
                      className="absolute top-[0.49em] left-0 h-[0.25px] bg-deep-bronze/50"
                      style={{ top: "calc(0.49em + 0.5px)" }}
                      initial={{ width: 6 }}
                      animate={{ width: isHovered ? 10 : 8 }}
                      transition={{
                        duration: 1.1,
                        ease: LUXURY_EASING,
                        delay: 0.1,
                      }}
                    />
                  </div>
                  <motion.p
                    className="font-alta text-elegant-mocha/75 text-[10px] sm:text-[11px] tracking-[0.07em] leading-[1.6] italic font-light"
                    animate={{
                      opacity: isHovered ? 0.9 : 0.75,
                    }}
                    transition={{ duration: 1.1, ease: LUXURY_EASING }}
                  >
                    Limited appointments available this month
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Add flex-grow div to push the button to the bottom */}
            <div className="flex-grow mt-6 sm:mt-8"></div>
          </div>

          {/* Refined Chanel-inspired call-to-action with minimalist design */}
          <Link
            href={`/services/${category.id}`}
            className="group relative font-alta tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-[11px] uppercase text-elegant-mocha/90 px-5 sm:px-8 py-[14px] inline-block overflow-hidden text-center w-full mt-auto"
            aria-label={`Explore ${category.title} service details`}
            style={{ letterSpacing: "0.35em" }}
          >
            {/* Ultra-thin button border - Chanel signature minimalism */}
            <div className="absolute inset-0 border border-elegant-mocha/15"></div>

            {/* Subtle hover background */}
            <motion.div
              className="absolute inset-0 bg-elegant-mocha/0 group-hover:bg-elegant-mocha/3 active:bg-elegant-mocha/5"
              initial={false}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
            />

            {/* Button text - Chanel-inspired precision */}
            <motion.span
              className="relative z-10 group-hover:text-elegant-mocha transition-colors duration-900 whitespace-nowrap font-light"
              animate={{
                letterSpacing: isHovered ? "0.38em" : "0.35em",
                opacity: isHovered ? 0.95 : 0.9,
              }}
              transition={{ duration: 0.9, ease: LUXURY_EASING }}
            >
              Discover
            </motion.span>

            {/* Ultra-minimalist bottom accent - Chanel inspired */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-elegant-mocha/25 origin-center scale-x-0 group-hover:scale-x-100"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 0.3 : 0 }}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
            />
          </Link>
        </motion.div>

        {/* Removed bottom right corner accent for cleaner, Chanel-inspired minimalism */}
      </div>
    </motion.div>
  );
};

ServiceCard.displayName = "ServiceCard";
