"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const FounderStory = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section className="py-32 md:py-40 px-6 bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow label */}
          <motion.p
            className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/60 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
          >
            The Artisan
          </motion.p>

          {/* Main narrative - centered, single column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASING }}
            >
              <p className="font-alice text-lg md:text-xl leading-relaxed text-elegant-mocha">
                After training with master artists across Milan, Paris, and
                London, Iggy brought European precision to her London studio in
                2018.
              </p>

              <p className="font-alice text-lg md:text-xl leading-relaxed text-muted-sand">
                No corporate messaging. No fluff. Just a decade spent mastering
                the art of subtle enhancement—creating results that look
                beautifully, naturally you.
              </p>

              <p className="font-alice text-lg md:text-xl leading-relaxed text-muted-sand">
                Every client receives the same meticulous attention, whether
                it&rsquo;s your first microblading session or a touch-up years later.
              </p>

              {/* Quote separator */}
              <div className="pt-8 mt-8 border-t border-soft-blush/20">
                <blockquote className="font-alice text-xl md:text-2xl italic text-elegant-mocha/90 leading-relaxed">
                  &ldquo;I created FaceFrame Beauty so you could wake up feeling
                  beautifully, confidently you—every single day.&rdquo;
                </blockquote>
                <p className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/60 mt-4">
                  — Iggy
                </p>
              </div>
            </motion.div>

            {/* Single Supporting Image */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASING }}
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-soft-blush/10">
                <Image
                  src="/images/gallery/image1.webp"
                  alt="Precision and craftsmanship"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default FounderStory;
