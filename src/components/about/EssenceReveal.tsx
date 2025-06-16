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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const decorativeY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-light-cream via-light-cream to-white overflow-hidden"
    >
      {/* Background Layers */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />
      
      {/* Minimal Geometric Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-16 left-16 hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
          style={{ y: decorativeY }}
        >
          <div className="w-16 h-[1px] bg-elegant-mocha/20"></div>
          <div className="w-[1px] h-16 bg-elegant-mocha/20"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-16 right-16 hidden lg:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.7, ease: LUXURY_EASING }}
          style={{ y: decorativeY }}
        >
          <div className="w-16 h-[1px] bg-elegant-mocha/20 ml-auto"></div>
          <div className="w-[1px] h-16 bg-elegant-mocha/20 ml-auto"></div>
        </motion.div>
      </div>

      {/* Clean Content Container - Meticulous Centering */}
      <div className="flex items-center justify-center min-h-screen py-24">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-20 text-center w-full">
            {narrativeBlocks.map((block, blockIndex) => (
              <motion.div
                key={blockIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={standardViewport}
                transition={{ 
                  delay: blockIndex * 0.1,
                  duration: 1,
                  ease: LUXURY_EASING
                }}
              >
                {block.emphasis === "opening" ? (
                  <motion.h2
                    className="font-alice text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-elegant-mocha font-light tracking-[0.15em] leading-[1.1] py-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: LUXURY_EASING }}
                  >
                    {block.lines[0]}
                  </motion.h2>
                ) : block.emphasis === "closing" ? (
                  <motion.div
                    className="bg-gradient-to-br from-light-cream/30 to-white/20 rounded-2xl p-12 lg:p-16 border border-elegant-mocha/5 my-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: LUXURY_EASING }}
                  >
                    <p className="font-alice text-xl md:text-2xl lg:text-3xl text-elegant-mocha/90 leading-relaxed tracking-wide font-medium italic">
                      {block.lines[0]}
                    </p>
                  </motion.div>
                ) : block.emphasis === "emotional" ? (
                  <div className="flex flex-col items-center justify-center gap-8 py-4 w-full">
                    {block.lines.map((line, lineIndex) => (
                      <motion.p
                        key={lineIndex}
                        className="font-alice text-lg md:text-xl lg:text-2xl text-elegant-mocha/90 leading-relaxed tracking-wide font-medium bg-soft-blush/3 rounded-lg py-6 px-8"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: lineIndex * 0.15,
                          duration: 0.8,
                          ease: LUXURY_EASING
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6 py-4 w-full">
                    {block.lines.map((line, lineIndex) => (
                      <motion.p 
                        key={lineIndex}
                        className="font-alta text-lg md:text-xl lg:text-2xl text-elegant-mocha/75 leading-relaxed tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: lineIndex * 0.1,
                          duration: 0.8,
                          ease: LUXURY_EASING
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}