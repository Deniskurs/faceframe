"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const ContactHero = () => {
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
      className="relative min-h-[85vh] w-full overflow-hidden flex items-center bg-light-cream"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/gallery/image25.webp"
            alt="Contact FaceFrame Beauty"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-light-cream/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
        </div>
      </motion.div>

      {/* Chanel-inspired corner accents */}
      <motion.div
        className="absolute top-12 left-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-white/30"></div>
        <div className="w-[0.5px] h-12 bg-white/30"></div>
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-white/30 ml-auto"></div>
        <div className="w-[0.5px] h-12 bg-white/30 ml-auto"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-20"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Minimal accent line */}
          <motion.div
            className="w-16 h-[0.5px] bg-white/60 mb-12 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
          />

          {/* Headline */}
          <motion.h1
            className="font-alice text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight tracking-[0.2em] uppercase drop-shadow-2xl"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
          >
            Let&apos;s Begin Your
            <br />
            Beauty Journey
          </motion.h1>

          {/* Subheading */}
          <motion.div
            className="max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-8 border-l-2 border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
          >
            <p className="font-alta text-base md:text-lg text-white/95 leading-relaxed tracking-wide font-light">
              Whether you&apos;re booking your first consultation or have questions about our services,
              I&apos;m here to help you discover the perfect treatment for your unique beauty goals.
            </p>
          </motion.div>

          {/* Decorative separator */}
          <motion.div
            className="w-24 h-[0.5px] bg-white/40 mt-16 mx-auto"
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
            <span className="font-alta text-xs tracking-[0.3em] text-white/80 uppercase font-light">
              East London
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50"></span>
            <span className="font-alta text-xs tracking-[0.3em] text-white/80 uppercase font-light">
              By Appointment
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

export default ContactHero;
