"use client";

import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { useRef, useState, useEffect } from "react";

const whisperWords = [
  "breathe",
  "softness", 
  "stillness",
  "grace",
  "light",
  "presence"
];


export default function IGGYHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  // Typewriter effect for whisper words
  useEffect(() => {
    const currentWord = whisperWords[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % whisperWords.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentWordIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-light-cream overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.8, ease: LUXURY_EASING }}
    >

      {/* Animated corner accents */}
      <motion.div 
        className="absolute top-12 left-12 w-4 h-[0.5px] bg-elegant-mocha/30 hidden md:block"
        initial={{ width: 0 }}
        animate={{ width: 16 }}
        transition={{ duration: 1.5, delay: 1, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute top-12 left-12 w-[0.5px] h-4 bg-elegant-mocha/30 hidden md:block"
        initial={{ height: 0 }}
        animate={{ height: 16 }}
        transition={{ duration: 1.5, delay: 1.2, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute bottom-12 right-12 w-4 h-[0.5px] bg-elegant-mocha/30 hidden md:block"
        initial={{ width: 0 }}
        animate={{ width: 16 }}
        transition={{ duration: 1.5, delay: 1.4, ease: LUXURY_EASING }}
      />
      <motion.div 
        className="absolute bottom-12 right-12 w-[0.5px] h-4 bg-elegant-mocha/30 hidden md:block"
        initial={{ height: 0 }}
        animate={{ height: 16 }}
        transition={{ duration: 1.5, delay: 1.6, ease: LUXURY_EASING }}
      />

      {/* Meticulous Grid-Based Layout System */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 lg:px-12">
        
        {/* Main Content Container - Perfect Center Alignment */}
        <motion.div
          className="w-full max-w-4xl flex flex-col items-center justify-center gap-12 sm:gap-16 lg:gap-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: LUXURY_EASING }}
        >
          
          {/* 1. Opening Accent Line */}
          <motion.div
            className="w-12 h-[0.5px] bg-elegant-mocha/60 relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: LUXURY_EASING }}
          >
            <motion.div
              className="absolute inset-0 bg-soft-blush/40 blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ 
                duration: 2, 
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 4,
                ease: LUXURY_EASING 
              }}
            />
          </motion.div>

          {/* 2. Main Title */}
          <motion.div className="flex flex-col items-center justify-center gap-8 w-full">
            <motion.h1
              className="uppercase text-elegant-mocha font-alice tracking-[0.25em] font-light text-center"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                lineHeight: "1.1",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.8, 
                delay: 0.7, 
                ease: LUXURY_EASING,
                scale: { delay: 1.2, duration: 1.2 }
              }}
            >
              {"IGGY".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1 + (index * 0.15),
                    duration: 0.8,
                    ease: LUXURY_EASING
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.div 
              className="text-elegant-mocha/70 font-alice tracking-[0.18em] font-light text-center"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
                lineHeight: "1.4",
                textShadow: "0 0.5px 2px rgba(0,0,0,0.05)",
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.2, ease: LUXURY_EASING }}
            >
              {["Where", "artistry", "meets", "soul"].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.4 + (index * 0.2),
                    duration: 0.8,
                    ease: LUXURY_EASING
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* 3. Typewriter Words */}
          <motion.div 
            className="min-h-[6rem] flex items-center justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1.5, ease: LUXURY_EASING }}
          >
            <div className="text-center w-full flex items-center justify-center">
              <span 
                className="font-alta text-elegant-mocha/70 tracking-[0.25em] uppercase font-light text-balance text-pretty"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
                  lineHeight: "1.2",
                  textRendering: "geometricPrecision",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {displayText}
                <span 
                  className={`inline-block w-[2px] bg-elegant-mocha/70 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                  style={{ 
                    height: "1em", 
                    verticalAlign: "top",
                    transform: "translateY(0.1em)"
                  }}
                />
              </span>
            </div>
          </motion.div>

          {/* 4. Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1, ease: LUXURY_EASING }}
          >
            <motion.p 
              className="font-alta text-elegant-mocha/60 text-[10px] tracking-[0.25em] uppercase"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Discover
            </motion.p>
            <motion.div
              className="w-[0.5px] h-8 bg-elegant-mocha/50 relative"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-soft-blush/60 blur-sm"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ 
                  duration: 2.5, 
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