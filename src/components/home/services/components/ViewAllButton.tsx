import React from "react";
import { motion } from "framer-motion";
import {
  LUXURY_EASING,
  standardViewport,
} from "@/utils/animations/luxuryAnimations";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";

export function ViewAllButton() {
  return (
    <motion.div
      className="mt-20 md:mt-28 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={standardViewport}
      transition={{
        duration: 1.2,
        ease: LUXURY_EASING,
      }}
    >
      <LuxuryShadcnButton
        href="/services"
        text="VIEW ALL SERVICES"
        luxuryVariant="outline"
        luxuryTheme="light"
        luxurySize="medium"
      />
    </motion.div>
  );
}
