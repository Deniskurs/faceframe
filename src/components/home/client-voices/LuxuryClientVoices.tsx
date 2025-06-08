"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../../types";
import testimonialService from "../../../services/testimonialService";
import useEmblaCarousel from "embla-carousel-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface LuxuryClientVoicesProps {
  hideTitle?: boolean;
}

export default function LuxuryClientVoices({
  hideTitle = false,
}: LuxuryClientVoicesProps) {
  // State management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set up Embla carousel with Chanel-inspired luxury ratio proportions
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    containScroll: false,
    inViewThreshold: 0.62, // Golden ratio approximation for viewport threshold
  });

  // Fetch testimonials when component mounts
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const featuredTestimonials =
          await testimonialService.getFeaturedTestimonials();

        // Ensure testimonials are properly ordered for visual impact
        const orderedTestimonials = [...featuredTestimonials].sort(
          (a, b) => (b.rating || 5) - (a.rating || 5)
        );

        setTestimonials(orderedTestimonials);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load client feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Set up Embla carousel events
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    // Call once to set initial index
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Navigation functions
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Subtle texture overlay - Chanel inspired */}
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.02] mix-blend-overlay"></div>

      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative max-w-[1200px] w-full">
        {/* Standardized Section Title */}
        {!hideTitle && (
          <SectionTitle
            title="CLIENT VOICES"
            subtitle="Experiences"
            align="center"
            variant="dark"
          />
        )}

        {/* Refined Loading State with Chanel-inspired aesthetics */}
        {loading && (
          <div className="text-center py-24">
            <div className="relative w-10 h-10 mx-auto">
              <div className="absolute inset-0 border border-elegant-mocha/20 border-t-elegant-mocha/60 rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Error State with Chanel-inspired minimalism */}
        {error && (
          <div className="text-center py-24">
            <p className="font-alta text-sm tracking-wide text-deep-bronze">
              {error}
            </p>
          </div>
        )}

        {/* Main Testimonial Carousel - Embla implementation */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            {/* Main Carousel */}
            <div className="overflow-hidden w-full" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                    <div className="px-4 w-full">
                      <motion.div
                        className="bg-white pt-20 pb-20 px-4 sm:pt-24 sm:pb-24 sm:px-6 md:px-12 lg:px-16 xl:px-20 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: LUXURY_EASING }}
                      >
                        {/* Testimonial Content - Fixed width for consistent alignment */}
                        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
                          {/* Rating Display - Minimal refined aesthetic */}
                          <div className="flex justify-center mb-12 space-x-3">
                            {[...Array(5)].map((_, index) => (
                              <div
                                key={index}
                                className={`w-[2px] h-6 ${
                                  index < (testimonial.rating || 5)
                                    ? "bg-elegant-mocha/30"
                                    : "bg-elegant-mocha/10"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Quote Content - Refined typography with consistent width */}
                          <p className="font-alice text-xl md:text-2xl text-elegant-mocha/90 text-center leading-relaxed tracking-wide italic mb-20 w-full">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>

                          {/* Single subtle line element (reduced from multiple) */}
                          <div className="h-[0.5px] w-6 bg-elegant-mocha/10 mb-8"></div>

                          {/* Client Information with golden ratio proportioned container */}
                          <div className="flex flex-col items-center w-full max-w-[200px]">
                            <p className="font-alta text-sm uppercase tracking-[0.15em] text-muted-sand mb-1 w-full text-center">
                              {testimonial.name}
                            </p>
                            <p className="font-alta text-xs tracking-wide text-muted-sand/80 mt-1 w-full text-center">
                              {testimonial.service_type}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant Chanel-inspired Navigation */}
            {testimonials.length > 1 && (
              <div className="flex justify-between items-center mt-12">
                {/* Left button with Chanel styling */}
                <motion.button
                  className="flex items-center group focus:outline-none"
                  onClick={scrollPrev}
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASING }}
                >
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mr-3 group-hover:bg-elegant-mocha/60 transition-all duration-700"></div>
                  <span className="font-alta text-xs tracking-[0.15em] uppercase text-elegant-mocha/60 group-hover:text-elegant-mocha/90 transition-all duration-700">
                    Prev
                  </span>
                </motion.button>

                {/* Minimal page indicator with Chanel aesthetic */}
                <div className="font-alta text-xs tracking-wider text-elegant-mocha/60">
                  {currentIndex + 1} / {testimonials.length}
                </div>

                {/* Right button with Chanel styling */}
                <motion.button
                  className="flex items-center group focus:outline-none"
                  onClick={scrollNext}
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASING }}
                >
                  <span className="font-alta text-xs tracking-[0.15em] uppercase text-elegant-mocha/60 group-hover:text-elegant-mocha/90 transition-all duration-700">
                    Next
                  </span>
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/30 ml-3 group-hover:bg-elegant-mocha/60 transition-all duration-700"></div>
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* Empty State with Chanel-inspired minimalism */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-28 border border-soft-blush/10 bg-white">
            <p className="font-alta text-sm tracking-wide text-elegant-mocha/70">
              Client voices will be featured here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
