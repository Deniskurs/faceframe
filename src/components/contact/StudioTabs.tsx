"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Check, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

interface Studio {
  id: string;
  name: string;
  area: string;
  type: string;
  ambiance: string;
  features: string[];
  bestFor: string;
  description: string;
  imagePath: string;
}

const studios: Studio[] = [
  {
    id: "professional",
    name: "Professional Studio",
    area: "East London, E2",
    type: "Full-Service Beauty Studio",
    ambiance: "Contemporary luxury with professional ambiance",
    features: [
      "Complete treatment suite",
      "Professional equipment",
      "Comfortable waiting area",
      "Easy public transport access",
    ],
    bestFor: "All services",
    description:
      "A refined space designed for comprehensive beauty treatments. Perfect for clients seeking the complete FaceFrame experience with access to all services and amenities.",
    imagePath: "/images/gallery/image1.webp",
  },
  {
    id: "private",
    name: "Private Studio",
    area: "East London, E3",
    type: "Intimate Home Studio",
    ambiance: "Warm, intimate, exclusively personal",
    features: [
      "Private, one-on-one sessions",
      "Intimate atmosphere",
      "Personalized attention",
      "Tranquil environment",
    ],
    bestFor: "Personal sessions",
    description:
      "An exclusive sanctuary for those who value privacy and personalized care. Experience beauty treatments in a serene, home-studio setting.",
    imagePath: "/images/gallery/iamge2.webp",
  },
];

/**
 * StudioTabs - Two Worlds
 * Interactive tabs showcasing Professional Studio (E2) and Private Studio (E3)
 */
export function StudioTabs() {
  const [activeTab, setActiveTab] = useState("professional");

  return (
    <section id="studios" className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-light-cream/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-6xl relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
            Our Locations
          </h3>
          <div className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6" />
          <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350]">
            Two Intimate Studios
          </h2>
          <p className="font-alta text-elegant-mocha/70 text-base tracking-[0.02em] mt-6 max-w-2xl mx-auto">
            Choose the environment that resonates with your vision of beauty and comfort
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab triggers */}
          <TabsList className="grid w-full grid-cols-2 bg-light-cream/50 border border-elegant-mocha/10 p-1 rounded-sm mb-12 max-w-md mx-auto">
            <TabsTrigger
              value="professional"
              className="font-alta tracking-[0.08em] text-xs uppercase data-[state=active]:bg-elegant-mocha data-[state=active]:text-white transition-all duration-500 rounded-sm"
            >
              Professional
            </TabsTrigger>
            <TabsTrigger
              value="private"
              className="font-alta tracking-[0.08em] text-xs uppercase data-[state=active]:bg-elegant-mocha data-[state=active]:text-white transition-all duration-500 rounded-sm"
            >
              Private
            </TabsTrigger>
          </TabsList>

          {/* Tab content */}
          {studios.map((studio) => (
            <TabsContent key={studio.id} value={studio.id} className="mt-0">
              <AnimatePresence mode="wait">
                {activeTab === studio.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: LUXURY_EASING }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                  >
                    {/* Image side */}
                    <motion.div
                      className="relative aspect-[4/3] overflow-hidden rounded-sm order-2 lg:order-1"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: LUXURY_EASING, delay: 0.2 }}
                    >
                      <Image
                        src={studio.imagePath}
                        alt={studio.name}
                        fill
                        className="object-cover"
                        quality={95}
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/15 via-transparent to-transparent" />

                      {/* Floating badge */}
                      <motion.div
                        className="absolute top-6 right-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.4 }}
                      >
                        <Badge className="bg-white/95 backdrop-blur-sm text-elegant-mocha border-elegant-mocha/20 font-alta tracking-[0.08em] text-xs px-4 py-2">
                          <MapPin className="w-3 h-3 mr-2" />
                          {studio.area}
                        </Badge>
                      </motion.div>
                    </motion.div>

                    {/* Content side */}
                    <motion.div
                      className="space-y-6 order-1 lg:order-2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.3 }}
                    >
                      {/* Studio name */}
                      <div>
                        <h3 className="font-alice text-3xl lg:text-4xl tracking-[0.15em] text-elegant-mocha uppercase mb-3">
                          {studio.name}
                        </h3>
                        <p className="font-alta text-deep-bronze/80 text-sm tracking-[0.06em]">
                          {studio.type}
                        </p>
                      </div>

                      {/* Decorative line */}
                      <motion.div
                        className="h-[0.5px] bg-elegant-mocha/25 w-16"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.5 }}
                        style={{ transformOrigin: "left" }}
                      />

                      {/* Ambiance */}
                      <div>
                        <h4 className="font-alta text-elegant-mocha tracking-[0.08em] text-xs uppercase mb-2 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Ambiance
                        </h4>
                        <p className="font-alta text-elegant-mocha/70 text-sm leading-relaxed tracking-[0.02em] italic">
                          &ldquo;{studio.ambiance}&rdquo;
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-alta text-elegant-mocha/70 text-base leading-relaxed tracking-[0.02em]">
                        {studio.description}
                      </p>

                      {/* Features */}
                      <div>
                        <h4 className="font-alta text-elegant-mocha tracking-[0.08em] text-xs uppercase mb-4">
                          Features
                        </h4>
                        <ul className="space-y-3">
                          {studio.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                ease: LUXURY_EASING,
                                delay: 0.6 + index * 0.1,
                              }}
                            >
                              <Check className="w-4 h-4 text-deep-bronze flex-shrink-0 mt-0.5" />
                              <span className="font-alta text-elegant-mocha/70 text-sm tracking-[0.02em]">
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Best for badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.9 }}
                      >
                        <Badge
                          variant="outline"
                          className="border-elegant-mocha/30 text-elegant-mocha bg-soft-blush/20 font-alta tracking-[0.08em] text-xs px-4 py-2"
                        >
                          Best for: {studio.bestFor}
                        </Badge>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* Privacy note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-light-cream/60 backdrop-blur-sm px-6 py-3 rounded-sm border border-elegant-mocha/10">
            <div className="w-1.5 h-1.5 rounded-full bg-deep-bronze/50" />
            <p className="font-alta text-elegant-mocha/60 text-xs tracking-[0.06em] italic">
              Exact addresses provided upon booking confirmation for privacy and exclusivity
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
