"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

const narrativeBlocks = [
  {
    lines: ["Hey you."],
    emphasis: "opening"
  },
  {
    lines: [
      "I don't know how you got here,",
      "but I'm so glad you did."
    ],
    emphasis: "gentle"
  },
  {
    lines: [
      "Because something tells me...",
      "you've been holding your breath."
    ],
    emphasis: "emotional"
  },
  {
    lines: [
      "You've been showing up for work,",
      "for people, for expectations."
    ],
    emphasis: "gentle"
  },
  {
    lines: [
      "Even when your body's been whispering,",
      "slow down."
    ],
    emphasis: "emotional"
  },
  {
    lines: [
      "Even when your reflection",
      "hasn't quite felt like you lately."
    ],
    emphasis: "gentle"
  },
  {
    lines: [
      "That's what this space is for."
    ],
    emphasis: "closing"
  }
];

export default function EssenceReveal() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={containerRef} 
      className="py-24 md:py-32 bg-light-cream relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />
      
      {/* Main narrative container */}
      <div className="max-w-xl mx-auto px-4 relative z-10">
        

        {/* Narrative blocks with emotional pacing */}
        <div className="space-y-4">
          {narrativeBlocks.map((block, blockIndex) => (
            <motion.div
              key={blockIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ ...standardViewport, margin: "-100px" }}
              transition={{ 
                delay: blockIndex * 0.1,
                duration: block.emphasis === "emotional" || block.emphasis === "opening" || block.emphasis === "closing" ? 1.2 : 0.8,
                ease: LUXURY_EASING
              }}
              className={`text-center ${
                block.emphasis === "emotional" ? "mb-8" :
                block.emphasis === "opening" ? "mb-12" :
                block.emphasis === "closing" ? "mt-12" : "mb-6"
              }`}
            >
              {block.emphasis === "opening" ? (
                // Opening greeting with special treatment
                <motion.div
                  className="relative"
                  whileInView={{
                    textShadow: [
                      "0 0 0px rgba(183, 161, 147, 0)",
                      "0 0 12px rgba(183, 161, 147, 0.15)",
                      "0 0 0px rgba(183, 161, 147, 0)"
                    ]
                  }}
                  transition={{ duration: 2.5, delay: 0.5 }}
                >
                  <h2 className="font-alice text-3xl md:text-4xl text-elegant-mocha font-light text-balance text-center leading-loose tracking-wide">
                    {block.lines[0].split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + (wordIndex * 0.3),
                          duration: 1,
                          ease: LUXURY_EASING
                        }}
                        className="inline-block mr-2"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>
                </motion.div>
              ) : block.emphasis === "closing" ? (
                // Closing with maximum emotional impact
                <motion.div
                  className="relative bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-elegant-mocha/5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: LUXURY_EASING }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {block.lines.map((line, lineIndex) => (
                    <motion.p 
                      key={lineIndex}
                      className={`font-alice text-elegant-mocha/90 text-balance text-center leading-loose tracking-wide ${
                        lineIndex === 0 ? "text-lg md:text-xl mb-2" : "text-xl md:text-2xl font-medium italic"
                      }`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        delay: 0.3 + (lineIndex * 0.4),
                        duration: 1,
                        ease: LUXURY_EASING
                      }}
                    >
                      {line.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.5 + (lineIndex * 0.4) + (wordIndex * 0.08),
                            duration: 0.6,
                            ease: LUXURY_EASING
                          }}
                          className="inline-block mx-1"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  ))}
                  
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-soft-blush/3"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </motion.div>
              ) : block.emphasis === "emotional" ? (
                // Emotional moments with subtle emphasis
                <div className="space-y-4">
                  {block.lines.map((line, lineIndex) => (
                    <motion.p 
                      key={lineIndex}
                      className="font-alice text-lg md:text-xl text-elegant-mocha/85 text-balance text-center leading-loose tracking-wide font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: lineIndex * 0.2,
                        duration: 0.8,
                        ease: LUXURY_EASING
                      }}
                    >
                      {line.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            delay: (lineIndex * 0.2) + (wordIndex * 0.06),
                            duration: 0.5,
                            ease: LUXURY_EASING
                          }}
                          className="inline-block mr-1"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  ))}
                </div>
              ) : (
                // Gentle narrative lines
                <div className="space-y-4">
                  {block.lines.map((line, lineIndex) => (
                    <motion.p 
                      key={lineIndex}
                      className="font-alta text-base md:text-lg text-elegant-mocha/70 text-balance text-center leading-loose tracking-wide"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: lineIndex * 0.15,
                        duration: 0.6,
                        ease: LUXURY_EASING
                      }}
                    >
                      {line.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            delay: (lineIndex * 0.15) + (wordIndex * 0.04),
                            duration: 0.4,
                            ease: LUXURY_EASING
                          }}
                          className="inline-block mr-1"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing ornament */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 1.2, delay: 0.5, ease: LUXURY_EASING }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-soft-blush/60 mx-auto relative"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-soft-blush/30 blur-sm"
              animate={{ scale: [1, 2.5, 1] }}
              transition={{ 
                duration: 3, 
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