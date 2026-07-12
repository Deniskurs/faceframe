"use client";

import React from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { Accordion } from "@/components/ui/accordion";
import { FAQSection } from "./FAQSection";
import { AskQuestionSection } from "./AskQuestionSection";
import { FAQ } from "@/types";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { CTA, FEATURES, getBookingHref, getServicesHref } from "@/config/business";

interface FAQPageClientProps {
  orderedCategories: string[];
  faqsByCategory: Record<string, FAQ[]>;
}

export const FAQPageClient: React.FC<FAQPageClientProps> = ({
  orderedCategories,
  faqsByCategory,
}) => {
  // Format category names for display
  const formatCategoryName = (category: string): string => {
    const categoryLabels: Record<string, string> = {
      "general": "General",
      "semi-permanent-makeup": "Semi-Permanent",
      "booking": "Booking",
      "lashes-brows": "Lashes & Brows",
      "facials": "Facials",
    };
    return categoryLabels[category] || category;
  };

  // Smooth scroll to category section
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Page Hero with Category Navigation */}
      <PageHero
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our treatments, booking process, and what to expect at FaceFrame Beauty."
        height="minimal"
      >
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          {orderedCategories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => scrollToCategory(category)}
              className="px-5 py-2.5 bg-white border border-elegant-mocha/20 rounded-full
                         hover:bg-elegant-mocha hover:text-white hover:border-elegant-mocha
                         transition-all duration-300 font-alta text-sm tracking-wide
                         text-elegant-mocha shadow-sm hover:shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.7 + index * 0.1,
                ease: LUXURY_EASING,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formatCategoryName(category)}
            </motion.button>
          ))}
        </div>
      </PageHero>

      {/* FAQ Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="space-y-6"
            >
              {orderedCategories.map((category, index) => (
                <FAQSection
                  key={category}
                  title={category}
                  faqs={faqsByCategory[category]}
                  sectionIndex={index}
                  categoryValue={category}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/*
        AI-powered "Ask a question" panel.
        Gated off via FEATURES.aiFaq while there's no live OpenAI billing.
        The component stays imported so re-enabling is a one-line flip.
      */}
      {FEATURES.aiFaq && <AskQuestionSection />}

      {/* Contact CTA */}
      <section className="bg-elegant-mocha py-16 md:py-20">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="font-alice text-2xl sm:text-3xl text-white uppercase tracking-refined mb-6">
                Need Personal Advice?
              </h2>

              <p className="font-alta text-white/80 leading-relaxed mb-8 text-lg">
                Our expert team is here to provide personalized guidance for
                your beauty journey. Book a free consultation to discuss your
                specific needs and goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LuxuryShadcnButton
                  href={getBookingHref("consultation")}
                  text={CTA.bookConsultation}
                  luxuryVariant="elegant"
                  luxuryTheme="transparent"
                  luxurySize="large"
                />
                <LuxuryShadcnButton
                  href={getServicesHref()}
                  text={CTA.viewServices}
                  luxuryVariant="outline"
                  luxuryTheme="transparent"
                  luxurySize="large"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
