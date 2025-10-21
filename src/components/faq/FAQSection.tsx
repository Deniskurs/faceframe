"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { FAQ } from "@/types";

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
  sectionIndex: number;
  categoryValue: string;
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
  categoryValue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: LUXURY_EASING,
        delay: sectionIndex * 0.1,
      }}
    >
      {/* Outer AccordionItem for Service Type */}
      <AccordionItem
        value={categoryValue}
        className="border border-elegant-mocha/10 bg-light-cream/30 rounded-sm mb-6 overflow-hidden"
      >
        <AccordionTrigger className="px-8 py-6 hover:bg-light-cream/50 transition-colors duration-500">
          <motion.h2
            className="font-alice text-xl sm:text-2xl text-elegant-mocha uppercase tracking-[0.15em] text-left"
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
        </AccordionTrigger>

        <AccordionContent className="px-8 pb-6 pt-2">
          {/* Decorative line */}
          <motion.div
            className="h-[1px] w-16 bg-elegant-mocha/20 mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              ease: LUXURY_EASING,
              delay: 0.2,
            }}
          />

          {/* Inner Accordion for Questions */}
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: LUXURY_EASING,
                  delay: index * 0.05,
                }}
              >
                <AccordionItem
                  value={faq.id}
                  className="border-b border-elegant-mocha/10 last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left hover:text-deep-bronze transition-colors duration-500">
                    <span className="font-alta text-sm sm:text-base text-elegant-mocha tracking-[0.08em] pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pt-1">
                    <div className="font-alice text-base md:text-lg text-elegant-mocha leading-relaxed tracking-wide">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};
