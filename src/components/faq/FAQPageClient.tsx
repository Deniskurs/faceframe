"use client";

import React from "react";
import { motion } from "framer-motion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { FAQSection } from "./FAQSection";
import { AskQuestionSection } from "./AskQuestionSection";
import { FAQ } from "@/types";

interface FAQPageClientProps {
  orderedCategories: string[];
  faqsByCategory: Record<string, FAQ[]>;
}

export const FAQPageClient: React.FC<FAQPageClientProps> = ({
  orderedCategories,
  faqsByCategory,
}) => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-light-cream py-20 md:py-28">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className="font-alice text-4xl sm:text-5xl md:text-6xl text-elegant-mocha uppercase tracking-[0.2em] mb-6">
                Frequently Asked Questions
              </h1>

              <div className="h-[1px] w-24 bg-elegant-mocha/30 mx-auto mb-8" />

              <p className="font-alta text-lg text-elegant-mocha/80 leading-relaxed max-w-2xl mx-auto">
                Find answers to the most common questions about our treatments,
                booking process, and what to expect at FaceFrame Beauty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <LuxuryShadcnButton
                href="#ask-ai-question"
                text="STILL HAVE QUESTIONS?"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="medium"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            {orderedCategories.map((category, index) => (
              <FAQSection
                key={category}
                title={category}
                faqs={faqsByCategory[category]}
                sectionIndex={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ask Question Section */}
      <AskQuestionSection />

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
              <h2 className="font-alice text-2xl sm:text-3xl text-white uppercase tracking-[0.2em] mb-6">
                Need Personal Advice?
              </h2>

              <p className="font-alta text-white/80 leading-relaxed mb-8 text-lg">
                Our expert team is here to provide personalized guidance for
                your beauty journey. Book a free consultation to discuss your
                specific needs and goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LuxuryShadcnButton
                  href="/consultation"
                  text="FREE CONSULTATION"
                  luxuryVariant="elegant"
                  luxuryTheme="transparent"
                  luxurySize="large"
                />
                <LuxuryShadcnButton
                  href="/services"
                  text="VIEW SERVICES"
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
