"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import { FAQ } from "../../types";
import faqService from "../../services/faqService";

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-soft-blush rounded-lg overflow-hidden"
      style={{ borderColor: "#E6CCB2" }}
    >
      {/* Question Header */}
      <button
        className={`w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none transition-colors duration-300 ${
          isOpen
            ? "bg-soft-blush bg-opacity-30"
            : "hover:bg-soft-blush hover:bg-opacity-10"
        }`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        style={{
          backgroundColor: isOpen ? "rgba(230, 204, 178, 0.2)" : "transparent",
        }}
      >
        <span
          className="font-alice text-lg md:text-xl"
          style={{ color: "#7F5539" }}
        >
          {faq.question}
        </span>
        <span className="ml-4 flex-shrink-0 transition-transform duration-300 transform">
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
            style={{ color: "#7F5539" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
      </button>

      {/* Answer Panel with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-4 pt-2">
              <p className="font-alta" style={{ color: "#B08968" }}>
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQsPreview = () => {
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
    <FadeInSection>
      <section
        className="py-16 md:py-20 px-4"
        style={{ backgroundColor: "#EDE0D4" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-alice text-3xl md:text-4xl mb-4"
              style={{ color: "#7F5539" }}
            >
              Common Questions
            </h2>
            <p className="font-alta" style={{ color: "#B08968" }}>
              Everything you need to know before your luxury treatment.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-elegant-mocha border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 font-alta" style={{ color: "#7F5539" }}>
                Loading...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="font-alta text-red-500">{error}</p>
            </div>
          )}

          {/* FAQ Accordion */}
          {!loading && !error && (
            <div className="space-y-4">
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
            <div className="text-center py-12">
              <p className="font-alta" style={{ color: "#7F5539" }}>
                No FAQs available at the moment.
              </p>
            </div>
          )}

          {/* View All Link */}
          <div className="mt-10 text-center">
            <Link href="/faq" className="inline-block">
              <motion.span
                className="font-alta text-lg border-b-2 pb-1 transition-colors duration-300"
                style={{
                  color: "#7F5539",
                  borderColor: "#7F5539",
                }}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                  borderColor: "#9C6644",
                }}
              >
                View All Questions
                <svg
                  className="w-4 h-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default FAQsPreview;
