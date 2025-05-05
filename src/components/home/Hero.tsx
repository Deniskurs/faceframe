"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import useTextAnimation from "@/utils/animations/useTextAnimation";
import GlassMorphicCard from "../shared/GlassMorphicCard";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const Hero = () => {
  // Refs for various elements
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Refined mouse position values for subtle spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 30, damping: 25 }); // More gentle spring physics
  const springMouseY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  // Track mouse for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Multi-layer scroll-based parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Split title into two lines for more CHANEL-like presentation
  const titleLine1Animation = useTextAnimation("F A C E F R A M E", {
    type: "character",
    staggerDelay: 0.1, // More deliberate reveal
    delay: 0.7,
    ease: [...LUXURY_EASING], // Convert readonly array to regular array
  });

  const titleLine2Animation = useTextAnimation("B E A U T Y", {
    type: "character",
    staggerDelay: 0.1,
    delay: 0.9,
    ease: [...LUXURY_EASING], // Convert readonly array to regular array
  });

  const subtitleAnimation = useTextAnimation("LUXURY BEAUTY EXPERIENCES", {
    type: "word",
    staggerDelay: 0.1,
    delay: 1.7, // Longer delay for hierarchy
    ease: [...LUXURY_EASING], // Convert readonly array to regular array
  });

  // Define proper types for animation variants
  type AnimationVariants = {
    hidden: { opacity: number; y?: number };
    visible: {
      opacity: number;
      y?: number;
      transition: {
        staggerChildren?: number;
        delayChildren?: number;
        type?: string;
        damping?: number;
        stiffness?: number;
      };
    };
  };

  // Extract the animation variants we need with proper typing
  const line1Animation = titleLine1Animation as {
    containerVariants?: AnimationVariants;
    childVariants?: AnimationVariants;
    letters?: string[];
    isAnimating?: boolean;
  };

  const line2Animation = titleLine2Animation as {
    containerVariants?: AnimationVariants;
    childVariants?: AnimationVariants;
    letters?: string[];
    isAnimating?: boolean;
  };

  const wordAnimation = subtitleAnimation as {
    containerVariants?: AnimationVariants;
    childVariants?: AnimationVariants;
    words?: string[];
    isAnimating?: boolean;
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: LUXURY_EASING }}
    >
      {/* Background Layer with enhanced gradients */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <motion.div
          ref={backgroundRef}
          className="w-full h-full absolute"
          style={{ scale: 1.05 }}
        >
          <Image
            src="/images/hero/image4.webp"
            alt="FaceFrame Beauty hero image"
            fill
            priority
            quality={98}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Enhanced gradient overlays for deeper contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-elegant-mocha/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent"></div>
        </motion.div>
      </motion.div>

      {/* CHANEL-inspired corner accents */}
      <div className="absolute top-12 left-12 w-4 h-[0.5px] bg-white/30 hidden md:block"></div>
      <div className="absolute top-12 left-12 w-[0.5px] h-4 bg-white/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-4 h-[0.5px] bg-white/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-[0.5px] h-4 bg-white/30 hidden md:block"></div>

      {/* Subtle vignette effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[5] opacity-35"
        style={{
          background: `radial-gradient(circle at ${springMouseX}px ${springMouseY}px, transparent 10%, rgba(0,0,0,0.7) 70%)`,
        }}
      />

      {/* Textured overlay */}
      <div className="absolute inset-0 z-[3] opacity-10 bg-[url('/images/hero/hero-background.svg')] bg-repeat"></div>

      {/* Main Content Container */}
      <motion.div
        className="w-full relative z-10 h-full flex flex-col justify-center items-center px-6"
        style={{ y: contentY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASING }}
      >
        <div className="w-full md:w-[75%] max-w-3xl text-center">
          {/* CHANEL-inspired horizontal line */}
          <motion.div
            className="w-12 h-[0.5px] bg-white/60 mx-auto mb-16 md:mb-20"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.6, ease: LUXURY_EASING }}
          />

          {/* Ultra-minimal CHANEL-inspired heading structure */}
          <div className="mb-28 md:mb-32">
            {/* Main Heading split into two lines */}
            <div className="mb-8">
              {/* First line with responsive letter spacing to prevent wrapping on iPhone */}
              <motion.h1
                className="text-white tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.5em] uppercase text-3xl sm:text-4xl md:text-5xl font-light"
                initial={{ opacity: 0, letterSpacing: "0.15em" }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
                style={{ textShadow: "0 0 12px rgba(255,255,255,0.1)" }}
              >
                <motion.span
                  className="inline-block"
                  variants={line1Animation.containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {line1Animation.letters?.map(
                    (letter: string, index: number) => (
                      <motion.span
                        key={`title1-${index}`}
                        variants={line1Animation.childVariants}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    )
                  )}
                </motion.span>
              </motion.h1>

              {/* Second line with increased letter spacing */}
              <motion.h1
                className="text-white tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] uppercase text-2xl sm:text-3xl md:text-4xl font-extralight mt-1 md:mt-2"
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 2, delay: 0.7, ease: LUXURY_EASING }}
              >
                <motion.span
                  className="inline-block"
                  variants={line2Animation.containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {line2Animation.letters?.map(
                    (letter: string, index: number) => (
                      <motion.span
                        key={`title2-${index}`}
                        variants={line2Animation.childVariants}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    )
                  )}
                </motion.span>
              </motion.h1>
            </div>

            {/* Refined separator with animation */}
            <motion.div
              className="h-[0.5px] w-20 bg-soft-blush/70 mx-auto my-10"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 0.7 }}
              transition={{ duration: 1.2, delay: 1.6, ease: LUXURY_EASING }}
            />

            {/* Subtitle with refined tracking */}
            <h2 className="text-soft-blush text-xs sm:text-sm md:text-base tracking-[0.3em] font-extralight">
              <motion.span
                className="inline-block"
                variants={wordAnimation.containerVariants}
                initial="hidden"
                animate="visible"
              >
                {wordAnimation.words?.map((word: string, index: number) => (
                  <motion.span
                    key={`subtitle-${index}`}
                    className="inline-block"
                    variants={wordAnimation.childVariants}
                    whileHover={{
                      color: "#FFFFFF",
                      transition: { duration: 0.4 },
                    }}
                  >
                    {word}
                    {index !== (wordAnimation.words?.length || 0) - 1 &&
                      "\u00A0"}
                  </motion.span>
                ))}
              </motion.span>
            </h2>

            {/* Description with more refined typography */}
            <motion.p
              className="font-alta text-sm md:text-base text-white/80 mt-12 md:mt-16 max-w-lg mx-auto leading-relaxed tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2, ease: LUXURY_EASING }}
            >
              London&apos;s premier destination for bespoke beauty
              transformations. Expert semi-permanent makeup, lashes, brows and
              luxury facials.
            </motion.p>

            {/* Standardized CTA Button */}
            <motion.div
              className="mt-16 md:mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: LUXURY_EASING }}
            >
              <LuxuryButton
                href="/booking"
                text="BOOK YOUR APPOINTMENT"
                variant="primary"
                size="large"
              />
            </motion.div>
          </div>
        </div>

        {/* Social proof positioned to the side on larger screens */}
        <motion.div
          className="absolute bottom-32 md:bottom-36 right-8 md:right-16 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: LUXURY_EASING }}
        >
          <GlassMorphicCard intensity="light" className="px-5 py-3">
            <div className="text-white text-center">
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-soft-blush mx-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 2.8 + i * 0.1,
                      duration: 0.4,
                      ease: LUXURY_EASING,
                    }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] font-alta tracking-[0.15em]">
                TRUSTED BY LONDON&apos;S ELITE
              </p>
            </div>
          </GlassMorphicCard>
        </motion.div>

        {/* Repositioned scroll indicator to be explicitly below all content */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8, ease: LUXURY_EASING }}
        >
          <p className="font-alta text-white text-[10px] tracking-[0.25em] uppercase mb-3 opacity-70">
            Discover
          </p>
          <motion.div
            className="w-[0.5px] h-8 bg-white/50"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
