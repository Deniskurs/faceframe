"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Instagram, Facebook } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How quickly will you respond to my inquiry?",
    answer:
      "I aim to respond to all inquiries within 24 hours. If you reach out during business hours (Tuesday-Saturday, 9:00-18:00), you may receive a response even sooner. For urgent matters, please mention this in your message.",
  },
  {
    question: "Which studio location is right for me?",
    answer:
      "The Professional Studio in E2 is perfect if you want the complete FaceFrame experience with access to all services and professional amenities. The Private Studio in E3 offers a more intimate, personal setting ideal for clients who value privacy and one-on-one attention. Both locations provide the same exceptional quality of service.",
  },
  {
    question: "What should I mention in my consultation request?",
    answer:
      "Share your beauty goals, any specific concerns, preferred appointment times, and which location you'd prefer. If you have inspiration photos or specific style preferences, feel free to mention those too. The more details you provide, the better I can prepare for our consultation.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "I recommend booking 2-4 weeks in advance, especially for semi-permanent makeup and specialized treatments. However, I understand last-minute needs arise—reach out and I'll do my best to accommodate your schedule.",
  },
];

/**
 * ContactFAQ - Streamlined FAQ with Social Links
 * 4 essential questions plus integrated social media and explore CTAs
 */
export function ContactFAQ() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-4xl">
        {/* Section title */}
        <SectionTitle
          title="QUESTIONS BEFORE YOU REACH OUT?"
          subtitle="Common Questions"
          variant="dark"
          align="center"
        />

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-elegant-mocha/15 bg-white rounded-sm px-6 py-2 data-[state=open]:bg-light-cream/40 data-[state=open]:border-elegant-mocha/25"
              >
                <AccordionTrigger className="font-alta text-elegant-mocha tracking-[0.02em] text-sm sm:text-base text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-alice text-base md:text-lg text-elegant-mocha leading-relaxed tracking-wide pb-4 pt-2">
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/20 mb-3" />
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Back to form link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.3 }}
        >
          <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.02em]">
            Still have questions?{" "}
            <a
              href="#contact-form"
              className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 underline underline-offset-2"
            >
              Send me a message
            </a>
          </p>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="my-12 h-[0.5px] bg-elegant-mocha/20 max-w-md mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.4 }}
        />

        {/* Social Links & Explore */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.5 }}
        >
          {/* Social media */}
          <div className="text-center">
            <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.02em] mb-4">
              Follow the journey
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://instagram.com/faceframe_beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-elegant-mocha/20 rounded-sm hover:bg-elegant-mocha hover:text-white transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-alta text-elegant-mocha group-hover:text-white tracking-[0.04em] text-sm transition-colors duration-300">
                  @faceframe_beauty
                </span>
              </a>
              <a
                href="https://facebook.com/FaceFrameBeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-elegant-mocha/20 rounded-sm hover:bg-elegant-mocha hover:text-white transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4" />
                <span className="font-alta text-elegant-mocha group-hover:text-white tracking-[0.04em] text-sm transition-colors duration-300">
                  FaceFrameBeauty
                </span>
              </a>
            </div>
          </div>

          {/* Explore CTAs */}
          <div className="text-center">
            <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.02em] mb-4">
              Still exploring your options?
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <LuxuryShadcnButton
                text="View Services"
                href="/services"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="medium"
              />
              <LuxuryShadcnButton
                text="See Gallery"
                href="/gallery"
                luxuryVariant="outline"
                luxuryTheme="light"
                luxurySize="medium"
              />
            </div>
          </div>
        </motion.div>

        {/* Final note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.7 }}
        >
          <a
            href="#contact-form"
            className="inline-block group"
          >
            <p className="font-alta text-elegant-mocha/50 text-xs tracking-[0.04em] italic group-hover:text-elegant-mocha/70 transition-colors duration-300">
              Ready to begin? Scroll up to book your consultation
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
