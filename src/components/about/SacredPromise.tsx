"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  LUXURY_EASING,
  standardViewport,
} from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

// Sacred content organized for clean presentation
const sacredMoments = {
  openingStillness: [
    "When you lie down in my presence, the world gets quiet.",
    "The noise drops away.",
    "And for a little while... it's just you.",
  ],
  thePromise: [
    "I promise to see you—truly see you—",
    "beyond trends, beyond expectations,",
    "and create something that feels authentically, undeniably you.",
  ],
  theExperience: [
    "You'll leave not just looking beautiful,",
    "but feeling more like yourself than you have in years.",
    "Authentic beauty enhancement",
    "Confidence that comes from within",
    "Beauty that feels like coming home",
    "Self-love that radiates outward",
  ],
  theRevelation: [
    "You'll rediscover parts of yourself you'd forgotten.",
    "You'll see beauty you never knew existed.",
    "You'll feel powerful in your own skin.",
    "This is my sacred promise to you.",
  ],
};

export default function SacredPromise() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-light-cream via-light-cream/95 to-white overflow-hidden"
    >
      {/* Background Layers */}
      <motion.div
        className="absolute inset-0 opacity-[0.018] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />

      {/* Minimal Geometric Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-24 left-24 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.3, ease: LUXURY_EASING }}
        >
          <div className="w-20 h-[0.5px] bg-elegant-mocha/15"></div>
          <div className="w-[0.5px] h-20 bg-elegant-mocha/15"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-24 right-24 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
        >
          <div className="w-20 h-[0.5px] bg-elegant-mocha/15 ml-auto"></div>
          <div className="w-[0.5px] h-20 bg-elegant-mocha/15 ml-auto"></div>
        </motion.div>
      </div>

      {/* Clean Content Container - Meticulous Alignment */}
      <div className="flex items-center justify-center min-h-screen py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-24 w-full">
            {/* Opening Stillness */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12 text-center w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
              >
                <div className="w-16 h-px bg-soft-blush/30"></div>
                <h3 className="font-alice text-sm tracking-[0.3em] uppercase text-elegant-mocha/60 font-light">
                  Sacred Stillness
                </h3>
              </motion.div>

              <div className="flex flex-col items-center justify-center gap-10 max-w-3xl w-full">
                {sacredMoments.openingStillness.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.15,
                      duration: 0.8,
                      ease: LUXURY_EASING,
                    }}
                  >
                    {index === 2 ? (
                      <div className="bg-gradient-to-br from-white/40 to-light-cream/20 rounded-xl p-10 lg:p-12 border border-elegant-mocha/5 my-8">
                        <p className="font-alice text-2xl md:text-3xl lg:text-4xl text-elegant-mocha/95 leading-relaxed tracking-wide font-medium italic">
                          {line}
                        </p>
                      </div>
                    ) : (
                      <p className="font-alta text-lg md:text-xl lg:text-2xl text-elegant-mocha/75 leading-relaxed tracking-wide">
                        {line}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* The Sacred Promise */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12 text-center w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.2, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASING }}
              >
                <div className="w-20 h-px bg-elegant-mocha/25"></div>
                <h3 className="font-alice text-sm tracking-[0.3em] uppercase text-elegant-mocha/70 font-medium">
                  Sacred Promise
                </h3>
              </motion.div>

              <div className="flex flex-col items-center justify-center gap-10 max-w-4xl w-full">
                {sacredMoments.thePromise.map((line, index) => (
                  <motion.p
                    key={index}
                    className={`leading-relaxed tracking-wide ${
                      index === 0
                        ? "font-alice text-2xl md:text-3xl lg:text-4xl text-elegant-mocha/95 font-medium py-4"
                        : "font-alta text-lg md:text-xl lg:text-2xl text-elegant-mocha/80"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.8,
                      ease: LUXURY_EASING,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* The Sacred Experience */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12 text-center w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.3, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: LUXURY_EASING }}
              >
                <div className="w-24 h-px bg-soft-blush/30"></div>
                <h3 className="font-alice text-sm tracking-[0.3em] uppercase text-elegant-mocha/70 font-medium">
                  Sacred Experience
                </h3>
              </motion.div>

              <div className="flex flex-col items-center justify-center gap-8 max-w-4xl w-full">
                {sacredMoments.theExperience.map((line, index) => (
                  <motion.p
                    key={index}
                    className={`leading-relaxed tracking-wide ${
                      index < 2
                        ? "font-alice text-xl md:text-2xl lg:text-3xl text-elegant-mocha/90 font-medium py-2"
                        : "font-alta text-lg md:text-xl text-elegant-mocha/70 font-light italic"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + index * 0.08,
                      duration: 0.8,
                      ease: LUXURY_EASING,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* The Sacred Revelation */}
            <motion.div
              className="flex flex-col items-center justify-center gap-12 text-center w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.4, duration: 1.2, ease: LUXURY_EASING }}
            >
              <div className="flex flex-col items-center justify-center gap-12 w-full">
                {sacredMoments.theRevelation.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.12,
                      duration: 0.9,
                      ease: LUXURY_EASING,
                    }}
                  >
                    {index === 3 ? (
                      <div className="bg-gradient-to-br from-white/50 to-light-cream/20 rounded-2xl p-12 lg:p-20 border border-elegant-mocha/8 mt-20">
                        <motion.div
                          className="flex flex-col items-center justify-center gap-8 mb-12"
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: LUXURY_EASING,
                          }}
                        >
                          <div className="w-24 h-px bg-elegant-mocha/30"></div>
                          <h3 className="font-alice text-sm tracking-[0.35em] uppercase text-elegant-mocha/70 font-medium">
                            Sacred Covenant
                          </h3>
                        </motion.div>

                        <p className="font-alice text-2xl md:text-3xl lg:text-4xl text-elegant-mocha/95 leading-relaxed tracking-wide font-medium italic">
                          {line}
                        </p>
                      </div>
                    ) : (
                      <p className="font-alice text-xl md:text-2xl lg:text-3xl text-elegant-mocha/85 leading-relaxed tracking-wide italic py-2">
                        {line}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sacred Signature - Clean Design from AboutStrip */}
            <motion.div
              className="mt-16 text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={standardViewport}
              transition={{ duration: 0.7, delay: 0.8, ease: LUXURY_EASING }}
            >
              <motion.svg
                width="180"
                height="50"
                viewBox="0 0 180 60"
                className="ml-auto text-elegant-mocha/70"
              >
                {/* Animated signature */}
                <motion.path
                  d="M10,40 C20,20 40,10 60,30 C80,50 100,20 120,30 C140,40 160,20 170,30"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{
                    pathLength: 1,
                    opacity: 0.8,
                  }}
                  viewport={standardViewport}
                  transition={{
                    duration: 2.5,
                    ease: LUXURY_EASING,
                    delay: 1.0,
                  }}
                />
              </motion.svg>
              <p className="font-alice text-elegant-mocha/80 mt-3 tracking-[0.1em] text-sm text-right">
                IGGY
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
