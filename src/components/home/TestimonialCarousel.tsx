"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassMorphicCard from "../shared/GlassMorphicCard";
import FadeInSection from "../shared/FadeInSection";
import { Testimonial } from "../../types";
import testimonialService from "../../services/testimonialService";

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

  // Handle automatic sliding
  useEffect(() => {
    // Only start auto-sliding when we have testimonials and not paused
    if (testimonials.length > 0 && !isPaused && !loading) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7000); // 7 seconds per testimonial - optimal time for reading
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
      }, 7000);
    }
  };

  // Star animation variants
  const starContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <FadeInSection>
      <section className="py-12 md:py-16 px-4 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto relative">
          <h2
            className="font-alice text-2xl md:text-4xl text-center mb-8 md:mb-12"
            style={{ color: "#7F5539" }}
          >
            Client Experiences
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-elegant-mocha border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 font-alta" style={{ color: "#7F5539" }}>
                Loading testimonials...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="font-alta text-red-500">{error}</p>
            </div>
          )}

          {/* Carousel Content */}
          {!loading && !error && testimonials.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <GlassMorphicCard
                  key={current}
                  className="p-8 md:p-12"
                  intensity="medium"
                  hoverEffect={false}
                >
                  {/* Quote Mark */}
                  <div className="absolute top-6 left-8 opacity-15">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="#7F5539"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                    </svg>
                  </div>

                  {/* Star Rating */}
                  <motion.div
                    className="flex mb-4 justify-center"
                    variants={starContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[...Array(testimonials[current]?.rating || 5)].map(
                      (_, i) => (
                        <motion.span
                          key={i}
                          variants={starVariants}
                          className="text-amber-500 mx-0.5"
                        >
                          ⭐
                        </motion.span>
                      )
                    )}
                  </motion.div>

                  {/* Quote */}
                  <p
                    className="text-center font-alta text-lg md:text-xl mb-6"
                    style={{ color: "#7F5539" }}
                  >
                    &ldquo;{testimonials[current]?.quote}&rdquo;
                  </p>

                  {/* Client Info */}
                  <div className="text-center">
                    <p
                      className="font-alice text-lg"
                      style={{ color: "#B08968" }}
                    >
                      {testimonials[current]?.name}
                      <span className="mx-1">·</span>
                      <span
                        className="text-sm font-alta"
                        style={{ color: "#B08968" }}
                      >
                        {testimonials[current]?.service_type}
                      </span>
                    </p>

                    {/* Verified Badge */}
                    <div className="flex items-center justify-center mt-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        style={{ color: "#4CAF50" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-xs" style={{ color: "#B08968" }}>
                        Verified Client
                      </span>
                    </div>
                  </div>
                </GlassMorphicCard>
              </AnimatePresence>

              {/* Navigation Arrows - Only show when we have testimonials */}
              {testimonials.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 md:translate-x-0 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center focus:outline-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 19L8 12L15 5"
                        stroke="#7F5539"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 md:translate-x-0 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center focus:outline-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L16 12L9 19"
                        stroke="#7F5539"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot Indicators - Only show when we have multiple testimonials */}
              {testimonials.length > 1 && (
                <div className="flex justify-center mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`mx-1 rounded-full transition-all duration-300 focus:outline-none ${
                        current === index ? "w-4" : "w-2 h-2"
                      }`}
                      style={{
                        backgroundColor:
                          current === index ? "#7F5539" : "#DDB892",
                        height: current === index ? "8px" : "8px",
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Empty State - No testimonials */}
          {!loading && !error && testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="font-alta" style={{ color: "#7F5539" }}>
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
