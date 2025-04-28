"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassMorphicCard from "../shared/GlassMorphicCard";
import FadeInSection from "../shared/FadeInSection";

// Sample testimonials - in real implementation, this would come from the JSON data
const testimonials = [
  {
    id: "testimonial-1",
    quote:
      "So, so pleased with my eyelashes. I asked for the natural look, and that exactly what I got!! The salon is very friendly, made to feel welcome. I'll def be back",
    name: "Lesley E",
    date: "9th Nov 24",
    service_type: "Lash Extensions",
    featured: true,
  },
  {
    id: "testimonial-2",
    quote:
      "This is a great place. Iggy is friendly, professional and conscientious. I will be returning when I need more done. I would recommend this establishment to anyone.",
    name: "Carol W",
    date: "8th Aug 24",
    service_type: "General",
    featured: true,
  },
  {
    id: "testimonial-5",
    quote:
      "This is my third time coming to Iggy for my brows and she smashes it every time! Her attention to detail is amazing, and immediately makes you feel so comfortable in her salon!",
    name: "Annabel P",
    date: "2nd Jun 24",
    service_type: "Brows",
    featured: true,
  },
  {
    id: "testimonial-10",
    quote:
      "I am in love with my Ombre brows 😍 best choice I ever made booking with Iggy!",
    name: "Irene",
    date: "21st Feb 23",
    service_type: "Ombré Brows",
    featured: true,
  },
  {
    id: "testimonial-12",
    quote:
      "I had microblading done with Iggy d recently went for waxing near where I live. The lady said she has never seen better job!",
    name: "Amelia",
    date: "16th Jan 23",
    service_type: "Microblading",
    featured: true,
  },
];

// We can use testimonials directly, no need for a separate type for now

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic sliding
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7000); // 7 seconds per testimonial - optimal time for reading
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Navigation
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    resetTimer();
  };

  const handlePrev = () => {
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

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
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
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <h2
            className="font-alice text-2xl md:text-4xl text-center mb-8 md:mb-12"
            style={{ color: "#7F5539" }}
          >
            Client Experiences
          </h2>

          {/* Carousel Container */}
          <div className="relative">
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
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      variants={starVariants}
                      className="text-amber-500 mx-0.5"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>

                {/* Quote */}
                <p
                  className="text-center font-alta text-lg md:text-xl mb-6"
                  style={{ color: "#7F5539" }}
                >
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                {/* Client Info */}
                <div className="text-center">
                  <p
                    className="font-alice text-lg"
                    style={{ color: "#B08968" }}
                  >
                    {testimonials[current].name}
                    <span className="mx-1">·</span>
                    <span
                      className="text-sm font-alta"
                      style={{ color: "#B08968" }}
                    >
                      {testimonials[current].service_type}
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

            {/* Navigation Arrows */}
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
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`mx-1 rounded-full transition-all duration-300 focus:outline-none ${
                  current === index ? "w-4" : "w-2 h-2"
                }`}
                style={{
                  backgroundColor: current === index ? "#7F5539" : "#DDB892",
                  height: current === index ? "8px" : "8px",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default TestimonialCarousel;
