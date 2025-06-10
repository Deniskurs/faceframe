"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef, useState } from "react";

const headlineLines = [
  "I AM HOLDING",
  "A SPACE FOR YOU."
];

const descriptionLines = [
  "Ready to remember what it feels like to be truly cared for?",
  "To look in the mirror and see yourself... really see yourself?",
  "Your transformation begins with a single choice.",
  "The choice to honor your authentic beauty."
];



export default function EmotionalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      

      {/* Animated decorative elements with dopamine-inducing reveals */}
      <motion.div 
        className="absolute top-12 left-12 w-[1px] h-20 bg-elegant-mocha/20 hidden md:block"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 80, opacity: 0.2 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute top-12 left-12 w-20 h-[1px] bg-elegant-mocha/20 hidden md:block"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 0.2 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 0.7, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute bottom-12 right-12 w-[1px] h-20 bg-elegant-mocha/20 hidden md:block"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 80, opacity: 0.2 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 0.9, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute bottom-12 right-12 w-20 h-[1px] bg-elegant-mocha/20 hidden md:block"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 0.2 }}
        viewport={standardViewport}
        transition={{ duration: 2, delay: 1.1, ease: LUXURY_EASING }}
      />

      {/* Professional Grid-Based Layout System */}
      <div className="absolute inset-0 grid grid-rows-[1fr_auto_1fr] place-items-center px-6 sm:px-8 lg:px-12">
        
        {/* Top spacer for perfect vertical centering */}
        <div></div>
        
        {/* Main Content Grid - Perfectly Centered */}
        <div className="w-full max-w-4xl grid gap-8 sm:gap-12 lg:gap-16 place-items-center text-center">
        
        {/* Emotionally compelling headline with word-by-word reveals */}
        <motion.div
          className="grid place-items-center relative"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ ...standardViewport, once: true }}
          transition={{ duration: 1.2, ease: LUXURY_EASING }}
        >
          {headlineLines.map((line, lineIndex) => (
            <motion.h2
              key={lineIndex}
              className="font-alice text-2xl md:text-3xl lg:text-4xl tracking-[0.25em] text-elegant-mocha uppercase font-light block"
              style={{
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              {line.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  initial={{ opacity: 0, y: 25, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.3 + (lineIndex * 0.5) + (wordIndex * 0.2),
                    duration: 1,
                    ease: LUXURY_EASING
                  }}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 15px rgba(183, 161, 147, 0.3)",
                    transition: { duration: 0.3 }
                  }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          ))}
          
          {/* Dramatic line reveal with glow */}
          <motion.div 
            className="h-[1px] w-16 bg-elegant-mocha/40 mx-auto mt-12 relative"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            viewport={{ ...standardViewport, once: true }}
            transition={{ duration: 1.5, delay: 1.5, ease: LUXURY_EASING }}
          >
            <motion.div
              className="absolute inset-0 bg-soft-blush/60 blur-sm"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
            />
          </motion.div>
        </motion.div>

        {/* Emotionally resonant description with staggered word reveals */}
        <div className="grid gap-6 place-items-center max-w-2xl">
          {descriptionLines.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ ...standardViewport, once: true }}
              transition={{ 
                delay: 0.5 + (lineIndex * 0.15),
                duration: 0.9,
                ease: LUXURY_EASING
              }}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <p className="font-alta text-base md:text-lg text-elegant-mocha/70 leading-loose tracking-wide text-balance text-center">
                {line.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + (lineIndex * 0.15) + (wordIndex * 0.05),
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
        </div>

        {/* Irresistible CTA buttons with magnetic attraction effect */}
        <motion.div
          className="grid place-items-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ ...standardViewport, once: true }}
          transition={{ duration: 1, delay: 1.2, ease: LUXURY_EASING }}
        >
          {/* Glowing background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-soft-blush/5 via-transparent to-transparent rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div 
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 relative z-10"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LuxuryShadcnButton
                href="/services"
                text="BOOK YOUR CONSULTATION"
                luxuryVariant="elegant"
                luxuryTheme="dark"
                luxurySize="large"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LuxuryShadcnButton
                href="/consultation"
                text="FREE CONSULTATION"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="large"
              />
            </motion.div>
          </div>
          
          {/* Magnetic attraction particles */}
          {isButtonHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-soft-blush/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>


        {/* Final emotional reinforcement */}
        <motion.div
          className="grid place-items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ ...standardViewport, once: true }}
          transition={{ duration: 1.2, delay: 2, ease: LUXURY_EASING }}
        >
          <motion.p
            className="font-alice text-sm md:text-base text-elegant-mocha/50 tracking-wide italic"
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Your journey begins with a single, beautiful choice.
          </motion.p>
        </motion.div>

        </div>

        {/* Bottom spacer for perfect vertical centering */}
        <div></div>

      </div>
    </section>
  );
}