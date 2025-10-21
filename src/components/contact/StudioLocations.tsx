"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Heart, Shield } from "lucide-react";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const StudioLocations = () => {
  const studios = [
    {
      id: "professional",
      name: "Professional Studio",
      subtitle: "Main Studio",
      area: "East London, E2",
      type: "Full-service beauty studio",
      features: [
        "Complete treatment suite",
        "Professional equipment",
        "Comfortable waiting area",
        "Easy public transport access",
      ],
      ambiance: "Contemporary luxury with professional ambiance",
      bestFor: "All services (facials, semi-permanent makeup, lash treatments)",
      icon: Sparkles,
      gradient: "from-elegant-mocha/5 to-warm-beige/5",
    },
    {
      id: "private",
      name: "Private Studio",
      subtitle: "Intimate Setting",
      area: "East London, E3",
      type: "Intimate home studio",
      features: [
        "Private, one-on-one sessions",
        "Intimate atmosphere",
        "Personalized attention",
        "Tranquil environment",
      ],
      ambiance: "Warm, intimate, exclusively personal",
      bestFor: "Clients seeking more personal, private beauty experience",
      icon: Heart,
      gradient: "from-soft-blush/5 to-warm-beige/5",
    },
  ];

  return (
    <FadeInSection intensity="subtle">
      <section className="py-20 md:py-28 bg-light-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <h2 className="font-alice text-3xl md:text-4xl text-elegant-mocha mb-4 tracking-[0.2em] uppercase">
              Studio Locations
            </h2>
            <p className="font-alta text-base text-elegant-mocha/70 max-w-2xl mx-auto tracking-wide">
              Choose between our professional studio or intimate private setting
            </p>
            <div className="w-16 h-[0.5px] bg-elegant-mocha/20 mx-auto mt-6"></div>
          </motion.div>

          {/* Studio Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {studios.map((studio, index) => {
              const IconComponent = studio.icon;
              return (
                <motion.div
                  key={studio.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                >
                  <div className={`relative border border-elegant-mocha/10 bg-gradient-to-br ${studio.gradient} p-8 md:p-10 transition-all duration-700 hover:border-elegant-mocha/30 hover:shadow-lg`}>
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-elegant-mocha/20"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-elegant-mocha/20"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-elegant-mocha/20"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-elegant-mocha/20"></div>

                    {/* Icon */}
                    <div className="mb-6">
                      <IconComponent className="w-8 h-8 text-elegant-mocha" />
                    </div>

                    {/* Studio Name */}
                    <h3 className="font-alice text-2xl md:text-3xl text-elegant-mocha mb-2 tracking-[0.15em] uppercase">
                      {studio.name}
                    </h3>
                    <p className="font-alta text-xs text-elegant-mocha/60 tracking-[0.2em] uppercase mb-6">
                      {studio.subtitle}
                    </p>

                    {/* Location Badge */}
                    <div className="flex items-center gap-2 mb-6 pb-6 border-b border-elegant-mocha/10">
                      <MapPin className="w-4 h-4 text-elegant-mocha" />
                      <span className="font-alta text-sm text-elegant-mocha font-medium">{studio.area}</span>
                    </div>

                    {/* Type */}
                    <div className="mb-6">
                      <p className="font-alta text-xs text-elegant-mocha/60 tracking-wide uppercase mb-2">Type</p>
                      <p className="font-alta text-sm text-elegant-mocha">{studio.type}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <p className="font-alta text-xs text-elegant-mocha/60 tracking-wide uppercase mb-3">Features</p>
                      <ul className="space-y-2">
                        {studio.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-elegant-mocha mt-2 flex-shrink-0"></span>
                            <span className="font-alta text-sm text-elegant-mocha/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ambiance */}
                    <div className="mb-6 pb-6 border-b border-elegant-mocha/10">
                      <p className="font-alta text-xs text-elegant-mocha/60 tracking-wide uppercase mb-2">Ambiance</p>
                      <p className="font-alta text-sm text-elegant-mocha italic">{studio.ambiance}</p>
                    </div>

                    {/* Best For */}
                    <div className="bg-white/40 p-4 border-l-2 border-elegant-mocha/30">
                      <p className="font-alta text-xs text-elegant-mocha/60 tracking-wide uppercase mb-2">Best For</p>
                      <p className="font-alta text-sm text-elegant-mocha">{studio.bestFor}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Privacy Note */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 bg-white/60 px-6 py-4 border border-elegant-mocha/10">
              <Shield className="w-5 h-5 text-elegant-mocha" />
              <p className="font-alta text-sm text-elegant-mocha/80">
                Exact addresses provided upon booking confirmation for privacy and exclusivity
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default StudioLocations;
