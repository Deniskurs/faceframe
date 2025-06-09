"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface AboutStripProps {
  className?: string;
  founderImage?: string;
  founderName?: string;
  quote?: string;
  paragraphs?: string[];
  subtitle?: string;
}

const AboutStrip: React.FC<AboutStripProps> = ({
  className = "",
  founderImage = "/images/gallery/image22.webp",
  founderName = "Iggy",
  quote = "Beauty is not about perfection. It's about enhancing your natural features with precision and care.",
  subtitle = "FOUNDER & CREATIVE DIRECTOR",
  paragraphs = [
    "After training with elite artists across Europe and perfecting her craft for over a decade, Iggy established FaceFrame Beauty with a singular vision: to create a sanctuary where precision meets luxury.",
    "Each treatment at FaceFrame Beauty is approached with meticulous attention to detail, ensuring that every client leaves with results that enhance their natural beauty rather than masking it.",
  ],
}) => {
  // Panel references with intersection observers
  const [imageRef, imageInView] = useInView({ threshold: 0.3 });
  const [quoteRef, quoteInView] = useInView({ threshold: 0.5 });
  const [storyRef, storyInView] = useInView({ threshold: 0.4 });

  // Content reveal control
  const [isRevealed, setIsRevealed] = useState(false);

  // Parallax and scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Show section gradually on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* ==================== SECTION 1: MAIN TITLE ==================== */}
      <motion.section
        className="relative h-screen flex flex-col justify-center items-center px-4 sm:px-6 bg-light-cream"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.8, ease: LUXURY_EASING }}
      >
        {/* Clean, refined horizontal line - Chanel-inspired minimalism */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-[0.1px] bg-elegant-mocha/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isRevealed ? 1 : 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: LUXURY_EASING }}
        />

        {/* Title */}
        <div className="text-center max-w-xl mx-auto relative z-10">
          <motion.div
            className="overflow-hidden mb-2"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: LUXURY_EASING }}
          >
            <motion.p
              className="font-alta text-sm tracking-[0.4em] text-elegant-mocha/60 uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: LUXURY_EASING }}
            >
              The Atelier
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                className="font-alice text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] text-elegant-mocha uppercase"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: LUXURY_EASING }}
              >
                The Story
              </motion.h2>
            </div>
          </motion.div>

          {/* Elegantly animated line */}
          <motion.div
            className="w-0 h-[0.1px] bg-elegant-mocha/40 mx-auto my-8"
            animate={{ width: isRevealed ? "40%" : "0%" }}
            transition={{ duration: 1.4, delay: 0.8, ease: LUXURY_EASING }}
          />

          {/* Scroll indicator */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isRevealed ? [0.4, 1, 0.4] : 0,
              y: isRevealed ? [0, 10, 0] : 10,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: LUXURY_EASING,
              delay: 1.5,
              repeatDelay: 0.5,
            }}
          >
            <svg
              className="mx-auto"
              width="16"
              height="30"
              viewBox="0 0 16 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2L8 28M8 28L2 22M8 28L14 22"
                stroke="#7F5539"
                strokeOpacity="0.6"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== SECTION 2: FOUNDER IMAGE ==================== */}
      <motion.section
        ref={imageRef}
        className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-10 bg-light-cream relative"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-[0.02]"
            initial={{ backgroundSize: "120%" }}
            animate={{ backgroundSize: imageInView ? "100%" : "120%" }}
            transition={{ duration: 3, ease: LUXURY_EASING }}
            style={{
              backgroundImage: "url('/images/brand/IMG_5460.jpg')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(1px)",
            }}
          />
        </div>

        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center relative z-10">
          <div className="md:col-span-7 relative">
            <motion.div
              className="relative overflow-hidden"
              style={{ y: parallaxY1 }}
            >
              {/* Founder image with frame */}
              <motion.div
                className="relative"
                initial={{ clipPath: "inset(10% 10% 10% 10%)" }}
                animate={{
                  clipPath: imageInView
                    ? "inset(0% 0% 0% 0%)"
                    : "inset(10% 10% 10% 10%)",
                }}
                transition={{ duration: 1.4, ease: LUXURY_EASING }}
              >
                <div className="relative border-[0.25px] border-soft-blush/20 overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <motion.div
                      className="absolute inset-0 z-10 bg-elegant-mocha/10"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: imageInView ? 0 : 0.7 }}
                      transition={{ duration: 1.2, ease: LUXURY_EASING }}
                    />

                    <Image
                      src={founderImage}
                      alt={`${founderName} - FaceFrame Beauty Founder`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center z-0"
                      priority
                      quality={95}
                    />
                  </div>
                </div>

                {/* Clean, refined frame - Chanel-inspired minimalism */}

                {/* Founder name and title */}
                <motion.div
                  className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: imageInView ? 1 : 0,
                    y: imageInView ? 0 : 15,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.7,
                    ease: LUXURY_EASING,
                  }}
                >
                  <div className="max-w-[90%] w-auto py-4 px-6 bg-black/80 backdrop-blur-sm border-[0.25px] border-white/20 flex flex-col items-center justify-center">
                    <p className="font-alice text-white text-base tracking-[0.25em] mb-2 text-center">
                      {founderName}
                    </p>
                    <div className="flex justify-center items-center w-full">
                      <p className="font-alta text-white/70 text-[11px] sm:text-xs font-medium tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.5em] text-center">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Descriptive text */}
          <motion.div
            className="md:col-span-5 pl-0 md:pl-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: imageInView ? 1 : 0, x: imageInView ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
            style={{ y: parallaxY2 }}
          >
            <div className="py-6 pr-4">
              <motion.h3
                className="font-alice text-elegant-mocha/90 text-2xl sm:text-3xl tracking-[0.2em] uppercase mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: imageInView ? 1 : 0,
                  y: imageInView ? 0 : 20,
                }}
                transition={{ duration: 0.8, delay: 0.8, ease: LUXURY_EASING }}
              >
                The Artist
              </motion.h3>

              <motion.div
                className="w-10 h-[0.25px] bg-elegant-mocha/30 mb-8"
                initial={{ width: 0 }}
                animate={{ width: imageInView ? 40 : 0 }}
                transition={{ duration: 1, delay: 1, ease: LUXURY_EASING }}
              />

              <motion.p
                className="font-alta text-elegant-mocha/70 tracking-wide leading-relaxed text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageInView ? 1 : 0 }}
                transition={{ duration: 1, delay: 1.2, ease: LUXURY_EASING }}
              >
                After perfecting her craft across Europe&apos;s elite beauty
                institutions, {founderName} established a new standard in beauty
                artistry. Each precise movement reflects years of dedicated
                expertise.
              </motion.p>

              <motion.div
                className="w-6 h-[0.25px] bg-elegant-mocha/30 mt-8 ml-auto"
                initial={{ width: 0 }}
                animate={{ width: imageInView ? 24 : 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: LUXURY_EASING }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== SECTION 3: PHILOSOPHY QUOTE ==================== */}
      <motion.section
        ref={quoteRef}
        className="h-screen flex items-center justify-center px-5 sm:px-6 bg-light-cream relative"
      >
        {/* Simplified design - removed grid lines for cleaner Chanel-esque aesthetic */}

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Quote display */}
          <motion.div className="text-center px-6" style={{ y: parallaxY3 }}>
            <motion.div className="w-full text-center">
              <motion.p
                className="font-alta text-elegant-mocha/60 text-xs tracking-[0.4em] uppercase mb-16 text-center inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: quoteInView ? 1 : 0,
                  y: quoteInView ? 0 : 10,
                }}
                transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASING }}
              >
                Philosophy
              </motion.p>
            </motion.div>

            {/* Quote with refined minimal styling - Chanel-inspired simplicity */}
            <div className="relative">
              <motion.div
                className="w-16 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: LUXURY_EASING }}
              />

              <motion.blockquote
                className="font-alice text-2xl sm:text-3xl md:text-4xl text-elegant-mocha/90 leading-relaxed tracking-wide italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: LUXURY_EASING }}
              >
                {quote}
              </motion.blockquote>

              <motion.div
                className="w-10 h-[0.25px] bg-elegant-mocha/30 mx-auto mt-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: LUXURY_EASING }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== SECTION 4: FOUNDER STORY ==================== */}
      <motion.section
        ref={storyRef}
        className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-16 bg-light-cream"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="mb-10 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: storyInView ? 1 : 0, y: storyInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASING }}
          >
            <h3 className="font-alice text-xl sm:text-2xl md:text-3xl tracking-[0.3em] text-elegant-mocha uppercase">
              Vision
            </h3>
            <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mt-4"></div>
          </motion.div>

          {/* Paragraphs with staggered reveal */}
          <motion.div
            className="font-alta text-elegant-mocha/70 space-y-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: storyInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASING }}
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: storyInView ? 1 : 0,
                  y: storyInView ? 0 : 15,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.2,
                  ease: LUXURY_EASING,
                }}
                className="leading-relaxed tracking-wide text-base md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            className="mt-16 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: storyInView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: LUXURY_EASING }}
          >
            <motion.svg
              width="180"
              height="50"
              viewBox="0 0 180 60"
              className="ml-auto text-elegant-mocha/70"
            >
              {/* Animated signature */}
              <motion.path
                d="M10,40 C20,20 40,10 60,30 C80,50 100,20 120,30 C140,40 160,20 170,30"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: storyInView ? 1 : 0,
                  opacity: storyInView ? 0.8 : 0,
                }}
                transition={{
                  duration: 2.5,
                  ease: LUXURY_EASING,
                  delay: 1.0,
                }}
              />
            </motion.svg>
            <p className="font-alice text-elegant-mocha/80 mt-3 tracking-[0.1em] text-sm text-right">
              {founderName}
            </p>
          </motion.div>

          {/* Standardized Booking CTA */}
          <motion.div
            className="mt-12 text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: storyInView ? 1 : 0, y: storyInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 1.2, ease: LUXURY_EASING }}
          >
            <LuxuryShadcnButton
              href="/booking"
              text="BOOK YOUR EXPERIENCE"
              luxuryVariant="elegant"
              luxuryTheme="dark"
              luxurySize="large"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutStrip;
