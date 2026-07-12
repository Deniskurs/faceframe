"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { SOCIAL } from "@/config/business";
import type { InstagramPost } from "@/lib/instagram";

const sectionContent = {
  preTitle: "Precious Moments",
  title: "INSTAGRAM",
  description: "Recent work and healed results, shared as they happen.",
  note: `Follow ${SOCIAL.instagram.handle} for daily inspiration`,
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
          {/* Section header */}
          <motion.header
            className="flex flex-col items-center gap-3 sm:gap-4 text-center w-full max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={standardViewport}
            transition={{ duration: 1.2, ease: LUXURY_EASING }}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-[0.5px] bg-soft-blush/50" />
              <div className="w-2.5 h-2.5 border border-soft-blush/60 rounded-full bg-soft-blush/10" />
              <div className="w-16 h-[0.5px] bg-soft-blush/50" />
            </div>
            <p className="font-alta text-xs sm:text-sm tracking-[0.4em] uppercase text-elegant-mocha/80">
              {sectionContent.preTitle}
            </p>

            <h2 className="font-alice text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-editorial sm:tracking-refined md:tracking-luxury text-elegant-mocha uppercase leading-[1.15]">
              {sectionContent.title}
            </h2>

            <p className="font-alta text-sm sm:text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide max-w-2xl">
              {sectionContent.description}
            </p>
          </motion.header>

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

          {/* Follow note */}
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={standardViewport}
            transition={{ delay: 0.2, duration: 1, ease: LUXURY_EASING }}
          >
            <div className="flex items-center gap-5">
              <div className="h-[0.5px] w-16 bg-elegant-mocha/40" />
              <div className="w-2.5 h-2.5 border border-soft-blush/60 rounded-full bg-soft-blush/10" />
              <div className="h-[0.5px] w-16 bg-elegant-mocha/40" />
            </div>
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-alice text-sm sm:text-base md:text-lg text-elegant-mocha/85 hover:text-deep-bronze tracking-refined italic transition-colors duration-500"
            >
              {sectionContent.note}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
