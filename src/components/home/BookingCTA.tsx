"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import GlassMorphicCard from "../shared/GlassMorphicCard";

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
  title = "Reserve Your Beauty Experience",
  subtitle = "Limited appointments available each week. Join London's elite clientele in experiencing the art of precise beauty enhancement.",
  buttonText = "SECURE YOUR APPOINTMENT",
  buttonLink = "/booking",
  className = "",
}: BookingCTAProps) => {
  const trustItems = [
    {
      id: "gdpr",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      text: "GDPR Compliant",
    },
    {
      id: "premium",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      text: "Premium Products Only",
    },
    {
      id: "rating",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ),
      text: "5-Star Experience",
    },
  ];

  return (
    <FadeInSection>
      <section
        className={`relative py-20 md:py-28 overflow-hidden ${className}`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Luxury beauty setting"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-elegant-mocha/95 to-elegant-mocha/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          {/* Heading with Animated Underline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-block"
          >
            <h2 className="font-alice text-3xl md:text-4xl lg:text-5xl text-white">
              {title}
              <motion.span
                className="block h-1 bg-light-cream mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="font-alta text-lg md:text-xl text-soft-blush mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={buttonLink}
              className="btn btn-lg px-10 py-4 bg-light-cream text-elegant-mocha hover:bg-soft-blush shadow-xl rounded"
            >
              {buttonText}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlassMorphicCard
                  intensity="light"
                  className="px-4 py-2 flex items-center"
                  backgroundColor="rgba(255,255,255,0.1)"
                  hoverEffect={true}
                  animateOnScroll={false}
                >
                  <div className="mr-3 text-soft-blush">{item.icon}</div>
                  <span className="font-alta text-white text-sm md:text-base whitespace-nowrap">
                    {item.text}
                  </span>
                </GlassMorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default BookingCTA;
