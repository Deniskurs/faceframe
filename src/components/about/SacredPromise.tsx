"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

// Four thematic clusters for the sacred moment
const sacredMoments = {
  openingStillness: [
    "When you lie down on my table, the world gets quiet.",
    "The noise drops away.",
    "And for a little while... it's just you."
  ],
  thePromise: [
    "I promise to see you—truly see you—",
    "beyond trends, beyond expectations,",
    "and create something that feels authentically, undeniably you."
  ],
  theExperience: [
    "You'll leave not just looking beautiful,",
    "but feeling more like yourself than you have in years.",
    "Authentic beauty enhancement",
    "Confidence that comes from within", 
    "Beauty that feels like coming home",
    "Self-love that radiates outward"
  ],
  theRevelation: [
    "You'll rediscover parts of yourself you'd forgotten.",
    "You'll see beauty you never knew existed.", 
    "You'll feel powerful in your own skin.",
    "This is my sacred promise to you."
  ]
};

export default function SacredPromise() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-light-cream relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />

      {/* Professional Grid-Based Layout System */}
      <div className="absolute inset-0 grid grid-rows-[1fr_auto_1fr] place-items-center px-6 sm:px-8 lg:px-12">
        
        {/* Top spacer for perfect vertical centering */}
        <div></div>
        
        {/* Main Content Grid - Perfectly Centered */}
        <div className="w-full max-w-2xl grid gap-12 sm:gap-16 lg:gap-20 place-items-center text-center">
        
        {/* 1. Opening Stillness */}
        <motion.div
          className="grid gap-4 place-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px" }}
          transition={{ duration: 1, ease: LUXURY_EASING }}
        >
          {sacredMoments.openingStillness.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: LUXURY_EASING
              }}
            >
              {index === 2 ? (
                // Special emphasis for "it's just you"
                <motion.div
                  className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-elegant-mocha/5"
                  whileInView={{
                    scale: [1, 1.01, 1],
                  }}
                  transition={{ duration: 2.5, ease: LUXURY_EASING }}
                >
                  <p className="font-alice text-lg md:text-xl text-elegant-mocha/90 text-balance text-center leading-relaxed tracking-wide font-medium italic">
                    {line.split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + (wordIndex * 0.1),
                          duration: 0.8,
                          ease: LUXURY_EASING
                        }}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                  
                  {/* Subtle glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-soft-blush/2"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </motion.div>
              ) : (
                // Regular opening lines
                <p className="font-alta text-base md:text-lg text-elegant-mocha/70 text-balance text-center leading-relaxed tracking-wide">
                  {line.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        delay: (index * 0.2) + (wordIndex * 0.05),
                        duration: 0.6,
                        ease: LUXURY_EASING
                      }}
                      className="inline-block mr-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* 2. The Promise */}
        <motion.div
          className="grid gap-4 place-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 1, ease: LUXURY_EASING }}
        >
          {sacredMoments.thePromise.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.8,
                ease: LUXURY_EASING
              }}
            >
              <p className={`text-elegant-mocha text-balance text-center leading-relaxed tracking-wide ${
                index === 0 ? 'font-alice text-lg md:text-xl font-semibold' : 'font-alta text-base md:text-lg text-elegant-mocha/75'
              }`}>
                {line.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: (index * 0.15) + (wordIndex * 0.06),
                      duration: 0.6,
                      ease: LUXURY_EASING
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. The Experience */}
        <motion.div
          className="grid gap-4 place-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 1, ease: LUXURY_EASING }}
        >
          {sacredMoments.theExperience.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.8,
                ease: LUXURY_EASING
              }}
            >
              <p className={`text-balance text-center leading-relaxed tracking-wide ${
                index < 2 ? 'font-alice text-lg md:text-xl text-elegant-mocha/85 font-medium' : 
                'font-alta text-base md:text-lg text-elegant-mocha/70 font-light italic'
              }`}>
                {line.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: (index * 0.1) + (wordIndex * 0.04),
                      duration: 0.5,
                      ease: LUXURY_EASING
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. The Revelation */}
        <motion.div
          className="grid gap-4 place-items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px" }}
          transition={{ delay: 0.6, duration: 1, ease: LUXURY_EASING }}
        >
          {sacredMoments.theRevelation.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 1,
                ease: LUXURY_EASING
              }}
            >
              {index === 3 ? (
                // Final sacred promise
                <motion.div
                  className="relative bg-white/25 backdrop-blur-sm rounded-2xl p-8 border border-elegant-mocha/5 mt-8"
                  whileInView={{
                    scale: [1, 1.01, 1],
                  }}
                  transition={{ duration: 3, ease: LUXURY_EASING }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <p className="font-alice text-xl md:text-2xl text-elegant-mocha/90 text-balance text-center leading-relaxed tracking-wide font-medium italic">
                    {line.split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + (wordIndex * 0.1),
                          duration: 0.8,
                          ease: LUXURY_EASING
                        }}
                        className="inline-block mx-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                  
                  {/* Sacred glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-soft-blush/3"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                  />
                </motion.div>
              ) : (
                // Regular revelation lines
                <p className="font-alice text-lg md:text-xl text-elegant-mocha/80 text-balance text-center leading-relaxed tracking-wide italic">
                  {line.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        delay: (index * 0.2) + (wordIndex * 0.08),
                        duration: 0.7,
                        ease: LUXURY_EASING
                      }}
                      className="inline-block mr-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* IGGY Signature with delayed reveal */}
        <motion.div
          className="grid gap-4 place-items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ delay: 1, duration: 1.5, ease: LUXURY_EASING }}
        >
          {/* Subtle decorative line */}
          <motion.div 
            className="w-16 h-[0.5px] bg-elegant-mocha/20 mx-auto mb-8 relative"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
          >
            <motion.div
              className="absolute inset-0 bg-soft-blush/30 blur-sm"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.div>
          
          <motion.p 
            className="font-alice text-elegant-mocha/70 tracking-[0.2em] text-lg font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, ease: LUXURY_EASING }}
          >
            — IGGY
          </motion.p>
        </motion.div>

        </div>

        {/* Bottom spacer for perfect vertical centering */}
        <div></div>

      </div>
    </section>
  );
}