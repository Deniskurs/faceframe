"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import BeforeAfterSlider from "../shared/BeforeAfterSlider";
import { GalleryItem } from "../../types";
import galleryService from "../../services/galleryService";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface GalleryTeaserProps {
  hideTitle?: boolean;
}

const GalleryTeaser = ({ hideTitle = false }: GalleryTeaserProps) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  // Fetch featured gallery items when component mounts
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const featuredItems = await galleryService.getFeaturedGalleryItems();
        setGalleryItems(featuredItems);
        setError(null);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("Unable to load gallery. Please try again later.");
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
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  return (
    <FadeInSection intensity="moderate">
      <section className="py-24 md:py-32 px-6 bg-soft-blush relative">
        <div className="max-w-6xl mx-auto">
          {!hideTitle && (
            <div className="mb-24">
              <SectionTitle
                title="TRANSFORMATIONS"
                subtitle="Witness the artistry and precision behind our signature beauty enhancements through these remarkable client transformations."
                align="center"
                variant="light"
              />
            </div>
          )}

          {/* Refined Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 border border-elegant-mocha/30 border-t-elegant-mocha animate-spin"></div>
              </div>
              <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/70">
                Loading transformations
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

          {/* Gallery Grid with enhanced styling */}
          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Featured Image (Larger) - First gallery item */}
              <div className="md:col-span-7 relative order-2 md:order-1">
                <motion.div
                  className="relative overflow-hidden transition-all duration-700 border border-soft-blush/20 bg-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(galleryItems[0])}
                  whileHover={{ scale: 1.01 }}
                >
                  <BeforeAfterSlider
                    beforeImage={galleryItems[0]?.beforeImage}
                    afterImage={galleryItems[0]?.afterImage}
                    alt={galleryItems[0]?.alt}
                    height={500}
                  />

                  {/* CHANEL-inspired decorative elements */}
                  <div className="absolute top-4 left-4 w-6 h-[1px] bg-white/40"></div>
                  <div className="absolute top-4 left-4 w-[1px] h-6 bg-white/40"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-[1px] bg-white/40"></div>
                  <div className="absolute bottom-4 right-4 w-[1px] h-6 bg-white/40"></div>

                  {/* Refined Category Label */}
                  <div className="absolute top-6 left-6 px-4 py-1 bg-white/90">
                    <span className="font-alta text-xs tracking-[0.12em] uppercase text-elegant-mocha">
                      {galleryItems[0]?.category}
                    </span>
                  </div>

                  {/* Refined Client Label */}
                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-sm">
                    <span className="font-alta text-xs tracking-[0.12em] uppercase text-white/80">
                      Actual Client
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Secondary Images (Stacked on right) */}
              <div className="md:col-span-5 flex flex-col space-y-6 md:space-y-8 order-1 md:order-2">
                {galleryItems.slice(1).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative overflow-hidden transition-all duration-700 border border-soft-blush/20 bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + index * 0.1,
                      ease: LUXURY_EASING,
                    }}
                    viewport={{ once: true }}
                    onClick={() => openLightbox(item)}
                    whileHover={{ scale: 1.01 }}
                  >
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                      alt={item.alt}
                      height={230}
                    />

                    {/* Minimalist category indicator */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90">
                      <span className="font-alta text-[10px] tracking-[0.12em] uppercase text-elegant-mocha">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && galleryItems.length === 0 && (
            <div className="text-center py-20">
              <p className="font-alta text-sm tracking-wide text-elegant-mocha/70">
                No gallery items available at the moment.
              </p>
            </div>
          )}

          {/* Standardized button */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <LuxuryButton
              href="/gallery"
              text="VIEW COMPLETE GALLERY"
              variant="text"
            />
          </motion.div>
        </div>

        {/* Refined lightbox with CHANEL-inspired aesthetic */}
        {lightboxOpen && activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASING }}
          >
            <div className="relative w-full max-w-5xl p-8">
              {/* Elegant close button */}
              <button
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center focus:outline-none"
                onClick={closeLightbox}
              >
                <div className="w-8 h-[1px] bg-white/60 absolute rotate-45"></div>
                <div className="w-8 h-[1px] bg-white/60 absolute -rotate-45"></div>
              </button>

              {/* Title display */}
              <div className="text-center mb-8">
                <h3 className="font-alice text-xl tracking-[0.15em] text-white/80 uppercase">
                  {activeImage.category}
                </h3>
                <div className="h-[1px] w-10 bg-white/20 mx-auto mt-3"></div>
              </div>

              {/* Lightbox Content with subtle border */}
              <div className="border border-white/10 overflow-hidden">
                <BeforeAfterSlider
                  beforeImage={activeImage.beforeImage}
                  afterImage={activeImage.afterImage}
                  alt={activeImage.alt}
                  height={650}
                  showLabels={true}
                />
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </FadeInSection>
  );
};

export default GalleryTeaser;
