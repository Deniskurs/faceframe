"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { Instagram, Facebook, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/**
 * SocialConnect - Follow the Journey
 * Closing CTA section with social media links and service exploration
 */
export function SocialConnect() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-light-cream via-white to-light-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-soft-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-5xl relative z-10">
        {/* Main content */}
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          {/* Title section */}
          <div>
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-deep-bronze" />
              <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase">
                Stay Connected
              </h3>
              <Sparkles className="w-5 h-5 text-deep-bronze" />
            </motion.div>

            <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350] mb-6">
              Follow the Journey
            </h2>

            <p className="font-alta text-elegant-mocha/70 text-base sm:text-lg tracking-[0.02em] leading-relaxed max-w-2xl mx-auto">
              See the latest transformations, beauty insights, and behind-the-scenes moments
              from the FaceFrame studio
            </p>
          </div>

          {/* Social media links */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.3 }}
          >
            <a
              href="https://instagram.com/faceframe_beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                className="flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-elegant-mocha/20 rounded-sm hover:bg-elegant-mocha hover:border-elegant-mocha transition-all duration-700"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              >
                <Instagram className="w-5 h-5 text-elegant-mocha group-hover:text-white transition-colors duration-700" />
                <span className="font-alta text-elegant-mocha group-hover:text-white tracking-[0.08em] text-sm transition-colors duration-700">
                  @faceframe_beauty
                </span>
              </motion.div>
            </a>

            <a
              href="https://facebook.com/FaceFrameBeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                className="flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-elegant-mocha/20 rounded-sm hover:bg-elegant-mocha hover:border-elegant-mocha transition-all duration-700"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              >
                <Facebook className="w-5 h-5 text-elegant-mocha group-hover:text-white transition-colors duration-700" />
                <span className="font-alta text-elegant-mocha group-hover:text-white tracking-[0.08em] text-sm transition-colors duration-700">
                  FaceFrameBeauty
                </span>
              </motion.div>
            </a>
          </motion.div>

          {/* Decorative separator */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.5 }}
          >
            <Separator className="bg-elegant-mocha/20" />
          </motion.div>

          {/* Alternative CTA */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.6 }}
          >
            <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.04em]">
              Still exploring your options?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LuxuryShadcnButton
                text="View Services"
                href="/services"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="medium"
              />
              <LuxuryShadcnButton
                text="See Gallery"
                href="/gallery"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="medium"
              />
            </div>
          </motion.div>

          {/* Bottom decorative quote */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.8 }}
          >
            <div className="inline-block">
              <p className="font-alta text-elegant-mocha/50 text-xs tracking-[0.15em] uppercase italic">
                &ldquo;Beauty is an experience, not a destination&rdquo;
              </p>
              <div className="w-24 h-[0.5px] bg-elegant-mocha/20 mt-3 mx-auto" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
