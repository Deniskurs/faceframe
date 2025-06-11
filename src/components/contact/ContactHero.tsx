"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import useTextAnimation from "@/utils/animations/useTextAnimation";
import LuxuryTextBackdrop from "@/components/shared/LuxuryTextBackdrop";

const ContactHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-based parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Text animations
  const titleAnimation = useTextAnimation("CONNECT WITH IGGY", {
    type: "character",
    staggerDelay: 0.08,
    delay: 0.6,
    ease: [...LUXURY_EASING],
  });

  const subtitleAnimation = useTextAnimation("YOUR BEAUTY JOURNEY BEGINS HERE", {
    type: "word",
    staggerDelay: 0.1,
    delay: 1.2,
    ease: [...LUXURY_EASING],
  });

  // Type the animation variants properly
  const titleAnim = titleAnimation as {
    containerVariants?: Variants;
    childVariants?: Variants;
    letters?: string[];
  };

  const subtitleAnim = subtitleAnimation as {
    containerVariants?: Variants;
    childVariants?: Variants;
    words?: string[];
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-[70vh] w-full overflow-hidden flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: LUXURY_EASING }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full absolute" style={{ scale: 1.05 }}>
          <Image
            src="/images/gallery/image16.webp"
            alt="Contact FaceFrame Beauty"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-elegant-mocha/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        </div>
      </motion.div>

      {/* Decorative corner accents */}
      <div className="absolute top-12 left-12 w-4 h-[0.5px] bg-white/30 hidden md:block"></div>
      <div className="absolute top-12 left-12 w-[0.5px] h-4 bg-white/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-4 h-[0.5px] bg-white/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-[0.5px] h-4 bg-white/30 hidden md:block"></div>

      {/* Main Content */}
      <motion.div
        className="w-full relative z-10 h-full flex flex-col justify-center items-center px-6"
        style={{ y: contentY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: LUXURY_EASING }}
      >
        <div className="w-full md:w-[75%] max-w-4xl text-center">
          {/* Opening line */}
          <motion.div
            className="w-12 h-[0.5px] bg-white/60 mx-auto mb-12"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
          />

          {/* Main Title */}
          <div className="mb-8">
            <motion.h1
              className="uppercase text-white font-alice text-center"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 325,
                letterSpacing: "0.2em",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: LUXURY_EASING }}
            >
              <motion.span
                className="inline-block"
                variants={titleAnim.containerVariants}
                initial="hidden"
                animate="visible"
              >
                {titleAnim.letters?.map((letter: string, index: number) => (
                  <LuxuryTextBackdrop
                    key={`title-${index}`}
                    intensity="strong"
                    isHeading={true}
                  >
                    <motion.span
                      variants={titleAnim.childVariants}
                      className="inline-block hero-heading-ios"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  </LuxuryTextBackdrop>
                ))}
              </motion.span>
            </motion.h1>
          </div>

          {/* Separator */}
          <motion.div
            className="h-[0.5px] w-16 bg-soft-blush/70 mx-auto my-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 1.0, ease: LUXURY_EASING }}
          />

          {/* Subtitle */}
          <div className="overflow-hidden w-full">
            <h2
              className="text-soft-blush font-alice text-center letter-spacing-elegant"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                fontWeight: 325,
                letterSpacing: "0.15em",
                textShadow: "0 0.5px 2px rgba(0,0,0,0.25)",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              <motion.span
                className="inline-block"
                variants={subtitleAnim.containerVariants}
                initial="hidden"
                animate="visible"
              >
                {subtitleAnim.words?.map((word: string, index: number) => (
                  <motion.span
                    key={`subtitle-${index}`}
                    className="inline-block enhanced-text-contrast"
                    variants={subtitleAnim.childVariants}
                  >
                    {word}
                    {index !== (subtitleAnim.words?.length || 0) - 1 && "\u00A0"}
                  </motion.span>
                ))}
              </motion.span>
            </h2>
          </div>

          {/* Description */}
          <div className="mt-12 mx-auto">
            <motion.div
              className="h-[0.5px] w-8 bg-white/50 mx-auto mb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 32, opacity: 0.5 }}
              transition={{ duration: 1, delay: 1.8, ease: LUXURY_EASING }}
            />

            <motion.p
              className="text-center text-white/95 font-alta"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                letterSpacing: "0.05em",
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: "0 0.5px 1px rgba(0,0,0,0.2)",
                maxWidth: "min(32rem, 90%)",
                margin: "0 auto",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9, ease: LUXURY_EASING }}
            >
              Ready to enhance your natural beauty? Let&apos;s discuss your vision and create a bespoke treatment plan that celebrates who you are.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8, ease: LUXURY_EASING }}
        >
          <p className="font-alta text-white text-[10px] tracking-[0.25em] uppercase mb-3 opacity-70">
            Get in touch
          </p>
          <motion.div
            className="w-[0.5px] h-6 bg-white/50"
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

export default ContactHero;