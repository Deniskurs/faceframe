"use client";

import { motion } from "framer-motion";
import { LUXURY_EASING, standardViewport } from "@/utils/animations/luxuryAnimations";
import { useEffect, useRef, useState } from "react";
import { SOCIAL } from "@/config/business";

const sectionContent = {
  preTitle: "Precious Moments",
  title: "INSTAGRAM GALLERY",
  subtitle: "Chronicles of Elegance",
  description:
    "Follow our artistic journey and discover authentic transformations over time. Each captured moment reveals a story of beauty, confidence and sublime self-discovery.",
  note: `Follow ${SOCIAL.instagram.handle} for daily inspiration`,
  philosophy: "True art reveals itself in spontaneous moments of beauty",
};

export default function InstagramGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load LightWidget script once, only when the widget enters the viewport.
  useEffect(() => {
    if (scriptLoaded) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          // Reuse an existing tag if it's already on the page
          if (
            !document.querySelector(
              'script[src="https://cdn.lightwidget.com/widgets/lightwidget.js"]'
            )
          ) {
            const script = document.createElement("script");
            script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
            script.async = true;
            document.head.appendChild(script);
          }
          setScriptLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [scriptLoaded]);

  return (
    <section
      className="relative bg-gradient-to-b from-elegant-mocha/8 via-soft-blush/15 to-light-cream/40"
      aria-label="Instagram gallery"
    >
      {/* Decorative corner accents — purely visual, kept light to avoid scroll cost */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div className="absolute top-16 left-16">
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20" />
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20" />
        </div>
        <div className="absolute top-16 right-16">
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20 ml-auto" />
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20 ml-auto" />
        </div>
        <div className="absolute bottom-16 left-16">
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20" />
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20" />
        </div>
        <div className="absolute bottom-16 right-16">
          <div className="w-24 h-[0.5px] bg-elegant-mocha/20 ml-auto" />
          <div className="w-[0.5px] h-24 bg-elegant-mocha/20 ml-auto" />
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-28 md:py-32">
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full">
          {/* Section header */}
          <motion.header
            className="flex flex-col items-center gap-8 sm:gap-10 text-center w-full max-w-3xl"
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
            <p className="font-alta text-xs sm:text-sm tracking-[0.4em] uppercase text-elegant-mocha/75 font-light">
              {sectionContent.preTitle}
            </p>

            <h2 className="font-alice text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-elegant-mocha uppercase font-light leading-[1.15]">
              {sectionContent.title}
            </h2>

            <h3 className="font-alice text-lg sm:text-xl md:text-2xl text-elegant-mocha/85 font-light italic leading-relaxed">
              {sectionContent.subtitle}
            </h3>

            <p className="font-alta text-sm sm:text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide max-w-2xl">
              {sectionContent.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-[0.5px] bg-elegant-mocha/30" />
              <div className="w-1.5 h-1.5 bg-soft-blush/70 rounded-full" />
              <div className="w-10 h-[0.5px] bg-elegant-mocha/30" />
            </div>
            <p className="font-alice text-xs sm:text-sm md:text-base text-elegant-mocha/75 tracking-[0.15em] sm:tracking-[0.2em] italic max-w-xl">
              {sectionContent.philosophy}
            </p>
          </motion.header>

          {/* Instagram Widget */}
          <div className="w-full max-w-5xl" ref={wrapperRef}>
            <div className="relative bg-white/60 rounded-2xl p-3 sm:p-5 md:p-6 border border-elegant-mocha/12">
              {/* Corner accents — static, no animations */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute top-6 left-6 w-6 h-[0.5px] bg-elegant-mocha/20" />
                <div className="absolute top-6 left-6 w-[0.5px] h-6 bg-elegant-mocha/20" />
                <div className="absolute top-6 right-6 w-6 h-[0.5px] bg-elegant-mocha/20" />
                <div className="absolute top-6 right-6 w-[0.5px] h-6 bg-elegant-mocha/20" />
                <div className="absolute bottom-6 left-6 w-6 h-[0.5px] bg-elegant-mocha/20" />
                <div className="absolute bottom-6 left-6 w-[0.5px] h-6 bg-elegant-mocha/20" />
                <div className="absolute bottom-6 right-6 w-6 h-[0.5px] bg-elegant-mocha/20" />
                <div className="absolute bottom-6 right-6 w-[0.5px] h-6 bg-elegant-mocha/20" />
              </div>

              {/*
                LightWidget integration notes:
                - Intentionally NO `scrolling="no"` — it caused content clipping
                  and trapped scroll on the page when the widget exceeded its
                  fixed minHeight.
                - `loading="lazy"` defers the iframe; the script itself only
                  injects when the wrapper enters the viewport (see useEffect).
                - LightWidget uses postMessage to resize the iframe to its
                  content; we give it a sensible starting height and let it
                  grow naturally.
              */}
              <iframe
                src="//lightwidget.com/widgets/f70792d1008456b9a12ba7ec3698fcd2.html"
                className="lightwidget-widget w-full border-0 rounded-xl block"
                style={{ minHeight: 540 }}
                title={`${SOCIAL.instagram.handle} on Instagram`}
                loading="lazy"
              />
            </div>
          </div>

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
              className="font-alice text-sm sm:text-base md:text-lg text-elegant-mocha/85 hover:text-deep-bronze tracking-[0.2em] italic font-light transition-colors duration-500"
            >
              {sectionContent.note}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
