"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center bg-light-cream"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/gallery/image25.webp"
            alt="Iggy - Founder of FaceFrame Beauty"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-light-cream/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
          {/* Additional vignette for text area */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/20"></div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-20"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Minimal accent line */}
          <motion.div
            className="w-16 h-[0.5px] bg-white/60 mb-12"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
          />

          {/* Headline */}
          <motion.h1
            className="font-alice text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight tracking-wide drop-shadow-2xl"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
          >
            The Art of
            <br />
            Natural Enhancement
          </motion.h1>

          {/* Subheading */}
          <motion.div
            className="max-w-2xl backdrop-blur-sm bg-white/5 p-8 border-l-2 border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
          >
            <p className="font-alta text-base md:text-lg text-white/95 leading-relaxed tracking-wide mb-6 font-medium">
              Founded by Iggy in 2018, FaceFrame Beauty represents a decade of
              mastery in semi-permanent makeup and aesthetic treatments.
            </p>
            <p className="font-alice text-lg md:text-xl text-white italic leading-relaxed tracking-wide">
              &ldquo;True beauty lies not in perfection, but in the confidence that
              comes from enhancing what makes you uniquely you.&rdquo;
            </p>
          </motion.div>

          {/* Decorative separator */}
          <motion.div
            className="w-24 h-[0.5px] bg-white/40 mt-16"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 0.4 }}
            transition={{ duration: 1.2, delay: 1.2, ease: LUXURY_EASING }}
          />

          {/* Location badge */}
          <motion.div
            className="mt-8 inline-flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: LUXURY_EASING }}
          >
            <span className="font-alta text-xs tracking-[0.3em] text-white/80 uppercase font-medium">
              London
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50"></span>
            <span className="font-alta text-xs tracking-[0.3em] text-white/80 uppercase font-medium">
              Est. 2018
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          ease: LUXURY_EASING,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
