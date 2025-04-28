"use client";

import React from "react";
import { motion } from "framer-motion";

interface BrandedDividerProps {
  className?: string;
}

export default function BrandedDivider({
  className = "",
}: BrandedDividerProps) {
  return (
    <motion.div
      className={`relative w-full overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="h-16 md:h-32 w-full relative">
        <img
          src="/images/brand/IMG_5460.jpg"
          alt="FaceFrame Beauty Branded Headband"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(127,85,57,0.2), rgba(127,85,57,0.1))",
          }}
        ></div>
      </div>
    </motion.div>
  );
}
