"use client";

import React from "react";
import { motion } from "framer-motion";
import { FAQItem } from "./FAQItem";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { FAQ } from "@/types";

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
  sectionIndex: number;
}

const categoryDisplayNames: Record<string, string> = {
  general: "General",
  "semi-permanent-makeup": "Semi-Permanent Makeup",
  booking: "Booking",
  "lashes-brows": "Lashes & Brows",
  facials: "Facials",
};

export const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  faqs,
  sectionIndex,
}) => {
  return (
    <motion.section
      className="mb-16 last:mb-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: LUXURY_EASING,
        delay: sectionIndex * 0.1,
      }}
    >
      {/* Section Header */}
      <div className="mb-8">
        <motion.h2
          className="font-alice text-2xl sm:text-3xl text-elegant-mocha uppercase tracking-[0.2em] mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: LUXURY_EASING,
            delay: sectionIndex * 0.1 + 0.2,
          }}
        >
          {categoryDisplayNames[title] || title}
        </motion.h2>

        <motion.div
          className="h-[1px] w-16 bg-elegant-mocha/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            ease: LUXURY_EASING,
            delay: sectionIndex * 0.1 + 0.4,
          }}
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: LUXURY_EASING,
              delay: sectionIndex * 0.1 + 0.6 + index * 0.05,
            }}
          >
            <FAQItem id={faq.id} question={faq.question} answer={faq.answer} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
