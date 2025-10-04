"use client";

import { motion } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useRef, useEffect } from "react";

const sectionContent = {
  preTitle: "Precious Moments",
  title: "INSTAGRAM GALLERY",
  subtitle: "Chronicles of Elegance",
  description: "Follow our artistic journey and discover authentic transformations over time. Each captured moment reveals a story of beauty, confidence and sublime self-discovery.",
  note: "Follow @faceframe_beauty for daily inspiration",
  philosophy: "True art reveals itself in spontaneous moments of beauty"
};

export default function InstagramGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load LightWidget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://cdn.lightwidget.com/widgets/lightwidget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-elegant-mocha/8 via-soft-blush/15 to-light-cream/40 overflow-hidden"
    >
      {/* Chanel-Inspired Architectural Elements */}
      <div className="absolute inset-0">
        {/* Top Left Accent */}
        <motion.div 
          className="absolute top-8 sm:top-12 md:top-16 lg:top-20 left-8 sm:left-12 md:left-16 lg:left-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2.5, delay: 0.4, ease: LUXURY_EASING }}
        >
          <div className="relative">
            <div className="w-24 h-[0.5px] bg-elegant-mocha/20"></div>
            <div className="w-[0.5px] h-24 bg-elegant-mocha/20"></div>
            <motion.div 
              className="absolute -top-1 -left-1 w-3 h-3 border border-soft-blush/40 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        
        {/* Top Right Accent */}
        <motion.div 
          className="absolute top-8 sm:top-12 md:top-16 lg:top-20 right-8 sm:right-12 md:right-16 lg:right-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2.5, delay: 0.6, ease: LUXURY_EASING }}
        >
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20 ml-auto"></div>
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20 ml-auto"></div>
        </motion.div>
        
        {/* Bottom Left Accent */}
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-8 sm:left-12 md:left-16 lg:left-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2.5, delay: 0.8, ease: LUXURY_EASING }}
        >
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20"></div>
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20"></div>
        </motion.div>
        
        {/* Bottom Right Accent */}
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 right-8 sm:right-12 md:right-16 lg:right-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={standardViewport}
          transition={{ duration: 2.5, delay: 1, ease: LUXURY_EASING }}
        >
          <div className="relative">
            <div className="w-24 h-[0.5px] bg-elegant-mocha/20 ml-auto"></div>
            <div className="w-[0.5px] h-24 bg-elegant-mocha/20 ml-auto"></div>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-2 h-2 border border-elegant-mocha/30 rotate-45"
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        
        {/* Subtle Pattern Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02] bg-gradient-radial from-elegant-mocha/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={standardViewport}
          transition={{ duration: 4, delay: 1.5, ease: LUXURY_EASING }}
        />
      </div>

      {/* Content Container */}
      <div className="flex items-center justify-center min-h-screen py-16 sm:py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">
            
            {/* Enhanced Section Header */}
            <motion.div
              className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 text-center w-full max-w-5xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ duration: 1.6, ease: LUXURY_EASING }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.2, ease: LUXURY_EASING }}
              >
                <div className="flex items-center gap-8">
                  <motion.div 
                    className="w-20 h-[0.5px] bg-soft-blush/50"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: LUXURY_EASING }}
                  />
                  <motion.div
                    className="w-3 h-3 border border-soft-blush/60 rounded-full bg-soft-blush/10"
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: LUXURY_EASING }}
                  />
                  <motion.div 
                    className="w-20 h-[0.5px] bg-soft-blush/50"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.7, ease: LUXURY_EASING }}
                  />
                </div>
                <h3 className="font-alice text-sm tracking-[0.4em] uppercase text-elegant-mocha/65 font-light">
                  {sectionContent.preTitle}
                </h3>
              </motion.div>
              
              <motion.h2
                className="font-alice text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] text-elegant-mocha uppercase font-light leading-[1.1]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1.8, ease: LUXURY_EASING }}
              >
                {sectionContent.title}
              </motion.h2>
              
              <motion.h3
                className="font-alta text-lg sm:text-xl md:text-2xl lg:text-3xl text-elegant-mocha/85 font-light italic leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.2, ease: LUXURY_EASING }}
              >
                {sectionContent.subtitle}
              </motion.h3>
              
              <motion.p
                className="font-alta text-sm sm:text-base md:text-lg lg:text-xl text-elegant-mocha/80 leading-relaxed tracking-wide max-w-4xl px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1.2, ease: LUXURY_EASING }}
              >
                {sectionContent.description}
              </motion.p>
              
              {/* Philosophy Quote */}
              <motion.div
                className="flex flex-col items-center gap-6 pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.4, ease: LUXURY_EASING }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/30"></div>
                  <motion.div
                    className="w-1.5 h-1.5 bg-soft-blush/60 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/30"></div>
                </div>
                <p className="font-alice text-xs sm:text-sm md:text-base text-elegant-mocha/70 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] italic text-center max-w-2xl px-4">
                  {sectionContent.philosophy}
                </p>
              </motion.div>
            </motion.div>

            {/* Instagram Widget Container - Chanel-Inspired */}
            <motion.div
              className="w-full max-w-6xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.5, duration: 1.6, ease: LUXURY_EASING }}
            >
              {/* Luxury Frame for Instagram Widget */}
              <div className="relative bg-gradient-to-br from-white/90 via-light-cream/20 to-soft-blush/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 border border-elegant-mocha/12 backdrop-blur-sm overflow-hidden">
                {/* Chanel-Style Corner Accents */}
                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 w-4 sm:w-6 md:w-8 h-[0.5px] bg-elegant-mocha/20"></div>
                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 w-[0.5px] h-4 sm:h-6 md:h-8 bg-elegant-mocha/20"></div>
                <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-4 sm:w-6 md:w-8 h-[0.5px] bg-elegant-mocha/20"></div>
                <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-[0.5px] h-4 sm:h-6 md:h-8 bg-elegant-mocha/20"></div>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 w-4 sm:w-6 md:w-8 h-[0.5px] bg-elegant-mocha/20"></div>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 w-[0.5px] h-4 sm:h-6 md:h-8 bg-elegant-mocha/20"></div>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-4 sm:w-6 md:w-8 h-[0.5px] bg-elegant-mocha/20"></div>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-[0.5px] h-4 sm:h-6 md:h-8 bg-elegant-mocha/20"></div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-soft-blush/8 via-transparent to-elegant-mocha/5 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: LUXURY_EASING }}
                />
                
                {/* Floating Accent Elements */}
                <motion.div
                  className="absolute top-1/4 left-4 w-2 h-2 border border-soft-blush/40 rounded-full bg-soft-blush/10"
                  animate={{ y: [-5, 5, -5], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-4 w-1.5 h-1.5 border border-elegant-mocha/30 rotate-45"
                  animate={{ rotate: [45, 405], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                
                {/* LightWidget Instagram Integration */}
                <div className="relative z-10 w-full">
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-elegant-mocha/8 bg-white/50 backdrop-blur-sm"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.2, ease: LUXURY_EASING }}
                  >
                    <iframe 
                      ref={iframeRef}
                      src="//lightwidget.com/widgets/f70792d1008456b9a12ba7ec3698fcd2.html" 
                      scrolling="no" 
                      className="lightwidget-widget w-full border-0 overflow-hidden rounded-2xl"
                      style={{
                        width: '100%',
                        border: 0,
                        overflow: 'hidden',
                        minHeight: 'clamp(400px, 50vh, 600px)',
                        background: 'transparent'
                      }}
                      title="Instagram Gallery"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Follow Note */}
            <motion.div
              className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={standardViewport}
              transition={{ delay: 0.8, duration: 1.4, ease: LUXURY_EASING }}
            >
              <div className="flex items-center gap-6">
                <motion.div 
                  className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-elegant-mocha/40 to-soft-blush/60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: LUXURY_EASING }}
                />
                <motion.div
                  className="w-3 h-3 border border-soft-blush/50 rounded-full bg-gradient-to-br from-soft-blush/20 to-elegant-mocha/10"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="h-[0.5px] w-20 bg-gradient-to-l from-transparent via-elegant-mocha/40 to-soft-blush/60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: LUXURY_EASING }}
                />
              </div>
              <motion.p
                className="font-alice text-sm sm:text-base md:text-lg text-elegant-mocha/75 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] italic font-light px-4"
                whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.4 } }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1, ease: LUXURY_EASING }}
              >
                {sectionContent.note}
              </motion.p>
              
              {/* Social Media Accent */}
              <motion.div
                className="flex items-center gap-3 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2, ease: LUXURY_EASING }}
              >
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                />
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="w-1 h-1 bg-soft-blush/70 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}