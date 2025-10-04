"use client";

import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const heroContent = {
  preTitle: "Visual Artistry",
  title: "GALLERY OF EXCELLENCE",
  description: [
    "The art of transformation elevated.",
    "Where every detail reveals your essence.",
    "Authentic beauty, magnified with precision."
  ],
  subtitle: "An exclusive collection of precious moments",
  philosophy: "True elegance lies in the subtlety of enhancement"
};

export default function GalleryHero() {
  return (
    <motion.section 
      className="relative min-h-screen w-full bg-gradient-to-br from-elegant-mocha/5 via-light-cream/30 to-soft-blush/20 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 2.2, ease: LUXURY_EASING }}
    >
      {/* Chanel-Inspired Architectural Framework */}
      <div className="absolute inset-0">
        {/* Corner Accents - Signature Chanel Style */}
        <motion.div 
          className="absolute top-8 sm:top-12 md:top-16 left-8 sm:left-12 md:left-16 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: LUXURY_EASING }}
        >
          <div className="w-12 h-[0.5px] bg-elegant-mocha/25"></div>
          <div className="w-[0.5px] h-12 bg-elegant-mocha/25"></div>
          <motion.div 
            className="absolute -top-1 -left-1 w-2 h-2 border border-elegant-mocha/20 rotate-45"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute top-8 sm:top-12 md:top-16 right-8 sm:right-12 md:right-16 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.4, ease: LUXURY_EASING }}
        >
          <div className="w-12 h-[0.5px] bg-elegant-mocha/25 ml-auto"></div>
          <div className="w-[0.5px] h-12 bg-elegant-mocha/25 ml-auto"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-8 sm:left-12 md:left-16 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.6, ease: LUXURY_EASING }}
        >
          <div className="w-12 h-[0.5px] bg-elegant-mocha/25"></div>
          <div className="w-[0.5px] h-12 bg-elegant-mocha/25"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-8 sm:right-12 md:right-16 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8, ease: LUXURY_EASING }}
        >
          <div className="w-12 h-[0.5px] bg-elegant-mocha/25 ml-auto"></div>
          <div className="w-[0.5px] h-12 bg-elegant-mocha/25 ml-auto"></div>
          <motion.div 
            className="absolute -bottom-1 -right-1 w-2 h-2 border border-elegant-mocha/20 rotate-45"
            animate={{ rotate: [45, -315] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Subtle Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-soft-blush/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 2, ease: LUXURY_EASING }}
        />
      </div>

      {/* Main Content Container - Perfect Center Alignment */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          className="w-full max-w-5xl flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: LUXURY_EASING }}
        >
          
          {/* Pre-title Line */}
          <motion.div
            className="flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: LUXURY_EASING }}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-[0.5px] bg-elegant-mocha/40 relative">
                <motion.div
                  className="absolute inset-0 bg-soft-blush/50 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 3, 
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: LUXURY_EASING 
                  }}
                />
              </div>
              <motion.div
                className="w-1 h-1 bg-soft-blush/60 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-16 h-[0.5px] bg-elegant-mocha/40 relative">
                <motion.div
                  className="absolute inset-0 bg-soft-blush/50 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 3, 
                    delay: 2.5,
                    repeat: Infinity,
                    repeatDelay: 6,
                    ease: LUXURY_EASING 
                  }}
                />
              </div>
            </div>
            <motion.p
              className="font-alice text-sm tracking-[0.4em] uppercase text-elegant-mocha/60 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 1, ease: LUXURY_EASING }}
            >
              {heroContent.preTitle}
            </motion.p>
          </motion.div>

          {/* Main Title */}
          <motion.div className="flex flex-col items-center justify-center gap-6 w-full">
            <motion.h1
              className="uppercase text-elegant-mocha font-alice tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] font-light text-center relative"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
                lineHeight: "1.1",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textShadow: "0 0 40px rgba(139, 124, 113, 0.1)"
              }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.8, 
                delay: 0.8, 
                ease: LUXURY_EASING
              }}
            >
              {heroContent.title}
            </motion.h1>
          </motion.div>

          {/* Description Lines - Enhanced Luxury */}
          <motion.div 
            className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-4xl w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.6, ease: LUXURY_EASING }}
          >
            {heroContent.description.map((line, index) => (
              <motion.p
                key={index}
                className="font-alta text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-elegant-mocha/85 leading-relaxed tracking-wide text-center italic font-light px-2"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 3.2 + (index * 0.2),
                  duration: 1.2,
                  ease: LUXURY_EASING
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                {line}
              </motion.p>
            ))}
            
            {/* Philosophy Statement */}
            <motion.div
              className="flex flex-col items-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2, duration: 1.4, ease: LUXURY_EASING }}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-[0.5px] bg-soft-blush/60"></div>
                <motion.div
                  className="w-1.5 h-1.5 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-8 h-[0.5px] bg-soft-blush/60"></div>
              </div>
              <p className="font-alice text-xs sm:text-sm md:text-base text-elegant-mocha/70 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] italic text-center max-w-2xl leading-relaxed px-2">
                {heroContent.philosophy}
              </p>
            </motion.div>
          </motion.div>

          {/* Subtitle with Enhanced Luxury Treatment */}
          <motion.div
            className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pt-8 sm:pt-10 md:pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1.4, ease: LUXURY_EASING }}
          >
            <div className="flex items-center gap-6">
              <motion.div 
                className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-elegant-mocha/40 to-soft-blush/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 5.2, duration: 1.5, ease: LUXURY_EASING }}
              ></motion.div>
              <motion.div
                className="w-2 h-2 border border-elegant-mocha/30 rotate-45 bg-soft-blush/10"
                initial={{ rotate: 45, scale: 0 }}
                animate={{ rotate: 45, scale: 1 }}
                transition={{ delay: 5.8, duration: 0.8, ease: LUXURY_EASING }}
              />
              <motion.div 
                className="h-[0.5px] w-20 bg-gradient-to-l from-transparent via-elegant-mocha/40 to-soft-blush/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 5.4, duration: 1.5, ease: LUXURY_EASING }}
              ></motion.div>
            </div>
            <motion.p
              className="font-alice text-sm sm:text-base md:text-lg text-elegant-mocha/75 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] italic text-center font-light px-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6, duration: 1.2, ease: LUXURY_EASING }}
            >
              {heroContent.subtitle}
            </motion.p>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-6 pt-8 sm:pt-12 md:pt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.5, duration: 1.2, ease: LUXURY_EASING }}
          >
            <motion.div className="flex flex-col items-center gap-4">
              <motion.p 
                className="font-alice text-elegant-mocha/65 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-light"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Explore
              </motion.p>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                />
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />
              </div>
            </motion.div>
            <motion.div
              className="w-[0.5px] h-12 bg-gradient-to-b from-elegant-mocha/60 via-soft-blush/50 to-transparent relative"
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-soft-blush/70 blur-sm"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}