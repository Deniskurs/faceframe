"use client";

/**
 * @file Services Preview Component
 * Premium luxury services section with Chanel/Dior-inspired design
 * Responsive layout that adapts seamlessly to mobile and desktop
 */

import React from "react";
import { MobileServicesView } from "./mobile/MobileServicesView";
import { DesktopServicesView } from "./desktop/DesktopServicesView";
import { useScreenSize } from "../hooks/useScreenSize";

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

      {/* Clean, minimal background - Chanel-inspired restraint */}

      {/* Clean space - no horizontal lines - classic Chanel restraint */}

      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Responsive service views - passing the hideTitle prop to both views */}
        {isMobile ? (
          <MobileServicesView hideTitle={hideTitle} />
        ) : (
          <DesktopServicesView hideTitle={hideTitle} />
        )}
      </div>

      {/* No bottom accent line - complete Chanel-inspired restraint */}
    </section>
  );
}
