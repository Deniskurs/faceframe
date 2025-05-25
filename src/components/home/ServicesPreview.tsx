"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// Luxury brands use specific easing curves for silky-smooth animations
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

// Services data organized by category with direct links to service categories
const FEATURED_CATEGORIES = [
  {
    id: "semi-permanent-makeup",
    subtitle: "Semi-Permanent Makeup",
    description:
      "Precision techniques that enhance your natural beauty with lasting elegance",
    imageUrl: "/images/gallery/image1.webp",
    featured: "Signature Brows",
    exclusivity: "Custom-developed technique",
    result: "Natural, elegant definition",
  },
  {
    id: "lashes-brows",
    subtitle: "Lashes & Brows",
    description:
      "Expert enhancements that define your features with subtle sophistication",
    imageUrl: "/images/gallery/image4.webp",
    featured: "Volume Lashes",
    exclusivity: "Premium application method",
    result: "Striking yet natural effect",
  },
  {
    id: "facials",
    subtitle: "Luxury Facials",
    description:
      "Transformative treatments that reveal your skin's natural radiance",
    imageUrl: "/images/gallery/image16.webp",
    featured: "Million Dollar Facial",
    exclusivity: "Curated premium experience",
    result: "Radiant transformation",
  },
];

interface ServicesPreviewProps {
  hideTitle?: boolean;
}

const ServicesPreview: React.FC<ServicesPreviewProps> = ({
  hideTitle = false,
}) => {
  // Refs and state
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("lg");

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 768) {
        setScreenSize("md");
      } else if (width < 1024) {
        setScreenSize("lg");
      } else {
        setScreenSize("xl");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Setup Intersection Observer to detect which card is most visible
  useEffect(() => {
    if (typeof window === "undefined" || !carouselRef.current) return;

    // Force the carousel to start at the beginning
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }

    // Initialize active category to the first one
    setActiveCategory(0);

    // Setup intersection observer for each card
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (visibleEntry && visibleEntry.intersectionRatio > 0.5) {
          // Get the index from the dataset - cast to HTMLElement
          const target = visibleEntry.target as HTMLElement;
          const index = Number(target.dataset.index || 0);
          setActiveCategory(index);
        }
      },
      {
        root: carouselRef.current,
        threshold: [0.1, 0.5, 0.8], // Multiple thresholds for better detection
        rootMargin: "0px",
      }
    );

    // Store a reference to cardRefs.current
    const currentRefs = cardRefs.current;

    // Observe all card elements
    currentRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Handle carousel navigation
  const navigateCarousel = (index: number) => {
    setActiveCategory(index);

    if (carouselRef.current) {
      const scrollContainer = carouselRef.current;
      const containerWidth = scrollContainer.clientWidth;

      // Calculate scroll position
      let scrollOffset;
      if (screenSize === "sm" || screenSize === "md") {
        // Mobile: cards are 80% of container width
        scrollOffset = index * (containerWidth * 0.8);
      } else {
        // For tablet screens (visible cards may be different)
        scrollOffset = index * (containerWidth / 3);
      }

      // Scroll with smooth behavior
      scrollContainer.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  // Is mobile or tablet view?
  const isCarouselView = screenSize === "sm" || screenSize === "md";

  return (
    <motion.section
      ref={containerRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-light-cream overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: LUXURY_EASING }}
    >
      {/* Background and corner accents */}
      <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-8 left-8 w-5 h-[0.25px] bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute top-8 left-8 w-[0.25px] h-5 bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute bottom-8 right-8 w-5 h-[0.25px] bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute bottom-8 right-8 w-[0.25px] h-5 bg-elegant-mocha/30 hidden lg:block"></div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Section title with premium typography and animation */}
        {!hideTitle && (
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center relative">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-[0.25px] bg-elegant-mocha/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isRevealed ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: LUXURY_EASING }}
            />

            <motion.p
              className="font-alta text-xs tracking-[0.4em] text-elegant-mocha/60 uppercase mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.5, ease: LUXURY_EASING }}
            >
              Our Expertise
            </motion.p>

            <div className="overflow-hidden mb-1">
              <motion.h2
                className="font-alice text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] text-elegant-mocha uppercase"
                initial={{ y: 60 }}
                animate={{ y: isRevealed ? 0 : 60 }}
                transition={{ duration: 1.4, delay: 0.7, ease: LUXURY_EASING }}
              >
                SIGNATURE TREATMENTS
              </motion.h2>
            </div>

            <motion.div
              className="h-[0.25px] bg-elegant-mocha/40 mx-auto mt-6 sm:mt-8"
              initial={{ width: 0 }}
              animate={{ width: isRevealed ? "3rem" : 0 }}
              transition={{ duration: 1.2, delay: 1, ease: LUXURY_EASING }}
            />

            <motion.p
              className="mt-6 sm:mt-8 font-alta text-sm md:text-base tracking-wide max-w-xl mx-auto leading-relaxed text-elegant-mocha/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: isRevealed ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2, ease: LUXURY_EASING }}
            >
              Discover our collection of premium beauty services, each crafted
              with precision and expertise to enhance your natural beauty.
            </motion.p>
          </div>
        )}

        {/* Category Navigation - Desktop Version */}
        {!isCarouselView && (
          <div className="hidden md:flex justify-center mb-12 lg:mb-16">
            <div className="flex space-x-8 lg:space-x-12">
              {FEATURED_CATEGORIES.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => navigateCarousel(index)}
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
        )}

        {/* Main Content */}
        <div className="relative">
          {/* Desktop Layout */}
          {!isCarouselView ? (
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
                        {FEATURED_CATEGORIES[activeCategory].subtitle}
                      </h3>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Content */}
                <div className="md:pl-8 lg:pl-10 flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
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
                          Discover{" "}
                          {FEATURED_CATEGORIES[activeCategory].subtitle}
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
          ) : (
            /* Mobile & Tablet Carousel */
            <div className="relative">
              {/* Swipe hint animation */}
              <motion.div
                className="absolute left-1/2 top-[200px] -translate-x-1/2 z-10 pointer-events-none flex items-center space-x-1"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0, x: [0, 20, 0] }}
                transition={{
                  opacity: { duration: 1.5, delay: 2 },
                  x: {
                    duration: 1.5,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: 2,
                    delay: 1.2,
                  },
                }}
              >
                <div className="text-white/70 text-xs font-alta tracking-wide">
                  Swipe
                </div>
                <svg
                  width="20"
                  height="8"
                  viewBox="0 0 20 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
                    fill="rgba(255,255,255,0.7)"
                  />
                </svg>
              </motion.div>

              {/* Carousel container */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-14 scrollbar-hide relative"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  paddingBottom: "2.5rem", // Increased padding for better visual balance
                }}
              >
                {FEATURED_CATEGORIES.map((category, index) => (
                  <div
                    key={category.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                      // No return value (void)
                    }}
                    data-index={index}
                    className="flex-none w-4/5 px-4 snap-center"
                  >
                    {/* Mobile Service Card */}
                    <div className="relative bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-shadow duration-700">
                      {/* Image Container */}
                      <motion.div
                        className="relative h-[350px] sm:h-[380px] w-full overflow-hidden"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: LUXURY_EASING }}
                      >
                        <Image
                          src={category.imageUrl}
                          alt={category.subtitle}
                          fill
                          sizes="80vw"
                          className="object-cover object-center"
                          quality={85}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-black/5"></div>
                        {/* Subtle vignette edges */}
                        <div className="absolute inset-0 box-border border-[1px] border-white/10"></div>

                        <div className="absolute bottom-7 left-7 right-7 text-white">
                          <div className="mb-2.5">
                            <span className="font-alta uppercase tracking-[0.35em] text-white/90 text-xs">
                              {category.subtitle}
                            </span>
                          </div>
                          <h3 className="font-alice text-white text-2xl sm:text-3xl tracking-[0.12em]">
                            {category.subtitle}
                          </h3>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <div className="p-6 sm:p-7 pb-7 sm:pb-9">
                        {/* Subtle top border */}
                        <div className="absolute top-0 left-5 right-5 h-[0.25px] bg-elegant-mocha/5"></div>
                        <p className="font-alta text-elegant-mocha/70 text-sm tracking-wide leading-[1.7] mb-7 sm:mb-8">
                          {category.description}
                        </p>

                        <div className="mb-7 sm:mb-9">
                          <h4 className="font-alice text-elegant-mocha text-lg sm:text-xl mb-4 sm:mb-5 tracking-wider">
                            {category.featured}
                          </h4>
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center">
                              <div className="w-4 h-[0.25px] bg-deep-bronze/60 mr-3.5"></div>
                              <p className="font-alta text-elegant-mocha/85 text-xs tracking-[0.05em]">
                                {category.exclusivity}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-[0.25px] bg-deep-bronze/60 mr-3.5"></div>
                              <p className="font-alta text-elegant-mocha/85 text-xs tracking-[0.05em]">
                                {category.result}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/services/${category.id}`}
                          className="group block text-center relative border border-elegant-mocha/30 py-3.5 sm:py-4 px-5 sm:px-6 active:bg-elegant-mocha/5 transition-all duration-700"
                        >
                          <span className="font-alta uppercase tracking-[0.35em] text-elegant-mocha text-xs group-hover:text-deep-bronze transition-colors duration-700">
                            Discover Collection
                          </span>

                          {/* Elegant corner accents */}
                          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                            <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
                            <div className="absolute top-0 left-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
                          </div>
                          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                            <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
                            <div className="absolute bottom-0 right-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
                          </div>

                          <div className="absolute bottom-0 left-0 h-[0.25px] w-0 bg-deep-bronze/50 group-hover:w-full transition-all duration-700 ease-out"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Mobile Navigation */}
              <div className="flex justify-center items-center mt-8 relative">
                {/* Left arrow */}
                {activeCategory > 0 && (
                  <button
                    onClick={() => navigateCarousel(activeCategory - 1)}
                    className="absolute left-0 sm:left-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
                    aria-label="Previous service"
                  >
                    <svg
                      width="16"
                      height="8"
                      viewBox="0 0 16 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.73079 4.34027 7.73079 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM16 3.5L1 3.5V4.5L16 4.5V3.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}

                {/* Improved dots */}
                <div className="flex justify-center space-x-4 sm:space-x-5">
                  {FEATURED_CATEGORIES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => navigateCarousel(i)}
                      className="group p-3 focus:outline-none"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <div
                        className={`transition-all duration-600 ease-out ${
                          activeCategory === i
                            ? "w-10 h-[2px] bg-elegant-mocha"
                            : "w-5 h-[1px] bg-elegant-mocha/30 group-hover:bg-elegant-mocha/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Right arrow */}
                {activeCategory < FEATURED_CATEGORIES.length - 1 && (
                  <button
                    onClick={() => navigateCarousel(activeCategory + 1)}
                    className="absolute right-0 sm:right-6 top-0 p-3 text-elegant-mocha/60 focus:outline-none hidden sm:block"
                    aria-label="Next service"
                  >
                    <svg
                      width="16"
                      height="8"
                      viewBox="0 0 16 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4.5H15V3.5H0V4.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* View All Services button */}
        <motion.div
          className="mt-24 sm:mt-28 md:mt-32 lg:mt-36 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
        >
          <Link
            href="/services"
            className="group relative inline-block overflow-hidden"
          >
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[0.25px] h-4 bg-elegant-mocha/20 transition-all duration-700"
              whileInView={{ height: [0, 16] }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: LUXURY_EASING,
              }}
            />

            <div className="relative px-4 py-2">
              <span className="font-alta uppercase tracking-[0.25em] text-elegant-mocha text-xs transition-colors duration-700 group-hover:text-deep-bronze">
                VIEW COMPLETE COLLECTION
              </span>

              <motion.div className="absolute bottom-0 left-0 w-full h-[0.25px] bg-elegant-mocha/20 transform origin-left transition-transform duration-700 group-hover:scale-x-0" />
              <motion.div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze/60 transform origin-right transition-all duration-700 group-hover:w-full" />

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
    </motion.section>
  );
};

export default ServicesPreview;
