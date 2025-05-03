import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../types";

export interface SectionTitleProps {
  isRevealed: boolean;
}

export function SectionTitle({ isRevealed }: SectionTitleProps) {
  return (
    <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center relative">
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[0.25px] bg-elegant-mocha/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: LUXURY_EASING }}
      />

      <motion.p
        className="font-alta text-xs tracking-[0.4em] text-elegant-mocha/60 uppercase mb-4 sm:mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
        transition={{ duration: 0.8, delay: 0.5, ease: LUXURY_EASING }}
      >
        Our Expertise
      </motion.p>

      <div className="overflow-hidden mb-1">
        <motion.h2
          className="font-alice text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] text-elegant-mocha uppercase"
          initial={{ y: 60 }}
          animate={{ y: isRevealed ? 0 : 60 }}
          transition={{ duration: 1.4, delay: 0.7, ease: LUXURY_EASING }}
        >
          SIGNATURE TREATMENTS
        </motion.h2>
      </div>

      <motion.div
        className="h-[0.25px] bg-elegant-mocha/40 mx-auto mt-6 sm:mt-8"
        initial={{ width: 0 }}
        animate={{ width: isRevealed ? "3rem" : 0 }}
        transition={{ duration: 1.2, delay: 1, ease: LUXURY_EASING }}
      />

      <motion.p
        className="mt-6 sm:mt-8 font-alta text-sm md:text-base tracking-wide max-w-xl mx-auto leading-relaxed text-elegant-mocha/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2, ease: LUXURY_EASING }}
      >
        Discover our collection of premium beauty services, each crafted with
        precision and expertise to enhance your natural beauty.
      </motion.p>
    </div>
  );
}
