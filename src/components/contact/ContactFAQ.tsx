"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

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
    question: "Can I book multiple services in one session?",
    answer:
      "Yes! Many clients combine services for a comprehensive beauty experience. When contacting me, mention all the services you're interested in, and I'll create a customized treatment plan and schedule that works for you.",
  },
  {
    question: "What should I mention in my consultation request?",
    answer:
      "Share your beauty goals, any specific concerns, preferred appointment times, and which location you'd prefer. If you have inspiration photos or specific style preferences, feel free to mention those too. The more details you provide, the better I can prepare for our consultation.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes, initial consultations are complimentary. This gives us time to discuss your goals, review your options, and create a personalized treatment plan. You'll also get to see the studio and ask any questions before booking your treatment.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "I recommend booking 2-4 weeks in advance, especially for semi-permanent makeup and specialized treatments. However, I understand last-minute needs arise—reach out and I'll do my best to accommodate your schedule.",
  },
];

/**
 * ContactFAQ - Questions Before You Reach Out?
 * Elegant accordion with luxury styling for common contact questions
 */
export function ContactFAQ() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-light-cream/20 via-transparent to-soft-blush/10 pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-4xl relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
            Common Questions
          </h3>
          <div className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6" />
          <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350]">
            Questions Before
            <br className="hidden sm:block" />
            You Reach Out?
          </h2>
          <p className="font-alta text-elegant-mocha/70 text-base tracking-[0.02em] mt-6 max-w-2xl mx-auto">
            Here are answers to the most frequently asked questions about contacting and booking
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.2 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: LUXURY_EASING,
                  delay: 0.3 + index * 0.08,
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-elegant-mocha/15 bg-white/80 backdrop-blur-sm rounded-sm px-6 py-2 hover:border-elegant-mocha/30 transition-all duration-500 data-[state=open]:bg-light-cream/30 data-[state=open]:border-elegant-mocha/40"
                >
                  <AccordionTrigger className="font-alta text-elegant-mocha tracking-[0.04em] text-sm sm:text-base text-left hover:no-underline py-5 group">
                    <span className="pr-4 group-hover:text-deep-bronze transition-colors duration-500">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="font-alta text-elegant-mocha/70 text-sm leading-relaxed tracking-[0.02em] pb-5 pt-2">
                    {/* Decorative line before answer */}
                    <div className="w-12 h-[0.5px] bg-elegant-mocha/20 mb-4" />
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 0.6 }}
        >
          <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.04em] leading-relaxed">
            Still have questions?{" "}
            <a
              href="#contact-form"
              className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-500 underline underline-offset-2"
            >
              Send me a message
            </a>{" "}
            and I&apos;ll be happy to help.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
