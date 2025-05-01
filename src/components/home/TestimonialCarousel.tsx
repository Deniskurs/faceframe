"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import { Testimonial } from "../../types";
import testimonialService from "../../services/testimonialService";

// CHANEL-inspired luxury easing curve
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch testimonials when component mounts
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const featuredTestimonials =
          await testimonialService.getFeaturedTestimonials();
        setTestimonials(featuredTestimonials);
        setError(null);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle automatic sliding with refined timing
  useEffect(() => {
    if (testimonials.length > 0 && !isPaused && !loading) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7500); // Slightly longer for luxury pacing
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials, loading]);

  // Navigation
  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
    resetTimer();
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7500);
    }
  };

  return (
    <FadeInSection intensity="subtle">
      <section className="py-24 md:py-32 px-6 bg-light-cream relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-20">
            <motion.h2
              className="section-title inline-block relative font-alice text-2xl md:text-3xl tracking-[0.15em] text-elegant-mocha uppercase"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              CLIENT VOICES
              <span className="block h-[1px] w-10 mx-auto bg-elegant-mocha mt-4"></span>
            </motion.h2>
          </div>

          {/* Refined Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 border border-elegant-mocha/30 border-t-elegant-mocha animate-spin"></div>
              </div>
              <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/70">
                Loading testimonials
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="font-alta text-sm tracking-wide text-deep-bronze">
                {error}
              </p>
            </div>
          )}

          {/* Carousel Content */}
          {!loading && !error && testimonials.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.7, ease: LUXURY_EASING }}
                  className="bg-white p-12 md:p-16 border border-soft-blush/10"
                >
                  {/* Refined Quote Layout */}
                  <div className="max-w-2xl mx-auto">
                    {/* Elegant rating display */}
                    <div className="mb-10 flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < (testimonials[current]?.rating || 5)
                              ? "bg-elegant-mocha"
                              : "bg-soft-blush"
                          }`}
                        />
                      ))}
                    </div>

                    {/* CHANEL-inspired decorative elements */}
                    <div className="relative">
                      <div className="absolute -top-6 left-0 h-[1px] w-10 bg-soft-blush/60"></div>

                      {/* Quote Content */}
                      <p className="font-alice text-lg md:text-xl text-elegant-mocha/90 text-center leading-relaxed tracking-wide italic mb-10">
                        &ldquo;{testimonials[current]?.quote}&rdquo;
                      </p>

                      <div className="absolute -bottom-6 right-0 h-[1px] w-10 bg-soft-blush/60"></div>
                    </div>

                    {/* Client Info with refined typography */}
                    <div className="mt-12 text-center">
                      <p className="font-alta text-sm uppercase tracking-[0.15em] text-muted-sand mb-1">
                        {testimonials[current]?.name}
                      </p>
                      <p className="font-alta text-xs tracking-wide text-muted-sand/80">
                        {testimonials[current]?.service_type}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CHANEL-inspired minimal navigation */}
              {testimonials.length > 1 && (
                <>
                  {/* Minimalist navigation arrows */}
                  <button
                    className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center focus:outline-none text-elegant-mocha/40 hover:text-elegant-mocha transition-colors duration-300"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                  >
                    <div className="w-8 h-[1px] bg-current rotate-[135deg]"></div>
                    <div className="w-8 h-[1px] bg-current rotate-45 -mt-[1px]"></div>
                  </button>

                  <button
                    className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center focus:outline-none text-elegant-mocha/40 hover:text-elegant-mocha transition-colors duration-300"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                  >
                    <div className="w-8 h-[1px] bg-current rotate-45"></div>
                    <div className="w-8 h-[1px] bg-current rotate-[315deg] -mt-[1px]"></div>
                  </button>

                  {/* Minimal dot indicators */}
                  <div className="flex justify-center mt-12 space-x-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative focus:outline-none group"
                        aria-label={`Go to testimonial ${index + 1}`}
                      >
                        <div
                          className={`w-10 h-[1px] bg-soft-blush transition-all duration-700 ${
                            current === index
                              ? "bg-elegant-mocha"
                              : "group-hover:bg-elegant-mocha/50"
                          }`}
                        ></div>

                        {current === index && (
                          <motion.div
                            className="absolute -top-1 left-0 w-2 h-2 bg-elegant-mocha rounded-full"
                            layoutId="testimonialIndicator"
                            transition={{ duration: 0.6, ease: LUXURY_EASING }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Empty State - Refined presentation */}
          {!loading && !error && testimonials.length === 0 && (
            <div className="text-center py-20 border border-soft-blush/10 bg-white">
              <p className="font-alta text-sm tracking-wide text-elegant-mocha/70">
                No testimonials available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </FadeInSection>
  );
};

export default TestimonialCarousel;
