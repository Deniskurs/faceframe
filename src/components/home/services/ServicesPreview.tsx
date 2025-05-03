"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScreenSize } from "./hooks/useScreenSize";
import { SectionTitle } from "./components/SectionTitle";
import { ViewAllButton } from "./components/ViewAllButton";
import { MobileServicesView } from "./MobileServicesView";
import { DesktopServicesView } from "./DesktopServicesView";
import { LUXURY_EASING } from "./types";

export interface ServicesPreviewProps {
  hideTitle?: boolean;
}

export function ServicesPreview({ hideTitle = false }: ServicesPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const { isCarouselView } = useScreenSize();

  // Set revealed state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-light-cream overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: LUXURY_EASING }}
    >
      {/* Background and corner accents */}
      <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-8 left-8 w-5 h-[0.25px] bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute top-8 left-8 w-[0.25px] h-5 bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute bottom-8 right-8 w-5 h-[0.25px] bg-elegant-mocha/30 hidden lg:block"></div>
      <div className="absolute bottom-8 right-8 w-[0.25px] h-5 bg-elegant-mocha/30 hidden lg:block"></div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Conditionally render title */}
        {!hideTitle && <SectionTitle isRevealed={isRevealed} />}

        {/* Conditionally render appropriate view */}
        {isCarouselView ? <MobileServicesView /> : <DesktopServicesView />}

        {/* View All Services button */}
        <ViewAllButton />
      </div>
    </motion.section>
  );
}

export default ServicesPreview;
