"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "../../shared/BeforeAfterSlider";
import { GalleryItem } from "../../../types";
import galleryService from "../../../services/galleryService";

// Chanel-inspired luxury constants
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;
const GOLDEN_RATIO = 1.618;

interface ChanelTransformationsGalleryProps {
  hideTitle?: boolean;
}

export default function ChanelTransformationsGallery({ 
  hideTitle = false 
}: ChanelTransformationsGalleryProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

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
                  transition={{ duration: 0.9, delay: 0.3, ease: LUXURY_EASING }}
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
              Witness the artistry of precision beauty enhancement through our signature transformations.
              Each represents our commitment to subtle refinement and elevated natural beauty.
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
                "True beauty enhancement is about precision, subtlety, and respecting one's natural features."
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
                onClick={() => galleryItems[0] && openLightbox(galleryItems[0])}
              >
                {galleryItems[0] && (
                  <BeforeAfterSlider
                    beforeImage={galleryItems[0].beforeImage}
                    afterImage={galleryItems[0].afterImage}
                    alt={galleryItems[0].alt}
                    height={580}
                  />
                )}
                
                {/* Chanel-inspired corner elements */}
                <div className="absolute top-4 left-4 w-6 h-[1px] bg-white/60"></div>
                <div className="absolute top-4 left-4 w-[1px] h-6 bg-white/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-[1px] bg-white/60"></div>
                <div className="absolute bottom-4 right-4 w-[1px] h-6 bg-white/60"></div>
                
                {/* Premium category display */}
                {galleryItems[0] && (
                  <div className="absolute top-6 left-6 px-6 py-2 bg-white/95">
                    <span className="font-alta text-xs tracking-[0.12em] uppercase text-elegant-mocha">
                      {galleryItems[0].category}
                    </span>
                  </div>
                )}
                
                {/* Refined client indicator */}
                <motion.div 
                  className="absolute bottom-6 right-6 px-4 py-1 border border-white/20 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="font-alta text-xs tracking-[0.12em] uppercase text-white/80">
                    Actual Client Result
                  </span>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Service Qualities - Chanel-inspired details */}
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-20">
              {["Precision", "Balance", "Refinement", "Harmony"].map((quality, i) => (
                <motion.div 
                  key={quality}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: LUXURY_EASING }}
                >
                  <div className="w-2 h-2 rotate-45 border border-elegant-mocha/40 mx-auto mb-3"></div>
                  <span className="font-alta text-sm tracking-wide text-elegant-mocha/80">
                    {quality}
                  </span>
                </motion.div>
              ))}
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
                    ease: LUXURY_EASING 
                  }}
                  onClick={() => openLightbox(item)}
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    alt={item.alt}
                    height={300}
                  />
                  
                  {/* Minimal category label */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90">
                    <span className="font-alta text-[10px] tracking-[0.12em] uppercase text-elegant-mocha">
                      {item.category}
                    </span>
                  </div>
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
      
      {/* Refined lightbox with Chanel-inspired aesthetic */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: LUXURY_EASING }}
          >
            <div className="relative w-full max-w-6xl p-8">
              {/* Elegant close button */}
              <button
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-white/20 focus:outline-none group"
                onClick={closeLightbox}
              >
                <div className="w-6 h-[1px] bg-white/60 absolute rotate-45 group-hover:bg-white/90 transition-all duration-500"></div>
                <div className="w-6 h-[1px] bg-white/60 absolute -rotate-45 group-hover:bg-white/90 transition-all duration-500"></div>
              </button>

              {/* Title display with Chanel-inspired styling */}
              <div className="text-center mb-12">
                <motion.h3 
                  className="font-alice text-2xl tracking-[0.15em] text-white/90 uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: LUXURY_EASING }}
                >
                  {activeImage.category}
                </motion.h3>
                <motion.div 
                  className="h-[1px] w-16 bg-white/30 mx-auto mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASING }}
                />
              </div>

              {/* Lightbox Content with Chanel-inspired border treatment */}
              <motion.div 
                className="relative border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASING }}
              >
                <BeforeAfterSlider
                  beforeImage={activeImage.beforeImage}
                  afterImage={activeImage.afterImage}
                  alt={activeImage.alt}
                  height={650}
                  showLabels={true}
                />
                
                {/* Chanel-inspired decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-[1px] bg-white/40"></div>
                <div className="absolute top-4 left-4 w-[1px] h-8 bg-white/40"></div>
                <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-white/40"></div>
                <div className="absolute bottom-4 right-4 w-[1px] h-8 bg-white/40"></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}