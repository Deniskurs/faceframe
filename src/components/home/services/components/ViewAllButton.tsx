import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../types";

export function ViewAllButton() {
  return (
    <motion.div
      className="mt-24 sm:mt-28 md:mt-32 lg:mt-36 text-center"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: LUXURY_EASING }}
    >
      <Link
        href="/services"
        className="group relative inline-block overflow-hidden"
      >
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[0.25px] h-4 bg-elegant-mocha/20 transition-all duration-700"
          whileInView={{ height: [0, 16] }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: LUXURY_EASING,
          }}
        />

        <div className="relative px-4 py-2">
          <span className="font-alta uppercase tracking-[0.25em] text-elegant-mocha text-xs transition-colors duration-700 group-hover:text-deep-bronze">
            VIEW COMPLETE COLLECTION
          </span>

          <motion.div className="absolute bottom-0 left-0 w-full h-[0.25px] bg-elegant-mocha/20 transform origin-left transition-transform duration-700 group-hover:scale-x-0" />
          <motion.div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze/60 transform origin-right transition-all duration-700 group-hover:w-full" />

          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
            <div className="absolute top-0 left-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
          </div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
            <div className="absolute bottom-0 right-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
