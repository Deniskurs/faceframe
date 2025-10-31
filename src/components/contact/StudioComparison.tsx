"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Check, MapPin } from "lucide-react";
import Image from "next/image";

interface Studio {
  name: string;
  area: string;
  type: string;
  features: string[];
  bestFor: string;
  description: string;
  imagePath: string;
}

const studios: Studio[] = [
  {
    name: "Professional Studio",
    area: "East London, E2",
    type: "Full-Service Beauty Studio",
    features: [
      "Complete treatment suite",
      "Professional equipment",
      "Easy transport access",
    ],
    bestFor: "All services",
    description:
      "A refined space designed for comprehensive beauty treatments with access to all services and amenities.",
    imagePath: "/images/gallery/image1.webp",
  },
  {
    name: "Private Studio",
    area: "East London, E3",
    type: "Intimate Home Studio",
    features: [
      "Private one-on-one sessions",
      "Personalized attention",
      "Tranquil environment",
    ],
    bestFor: "Personal sessions",
    description:
      "An exclusive sanctuary for those who value privacy and personalized care in a serene setting.",
    imagePath: "/images/gallery/iamge2.webp",
  },
];

/**
 * StudioComparison - Side-by-Side Studio Cards
 * Clean comparison of both studios without tab interaction
 */
export function StudioComparison() {
  return (
    <section id="studios" className="py-12 sm:py-16 lg:py-20 bg-light-cream/40">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        {/* Section title */}
        <SectionTitle
          title="TWO INTIMATE STUDIOS"
          subtitle="Our Locations"
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
          Choose the environment that resonates with your vision
        </motion.p>

        {/* Studio cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {studios.map((studio, index) => (
            <motion.div
              key={studio.name}
              className="bg-white rounded-sm overflow-hidden border border-elegant-mocha/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-luxury hover:scale-[1.01]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: LUXURY_EASING, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={studio.imagePath}
                  alt={studio.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/40 via-elegant-mocha/10 to-transparent" />
                <div className="absolute inset-0 bg-black/5" />

                {/* Location badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <Badge className="bg-white/95 backdrop-blur-sm text-elegant-mocha border-elegant-mocha/20 font-alta tracking-[0.04em] text-xs px-3 py-1.5">
                    <MapPin className="w-3 h-3 mr-1.5" />
                    {studio.area}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-4 sm:space-y-5">
                {/* Studio name */}
                <div>
                  <h3 className="font-alice text-2xl lg:text-3xl tracking-wide text-elegant-mocha uppercase mb-2">
                    {studio.name}
                  </h3>
                  <p className="font-alta text-deep-bronze/80 text-xs tracking-[0.04em] uppercase">
                    {studio.type}
                  </p>
                </div>

                {/* Separator */}
                <div className="h-[0.5px] bg-elegant-mocha/20 w-12" />

                {/* Description */}
                <p className="font-alice text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide">
                  {studio.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-alta text-elegant-mocha tracking-[0.04em] text-xs uppercase mb-3">
                    Features
                  </h4>
                  <ul className="space-y-2">
                    {studio.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-deep-bronze flex-shrink-0 mt-0.5" />
                        <span className="font-alice text-base text-elegant-mocha/80 leading-relaxed tracking-wide">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for badge */}
                <div>
                  <Badge
                    variant="outline"
                    className="border-elegant-mocha/30 text-elegant-mocha bg-white font-alta tracking-[0.04em] text-xs px-3 py-1.5"
                  >
                    Best for: {studio.bestFor}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
