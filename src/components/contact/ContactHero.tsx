"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock } from "lucide-react";
import Image from "next/image";

/**
 * ContactHero - Editorial Split Hero
 * Asymmetric 60/40 layout that breaks from traditional centered heroes
 * Left: Parallax studio image | Right: Floating invitation card
 */
export function ContactHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-light-cream">
      {/* CHANEL-inspired corner accents */}
      <div className="absolute top-8 left-8 hidden lg:block z-30">
        <motion.div
          className="w-16 h-[1px] bg-elegant-mocha/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="w-[1px] h-16 bg-elegant-mocha/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.6 }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block z-30">
        <motion.div
          className="w-16 h-[1px] bg-elegant-mocha/30 ml-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.7 }}
          style={{ transformOrigin: "right" }}
        />
        <motion.div
          className="w-[1px] h-16 bg-elegant-mocha/30 ml-auto"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.8 }}
          style={{ transformOrigin: "bottom" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE - 60% - Parallax Image */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-sm">
              {/* Parallax wrapper */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7, ease: LUXURY_EASING }}
              >
                <Image
                  src="/images/hero/image4.webp"
                  alt="FaceFrame Beauty Studio"
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                />
                {/* Gradient overlay for sophistication */}
                <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating decorative element */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.6 }}
              >
                <p className="font-alta text-elegant-mocha/80 text-sm tracking-[0.08em] leading-relaxed">
                  &ldquo;Every consultation begins with understanding your unique beauty vision&rdquo;
                </p>
                <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mt-4" />
              </motion.div>
            </div>

            {/* Decorative line accent */}
            <motion.div
              className="hidden lg:block absolute -right-12 top-1/2 w-8 h-[0.5px] bg-elegant-mocha/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.9 }}
            />
          </motion.div>

          {/* RIGHT SIDE - 40% - Floating Invitation Card */}
          <div className="lg:col-span-2 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.3 }}
            >
              {/* Main invitation content */}
              <div className="space-y-8">
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.5 }}
                >
                  <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
                    Let&apos;s Connect
                  </h3>
                  <div className="w-16 h-[0.5px] bg-elegant-mocha/25" />
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  className="font-alice text-4xl sm:text-5xl lg:text-6xl tracking-luxury text-elegant-mocha uppercase font-[350] leading-[1.1]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 0.6 }}
                >
                  Begin Your
                  <br />
                  Beauty Journey
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="font-alta text-elegant-mocha/70 text-base sm:text-lg tracking-[0.02em] leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.7 }}
                >
                  Whether you&apos;re seeking a consultation or ready to book your transformation,
                  I&apos;m here to create your personalized FaceFrame experience.
                </motion.p>

                {/* Quick contact badges */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="px-4 py-2 border-elegant-mocha/30 text-elegant-mocha bg-white/50 backdrop-blur-sm font-alta tracking-[0.08em] text-xs hover:bg-elegant-mocha/10 transition-colors duration-500"
                  >
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    Response in 24h
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 border-elegant-mocha/30 text-elegant-mocha bg-white/50 backdrop-blur-sm font-alta tracking-[0.08em] text-xs hover:bg-elegant-mocha/10 transition-colors duration-500"
                  >
                    <Clock className="w-3.5 h-3.5 mr-2" />
                    Tue-Sat 9:00-18:00
                  </Badge>
                </motion.div>

                {/* Decorative element */}
                <motion.div
                  className="pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[0.5px] bg-elegant-mocha/20" />
                    <p className="font-alta text-elegant-mocha/50 text-xs tracking-[0.15em] uppercase">
                      Scroll to explore
                    </p>
                    <div className="flex-1 h-[0.5px] bg-elegant-mocha/20" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: LUXURY_EASING, delay: 1.2 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-elegant-mocha/40 to-transparent"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: LUXURY_EASING,
          }}
        />
      </motion.div>
    </section>
  );
}
