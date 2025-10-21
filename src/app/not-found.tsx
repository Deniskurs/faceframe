"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import LuxuryTextBackdrop from "@/components/shared/LuxuryTextBackdrop";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const NotFound = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Refined mouse position values for subtle spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 30, damping: 25 });
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

  // Scroll-based parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: LUXURY_EASING }}
    >
      {/* Background Layer with luxury gradient */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full relative bg-gradient-to-br from-light-cream via-soft-blush to-warm-beige">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('/images/hero/hero-background.svg')] bg-repeat"></div>
          
          {/* Enhanced gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-elegant-mocha/5 via-transparent to-elegant-mocha/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-bronze/5 via-transparent to-deep-bronze/5"></div>
        </div>
      </motion.div>

      {/* CHANEL-inspired corner accents */}
      <div className="absolute top-12 left-12 w-6 h-[0.5px] bg-elegant-mocha/30 hidden md:block"></div>
      <div className="absolute top-12 left-12 w-[0.5px] h-6 bg-elegant-mocha/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-6 h-[0.5px] bg-elegant-mocha/30 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-[0.5px] h-6 bg-elegant-mocha/30 hidden md:block"></div>

      {/* Subtle vignette effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[5] opacity-20"
        style={{
          background: `radial-gradient(circle at ${springMouseX}px ${springMouseY}px, transparent 20%, rgba(127,85,57,0.1) 80%)`,
        }}
      />

      {/* Main Content Container */}
      <motion.div
        className="w-full relative z-10 h-full flex flex-col justify-center items-center px-6"
        style={{ y: contentY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: LUXURY_EASING }}
      >
        <div className="w-full max-w-2xl text-center">
          {/* Logo/Brand Icon */}
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
          >
            <div className="w-20 h-20 relative">
              <Image
                src="/images/logo/tl-brown.webp"
                alt="FaceFrame Beauty Logo"
                fill
                className="object-contain opacity-80"
                priority
              />
            </div>
          </motion.div>

          {/* CHANEL-inspired horizontal line */}
          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/60 mx-auto mb-12"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1.5, delay: 0.8, ease: LUXURY_EASING }}
          />

          {/* 404 Number with luxury styling */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: LUXURY_EASING }}
          >
            <h1
              className="font-alice text-elegant-mocha mb-4"
              style={{
                fontSize: "clamp(4rem, 12vw, 8rem)",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              <LuxuryTextBackdrop intensity="light" isHeading={true}>
                404
              </LuxuryTextBackdrop>
            </h1>
          </motion.div>

          {/* Elegant separator */}
          <motion.div
            className="h-[0.5px] w-24 bg-deep-bronze/50 mx-auto mb-10"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 0.5 }}
            transition={{ duration: 1.2, delay: 1.3, ease: LUXURY_EASING }}
          />

          {/* Main Heading */}
          <motion.h2
            className="font-alice text-elegant-mocha mb-6"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 325,
              letterSpacing: "0.12em",
              lineHeight: 1.3,
              textRendering: "geometricPrecision",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: LUXURY_EASING }}
          >
            <LuxuryTextBackdrop intensity="medium" isHeading={true}>
              PAGE NOT FOUND
            </LuxuryTextBackdrop>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="font-alta text-luxury-secondary mb-12"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.6,
              maxWidth: "min(32rem, 90%)",
              margin: "0 auto 3rem auto",
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: LUXURY_EASING }}
          >
            The page you&apos;re looking for has been moved or doesn&apos;t exist. Let us guide you back to our luxury beauty experience.
          </motion.p>

          {/* Decorative center dot */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.9, ease: LUXURY_EASING }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-deep-bronze/70"></div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.1, ease: LUXURY_EASING }}
          >
            <div className="w-full sm:w-auto">
              <LuxuryShadcnButton
                href="/"
                text="RETURN HOME"
                luxuryVariant="elegant"
                luxuryTheme="light"
                luxurySize="large"
                className="w-full sm:w-auto min-w-[180px] justify-center"
              />
            </div>
            <div className="w-full sm:w-auto">
              <LuxuryShadcnButton
                href="/services"
                text="VIEW SERVICES"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="large"
                className="w-full sm:w-auto min-w-[180px] justify-center"
              />
            </div>
          </motion.div>

          {/* Additional Navigation Links */}
          <motion.div
            className="mt-16 pt-8 border-t border-elegant-mocha/10 w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5, ease: LUXURY_EASING }}
          >
            <motion.p 
              className="font-alta text-luxury-subtle text-sm uppercase tracking-[0.15em] mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6, ease: LUXURY_EASING }}
            >
              Quick Navigation
            </motion.p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/booking", label: "Book Now" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 2.7 + index * 0.1,
                    ease: LUXURY_EASING,
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-alta text-elegant-mocha hover:text-deep-bronze transition-colors duration-500 text-sm tracking-[0.1em] uppercase relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-deep-bronze/60 group-hover:w-full transition-all duration-700 ease-luxury"></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator (if page is long enough) */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 3.5, duration: 1, ease: LUXURY_EASING }}
        >
          <p className="font-alta text-elegant-mocha text-[9px] tracking-[0.3em] uppercase mb-2">
            FaceFrame Beauty
          </p>
          <div className="w-[0.5px] h-6 bg-elegant-mocha/40"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default NotFound;