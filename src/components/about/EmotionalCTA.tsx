"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

const headlineLines = [
  "I AM HOLDING",
  "A SPACE FOR YOU."
];

const descriptionLines = [
  "Ready to remember what it feels like to be truly cared for?",
  "To look in the mirror and see yourself... really see yourself?",
  "Your transformation begins with a single choice.",
  "The choice to honor your authentic beauty."
];

export default function EmotionalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-white via-white to-light-cream/20 overflow-hidden"
    >
      {/* Background Layers */}
      <motion.div 
        className="absolute inset-0 opacity-[0.012] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />

      {/* Minimal Geometric Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.2, ease: LUXURY_EASING }}
        >
          <div className="w-24 h-[0.5px] bg-elegant-mocha/10"></div>
          <div className="w-[0.5px] h-24 bg-elegant-mocha/10"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-20 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.4, ease: LUXURY_EASING }}
        >
          <div className="w-24 h-[0.5px] bg-elegant-mocha/10 ml-auto"></div>
          <div className="w-[0.5px] h-24 bg-elegant-mocha/10 ml-auto"></div>
        </motion.div>
      </div>

      {/* Clean Content Architecture - Meticulous Alignment */}
      <div className="flex items-center justify-center min-h-screen py-24">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-20 text-center w-full">
                
            {/* Clean Headline Section */}
            <motion.div
              className="flex flex-col items-center justify-center gap-16 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
              >
                <div className="w-12 h-px bg-elegant-mocha/20"></div>
                <h3 className="font-alice text-sm tracking-[0.4em] uppercase text-elegant-mocha/60 font-light">
                  Invitation
                </h3>
              </motion.div>
              
              <div className="flex flex-col items-center justify-center gap-6 w-full">
                {headlineLines.map((line, lineIndex) => (
                  <motion.h1
                    key={lineIndex}
                    className="font-alice text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.2em] text-elegant-mocha uppercase font-light leading-[1.1]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6 + (lineIndex * 0.2),
                      duration: 1,
                      ease: LUXURY_EASING
                    }}
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>
              
              <motion.div 
                className="pt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: LUXURY_EASING }}
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-elegant-mocha/30 to-transparent mx-auto"></div>
              </motion.div>
            </motion.div>

            {/* Clean Description Section */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12 py-8 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.2, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASING }}
              >
                <div className="w-12 h-px bg-soft-blush/30"></div>
                <h3 className="font-alice text-sm tracking-[0.4em] uppercase text-elegant-mocha/60 font-light">
                  Reflection
                </h3>
              </motion.div>
              
              <div className="flex flex-col items-center justify-center gap-8 max-w-3xl w-full">
                {descriptionLines.map((line, lineIndex) => (
                  <motion.p
                    key={lineIndex}
                    className="font-alta text-base md:text-lg lg:text-xl text-elegant-mocha/80 leading-relaxed tracking-wide"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6 + (lineIndex * 0.1),
                      duration: 0.8,
                      ease: LUXURY_EASING
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Clean CTA Section */}
            <motion.div
              className="flex flex-col items-center justify-center gap-16 pt-12 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.4, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
              >
                <div className="w-20 h-px bg-elegant-mocha/20"></div>
                <h3 className="font-alice text-sm tracking-[0.4em] uppercase text-elegant-mocha/60 font-medium">
                  Begin Your Journey
                </h3>
              </motion.div>
              
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 max-w-2xl w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: LUXURY_EASING }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  className="w-full sm:w-auto"
                >
                  <LuxuryShadcnButton
                    href="/booking"
                    text="BOOK NOW"
                    luxuryVariant="elegant"
                    luxuryTheme="light"
                    luxurySize="large"
                    className="w-full sm:w-auto min-w-[200px] justify-center py-4"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  className="w-full sm:w-auto"
                >
                  <LuxuryShadcnButton
                    href="/services"
                    text="VIEW SERVICES"
                    luxuryVariant="outline"
                    luxuryTheme="light"
                    luxurySize="large"
                    className="w-full sm:w-auto min-w-[200px] justify-center py-4"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center text-center pt-8 w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: LUXURY_EASING }}
              >
                <p className="font-alice text-base text-elegant-mocha/60 tracking-wide italic">
                  Your journey begins with a single, beautiful choice.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}