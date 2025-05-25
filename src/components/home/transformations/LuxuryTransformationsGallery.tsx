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
import {
  useLuxuryReveal,
  useLuxuryStaggerEffect,
} from "../../../utils/animations/useLuxuryTransition";

interface LuxuryTransformationsGalleryProps {
  hideTitle?: boolean;
}

export default function LuxuryTransformationsGallery({
  hideTitle = false,
}: LuxuryTransformationsGalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Animation hooks
  const gridItemsEffect = useLuxuryStaggerEffect<HTMLDivElement>({
    childrenCount: galleryItems.length > 0 ? galleryItems.length - 1 : 0,
    staggerDelay: 0.12,
    parentDelay: 0.2,
    easingType: "elegant",
  });

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
    <section className="pt-24 pb-40 relative overflow-hidden bg-soft-blush">
      {/* Premium subtle texture overlay with correct extension */}
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.02] mix-blend-overlay bg-repeat relative"></div>

      {/* Dior-inspired breath animation - subtle emotional movement */}
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.6 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 8,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-soft-blush/0 via-soft-blush/5 to-soft-blush/0"></div>
      </motion.div>

      {/* Clean, unobstructed space - Chanel-inspired minimalism */}

      <div className="container mx-auto px-4 sm:px-8 relative">
        {/* Section Content with Editorial Layout */}
        <EditorialTransformationLayout
          title={!hideTitle ? "TRANSFORMATIONS" : undefined}
          subtitle={
            !hideTitle
              ? "Witness the artistry of precision beauty enhancement through our signature transformations. Each represents our commitment to subtle refinement and elevated natural beauty."
              : undefined
          }
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
              {/* Featured Transformation - integrated seamlessly with philosophy */}
              <div className="relative mb-40 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, ease: "easeOut", delay: 0.8 }}
                  className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-radial from-soft-blush/0 to-soft-blush/30 opacity-10 pointer-events-none"
                />

                {/* Main image with hover transformation effect */}
                <motion.div
                  ref={featuredReveal.ref}
                  variants={featuredReveal.variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative overflow-hidden mx-auto"
                >
                  {/* Feature breathing effect - mimicking gentle inhale/exhale */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    animate={{
                      boxShadow: [
                        "inset 0 0 80px rgba(255,255,255,0)",
                        "inset 0 0 80px rgba(255,255,255,0.08)",
                        "inset 0 0 80px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />

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

              {/* Core values with Chanel's asymmetrical layout */}
              <div className="flex pl-[8%] mb-48">
                <div className="flex flex-col max-w-sm">
                  <h3 className="font-alice text-[16px] tracking-[0.2em] text-elegant-mocha uppercase mb-8">
                    OUR APPROACH
                  </h3>

                  {/* Chanel's signature 24px vertical rhythm */}
                  <div className="flex flex-col gap-24">
                    {[
                      {
                        name: "PRECISION",
                        desc: "Every detail meticulously crafted",
                      },
                      {
                        name: "BALANCE",
                        desc: "Enhancing natural features harmoniously",
                      },
                      {
                        name: "REFINEMENT",
                        desc: "Subtle transformations, extraordinary results",
                      },
                    ].map((value, i) => (
                      <motion.div
                        key={value.name}
                        className="relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.2 + i * 0.1,
                          ease: luxuryEasing.elegant,
                        }}
                      >
                        <h4 className="font-alta text-[12px] tracking-[0.2em] text-elegant-mocha relative mb-2">
                          {value.name}
                        </h4>
                        <p className="font-alta text-elegant-mocha/70 text-[12px] tracking-[0.05em] max-w-[240px]">
                          {value.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transformation Collection - balanced Chanel grid with intentional asymmetry */}
              <div className="mb-36 relative">
                {/* Left-aligned heading (Chanel signature) with proper spacing */}
                <div className="pl-[8%] mb-16">
                  <h3 className="font-alice text-[16px] tracking-[0.2em] text-elegant-mocha uppercase">
                    RESULTS
                  </h3>
                </div>

                {/* Centered grid with refined spacing */}
                <motion.div
                  ref={gridItemsEffect.ref}
                  variants={gridItemsEffect.staggerVariants}
                  initial="visible"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-36 mb-36 max-w-[1020px] mx-auto px-4"
                >
                  {galleryItems.slice(1).map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="relative overflow-hidden group"
                      variants={gridItemsEffect.childVariants}
                      custom={index}
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
                </motion.div>
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
    </section>
  );
}
