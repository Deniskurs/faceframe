"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import BeforeAfterSlider from "../shared/BeforeAfterSlider";
import { GalleryItem } from "../../types";
import galleryService from "../../services/galleryService";

const GalleryTeaser = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

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

  // Handle hover interactions for enhanced UX
  const handleMouseEnter = (id: string) => {
    setHoverStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoverStates((prev) => ({ ...prev, [id]: false }));
  };

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
    <FadeInSection>
      <section
        className="py-16 md:py-20 px-4"
        style={{ backgroundColor: "#E6CCB2" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-alice text-3xl md:text-4xl mb-4"
              style={{ color: "#7F5539" }}
            >
              Transformations
            </h2>
            <p
              className="font-alta max-w-2xl mx-auto"
              style={{ color: "#7F5539" }}
            >
              Experience the delicate artistry and precision technique behind
              our signature beauty transformations.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-elegant-mocha border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 font-alta" style={{ color: "#7F5539" }}>
                Loading transformations...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="font-alta text-red-500">{error}</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && galleryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Featured Image (Larger) - First gallery item */}
              <div className="md:col-span-7 relative">
                <div
                  className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                    hoverStates[galleryItems[0]?.id]
                      ? "shadow-xl scale-[1.01]"
                      : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(galleryItems[0]?.id)}
                  onMouseLeave={() => handleMouseLeave(galleryItems[0]?.id)}
                  onClick={() => openLightbox(galleryItems[0])}
                >
                  <BeforeAfterSlider
                    beforeImage={galleryItems[0]?.beforeImage}
                    afterImage={galleryItems[0]?.afterImage}
                    alt={galleryItems[0]?.alt}
                    height={500}
                  />

                  {/* Category Label */}
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span
                      className="font-alta text-sm"
                      style={{ color: "#7F5539" }}
                    >
                      {galleryItems[0]?.category}
                    </span>
                  </div>

                  {/* Actual Client Badge */}
                  <div className="absolute bottom-4 right-4 bg-elegant-mocha bg-opacity-90 px-3 py-1 rounded-full flex items-center">
                    <svg
                      className="w-3 h-3 text-white mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="font-alta text-xs text-white">
                      Actual Client
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Images (Smaller) */}
              <div className="md:col-span-5 grid grid-cols-1 gap-4 md:gap-6">
                {galleryItems.slice(1).map((item) => (
                  <div
                    key={item.id}
                    className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                      hoverStates[item.id] ? "shadow-xl scale-[1.01]" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                    onClick={() => openLightbox(item)}
                  >
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                      alt={item.alt}
                      height={230}
                    />

                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                      <span
                        className="font-alta text-sm"
                        style={{ color: "#7F5539" }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Actual Client Badge */}
                    <div className="absolute bottom-4 right-4 bg-elegant-mocha bg-opacity-90 px-3 py-1 rounded-full flex items-center">
                      <svg
                        className="w-3 h-3 text-white mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-alta text-xs text-white">
                        Actual Client
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && galleryItems.length === 0 && (
            <div className="text-center py-12">
              <p className="font-alta" style={{ color: "#7F5539" }}>
                No gallery items available at the moment.
              </p>
            </div>
          )}

          {/* View All CTA */}
          <div className="mt-10 text-center">
            <Link href="/gallery" className="inline-block">
              <motion.span
                className="font-alta text-lg border-b-2 pb-1 transition-colors duration-300"
                style={{
                  color: "#7F5539",
                  borderColor: "#7F5539",
                }}
                whileHover={{
                  x: 5,
                  borderColor: "#9C6644",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View Complete Gallery
                <svg
                  className="w-4 h-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && activeImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
                onClick={closeLightbox}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#7F5539"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Lightbox Content */}
              <div className="bg-white rounded-lg overflow-hidden">
                <BeforeAfterSlider
                  beforeImage={activeImage.beforeImage}
                  afterImage={activeImage.afterImage}
                  alt={activeImage.alt}
                  height={650}
                  showLabels={true}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </FadeInSection>
  );
};

export default GalleryTeaser;
