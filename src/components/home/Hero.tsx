"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
    >
      {/* Background with subtle parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="w-full h-full"
          style={{
            position: "absolute",
            transform: `scale(1.05) translate(${mousePosition.x * -15}px, ${
              mousePosition.y * -15
            }px)`,
            transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          <Image
            src="/images/hero/image4.webp"
            alt="FaceFrame Beauty hero image"
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50"></div>
      </div>

      <div className="luxury-container relative z-10">
        <div className="w-full md:w-3/5 px-4 md:px-0">
          {/* Animated Heading */}
          <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-2">
              <h1 className="text-white">
                <span className="block">FaceFrame Beauty</span>
                <span className="text-soft-blush text-2xl md:text-3xl">
                  Luxury Beauty Transformations
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="font-alta text-lg md:text-xl text-white mb-8 max-w-lg"
              variants={itemVariants}
            >
              London&apos;s premier destination for bespoke beauty
              transformations. Expert semi-permanent makeup, lashes, brows and
              luxury facials.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link href="/booking" className="btn btn-lg btn-primary">
                BOOK YOUR EXPERIENCE
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Badge */}
      <motion.div
        className="absolute bottom-24 right-8 md:right-16 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg px-6 py-4 hidden md:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="text-white text-center">
          <div className="flex items-center justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs font-alta">Rated 4.9/5 by over 200 clients</p>
        </div>
      </motion.div>

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
            className="text-white"
          >
            <path
              d="M12 4V20M12 20L18 14M12 20L6 14"
              stroke="currentColor"
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
