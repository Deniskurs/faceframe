"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface CredentialCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  delay?: number;
}

/**
 * Credential Card Component for About Hero
 * Displays expertise credentials in an elegant card format
 */
export function CredentialCard({
  icon: Icon,
  title,
  subtitle,
  delay = 0,
}: CredentialCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 p-6 bg-white border border-elegant-mocha/15
                 rounded-sm shadow-sm hover:shadow-md hover:border-elegant-mocha/30
                 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: LUXURY_EASING }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-elegant-mocha/10 flex items-center justify-center
                      group-hover:bg-elegant-mocha/20 transition-colors duration-300">
        <Icon className="w-5 h-5 text-deep-bronze" />
      </div>

      {/* Title */}
      <p className="font-alice text-lg md:text-xl text-elegant-mocha tracking-wide text-center">
        {title}
      </p>

      {/* Subtitle */}
      <p className="font-alta text-xs tracking-wider uppercase text-elegant-mocha/80 text-center">
        {subtitle}
      </p>
    </motion.div>
  );
}
