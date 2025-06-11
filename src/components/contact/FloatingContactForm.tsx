"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING, animationDurations } from "@/utils/animations/luxuryAnimations";
import { SectionTitle } from "@/components/shared/SectionTitle";
import ContactForm from "@/components/ui/signup-form-demo";

const FloatingContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Success state with refined Chanel aesthetics
  if (isSubmitted) {
    return (
      <section className="py-32 md:py-40 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.015] mix-blend-overlay"></div>
        
        <div className="max-w-2xl mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: animationDurations.long, ease: LUXURY_EASING }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: animationDurations.medium, ease: LUXURY_EASING }}
              className="w-16 h-16 mx-auto mb-12 relative"
            >
              <div className="absolute inset-0 border border-elegant-mocha/20 rounded-full"></div>
              <div className="absolute inset-2 bg-elegant-mocha/5 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-elegant-mocha/60 rounded-full"></div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-alice text-3xl md:text-4xl text-elegant-mocha uppercase tracking-luxury mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: animationDurations.medium, ease: LUXURY_EASING }}
            >
              Message Sent
            </motion.h2>
            
            <motion.div
              className="h-[0.25px] w-16 bg-elegant-mocha/30 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.7, duration: animationDurations.long, ease: LUXURY_EASING }}
            />
            
            <motion.p 
              className="font-alta text-elegant-mocha/80 leading-relaxed mb-12 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: animationDurations.medium, ease: LUXURY_EASING }}
            >
              Thank you for your inquiry. I will personally respond within 24 hours.
            </motion.p>
            
            <motion.button
              onClick={() => setIsSubmitted(false)}
              className="font-alta text-sm uppercase tracking-luxury text-elegant-mocha/70 hover:text-elegant-mocha transition-all duration-500 border-b border-elegant-mocha/20 hover:border-elegant-mocha/50 pb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: animationDurations.medium, ease: LUXURY_EASING }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 md:py-40 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.015] mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Luxury Section Title */}
        <div className="mb-20">
          <SectionTitle
            title="CONTACT"
            subtitle="Begin Your Journey"
            align="center"
            variant="dark"
          />
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDurations.long, ease: LUXURY_EASING }}
          viewport={{ once: true }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default FloatingContactForm;