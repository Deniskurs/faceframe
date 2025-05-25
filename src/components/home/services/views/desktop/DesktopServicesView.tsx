"use client";

/**
 * @file Desktop Services View Component
 * Premium luxury grid layout for service cards in desktop mode
 * Inspired by Chanel and Dior's elegant visual aesthetic
 */

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURED_CATEGORIES, LUXURY_EASING } from "../../core/types";
import { ServiceCard } from "../../cards/ServiceCard";
import { SectionTitle } from "../../components/SectionTitle";
import { ViewAllButton } from "../../components/ViewAllButton";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useCardHeight } from "../../cards/useCardHeight";

export interface DesktopServicesViewProps {
  hideTitle?: boolean;
}

export function DesktopServicesView({
  hideTitle = false,
}: DesktopServicesViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isVisible, setIsVisible] = useState(false);
  const { isMidDesktop } = useScreenSize();

  // Card height equalization system for consistent luxury presentation
  const { registerCard } = useCardHeight({
    containerRef,
    minHeight: 520, // Slightly taller for more premium feel
    equalizeOnMount: true,
    equalizeOnResize: true,
  });

  // Golden ratio based spacing calculation for mathematically perfect layout
  // This approach is used by luxury brands for harmonious visual proportions
  const GOLDEN_RATIO = 1.618;
  const baseSpacing = 8; // Base spacing unit
  const goldenGap = Math.round(baseSpacing / GOLDEN_RATIO);

  // Set visibility for staggered luxury animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: LUXURY_EASING }}
    >
      {/* Luxury Section Title - now using the consistent SectionTitle component */}
      {!hideTitle && (
        <div className="mb-20">
          <SectionTitle
            title="Signature Services"
            subtitle="The Experience"
            isRevealed={isInView}
            align="center"
          />
        </div>
      )}

      {/* Clean space - true to Chanel's minimalist aesthetic */}

      {/* Refined Service Cards Grid with golden-ratio inspired spacing */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 
          ${
            isMidDesktop ? "lg:grid-cols-2 max-w-5xl mx-auto" : "lg:grid-cols-3"
          } 
          gap-12 md:gap-${goldenGap} lg:gap-${goldenGap} xl:gap-${
          goldenGap + 2
        }`}
      >
        {FEATURED_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 25,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3 + index * 0.2, // Staggered animation for premium feel
              ease: LUXURY_EASING,
            }}
            className="flex"
          >
            {/* Enhanced ServiceCard component */}
            <div className="w-full h-full flex">
              <ServiceCard
                category={category}
                index={index}
                isActive={true} // All cards appear active in desktop view
                registerRef={registerCard}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clean negative space instead of separator - Chanel's signature restraint */}
      <div className="mt-20 md:mt-24"></div>

      {/* View All Services Button with Chanel-inspired styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          ease: LUXURY_EASING,
        }}
        className="mt-16 md:mt-20"
      >
        <ViewAllButton />
      </motion.div>
    </motion.div>
  );
}
