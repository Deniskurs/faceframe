import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FEATURED_CATEGORIES, LUXURY_EASING } from "./types";

export function DesktopServicesView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // This comment uses isRevealed to prevent ESLint errors, while preserving the consistent pattern
  const isInitiallyRevealed = isRevealed;

  // Setup parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Set revealed state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Category Navigation - Desktop Version */}
      <div className="hidden md:flex justify-center mb-12 lg:mb-16">
        <div className="flex space-x-8 lg:space-x-12">
          {FEATURED_CATEGORIES.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className="group relative px-3 py-2 transition-all duration-700 ease-out focus:outline-none"
            >
              <span
                className={`font-alta text-sm tracking-[0.25em] uppercase transition-colors duration-500 ${
                  activeCategory === index
                    ? "text-deep-bronze"
                    : "text-elegant-mocha/80"
                }`}
              >
                {category.subtitle}
              </span>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[0.25px] bg-deep-bronze"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeCategory === index ? 1 : 0 }}
                transition={{ duration: 0.6, ease: LUXURY_EASING }}
              />

              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-[0.25px] bg-elegant-mocha/30 transform origin-left transition-transform duration-500 ease-out ${
                  activeCategory === index
                    ? "scale-x-0"
                    : "group-hover:scale-x-100"
                }`}
                initial={{ scaleX: 0 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`category-${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center"
        >
          {/* Left Column - Image */}
          <div className="relative h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden group">
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
              style={{ y: yOffset }}
            >
              <Image
                src={FEATURED_CATEGORIES[activeCategory].imageUrl}
                alt={FEATURED_CATEGORIES[activeCategory].subtitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-[1.02]"
                priority
                quality={95}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute inset-x-0 top-0 h-[0.25px] bg-white/20"></div>
              <div className="absolute inset-0 box-border border border-white/5"></div>

              <div className="absolute bottom-7 sm:bottom-9 left-7 sm:left-9 right-7 sm:right-9">
                <h3 className="font-alice text-white text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em]">
                  {FEATURED_CATEGORIES[activeCategory].title}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="md:pl-8 lg:pl-10 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isInitiallyRevealed ? 1 : 0,
                y: isInitiallyRevealed ? 0 : 30,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: LUXURY_EASING,
              }}
            >
              <h4 className="font-alta uppercase tracking-[0.35em] text-elegant-mocha/80 text-sm mb-4">
                {FEATURED_CATEGORIES[activeCategory].subtitle}
              </h4>

              <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mb-7 sm:mb-10"></div>

              <p className="font-alta text-elegant-mocha/70 text-base tracking-wide leading-[1.8] mb-9 sm:mb-12 max-w-lg">
                {FEATURED_CATEGORIES[activeCategory].description}
              </p>

              <div className="mb-9 sm:mb-12">
                <h4 className="font-alice text-elegant-mocha text-xl sm:text-2xl mb-5 sm:mb-6 tracking-wider">
                  {FEATURED_CATEGORIES[activeCategory].featured}
                </h4>

                <div className="space-y-4.5 sm:space-y-5">
                  <div className="flex items-center">
                    <div className="w-5 h-[0.25px] bg-deep-bronze/60 mr-4.5"></div>
                    <p className="font-alta text-elegant-mocha/90 text-sm tracking-[0.05em]">
                      {FEATURED_CATEGORIES[activeCategory].exclusivity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-[0.25px] bg-deep-bronze/60 mr-4.5"></div>
                    <p className="font-alta text-elegant-mocha/90 text-sm tracking-[0.05em]">
                      {FEATURED_CATEGORIES[activeCategory].result}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/services/${FEATURED_CATEGORIES[activeCategory].id}`}
                className="group inline-block relative overflow-hidden"
              >
                <div className="relative px-9 sm:px-10 py-3.5 sm:py-4 border border-elegant-mocha/20 group-hover:border-elegant-mocha/40 transition-all duration-700">
                  <span className="font-alta text-elegant-mocha/90 text-xs tracking-[0.35em] uppercase group-hover:text-deep-bronze transition-colors duration-700">
                    Discover {FEATURED_CATEGORIES[activeCategory].subtitle}
                  </span>

                  <div className="absolute bottom-0 left-0 h-[0.25px] w-0 bg-deep-bronze/50 group-hover:w-full transition-all duration-700 ease-out"></div>

                  {/* Elegant corner accents */}
                  <div className="absolute -top-[1px] -left-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
                    <div className="absolute top-0 left-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
                  </div>
                  <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                    <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
                    <div className="absolute bottom-0 right-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
