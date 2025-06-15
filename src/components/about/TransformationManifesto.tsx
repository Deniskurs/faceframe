"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef } from "react";

// Clean emotional journey structure
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-white via-white to-light-cream/30 overflow-hidden"
    >
      {/* Background Architecture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015] bg-[url('/images/hero/hero-background.svg')] bg-repeat"
        style={{ y: backgroundY }}
      />

      {/* Minimal Geometric Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.3, ease: LUXURY_EASING }}
        >
          <div className="w-16 h-[0.5px] bg-elegant-mocha/20"></div>
          <div className="w-[0.5px] h-16 bg-elegant-mocha/20"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-20 hidden xl:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
        >
          <div className="w-16 h-[0.5px] bg-elegant-mocha/20 ml-auto"></div>
          <div className="w-[0.5px] h-16 bg-elegant-mocha/20 ml-auto"></div>
        </motion.div>
      </div>

      {/* Clean Content Container */}
      <div className="flex items-center justify-center min-h-screen py-24">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-24">
            
            {/* Letting Go Section */}
            <motion.div
              className="text-center space-y-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASING }}
              >
                <div className="w-16 h-px bg-elegant-mocha/25 mx-auto mb-8"></div>
                <h3 className="font-alice text-sm tracking-[0.25em] uppercase text-elegant-mocha/60 font-light">
                  Release
                </h3>
              </motion.div>
              
              <div className="space-y-8 max-w-3xl mx-auto">
                {emotionalJourney.lettingGo.map((line, index) => (
                  <motion.p
                    key={index}
                    className="font-alice text-base md:text-lg lg:text-xl text-elegant-mocha/70 leading-relaxed tracking-wide italic py-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + (index * 0.1),
                      duration: 0.8,
                      ease: LUXURY_EASING
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Returning Home Section */}
            <motion.div
              className="text-center space-y-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.2, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASING }}
              >
                <div className="w-20 h-px bg-soft-blush/30 mx-auto mb-8"></div>
                <h3 className="font-alice text-sm tracking-[0.25em] uppercase text-elegant-mocha/70 font-medium">
                  Return
                </h3>
              </motion.div>
              
              <div className="space-y-10 max-w-4xl mx-auto">
                {emotionalJourney.returningHome.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6 + (index * 0.1),
                      duration: 0.8,
                      ease: LUXURY_EASING
                    }}
                  >
                    {index === 0 ? (
                      <div className="bg-gradient-to-br from-white/50 to-light-cream/20 rounded-xl p-10 lg:p-12 border border-elegant-mocha/5 my-8">
                        <p className="font-alice text-xl md:text-2xl lg:text-3xl text-elegant-mocha/95 leading-relaxed tracking-wide font-medium">
                          {line}
                        </p>
                      </div>
                    ) : (
                      <p className="font-alta text-lg md:text-xl lg:text-2xl text-elegant-mocha/80 leading-relaxed tracking-wide font-light py-1">
                        {line}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sacred Revelation */}
            <motion.div
              className="text-center space-y-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.4, duration: 1.2, ease: LUXURY_EASING }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: LUXURY_EASING }}
              >
                <div className="w-24 h-px bg-elegant-mocha/25 mx-auto mb-10"></div>
                <h3 className="font-alice text-sm tracking-[0.3em] uppercase text-elegant-mocha/70 font-medium">
                  Sacred Journey
                </h3>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-white/40 to-light-cream/20 rounded-2xl p-12 lg:p-16 xl:p-20 border border-elegant-mocha/8 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: LUXURY_EASING }}
              >
                <p className="font-alice text-lg md:text-xl lg:text-2xl xl:text-3xl text-elegant-mocha/90 leading-relaxed tracking-wide italic">
                  {emotionalJourney.revelation[0]}
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}