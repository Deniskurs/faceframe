"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const heroRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100vh] md:h-[90vh] w-full overflow-hidden flex items-center pt-20 md:pt-0"
      style={{
        backgroundColor: "#7F5539", // Elegant mocha color as fallback
        backgroundImage: "url('/images/hero/image4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        minHeight: "100svh", // Use svh for more reliable mobile height
      }}
    >
      {/* Dark overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black opacity-40 md:opacity-20 z-0"></div>

      <div className="luxury-container relative z-10">
        <div className="w-full md:w-3/5 px-4 md:px-0">
          {/* Animated Heading */}
          <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="font-alice text-4xl md:text-5xl lg:text-6xl text-white mb-2"
              variants={itemVariants}
            >
              FaceFrame Beauty
            </motion.h1>
            <motion.p
              className="font-alice text-2xl md:text-3xl text-[#E6CCB2]" /* soft-blush */
              variants={itemVariants}
            >
              Luxury Beauty Transformations
            </motion.p>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="font-alta text-lg md:text-xl text-white mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            London&apos;s premier destination for bespoke beauty
            transformations. Expert semi-permanent makeup, lashes, brows and
            luxury facials.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Link
              href="/booking"
              className="inline-block px-8 py-3 bg-[#7F5539] text-white font-alta rounded hover:bg-[#9C6644] transition-colors duration-300 text-lg"
            >
              BOOK YOUR EXPERIENCE
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <p className="font-alta text-white text-sm mb-2">Discover</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M12 20L18 14M12 20L6 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
