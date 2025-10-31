"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Mail, MapPin, Clock } from "lucide-react";

/**
 * ContactHero - Clean, Functional, Inviting
 * Light, approachable design focused on making contact easy
 * Different from dramatic Home/About heroes - purpose-driven simplicity
 */
export function ContactHero() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@faceframe.com",
      href: "mailto:hello@faceframe.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "East London, E2 & E3",
      href: "#studios",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Tue-Sat 9:00-18:00",
      href: null,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-soft-blush/10 via-white to-light-cream/5">
      {/* CHANEL Corner Accents - Top Left */}
      <motion.div
        className="absolute top-8 sm:top-12 left-8 sm:left-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-elegant-mocha/25"></div>
        <div className="w-[0.5px] h-12 bg-elegant-mocha/25"></div>
      </motion.div>

      {/* CHANEL Corner Accents - Bottom Right */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: LUXURY_EASING }}
      >
        <div className="w-12 h-[0.5px] bg-elegant-mocha/25 ml-auto"></div>
        <div className="w-[0.5px] h-12 bg-elegant-mocha/25 ml-auto"></div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 md:py-24">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
        >
          <h1 className="font-alice text-4xl md:text-5xl text-elegant-mocha mb-6 tracking-wide">
            Get in Touch
          </h1>

          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
          />

          <p className="font-alice text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide max-w-2xl mx-auto">
            Let&apos;s discuss your beauty transformation. Whether you&apos;re seeking a consultation or ready to book, I&apos;m here to help.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                className={`text-center p-6 rounded-sm bg-white border border-elegant-mocha/10 transition-all duration-500 ${
                  item.href ? "hover:border-elegant-mocha/30 hover:shadow-sm cursor-pointer" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  ease: LUXURY_EASING,
                }}
              >
                <Icon className="w-5 h-5 text-deep-bronze mx-auto mb-3" />
                <p className="font-alta text-xs tracking-wider uppercase text-elegant-mocha/60 mb-2">
                  {item.label}
                </p>
                <p className="font-alice text-sm text-elegant-mocha/90">
                  {item.value}
                </p>
              </motion.div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} className="block">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        {/* Optional: Subtle CTA to scroll to form */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: LUXURY_EASING }}
        >
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 font-alta text-sm tracking-wider text-elegant-mocha/60 hover:text-elegant-mocha transition-colors duration-300"
          >
            <span>Fill out the form below</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
