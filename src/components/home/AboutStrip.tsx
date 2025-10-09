"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface AboutStripProps {
  className?: string;
  founderImage?: string;
  founderName?: string;
  quote?: string;
  subtitle?: string;
  paragraphs?: string[];
}

const AboutStrip: React.FC<AboutStripProps> = ({
  className = "",
  founderImage = "/images/gallery/image22.webp",
  founderName = "Iggy",
  quote = "Beauty is not about perfection. It's about enhancing your natural features with precision and care.",
  subtitle = "FOUNDER & CREATIVE DIRECTOR",
  paragraphs = [
    "After a decade perfecting microblading techniques across Europe's leading academies, Iggy founded FaceFrame Beauty in 2018 with a single mission: to prove that semi-permanent makeup can enhance rather than alter.",
    "Our clients describe the same feeling: waking up and recognizing themselves in the mirror—just more rested, more defined, more confident.",
  ],
}) => {
  // Panel references with intersection observers
  const [imageRef, imageInView] = useInView({ threshold: 0.3 });
  const [quoteRef, quoteInView] = useInView({ threshold: 0.5 });

  // Content reveal control
  const [isRevealed, setIsRevealed] = useState(false);

  // Parallax and scroll effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Show section gradually on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* ==================== SECTION 1: PHILOSOPHY QUOTE ==================== */}
      <motion.section
        ref={quoteRef}
        className="h-screen flex items-center justify-center px-5 sm:px-6 bg-light-cream relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.2, ease: LUXURY_EASING }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div className="text-center px-6" style={{ y: parallaxY3 }}>
            <motion.div className="w-full text-center">
              <motion.p
                className="font-alta text-elegant-mocha/60 text-xs tracking-[0.4em] uppercase mb-16 text-center inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: quoteInView ? 1 : 0,
                  y: quoteInView ? 0 : 10,
                }}
                transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASING }}
              >
                Philosophy
              </motion.p>
            </motion.div>

            <div className="relative">
              <motion.div
                className="w-16 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: LUXURY_EASING }}
              />

              <motion.blockquote
                className="font-alice text-2xl sm:text-3xl md:text-4xl text-elegant-mocha/90 leading-relaxed tracking-wide italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: LUXURY_EASING }}
              >
                {quote}
              </motion.blockquote>

              <motion.div
                className="w-10 h-[0.25px] bg-elegant-mocha/30 mx-auto mt-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: quoteInView ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: LUXURY_EASING }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== SECTION 2: ARTIST IMAGE & CREDENTIALS ==================== */}
      <motion.section
        ref={imageRef}
        className="py-20 md:py-24 flex items-center justify-center px-5 sm:px-6 bg-light-cream relative"
      >
        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          <div className="relative">
            <motion.div
              className="relative overflow-hidden"
              style={{ y: parallaxY1 }}
            >
              {/* Founder image with frame */}
              <motion.div
                className="relative"
                initial={{ clipPath: "inset(10% 10% 10% 10%)" }}
                animate={{
                  clipPath: imageInView
                    ? "inset(0% 0% 0% 0%)"
                    : "inset(10% 10% 10% 10%)",
                }}
                transition={{ duration: 1.4, ease: LUXURY_EASING }}
              >
                <div className="relative border-[0.25px] border-soft-blush/20 overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <motion.div
                      className="absolute inset-0 z-10 bg-elegant-mocha/10"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: imageInView ? 0 : 0.7 }}
                      transition={{ duration: 1.2, ease: LUXURY_EASING }}
                    />

                    <Image
                      src={founderImage}
                      alt={`${founderName} - FaceFrame Beauty Founder`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-center z-0"
                      priority
                      quality={95}
                    />
                  </div>
                </div>

                {/* Clean, refined frame - Chanel-inspired minimalism */}

                {/* Founder name and title */}
                <motion.div
                  className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: imageInView ? 1 : 0,
                    y: imageInView ? 0 : 15,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.7,
                    ease: LUXURY_EASING,
                  }}
                >
                  <div className="max-w-[90%] w-auto py-4 px-6 bg-black/80 backdrop-blur-sm border-[0.25px] border-white/20 flex flex-col items-center justify-center">
                    <p className="font-alice text-white text-base tracking-[0.25em] mb-2 text-center">
                      {founderName}
                    </p>
                    <div className="flex justify-center items-center w-full">
                      <p className="font-alta text-white/70 text-[11px] sm:text-xs font-medium tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.5em] text-center">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Artist Story & CTA */}
          <motion.div
            className="pl-0 md:pl-8 lg:pl-12 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: imageInView ? 1 : 0, x: imageInView ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
            style={{ y: parallaxY2 }}
          >
            {/* Section label */}
            <motion.div
              className="mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: imageInView ? 1 : 0,
                y: imageInView ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.8, ease: LUXURY_EASING }}
            >
              <p className="font-alta text-elegant-mocha/60 text-xs tracking-[0.4em] uppercase mb-4">
                Artistry
              </p>
              <div className="w-12 h-[0.5px] bg-elegant-mocha/25"></div>
            </motion.div>

            {/* Origin Story - Natural narrative format */}
            <motion.div
              className="space-y-6 mb-10 md:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 1, ease: LUXURY_EASING }}
            >
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-alice text-elegant-mocha text-base md:text-lg leading-relaxed tracking-wide"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Decorative separator */}
            <motion.div
              className="w-20 h-[0.5px] bg-elegant-mocha/20 mb-8 md:mb-10"
              initial={{ width: 0 }}
              animate={{ width: imageInView ? 80 : 0 }}
              transition={{ duration: 1.2, delay: 1.3, ease: LUXURY_EASING }}
            />

            {/* CTA Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: imageInView ? 1 : 0, y: imageInView ? 0 : 15 }}
              transition={{ duration: 0.8, delay: 1.5, ease: LUXURY_EASING }}
            >
              <LuxuryShadcnButton
                href="/booking"
                text="BOOK YOUR CONSULTATION"
                luxuryVariant="elegant"
                luxuryTheme="dark"
                luxurySize="large"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default AboutStrip;
