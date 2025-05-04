"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "../../shared/BeforeAfterSlider";
import { GalleryItem } from "../../../types";
import galleryService from "../../../services/galleryService";
import EditorialTransformationLayout from "./EditorialTransformationLayout";
import { luxuryEasing } from "../../../utils/animations/luxurySpacing";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

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

  // Lightbox interactions
  const openLightbox = (item: GalleryItem) => {
    setActiveImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

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

      {/* Chanel-inspired fine accent line */}
      <motion.div
        className="absolute top-40 left-0 right-0 h-[0.25px] bg-elegant-mocha/10"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: luxuryEasing.refined }}
      />

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
                  onClick={() =>
                    galleryItems[0] && openLightbox(galleryItems[0])
                  }
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

                  {/* Featured transformation slider */}
                  {galleryItems[0] && (
                    <BeforeAfterSlider
                      beforeImage={galleryItems[0].beforeImage}
                      afterImage={galleryItems[0].afterImage}
                      alt={galleryItems[0].alt || "Transformation"}
                      height={680}
                      initialPosition={38} // Golden ratio (62/38) for slider position
                      labelStyle="elegant"
                      autoAnimateOnHover={true}
                    />
                  )}

                  {/* Integrated category and client verification */}
                  {galleryItems[0] && (
                    <>
                      <div className="absolute top-[36px] left-[36px] flex flex-col items-start">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 1.3 }}
                          className="font-alta text-[12px] tracking-[0.2em] uppercase text-white"
                        >
                          {galleryItems[0].category}
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 1.8 }}
                        className="absolute bottom-[36px] right-[36px]"
                      >
                        <p className="font-alta text-[10px] tracking-[0.2em] uppercase text-white/70">
                          Real Client Result
                        </p>
                      </motion.div>
                    </>
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
                          duration: 1.8,
                          delay: 0.2 + i * 0.2,
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
                      className="relative overflow-hidden group cursor-pointer"
                      variants={gridItemsEffect.childVariants}
                      custom={index}
                      onClick={() => openLightbox(item)}
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
                      />

                      {/* Left-aligned category with elegant hover state */}
                      <motion.div
                        className="absolute top-[24px] left-[24px] z-20"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1, x: 2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <p className="font-alta text-[12px] tracking-[0.2em] uppercase text-white">
                          {item.category}
                        </p>
                      </motion.div>

                      {/* Client indicator appears on hover - Chanel's reveal technique */}
                      <motion.div
                        className="absolute bottom-[24px] right-[24px] z-20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <p className="font-alta text-[10px] tracking-[0.2em] uppercase text-white/70">
                          Client Result
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Chanel-precise gallery button with perfect proportions */}
              <motion.div
                className="mt-36 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 1.0,
                  ease: luxuryEasing.refined,
                }}
              >
                <a
                  href="/gallery"
                  className="inline-block relative px-16 py-4 group"
                >
                  {/* Button background with true Chanel hover effect */}
                  <span className="absolute inset-0 border-[0.5px] border-elegant-mocha/30 transition-all duration-600 group-hover:border-elegant-mocha/50"></span>

                  {/* Subtle hover visual indicator */}
                  <motion.span
                    className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-[0.5px] bg-elegant-mocha/20"
                    initial={{ width: 0 }}
                    whileHover={{ width: "calc(100% - 48px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Chanel-standard button typography */}
                  <span className="font-alta tracking-[0.2em] text-[12px] uppercase text-elegant-mocha/70 group-hover:text-elegant-mocha/90 transition-colors duration-600">
                    Discover All
                  </span>
                </a>
              </motion.div>
            </div>
          )}
        </EditorialTransformationLayout>
      </div>

      {/* Premium luxury lightbox with Chanel-inspired aesthetic */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing.elegant }}
          >
            <div className="relative w-full max-w-6xl p-8">
              {/* Elegant close button with Chanel-inspired styling */}
              <button
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center border border-white/30 focus:outline-none group"
                onClick={closeLightbox}
              >
                <div className="w-6 h-[0.5px] bg-white/60 absolute rotate-45 group-hover:bg-white/90 transition-all duration-500"></div>
                <div className="w-6 h-[0.5px] bg-white/60 absolute -rotate-45 group-hover:bg-white/90 transition-all duration-500"></div>
              </button>

              {/* Refined title display with editorial styling */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-block relative mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: luxuryEasing.elegant }}
                >
                  <span className="inline-block w-8 h-[0.5px] bg-white/30 mr-4 align-middle"></span>
                  <span className="font-alta text-xs tracking-widest uppercase text-white/70">
                    Transformation
                  </span>
                  <span className="inline-block w-8 h-[0.5px] bg-white/30 ml-4 align-middle"></span>
                </motion.div>

                <motion.h3
                  className="font-alice text-2xl tracking-luxury text-white/90 uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: luxuryEasing.elegant,
                  }}
                >
                  {activeImage.category}
                </motion.h3>
                <motion.div
                  className="h-[0.5px] w-16 bg-white/30 mx-auto mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: luxuryEasing.refined,
                  }}
                />
              </div>

              {/* Premium Lightbox Content with refined styling */}
              <motion.div
                className="relative border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: luxuryEasing.elegant,
                }}
              >
                <BeforeAfterSlider
                  beforeImage={activeImage.beforeImage}
                  afterImage={activeImage.afterImage}
                  alt={activeImage.alt}
                  height={650}
                  showLabels={true}
                  labelStyle="elegant"
                  initialPosition={42} // Golden ratio position
                />

                {/* Single, intentional accent for Chanel-like restraint */}
                <div className="absolute top-5 left-5 w-10 h-[0.5px] bg-white/40"></div>
              </motion.div>

              {/* No pagination - true Chanel restraint */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
