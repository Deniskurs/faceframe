"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const PersonalInvitation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] w-full overflow-hidden flex items-center pt-20 pb-0"
    >
      {/* Background Image with Parallax - Light Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/brand/IMG_5461.webp"
            alt="FaceFrame Beauty Studio"
            fill
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Light cream overlay instead of dark */}
          <div className="absolute inset-0 bg-light-cream/85"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-light-cream/60 to-white/50"></div>
        </div>
      </motion.div>

      {/* Floating Cream Card */}
      <div ref={ref} className="relative z-10 w-full px-6">
        <motion.div
          className="max-w-xl mx-auto bg-white/95 backdrop-blur-sm border border-soft-blush/20 shadow-2xl p-12 md:p-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASING }}
        >
          {/* Circular Portrait */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASING }}
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-soft-blush/30 shadow-lg">
              <Image
                src="/images/gallery/image25.webp"
                alt="Iggy - Founder"
                fill
                quality={95}
                className="object-cover object-center"
                sizes="192px"
              />
            </div>
          </motion.div>

          {/* Minimal decorative line */}
          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/20 mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 64, opacity: 0.2 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
          />

          {/* Invitation Text */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7, ease: LUXURY_EASING }}
          >
            <p className="font-alice text-lg md:text-xl text-elegant-mocha leading-relaxed mb-6">
              If you&rsquo;re seeking an artist who values precision, natural
              results, and genuine care—I&rsquo;d be honored to meet you.
            </p>
            <p className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/60">
              — Iggy
            </p>
          </motion.div>

          {/* Single CTA Button - Dark on Light */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9, ease: LUXURY_EASING }}
          >
            <LuxuryShadcnButton
              href="/booking"
              text="BOOK A CONSULTATION"
              luxuryVariant="elegant"
              luxuryTheme="light"
              luxurySize="large"
              enableMobilePatternInterrupt={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalInvitation;
