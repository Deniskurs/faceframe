"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
// Import only the animation hook we need
import { useLuxuryReveal } from "../../../utils/animations/useLuxuryTransition";
import { SectionTitle } from "../../shared/SectionTitle";

interface EditorialTransformationLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  quote?: string;
  quoteAuthor?: string;
  className?: string;
}

/**
 * A Chanel-inspired editorial layout for transformations
 * Features asymmetrical design, refined typography, and luxury animation
 */
export default function EditorialTransformationLayout({
  children,
  title,
  subtitle,
  quote,
  quoteAuthor,
  className = "",
}: EditorialTransformationLayoutProps) {
  // Precise Chanel timing standards (1.8s standard)
  const titleReveal = useLuxuryReveal<HTMLHeadingElement>({
    direction: "up",
    threshold: 0.1,
    delay: 0.1,
    duration: 1.8,
    easingType: "elegant",
  });

  const subtitleReveal = useLuxuryReveal<HTMLParagraphElement>({
    direction: "up",
    threshold: 0.1,
    delay: 0.2,
    duration: 1.8,
    easingType: "elegant",
  });

  const quoteReveal = useLuxuryReveal<HTMLDivElement>({
    direction: "up",
    threshold: 0.1,
    delay: 0.3,
    duration: 1.8,
    easingType: "refined",
  });

  // Horizontal line with Chanel's exact timing (1.8s)
  const lineReveal = useLuxuryReveal<HTMLDivElement>({
    direction: "right",
    threshold: 0.1,
    delay: 0.1,
    duration: 1.8,
    easingType: "refined",
  });

  return (
    <div className={`relative py-16 md:py-32 ${className}`}>
      {/* Single refined horizontal accent line - Chanel-inspired restraint */}
      <motion.div
        ref={lineReveal.ref}
        variants={lineReveal.variants}
        initial={lineReveal.initial}
        animate={lineReveal.animate}
        className="absolute left-0 right-0 top-0 h-[0.5px] bg-elegant-mocha/10 mx-auto"
      />

      {/* Content container with refined editorial spacing using golden ratio */}
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 md:px-8">
        {/* Standardized section title matching homepage consistency */}
        {title && (
          <SectionTitle
            title={title}
            subtitle="Results"
            align="center"
            variant="dark"
          />
        )}

        {/* Custom subtitle for longer description */}
        {subtitle && (
          <motion.p
            ref={subtitleReveal.ref}
            variants={subtitleReveal.variants}
            initial={subtitleReveal.initial}
            animate={subtitleReveal.animate}
            className="font-alta text-elegant-mocha/70 max-w-xl mx-auto -mt-8 mb-16 tracking-[0.12em] leading-[1.8] text-center text-[16px]"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Refined quote section with emotional connector to transformations */}
        {quote && (
          <motion.div
            ref={quoteReveal.ref}
            variants={quoteReveal.variants}
            initial={quoteReveal.initial}
            animate={quoteReveal.animate}
            className="mb-12 max-w-2xl mx-auto relative"
          >
            {/* Chanel's signature asymmetrical layout with left alignment */}
            <div className="flex flex-col items-start pl-[8%] pr-[8%] md:pl-[12.5%] md:pr-0 pt-8 pb-6">
              <blockquote className="font-alice text-[16px] md:text-[24px] text-elegant-mocha leading-[1.8] relative mb-8 tracking-[0.05em]">
                <span className="block mb-6 w-12 h-[0.5px] bg-elegant-mocha/20"></span>
                &ldquo;{quote}&rdquo;
              </blockquote>

              {quoteAuthor && (
                <div className="mt-8">
                  <p className="font-alta text-[12px] tracking-[0.2em] uppercase text-elegant-mocha/70">
                    {quoteAuthor}
                  </p>
                </div>
              )}
            </div>

            {/* Clean space - Chanel-inspired minimalism */}
          </motion.div>
        )}

        {/* Main content area */}
        <div>{children}</div>
      </div>
    </div>
  );
}
