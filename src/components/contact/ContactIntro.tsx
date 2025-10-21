"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const ContactIntro = () => {
  return (
    <FadeInSection intensity="subtle">
      <section className="py-20 md:py-28 bg-light-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Decorative top line */}
          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/20 mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          />

          {/* Main welcome text */}
          <motion.h2
            className="font-alice text-2xl md:text-3xl lg:text-4xl text-elegant-mocha mb-6 tracking-[0.15em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            Welcome
          </motion.h2>

          {/* Personal message from Iggy */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <p className="font-alta text-base md:text-lg text-elegant-mocha/90 leading-relaxed tracking-wide">
              I&apos;m thrilled you&apos;re considering FaceFrame Beauty for your beauty journey.
              Whether you&apos;re interested in semi-permanent makeup, lash treatments, luxury facials,
              or simply exploring your options, I&apos;m here to guide you every step of the way.
            </p>

            <p className="font-alta text-base md:text-lg text-elegant-mocha/90 leading-relaxed tracking-wide">
              Fill out the form below and I&apos;ll personally respond within 24 hours to discuss
              your beauty goals and find the perfect treatment for you. You can also connect
              with me on social media or via email — whichever feels most comfortable.
            </p>

            <div className="pt-8 border-t border-elegant-mocha/10">
              <p className="font-alice text-lg md:text-xl text-elegant-mocha/80 italic tracking-wide">
                &ldquo;Your beauty journey is uniquely yours, and I can&apos;t wait to be part of it.&rdquo;
              </p>
              <p className="font-alta text-sm text-elegant-mocha/60 mt-4 tracking-[0.2em] uppercase">
                — Iggy
              </p>
            </div>
          </motion.div>

          {/* Decorative bottom line */}
          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/20 mt-12"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1, delay: 0.5, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          />
        </div>
      </section>
    </FadeInSection>
  );
};

export default ContactIntro;
