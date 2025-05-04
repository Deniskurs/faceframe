"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SignatureTransition(): React.ReactElement {
  return (
    <div className="relative h-32 md:h-40 overflow-hidden">
      {/* Gradient background transition with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-cream to-soft-blush/90"></div>

      {/* Floating signature element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="w-16 h-16 md:w-20 md:h-20 relative"
        >
          {/* Elegant interlocked F monogram - inspired by Chanel's CC */}
          <div className="absolute inset-0 border border-elegant-mocha/25 rotate-45"></div>
          <div className="absolute inset-[4px] border border-elegant-mocha/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[1.5px] w-8 md:w-10 bg-elegant-mocha/30 rotate-45"></div>
            <div className="h-[1.5px] w-8 md:w-10 bg-elegant-mocha/30 -rotate-45"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
