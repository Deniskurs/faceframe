"use client";

/**
 * @file Chanel-Inspired Premium Service Card
 * Editorial-style luxury card with distinctive asymmetrical design
 */

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { ServiceCategory, LUXURY_EASING } from "../core/types";

export interface ChanelServiceCardProps {
  category: ServiceCategory;
  index: number;
  isActive?: boolean;
  registerRef?: (element: HTMLDivElement | null) => void;
  numberIndex?: number; // For N° numbering system
}

/**
 * ChanelServiceCard - Premium card with editorial styling and Chanel-inspired details
 */
export const ChanelServiceCard: React.FC<ChanelServiceCardProps> = ({
  category,
  index,
  isActive = false,
  registerRef,
  numberIndex = 1,
}) => {
  // State and refs for hover effects
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageControls = useAnimation();
  const contentControls = useAnimation();

  // Register for equal heights if provided
  useEffect(() => {
    if (registerRef && cardRef.current) {
      registerRef(cardRef.current);
    }
  }, [registerRef]);

  // Animation sequence when card becomes active
  useEffect(() => {
    if (isActive) {
      // Staggered animations when card is active
      contentControls.start("visible");
      imageControls.start("visible");
    } else {
      // Subtle recessive animations
      contentControls.start("hidden");
      imageControls.start("hidden");
    }
  }, [isActive, contentControls, imageControls]);

  // Animation variants
  const imageVariants = {
    hidden: {
      scale: 0.95,
      filter: "brightness(0.95)",
      transition: { duration: 0.8, ease: LUXURY_EASING },
    },
    visible: {
      scale: 1,
      filter: "brightness(1)",
      transition: { duration: 1.2, ease: LUXURY_EASING },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 1.4, ease: LUXURY_EASING },
    },
  };

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: isHovered ? 1 : isActive ? 0.8 : 0.4,
      transition: { duration: 1.2, ease: LUXURY_EASING, delay: 0.2 },
    },
    hover: {
      scaleX: 1,
      transition: { duration: 0.8, ease: LUXURY_EASING },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 0.7,
      y: 0,
      transition: { duration: 0.9, ease: LUXURY_EASING, delay: 0.1 },
    },
    hover: {
      opacity: 1,
      y: -4,
      transition: { duration: 0.7, ease: LUXURY_EASING },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0.7, letterSpacing: "0.2em" },
    visible: {
      opacity: 1,
      letterSpacing: "0.25em",
      transition: { duration: 1.2, ease: LUXURY_EASING, delay: 0.2 },
    },
    hover: {
      letterSpacing: "0.3em",
      transition: { duration: 0.9, ease: LUXURY_EASING },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0.6, y: 5 },
    visible: {
      opacity: 0.8,
      y: 0,
      transition: { duration: 1, ease: LUXURY_EASING, delay: 0.3 },
    },
    hover: {
      opacity: 1,
      y: -2,
      transition: { duration: 0.7, ease: LUXURY_EASING },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0.5, x: -5 },
    visible: (i: number) => ({
      opacity: 0.8,
      x: 0,
      transition: { duration: 0.8, ease: LUXURY_EASING, delay: 0.3 + i * 0.1 },
    }),
    hover: {
      opacity: 1,
      x: 4,
      transition: { duration: 0.7, ease: LUXURY_EASING },
    },
  };

  // Main container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: LUXURY_EASING,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 1.4,
        ease: LUXURY_EASING,
      },
    },
  };

  // Assemble the features with poetic presentation
  const featureItems = [
    {
      id: "exclusivity",
      label: category.exclusivity,
    },
    {
      id: "result",
      label: category.result,
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full min-h-[580px] bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Asymmetrical layout with deliberate negative space */}
      <div className="relative flex flex-col h-full pl-8 pt-0 pr-0 pb-6">
        {/* Distinctive N° number label - Chanel signature */}
        <motion.div
          className="absolute top-6 left-0 z-20"
          variants={numberVariants}
        >
          <span className="font-alta text-elegant-mocha/50 text-[18px] sm:text-[20px] tracking-[0.05em]">
            N° {numberIndex}
          </span>
        </motion.div>

        {/* Premium image container with editorial crop */}
        <div className="relative w-[85%] ml-auto aspect-[4/5] mb-8">
          <motion.div
            className="relative w-full h-full overflow-hidden"
            variants={imageVariants}
            animate={imageControls}
          >
            {/* Offset image for editorial feel */}
            <Image
              src={category.imageUrl}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              quality={92}
              priority={index < 2}
            />

            {/* Chanel-style image treatments */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-black/5"></div>

            {/* Ultra-subtle border on only two sides - signature Chanel asymmetry */}
            <div className="absolute top-0 bottom-0 right-0 w-[0.5px] bg-white/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-white/10"></div>

            {/* Category label with Chanel styling - positioned for asymmetry */}
            <div className="absolute bottom-8 left-8">
              <span className="font-alta text-white/90 text-[11px] tracking-[0.2em] uppercase">
                {category.featured}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content area with refined spacing */}
        <div className="pl-0 pr-6">
          {/* Title with luxurious spacing */}
          <motion.h3
            className="font-alta text-[26px] text-elegant-mocha uppercase tracking-luxury mb-5"
            variants={titleVariants}
          >
            {category.title}
          </motion.h3>

          {/* Elegant divider with intentional asymmetry */}
          <motion.div
            className="w-24 h-[0.5px] bg-elegant-mocha/30 mb-6 origin-left"
            variants={dividerVariants}
          />

          {/* Description with Chanel-inspired typography */}
          <motion.p
            className="font-alta text-elegant-mocha/80 text-[15px] leading-[1.7] tracking-[0.03em] mb-10 max-w-[90%]"
            variants={descriptionVariants}
          >
            {category.description}
          </motion.p>

          {/* Features presented with Chanel's signature minimalism */}
          <div className="space-y-5 mb-12">
            {featureItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="flex items-start"
                custom={i}
                variants={featureVariants}
              >
                <div className="flex-shrink-0 w-[18px] mr-5">
                  <div className="w-0 h-[0.5px] bg-deep-bronze/80 mt-3 group-hover:w-full"></div>
                </div>
                <p className="font-alta text-elegant-mocha/90 text-[13px] tracking-[0.05em] leading-[1.6]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Discover button with Chanel-inspired styling */}
          <div className="mt-auto">
            <Link
              href={`/services/${category.id}`}
              className="group relative inline-block font-alta text-elegant-mocha text-[11px] tracking-[0.35em] uppercase"
            >
              <span className="inline-block py-1">DISCOVER</span>
              <div className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-elegant-mocha/40 group-hover:w-full transition-all duration-700 ease-out"></div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChanelServiceCard;
