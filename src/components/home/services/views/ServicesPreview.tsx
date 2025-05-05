"use client";

/**
 * @file Services Preview Component
 * Premium luxury services section with Chanel/Dior-inspired design
 * Responsive layout that adapts seamlessly to mobile and desktop
 */

import React from "react";
import { motion } from "framer-motion";
import { MobileServicesView } from "./mobile/MobileServicesView";
import { DesktopServicesView } from "./desktop/DesktopServicesView";
import { useScreenSize } from "../hooks/useScreenSize";
import { LUXURY_EASING } from "../core/types";

interface ServicesPreviewProps {
  hideTitle?: boolean;
}

/**
 * Premium Services Preview Component
 * Chanel/Dior-inspired luxury presentation of services with meticulous attention to detail
 */
export function ServicesPreview({ hideTitle = false }: ServicesPreviewProps) {
  const { isMobile } = useScreenSize();

  return (
    <section
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden"
      id="services"
    >
      {/* Premium luxury background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-cream to-white opacity-80"></div>

      {/* Ultra-luxury grid background overlay - refined for perfect blend */}
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.03] mix-blend-overlay bg-center"></div>

      {/* Premium subtle texture for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(127,85,57,0.01)_25%,rgba(127,85,57,0.01)_75%,transparent_100%)]"></div>

      {/* Refined horizontal accent line - Chanel inspired */}
      <motion.div
        className="absolute top-24 left-0 right-0 h-[0.15px] bg-elegant-mocha/10 hidden md:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: LUXURY_EASING }}
      />

      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Responsive service views - passing the hideTitle prop to both views */}
        {isMobile ? (
          <MobileServicesView hideTitle={hideTitle} />
        ) : (
          <DesktopServicesView hideTitle={hideTitle} />
        )}
      </div>

      {/* Bottom accent line - mathematically positioned */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 h-[0.15px] bg-elegant-mocha/5 hidden md:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: LUXURY_EASING }}
      />
    </section>
  );
}
