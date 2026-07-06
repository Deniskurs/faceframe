"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

/**
 * Gallery Page Hero - Clean & Focused
 * Features service filter tabs for easy category browsing
 * Simplified from previous version (removed 15+ animations, rotating elements)
 */
export default function GalleryHero() {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const categories = [
    "All Work",
    "Brows",
    "Lashes",
    "Lips",
    "Facials",
  ];

  return (
    <PageHero
      title="Gallery of Excellence"
      description="Explore our collection of beauty precision"
      label="Our Work"
      height="showcase"
      backgroundGradient="bg-gradient-to-b from-elegant-mocha/5 via-light-cream/20 to-soft-blush/10"
    >
      {/* Service Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mt-8 px-4">
        {categories.map((category, index) => {
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 font-alta text-sm tracking-[0.02em] uppercase
                         border-b-2 transition-all duration-300
                         ${
                           isActive
                             ? "border-elegant-mocha text-elegant-mocha"
                             : "border-transparent text-elegant-mocha/75 hover:text-elegant-mocha hover:border-elegant-mocha/40"
                         }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.8 + index * 0.1,
                ease: LUXURY_EASING,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      {/* Optional: Category count or description */}
      <motion.p
        className="font-alta text-xs text-elegant-mocha/70 mt-4 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease: LUXURY_EASING }}
      >
        {activeCategory === "All Work"
          ? "Showcasing our complete portfolio"
          : `Featuring ${activeCategory.toLowerCase()} transformations`}
      </motion.p>
    </PageHero>
  );
}
