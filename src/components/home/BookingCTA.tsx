"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import useParallaxEffect from "@/utils/animations/useParallaxEffect";
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
  subtitle = "Limited appointments available. Join our exclusive clientele to experience precision beauty artistry.",
  buttonText = "SCHEDULE NOW",
  buttonLink = "/booking",
  className = "",
}: BookingCTAProps) => {
  // Refined, minimal trust indicators with CHANEL-inspired aesthetics
  const trustItems = [
    {
      id: "gdpr",
      text: "PRIVACY ASSURED",
    },
    {
      id: "premium",
      text: "PREMIUM EXPERIENCE",
    },
    {
      id: "rating",
      text: "EXCEPTIONAL RESULTS",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // More subtle parallax effect for the background image
  const { handleMouseMove } = useParallaxEffect(
    imageRef as unknown as React.RefObject<HTMLElement>,
    {
      intensity: 5, // Reduced for a more refined, subtle effect
      scale: true,
      reverse: false,
      easing: `cubic-bezier(${LUXURY_EASING.join(",")})`,
    }
  );

  // Use animate on scroll hook
  useAnimateOnScroll(sectionRef as unknown as React.RefObject<HTMLElement>, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <FadeInSection intensity="subtle">
      <motion.section
        ref={sectionRef}
        className={`relative py-28 md:py-36 overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
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
        <div className="absolute top-12 left-12 w-[1px] h-20 bg-white/20 hidden md:block"></div>
        <div className="absolute top-12 left-12 w-20 h-[1px] bg-white/20 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-[1px] h-20 bg-white/20 hidden md:block"></div>
        <div className="absolute bottom-12 right-12 w-20 h-[1px] bg-white/20 hidden md:block"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          {/* CHANEL-style heading with refined typography */}
          <motion.div
            className="mb-12 inline-block"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <h2 className="font-alice text-2xl md:text-3xl tracking-[0.25em] text-white uppercase">
              {title}
            </h2>
            <div className="h-[1px] w-12 bg-white/40 mx-auto mt-6"></div>
          </motion.div>

          {/* Refined subtitle with proper tracking */}
          <motion.p
            className="font-alta text-base md:text-lg text-white/80 mb-16 max-w-xl mx-auto tracking-wide leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          {/* Dual Booking Path Options */}
          <motion.div
            className="mb-20 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASING }}
            viewport={standardViewport}
          >
            <LuxuryShadcnButton
              href={buttonLink || "/services"}
              text={buttonText || "BOOK SERVICE DIRECTLY"}
              luxuryVariant="elegant"
              luxuryTheme="transparent"
              luxurySize="large"
            />
            <LuxuryShadcnButton
              href="/consultation"
              text="FREE CONSULTATION"
              luxuryVariant="outline"
              luxuryTheme="transparent"
              luxurySize="large"
            />
          </motion.div>

          {/* Minimal trust indicators with refined styling */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.1,
                  ease: LUXURY_EASING,
                }}
                viewport={{ once: true }}
              >
                <div className="text-white/80 text-xs tracking-[0.2em]">
                  {item.text}
                </div>
                <div className="h-[1px] w-full bg-white/20 mt-2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </FadeInSection>
  );
};

export default BookingCTA;
