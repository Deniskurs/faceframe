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

              {/* Our Approach - Refined horizontal layout with luxury styling */}
              <div className="mb-48 relative">
                {/* Section wrapper with consistent max-width */}
                <div className="max-w-[1020px] mx-auto px-4">
                  {/* Section title with refined positioning */}
                  <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: luxuryEasing.elegant }}
                  >
                    <h3 className="font-alice text-[18px] md:text-[20px] tracking-[0.25em] text-elegant-mocha uppercase mb-4">
                      OUR APPROACH
                    </h3>
                    {/* Signature accent line */}
                    <motion.div
                      className="w-16 h-[1px] bg-elegant-mocha/30 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </motion.div>

                  {/* Responsive grid layout with equal height rows */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:grid-rows-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.15,
                        },
                      },
                    }}
                  >
                    {[
                      {
                        name: "PRECISION",
                        desc: "Every detail meticulously crafted with surgical precision and artistic vision",
                        number: "01",
                      },
                      {
                        name: "BALANCE",
                        desc: "Enhancing natural features harmoniously while preserving individual character",
                        number: "02",
                      },
                      {
                        name: "REFINEMENT",
                        desc: "Subtle transformations that deliver extraordinary, confidence-enhancing results",
                        number: "03",
                      },
                    ].map((value, i) => (
                      <motion.div
                        key={value.name}
                        className="relative group text-center md:text-left"
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.8,
                              ease: luxuryEasing.elegant,
                            },
                          },
                        }}
                      >
                        {/* Elegant card-like container with natural height matching */}
                        <div className="relative p-6 md:p-8 h-full flex flex-col bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-sm border border-elegant-mocha/8 hover:border-elegant-mocha/15 transition-all duration-700">
                          {/* Number indicator - luxury detail */}
                          <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                            <span className="font-alice text-4xl text-elegant-mocha">
                              {value.number}
                            </span>
                          </div>

                          {/* Content with proper hierarchy and flex layout */}
                          <div className="relative z-10 flex flex-col flex-grow">
                            {/* Main title */}
                            <h4 className="font-alta text-[14px] md:text-[15px] tracking-[0.2em] text-elegant-mocha uppercase mb-4 relative">
                              {value.name}
                              {/* Subtle underline accent */}
                              <motion.div
                                className="absolute bottom-[-8px] left-0 md:left-0 mx-auto md:mx-0 h-[0.5px] bg-elegant-mocha/40"
                                initial={{ width: 0 }}
                                whileInView={{ width: "40px" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                              />
                            </h4>

                            {/* Description with improved typography - grows to fill space */}
                            <p className="font-alta text-elegant-mocha/75 text-[13px] leading-relaxed tracking-[0.02em] flex-grow">
                              {value.desc}
                            </p>
                          </div>

                          {/* Subtle hover effect overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-soft-blush/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            initial={false}
                          />
                        </div>

                        {/* Decorative element - appears on hover */}
                        <motion.div
                          className="absolute -bottom-2 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 w-2 h-2 bg-elegant-mocha/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                          initial={false}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
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
