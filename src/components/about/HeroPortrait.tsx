"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const HeroPortrait = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: LUXURY_EASING }}
    >
      {/* Background Portrait */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full relative">
          <Image
            src="/images/gallery/image25.webp"
            alt="Iggy - Master Artist & Founder"
            fill
            priority
            quality={98}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-elegant-mocha/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        </div>
      </motion.div>

      {/* CHANEL-inspired corner accents */}
      <motion.div
        className="absolute top-12 left-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-white/40"></div>
        <div className="w-[0.5px] h-12 bg-white/40"></div>
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-white/40 ml-auto"></div>
        <div className="w-[0.5px] h-12 bg-white/40 ml-auto"></div>
      </motion.div>

      {/* Centered Content */}
      <motion.div
        className="relative z-10 w-full px-6 text-center"
        style={{ opacity }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Minimal accent line */}
          <motion.div
            className="w-20 h-[0.5px] bg-white/70 mx-auto mb-10"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 0.8, ease: LUXURY_EASING }}
          />

          {/* Main Statement - 3 lines maximum */}
          <motion.h1
            className="font-alice text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{
              textShadow:
                "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
          >
            Ten years of European mastery.
          </motion.h1>

          <motion.p
            className="font-alta text-base md:text-lg text-white/95 tracking-wide font-medium mb-8"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.9)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
          >
            One unwavering commitment to your natural beauty.
          </motion.p>

          {/* Minimal separator */}
          <motion.div
            className="w-20 h-[0.5px] bg-white/60 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 1, ease: LUXURY_EASING }}
          />

          {/* Attribution */}
          <motion.p
            className="font-alta text-xs tracking-[0.3em] uppercase text-white/80 font-medium"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASING }}
          >
            Iggy, Founder
          </motion.p>
        </div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
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
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
      </motion.div>
    </motion.section>
  );
};

export default HeroPortrait;
