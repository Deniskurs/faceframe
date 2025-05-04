import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../core/types";

export function ViewAllButton() {
  return (
    <motion.div
      className="mt-20 md:mt-28 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        ease: LUXURY_EASING,
      }}
    >
      <Link
        href="/services"
        className="group relative font-alta tracking-[0.3em] text-[10px] sm:text-xs uppercase text-elegant-mocha/90 px-14 py-5 inline-block border border-elegant-mocha/20 overflow-hidden"
      >
        {/* Button background with elegant hover effect */}
        <motion.div
          className="absolute inset-0 bg-elegant-mocha/0 group-hover:bg-elegant-mocha/5"
          initial={false}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        />

        {/* Button text with animation */}
        <span className="relative z-10 group-hover:text-elegant-mocha transition-colors duration-700">
          View All Services
        </span>

        {/* Subtle bottom border animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] w-0 bg-soft-blush/60 group-hover:w-full"
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
        />
      </Link>
    </motion.div>
  );
}
