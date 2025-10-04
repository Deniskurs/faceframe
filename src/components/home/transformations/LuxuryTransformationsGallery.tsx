"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeforeAfterSlider from "../../shared/BeforeAfterSlider";
import { GalleryItem } from "../../../types";
import galleryService from "../../../services/galleryService";
import EditorialTransformationLayout from "./EditorialTransformationLayout";
import { luxuryEasing } from "../../../utils/animations/luxurySpacing";
import { standardViewport } from "@/utils/animations/luxuryAnimations";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
// import { SectionTitle } from "@/components/shared/SectionTitle";
import { useLuxuryReveal } from "../../../utils/animations/useLuxuryTransition";

interface LuxuryTransformationsGalleryProps {
  hideTitle?: boolean;
}

const STAGGER_ANIMATION_DELAY = 300;

export default function LuxuryTransformationsGallery({
  hideTitle = false,
}: LuxuryTransformationsGalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger visibility for staggered animations (matching Services pattern)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, STAGGER_ANIMATION_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Featured image reveal animation
  const featuredReveal = useLuxuryReveal<HTMLDivElement>({
    direction: "up",
    threshold: 0.1,
    delay: 0.2,
    duration: 1.2,
    easingType: "elegant",
  });

  // Fetch featured gallery items
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const featuredItems = await galleryService.getFeaturedGalleryItems();
        setGalleryItems(featuredItems);
        setError(null);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("Unable to load transformations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Editorial quote configuration
  const philosophyQuote =
    "True beauty enhancement is about precision, subtlety, and respecting one's natural features.";
  const philosophyAuthor = "FaceFrame Philosophy";

  return (
    <motion.section
      className="pt-24 pb-40 relative overflow-hidden bg-soft-blush"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: luxuryEasing.elegant }}
    >
      <div className="container mx-auto px-4 sm:px-8 relative">
        {/* Section Content with Editorial Layout */}
        <EditorialTransformationLayout
          title={!hideTitle ? "TRANSFORMATIONS" : undefined}
          quote={philosophyQuote}
          quoteAuthor={philosophyAuthor}
        >
          {/* Refined Loading State with Luxury Animation */}
          {loading && (
            <div className="text-center py-24">
              <div className="relative w-12 h-12 mx-auto">
                <motion.div
                  className="absolute inset-0 border border-elegant-mocha/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-[2px] border border-elegant-mocha/10"
                  animate={{ rotate: -180 }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />
                <div className="absolute inset-1/4 border-[0.5px] border-elegant-mocha/30" />
              </div>
              <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/60">
                Curating transformations
              </p>
            </div>
          )}

          {/* Error State with Refined Typography */}
          {error && (
            <div className="text-center py-24">
              <div className="w-16 h-[1px] bg-elegant-mocha/20 mx-auto mb-6"></div>
              <p className="font-alta text-sm tracking-wide text-deep-bronze">
                {error}
              </p>
              <div className="w-16 h-[1px] bg-elegant-mocha/20 mx-auto mt-6"></div>
            </div>
          )}

          {!loading && !error && galleryItems.length > 0 && (
            <div>
              {/* Featured Transformation - clean and focused */}
              <div className="relative mb-40 max-w-5xl mx-auto">
                <motion.div
                  ref={featuredReveal.ref}
                  variants={featuredReveal.variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative overflow-hidden mx-auto"
                >
                  {/* Featured transformation slider with integrated category labels */}
                  {galleryItems[0] && (
                    <BeforeAfterSlider
                      beforeImage={galleryItems[0].beforeImage}
                      afterImage={galleryItems[0].afterImage}
                      alt={galleryItems[0].alt || "Transformation"}
                      height={680}
                      initialPosition={38} // Golden ratio (62/38) for slider position
                      labelStyle="elegant"
                      autoAnimateOnHover={true}
                      categoryLabel={galleryItems[0].category}
                      showClientResult={true}
                      clientResultText="Real Client Result"
                    />
                  )}
                </motion.div>
              </div>

              {/* Transformation Collection - balanced Chanel grid with intentional asymmetry */}
              <div className="mb-36 relative">
                {/* Left-aligned heading (Chanel signature) with proper spacing */}
                <div className="pl-[8%] mb-16">
                  <h3 className="font-alice text-[16px] tracking-[0.2em] text-elegant-mocha uppercase">
                    RESULTS
                  </h3>
                </div>

                {/* Centered grid with refined spacing - Services-style staggered animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-36 mb-36 max-w-[1020px] mx-auto px-4">
                  {galleryItems.slice(1).map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="relative overflow-hidden group"
                      initial={{ opacity: 0, y: 25 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 25,
                      }}
                      transition={{
                        duration: 0.9,
                        delay: 0.3 + index * 0.2,
                        ease: luxuryEasing.elegant,
                      }}
                      whileHover={{
                        scale: 1.01,
                        transition: {
                          duration: 0.6,
                          ease: luxuryEasing.elegant,
                        },
                      }}
                    >
                      {/* Subtle overlay appears on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-0 z-10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />

                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        alt={item.alt}
                        height={360}
                        initialPosition={38} // Golden ratio position (62/38)
                        autoAnimateOnHover={true}
                        categoryLabel={item.category}
                        showClientResult={true}
                        clientResultText="Client Result"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Standardized "Discover All" button using LuxuryButton */}
              <motion.div
                className="mt-36 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={standardViewport}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: luxuryEasing.refined,
                }}
              >
                <LuxuryShadcnButton
                  href="/gallery"
                  text="DISCOVER ALL"
                  luxuryVariant="outline"
                  luxuryTheme="light"
                  luxurySize="medium"
                />
              </motion.div>
            </div>
          )}
        </EditorialTransformationLayout>
      </div>

      {/* No lightbox needed */}
    </motion.section>
  );
}
