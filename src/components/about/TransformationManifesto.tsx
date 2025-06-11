"use client";

import { motion } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

// Three emotional groupings for scroll pacing
const emotionalJourney = {
  lettingGo: [
    "Not to 'fix' you.",
    "Not to cover you up.",
    "This is not about changing who you are.",
    "This is not about perfection or pretense."
  ],
  returningHome: [
    "This is about bringing you back to yourself.",
    "Back to your softness",
    "Back to your stillness", 
    "Back to your authenticity",
    "Back to feeling at ease in your skin"
  ],
  revelation: [
    "Every session is a sacred journey of self-discovery, where makeup becomes the bridge between who you've always been and who you're ready to become."
  ]
};

export default function TransformationManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });

  // const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section 
      ref={containerRef} 
      className="pt-24 pb-32 md:pt-32 md:pb-40 bg-white relative overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <motion.div 
        className="absolute top-12 left-12 w-[1px] h-16 bg-elegant-mocha/5 hidden md:block"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 64, opacity: 0.05 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute bottom-12 right-12 w-[1px] h-16 bg-elegant-mocha/5 hidden md:block"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 64, opacity: 0.05 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 0.7, ease: LUXURY_EASING }}
      />

      <div className="max-w-xl mx-auto px-4 relative z-10 pt-16">
        

        {/* 1. Letting Go - What this is NOT about */}
        <motion.div
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px", once: true }}
          transition={{ duration: 1, ease: LUXURY_EASING }}
        >
          {emotionalJourney.lettingGo.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: LUXURY_EASING
              }}
              className="text-center"
            >
              <p className="font-alice text-base md:text-lg text-elegant-mocha/70 text-balance text-center leading-loose tracking-wide italic">
                {line.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      delay: (index * 0.2) + (wordIndex * 0.06),
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

        {/* 2. Returning Home - What this IS about */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ ...standardViewport, margin: "-100px", once: true }}
          transition={{ delay: 0.3, duration: 1, ease: LUXURY_EASING }}
        >
          {emotionalJourney.returningHome.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15,
                duration: index === 0 ? 1.2 : 0.8, // Special timing for the key line
                ease: LUXURY_EASING
              }}
              className={`text-center ${index === 0 ? 'mb-6' : 'mb-4'}`}
            >
              {index === 0 ? (
                // Special emphasis for "This is about bringing you back to yourself"
                <motion.div
                  className="relative"
                  whileInView={{
                    scale: [1, 1.02, 1],
                    textShadow: [
                      "0 0 0px rgba(183, 161, 147, 0)",
                      "0 0 8px rgba(183, 161, 147, 0.1)",
                      "0 0 0px rgba(183, 161, 147, 0)"
                    ]
                  }}
                  transition={{ duration: 3, ease: LUXURY_EASING }}
                >
                  <p className="font-alice text-xl md:text-2xl text-elegant-mocha/90 text-balance text-center leading-loose tracking-wide font-semibold">
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
                </motion.div>
              ) : (
                // Regular "Back to..." lines
                <p className="font-alta text-lg md:text-xl text-elegant-mocha/75 text-balance text-center leading-loose tracking-wide font-light">
                  {line.split(" ").map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        delay: (index * 0.15) + (wordIndex * 0.05),
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

        {/* 3. Revelation - The sacred journey mantra */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ ...standardViewport, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 1.5, ease: LUXURY_EASING }}
        >
          <motion.div 
            className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-elegant-mocha/5"
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.4 }
            }}
          >
            <p className="font-alice text-lg md:text-xl text-elegant-mocha/85 text-balance text-center leading-loose tracking-wide italic">
              {emotionalJourney.revelation[0].split(" ").map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + (wordIndex * 0.06),
                    duration: 0.7,
                    ease: LUXURY_EASING
                  }}
                  className="inline-block mx-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>
            
            {/* Subtle glow effect for the mantra */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-soft-blush/2"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </motion.div>
        </motion.div>

        {/* Closing ornament */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-soft-blush/50 mx-auto relative"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-soft-blush/20 blur-sm"
              animate={{ scale: [1, 3, 1] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}