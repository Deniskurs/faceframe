"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { SOCIAL } from "@/config/business";
import type { InstagramPost } from "@/lib/instagram";

const sectionContent = {
  label: "Instagram",
  note: `Follow ${SOCIAL.instagram.handle}`,
};

interface InstagramGalleryProps {
  posts: InstagramPost[];
}

export default function InstagramGallery({ posts }: InstagramGalleryProps) {
  return (
    <section
      className="relative bg-gradient-to-b from-elegant-mocha/8 via-soft-blush/15 to-light-cream/40"
      aria-label="Instagram gallery"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-8 sm:gap-10 w-full">
          {/* Attribution row — the page's single title lives in the hero above */}
          <motion.div
            className="flex w-full items-baseline justify-between gap-4 border-b border-elegant-mocha/15 pb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={standardViewport}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
          >
            <h2 className="flex items-center gap-2 font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80">
              <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {sectionContent.label}
            </h2>
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-500 whitespace-nowrap"
            >
              {sectionContent.note}
            </a>
          </motion.div>

          {/* Post grid */}
          <motion.div
            className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={standardViewport}
            transition={{ duration: 1, ease: LUXURY_EASING }}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${post.alt}`}
                className="group relative block aspect-square overflow-hidden rounded-sm bg-elegant-mocha/5"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-elegant-mocha/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Instagram className="h-6 w-6 text-light-cream" strokeWidth={1.5} />
                </span>
              </a>
            ))}
          </motion.div>

          {/* Quiet closing note */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={standardViewport}
            transition={{ delay: 0.1, duration: 0.8, ease: LUXURY_EASING }}
          >
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-alice text-sm sm:text-base text-elegant-mocha/85 hover:text-deep-bronze tracking-refined italic transition-colors duration-500"
            >
              Recent work and healed results, shared as they happen — {SOCIAL.instagram.handle}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
