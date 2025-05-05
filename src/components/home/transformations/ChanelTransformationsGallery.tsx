"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeforeAfterSlider from "../../shared/BeforeAfterSlider";
import { GalleryItem } from "../../../types";
import galleryService from "../../../services/galleryService";

// Chanel-inspired luxury constants
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

interface ChanelTransformationsGalleryProps {
  hideTitle?: boolean;
}

export default function ChanelTransformationsGallery({
  hideTitle = false,
}: ChanelTransformationsGalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="pt-20 pb-28 relative overflow-hidden bg-soft-blush">
      {/* Premium subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.03] mix-blend-overlay bg-repeat"></div>

      {/* Chanel-inspired fine accent lines */}
      <motion.div
        className="absolute top-28 left-0 right-0 h-[0.15px] bg-elegant-mocha/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: LUXURY_EASING }}
      />
      <motion.div
        className="absolute bottom-28 left-0 right-0 h-[0.15px] bg-elegant-mocha/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: LUXURY_EASING }}
      />

      <div className="container mx-auto px-4 sm:px-8 relative">
        {!hideTitle && (
          <div className="text-center mb-24">
            {/* Elevated section title with Chanel-inspired vertical line effects */}
            <div className="relative inline-block">
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-elegant-mocha/20 -translate-x-10 hidden md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: LUXURY_EASING }}
              />
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-[1px] bg-elegant-mocha/20 translate-x-10 hidden md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: LUXURY_EASING }}
              />
              <motion.h2
                className="font-alice text-2xl md:text-3xl tracking-[0.15em] text-elegant-mocha uppercase"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                TRANSFORMATIONS
                <motion.span
                  className="block h-[1px] w-16 mx-auto bg-elegant-mocha/50 mt-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3,
                    ease: LUXURY_EASING,
                  }}
                />
              </motion.h2>
            </div>

            <motion.p
              className="font-alta text-muted-sand max-w-xl mx-auto mt-8 tracking-wide leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              Witness the artistry of precision beauty enhancement through our
              signature transformations. Each represents our commitment to
              subtle refinement and elevated natural beauty.
            </motion.p>
          </div>
        )}

        {/* Refined Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="relative w-12 h-12 mx-auto">
              <motion.div
                className="absolute inset-0 border border-elegant-mocha/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              />
              <div className="absolute inset-2 border border-elegant-mocha/10" />
            </div>
            <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/60">
              Curating transformations
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24">
            <p className="font-alta text-sm tracking-wide text-deep-bronze">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && galleryItems.length > 0 && (
          <div>
            {/* Philosophy Statement - Chanel-style */}
            <motion.div
              className="mb-16 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASING }}
            >
              <blockquote className="font-alice text-lg md:text-xl italic text-elegant-mocha/90 leading-relaxed">
                &ldquo;True beauty enhancement is about precision, subtlety, and
                respecting one&apos;s natural features.&rdquo;
              </blockquote>
              <p className="font-alta text-xs tracking-widest uppercase text-elegant-mocha/60 mt-4">
                — FaceFrame Philosophy
              </p>
              <div className="h-[1px] w-16 bg-elegant-mocha/30 mx-auto mt-6"></div>
            </motion.div>

            {/* Premium Feature Transformation */}
            <div className="mb-20">
              <motion.div
                className="relative overflow-hidden border border-elegant-mocha/10 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: LUXURY_EASING }}
              >
                {galleryItems[0] && (
                  <BeforeAfterSlider
                    beforeImage={galleryItems[0].beforeImage}
                    afterImage={galleryItems[0].afterImage}
                    alt={galleryItems[0].alt}
                    height={580}
                    initialPosition={38} // Golden ratio position
                    categoryLabel={galleryItems[0].category}
                    showClientResult={true}
                    clientResultText="Actual Client Result"
                  />
                )}

                {/* Chanel-inspired corner elements */}
                <div className="absolute top-4 left-4 w-6 h-[1px] bg-white/60"></div>
                <div className="absolute top-4 left-4 w-[1px] h-6 bg-white/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-[1px] bg-white/60"></div>
                <div className="absolute bottom-4 right-4 w-[1px] h-6 bg-white/60"></div>
              </motion.div>
            </div>

            {/* Service Qualities - Chanel-inspired details */}
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-20">
              {["Precision", "Balance", "Refinement", "Harmony"].map(
                (quality, i) => (
                  <motion.div
                    key={quality}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.1,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <div className="w-2 h-2 rotate-45 border border-elegant-mocha/40 mx-auto mb-3"></div>
                    <span className="font-alta text-sm tracking-wide text-elegant-mocha/80">
                      {quality}
                    </span>
                  </motion.div>
                )
              )}
            </div>

            {/* Grid of Transformations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {galleryItems.slice(1).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative overflow-hidden border border-elegant-mocha/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 * index,
                    ease: LUXURY_EASING,
                  }}
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    alt={item.alt}
                    height={300}
                    initialPosition={38} // Golden ratio position
                    categoryLabel={item.category}
                    showClientResult={true}
                    clientResultText="Client Result"
                  />
                </motion.div>
              ))}
            </div>

            {/* Chanel-style View Gallery button */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6, ease: LUXURY_EASING }}
            >
              <a
                href="/gallery"
                className="inline-block px-12 py-3 border border-elegant-mocha/30 hover:border-elegant-mocha/60 font-alta tracking-[0.2em] text-sm uppercase text-elegant-mocha hover:text-deep-bronze transition-all duration-700"
              >
                VIEW COMPLETE GALLERY
              </a>
            </motion.div>
          </div>
        )}
      </div>

      {/* No lightbox needed */}
    </section>
  );
}
