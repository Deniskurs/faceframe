"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { Separator } from "@/components/ui/separator";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const AboutCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] w-full overflow-hidden flex items-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/brand/IMG_5461.webp"
            alt="Begin your FaceFrame Beauty journey"
            fill
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Elegant dark overlay */}
          <motion.div
            className="absolute inset-0 bg-elegant-mocha"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/70 via-elegant-mocha/40 to-transparent"></div>
        </div>
      </motion.div>

      {/* Content */}
      <div ref={ref} className="relative z-10 w-full px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative line */}
          <motion.div
            className="w-16 h-[0.5px] bg-white/40 mx-auto mb-12"
            initial={{ width: 0, opacity: 0 }}
            animate={
              inView ? { width: 64, opacity: 0.4 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 1.2, delay: 0.3, ease: LUXURY_EASING }}
          />

          {/* Main Heading */}
          <motion.h2
            className="font-alice text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.5, ease: LUXURY_EASING }}
          >
            Begin Your Journey
            <br />
            to Enhanced Beauty
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-alta text-base md:text-lg text-white/90 leading-relaxed tracking-wide max-w-2xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7, ease: LUXURY_EASING }}
          >
            Limited appointments available each week. Join discerning clients
            who trust FaceFrame Beauty for precision, care, and results that
            enhance their natural beauty.
          </motion.p>

          {/* Separator */}
          <motion.div
            className="max-w-xs mx-auto my-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: LUXURY_EASING }}
          >
            <Separator className="bg-white/30" />
          </motion.div>

          {/* Personal Invitation */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.1, ease: LUXURY_EASING }}
          >
            <p className="font-alice text-lg md:text-xl italic text-white/95 leading-relaxed max-w-xl mx-auto">
              &ldquo;I look forward to welcoming you to FaceFrame Beauty and helping
              you discover the confidence that comes from feeling naturally,
              beautifully you.&rdquo;
            </p>
            <p className="font-alta text-sm tracking-[0.3em] uppercase text-white/70 mt-6">
              — Iggy, Founder
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASING }}
          >
            <LuxuryShadcnButton
              href="/booking"
              text="BOOK YOUR CONSULTATION"
              luxuryVariant="elegant"
              luxuryTheme="dark"
              luxurySize="large"
              className="w-full sm:w-auto min-w-[240px]"
            />
            <LuxuryShadcnButton
              href="/services"
              text="EXPLORE SERVICES"
              luxuryVariant="outline"
              luxuryTheme="transparent"
              luxurySize="large"
              className="w-full sm:w-auto min-w-[240px]"
            />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-16 pt-12 border-t border-white/20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: LUXURY_EASING }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-alta text-xs tracking-[0.3em] uppercase text-white/60 mb-2">
                  Location
                </p>
                <p className="font-alta text-sm text-white font-medium">London</p>
              </div>
              <div>
                <p className="font-alta text-xs tracking-[0.3em] uppercase text-white/60 mb-2">
                  By Appointment
                </p>
                <p className="font-alta text-sm text-white font-medium">Tue — Sat</p>
              </div>
              <div>
                <p className="font-alta text-xs tracking-[0.3em] uppercase text-white/60 mb-2">
                  Contact
                </p>
                <p className="font-alta text-sm text-white font-medium">
                  hello@faceframebeauty.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
