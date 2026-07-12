"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Check, ArrowUpRight } from "lucide-react";
import { STUDIO } from "@/config/business";

/**
 * StudioComparison — single studio location card.
 * Retains the original export name so existing imports keep working.
 */
export function StudioComparison() {
  return (
    <section id="studios" className="py-12 sm:py-16 lg:py-20 bg-light-cream/40">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-3xl">
        <SectionTitle
          title="THE STUDIO"
          subtitle="Our Location"
          variant="dark"
          align="center"
        />

        <motion.p
          className="font-alice text-base md:text-lg text-elegant-mocha/80 text-center max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.2 }}
        >
          A serene East London sanctuary where every detail is considered
        </motion.p>

        <motion.div
          className="bg-white rounded-sm overflow-hidden border border-elegant-mocha/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-luxury"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING }}
        >
          <div className="p-6 sm:p-10 space-y-5 sm:space-y-6">
            <div>
              <h2 className="font-alice text-2xl lg:text-3xl tracking-wide text-elegant-mocha uppercase mb-2">
                {STUDIO.name}
              </h2>
              <p className="font-alta text-deep-bronze/80 text-xs tracking-wider uppercase">
                {STUDIO.type}
              </p>
            </div>

            <div className="h-[0.5px] bg-elegant-mocha/20 w-12" />

            <address className="not-italic font-alice text-base md:text-lg text-elegant-mocha/85 leading-relaxed tracking-wide">
              {STUDIO.streetAddress}
              <br />
              {STUDIO.area} · {STUDIO.postcode}
            </address>

            <a
              href={STUDIO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40 rounded-sm"
            >
              View on Google Maps
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div>
              <h3 className="font-alta text-elegant-mocha tracking-wider text-xs uppercase mb-3">
                Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {STUDIO.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-deep-bronze flex-shrink-0 mt-0.5" />
                    <span className="font-alice text-base text-elegant-mocha/80 leading-relaxed tracking-wide">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Badge
                variant="outline"
                className="border-elegant-mocha/30 text-elegant-mocha bg-white font-alta tracking-wider text-xs px-3 py-1.5"
              >
                Best for: {STUDIO.bestFor}
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
