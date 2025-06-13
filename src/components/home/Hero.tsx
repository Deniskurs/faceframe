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
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import LuxuryTextBackdrop from "@/components/shared/LuxuryTextBackdrop";
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

  const subtitleAnimation = useTextAnimation("SIGNATURE BEAUTY EXPERIENCES", {
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
              {/* Chanel-inspired controlled width container to prevent wrapping */}
              <div className="overflow-hidden w-full">
                {/* FACEFRAME title with fixed width constraints */}
                <motion.h1
                  className="uppercase text-white hero-heading alice-text whitespace-nowrap mx-auto"
                  style={{
                    width: "fit-content",
                    fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                    fontWeight: 325,
                    letterSpacing: "0.25em",
                    textRendering: "geometricPrecision",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
                >
                  <motion.span
                    className="inline-block"
                    variants={line1Animation.containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {line1Animation.letters?.map(
                      (letter: string, index: number) => (
                        <LuxuryTextBackdrop
                          key={`title1-${index}`}
                          intensity="strong"
                          isHeading={true}
                        >
                          <motion.span
                            variants={line1Animation.childVariants}
                            className="inline-block hero-heading-ios"
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </motion.span>
                        </LuxuryTextBackdrop>
                      )
                    )}
                  </motion.span>
                </motion.h1>
              </div>

              {/* BEAUTY title with fixed width constraints */}
              <div className="overflow-hidden w-full mt-1">
                <motion.h1
                  className="uppercase text-white hero-heading alice-text whitespace-nowrap mx-auto"
                  style={{
                    width: "fit-content",
                    fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                    fontWeight: 325,
                    letterSpacing: "0.25em",
                    textRendering: "geometricPrecision",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
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
                        <LuxuryTextBackdrop
                          key={`title2-${index}`}
                          intensity="strong"
                          isHeading={true}
                        >
                          <motion.span
                            variants={line2Animation.childVariants}
                            className="inline-block hero-heading-ios"
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </motion.span>
                        </LuxuryTextBackdrop>
                      )
                    )}
                  </motion.span>
                </motion.h1>
              </div>
            </div>

            {/* Refined separator with animation */}
            <motion.div
              className="h-[0.5px] w-20 bg-soft-blush/70 mx-auto my-10"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 0.7 }}
              transition={{ duration: 1.2, delay: 1.6, ease: LUXURY_EASING }}
            />

            {/* Subtitle with Chanel-like controlled width */}
            <div className="overflow-hidden w-full mt-6 md:mt-8">
              <h2
                className="text-soft-blush alice-text text-on-dark mx-auto letter-spacing-elegant"
                style={{
                  width: "fit-content",
                  fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
                  fontWeight: 325,
                  letterSpacing: "0.18em",
                  textShadow: "0 0.5px 2px rgba(0,0,0,0.25)",
                  textRendering: "geometricPrecision",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                <motion.span
                  className="inline-block"
                  variants={wordAnimation.containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {wordAnimation.words?.map((word: string, index: number) => (
                    <motion.span
                      key={`subtitle-${index}`}
                      className="inline-block enhanced-text-contrast"
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
            </div>

            {/* Chanel-inspired description with perfect visual hierarchy */}
            <div className="mt-12 md:mt-16 mx-auto px-2 py-0.5 hero-description-container">
              {/* Subtle elegant separator line */}
              <motion.div
                className="h-[0.5px] w-8 bg-white/50 mx-auto mb-9"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 0.5 }}
                transition={{ duration: 1, delay: 1.9, ease: LUXURY_EASING }}
              />

              {/* Primary statement - brand positioning with enhanced typography */}
              <motion.p
                className="text-center text-white font-alta hero-description"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.4,
                  fontWeight: 400,
                  textShadow:
                    "0 0.5px 1px rgba(0,0,0,0.2), 0 0 3px rgba(0,0,0,0.1)",
                  maxWidth: "min(28rem, 90%)",
                  margin: "0 auto",
                  paddingBottom: "0.1em",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.9, ease: LUXURY_EASING }}
              >
                London&apos;s premier destination for bespoke beauty
                transformations.
              </motion.p>

              {/* Decorative center dot - Chanel-inspired separator with golden ratio spacing */}
              <div className="flex justify-center my-5">
                <div className="w-1 h-1 rounded-full bg-soft-blush/80 opacity-90"></div>
              </div>

              {/* Secondary details with increased contrast and refined typography */}
              <motion.p
                className="text-center text-white/95 font-alta hero-description"
                style={{
                  fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.38,
                  maxWidth: "min(28rem, 90%)",
                  margin: "0 auto",
                  paddingTop: "0.1em",
                  fontWeight: 400,
                  textShadow:
                    "0 0.5px 1px rgba(0,0,0,0.2), 0 0 3px rgba(0,0,0,0.1)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.1, ease: LUXURY_EASING }}
              >
                Expert semi-permanent makeup, lashes, brows and luxury facials.
              </motion.p>
            </div>

            {/* Dual Booking Path CTA Buttons with responsive spacing */}
            <motion.div
              className="mt-12 md:mt-16 lg:mt-20 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8 w-full max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: LUXURY_EASING }}
            >
              <div className="w-full lg:w-auto">
                <LuxuryShadcnButton
                  href="/booking"
                  text="BOOK NOW"
                  luxuryVariant="elegant"
                  luxuryTheme="transparent"
                  luxurySize="large"
                  className="w-full lg:w-auto min-w-[200px] justify-center"
                />
              </div>
              <div className="w-full lg:w-auto">
                <LuxuryShadcnButton
                  href="/services"
                  text="VIEW SERVICES"
                  luxuryVariant="outline"
                  luxuryTheme="transparent"
                  luxurySize="large"
                  className="w-full lg:w-auto min-w-[200px] justify-center"
                />
              </div>
            </motion.div>
          </div>
        </div>

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
