"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import { FAQ } from "../../types";
import faqService from "../../services/faqService";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LuxuryButton } from "@/components/shared/LuxuryButton";
import {
  LUXURY_EASING,
  standardViewport,
} from "@/utils/animations/luxuryAnimations";

interface AccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  toggleAccordion: () => void;
  index: number;
}

const AccordionItem = ({
  faq,
  isOpen,
  toggleAccordion,
  index,
}: AccordionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: LUXURY_EASING,
      }}
      className={`border border-soft-blush/20 bg-white/80 overflow-hidden transition-all duration-700 mb-4`}
    >
      {/* Question Header with refined styling */}
      <button
        className={`w-full px-8 py-5 text-left flex justify-between items-center focus:outline-none transition-all duration-700`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span className="font-alice text-base md:text-lg tracking-wide text-elegant-mocha pr-6">
          {faq.question}
        </span>

        {/* Minimalist plus/minus */}
        <div className="relative w-6 h-6 flex-shrink-0">
          <div
            className={`absolute top-[11px] w-6 h-[1px] bg-elegant-mocha transition-all duration-500`}
          ></div>
          <div
            className={`absolute left-[11px] w-[1px] h-6 bg-elegant-mocha transition-all duration-500 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
        </div>
      </button>

      {/* Answer Panel with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASING }}
          >
            <div className="px-8 pb-6 pt-0">
              <div className="h-[1px] w-full bg-soft-blush/20 mb-5"></div>
              <p className="font-alta text-sm tracking-wide leading-relaxed text-muted-sand">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FAQsPreviewProps {
  hideTitle?: boolean;
}

const FAQsPreview = ({ hideTitle = false }: FAQsPreviewProps) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured FAQs when component mounts
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const featuredFAQs = await faqService.getFeaturedFAQs();
        setFaqs(featuredFAQs);
        // Open the first FAQ by default for better UX
        if (featuredFAQs.length > 0) {
          setActiveIndex(0);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError("Unable to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FadeInSection intensity="subtle">
      <section className="py-24 md:py-32 px-6 bg-light-cream relative">
        <div className="max-w-3xl mx-auto">
          {/* Standardized section title */}
          {!hideTitle && (
            <SectionTitle
              title="QUESTIONS"
              subtitle="Essential Information"
              align="center"
              variant="dark"
            />
          )}

          {/* Refined Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 border border-elegant-mocha/30 border-t-elegant-mocha animate-spin"></div>
              </div>
              <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/70">
                Loading questions
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="font-alta text-sm tracking-wide text-deep-bronze">
                {error}
              </p>
            </div>
          )}

          {/* FAQ Accordion with refined spacing */}
          {!loading && !error && faqs.length > 0 && (
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={activeIndex === index}
                  toggleAccordion={() => toggleFaq(index)}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && faqs.length === 0 && (
            <div className="text-center py-20 border border-soft-blush/10 bg-white">
              <p className="font-alta text-sm tracking-wide text-elegant-mocha/70">
                No questions available at the moment.
              </p>
            </div>
          )}

          {/* Standardized button using LuxuryButton */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASING }}
            viewport={standardViewport}
          >
            <LuxuryButton
              href="/faq"
              text="VIEW ALL QUESTIONS"
              variant="secondary"
            />
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default FAQsPreview;
