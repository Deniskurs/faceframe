"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import useAnimateOnScroll from "@/utils/animations/useAnimateOnScroll";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import {
  LUXURY_EASING,
  standardViewport,
} from "@/utils/animations/luxuryAnimations";

interface BookingCTAProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const BookingCTA = ({
  backgroundImage = "/images/gallery/image14.webp",
  title = "BOOK YOUR APPOINTMENT",
  subtitle = "Limited appointments available.",
  // buttonText = "SCHEDULE NOW",
  // buttonLink = "/booking",
  className = "",
}: BookingCTAProps) => {

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Use animate on scroll hook
  useAnimateOnScroll(sectionRef as unknown as React.RefObject<HTMLElement>, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <FadeInSection intensity="subtle">
      <motion.section
        ref={sectionRef}
        className={`relative py-32 md:py-40 overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: LUXURY_EASING }}
      >
        {/* Background with refined styling */}
        <motion.div
          ref={imageRef}
          className="absolute inset-0 z-0"
          style={{ scale: 1.05 }} // More subtle scale for refinement
        >
          <Image
            src={backgroundImage}
            alt="Luxury beauty experience"
            fill
            sizes="100vw"
            className="object-cover brightness-75"
            priority
          />
          {/* More sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-elegant-mocha/30 via-transparent to-black/50"></div>
        </motion.div>

        {/* CHANEL-inspired decorative elements */}
        <div className="absolute top-12 left-12 w-[0.5px] h-12 bg-white/30 hidden md:block"></div>
        <div className="absolute top-12 left-12 w-12 h-[0.5px] bg-white/30 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-[0.5px] h-12 bg-white/30 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-12 h-[0.5px] bg-white/30 hidden md:block"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          {/* Top decorative separator - editorial framing */}
          <motion.div
            className="w-24 h-[0.5px] bg-white/30 mx-auto mb-16"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 0.3 }}
            transition={{ duration: 1.2, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          />

          {/* CHANEL-style heading with refined typography */}
          <motion.div
            className="mb-12 inline-block"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <h2 className="font-alice text-3xl md:text-4xl tracking-[0.2em] text-white uppercase">
              {title}
            </h2>
            <div className="h-[0.5px] w-16 bg-white/40 mx-auto mt-8"></div>
          </motion.div>

          {/* Refined subtitle with proper tracking */}
          <motion.p
            className="font-alta text-base md:text-lg text-white/75 mb-[3.25rem] max-w-lg mx-auto tracking-wide leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          {/* Dual Booking Path Options */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6 w-full max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASING }}
            viewport={standardViewport}
          >
            <div className="w-full sm:w-auto">
              <LuxuryShadcnButton
                href="/booking"
                text="BOOK NOW"
                luxuryVariant="elegant"
                luxuryTheme="transparent"
                luxurySize="large"
                className="w-full sm:w-auto min-w-[190px]"
                enableMobilePatternInterrupt={true}
              />
            </div>
            <div className="w-full sm:w-auto">
              <LuxuryShadcnButton
                href="/services"
                text="VIEW SERVICES"
                luxuryVariant="outline"
                luxuryTheme="transparent"
                luxurySize="large"
                className="w-full sm:w-auto min-w-[190px]"
              />
            </div>
          </motion.div>

          {/* Bottom decorative separator - editorial framing */}
          <motion.div
            className="w-24 h-[0.5px] bg-white/30 mx-auto mt-16"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 0.3 }}
            transition={{ duration: 1.2, delay: 0.3, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>
    </FadeInSection>
  );
};

export default BookingCTA;
