"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/shared/SectionTitle";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface ValueItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  principles: string[];
}

const values: ValueItem[] = [
  {
    id: "precision",
    title: "Precision & Care",
    tagline: "Every detail matters",
    description:
      "At FaceFrame Beauty, precision is not just a technique—it's a commitment. From the initial consultation to the final touch, every step is executed with meticulous attention to detail. This dedication ensures results that are not only beautiful but also harmonious with your natural features.",
    principles: [
      "Custom measurements tailored to your facial structure",
      "Premium quality pigments and materials",
      "Sterile, professional environment",
      "Multiple consultation points throughout treatment",
    ],
  },
  {
    id: "enhancement",
    title: "Natural Enhancement",
    tagline: "Enhance, never alter",
    description:
      "The philosophy at FaceFrame Beauty is simple: your natural beauty should be enhanced, not hidden. Through subtle techniques and expert color matching, treatments are designed to complement your unique features, creating results that look effortlessly natural.",
    principles: [
      "Hair-like strokes that blend with natural brows",
      "Custom color formulation for each client",
      "Facial structure analysis for perfect proportions",
      "Results that age gracefully and naturally",
    ],
  },
  {
    id: "lasting-results",
    title: "Lasting Quality",
    tagline: "Investment in timeless beauty",
    description:
      "Semi-permanent makeup is an investment in yourself. Using only the highest quality products and advanced techniques, FaceFrame Beauty ensures results that maintain their beauty over time, saving you hours in your daily routine while boosting your confidence.",
    principles: [
      "Premium European pigments that fade naturally",
      "Advanced techniques for longevity",
      "Comprehensive aftercare support",
      "Touch-up services to maintain perfection",
    ],
  },
  {
    id: "personal-connection",
    title: "Personal Connection",
    tagline: "Your journey, your story",
    description:
      "Beauty is deeply personal. At FaceFrame Beauty, every client is treated as an individual with unique needs, preferences, and concerns. Building trust and understanding is paramount—creating a comfortable, supportive environment where you feel heard, valued, and cared for.",
    principles: [
      "Thorough consultations to understand your vision",
      "Open communication throughout the process",
      "Ongoing support and guidance",
      "Long-term client relationships built on trust",
    ],
  },
];

const CoreValues = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section
        className="py-24 md:py-32 px-6 bg-light-cream relative"
        ref={ref}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <SectionTitle
            title="CORE VALUES"
            subtitle="The Principles That Guide Us"
            align="center"
            variant="dark"
          />

          {/* Introduction */}
          <motion.div
            className="mt-12 mb-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASING }}
          >
            <p className="font-alta text-base text-muted-sand leading-relaxed tracking-wide font-medium">
              At the heart of FaceFrame Beauty are four core values that shape
              every treatment, every interaction, and every result.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: LUXURY_EASING }}
          >
            <Accordion
              type="single"
              collapsible
              defaultValue="precision"
              className="space-y-4"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.6 + index * 0.1,
                    ease: LUXURY_EASING,
                  }}
                >
                  <AccordionItem
                    value={value.id}
                    className="border border-soft-blush/20 bg-white/80 px-6 md:px-8 data-[state=open]:bg-white data-[state=open]:border-elegant-mocha/20 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 group">
                      <div className="flex flex-col items-start text-left w-full pr-4">
                        {/* Title */}
                        <h3 className="font-alice text-xl md:text-2xl text-elegant-mocha mb-2 group-hover:text-deep-bronze transition-colors duration-500">
                          {value.title}
                        </h3>
                        {/* Tagline */}
                        <p className="font-alta text-xs tracking-[0.2em] uppercase text-elegant-mocha/60">
                          {value.tagline}
                        </p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-2 pb-8">
                      {/* Description */}
                      <div className="space-y-6">
                        <div className="h-[1px] w-full bg-soft-blush/20 mb-6"></div>

                        <p className="font-alta text-sm md:text-base text-muted-sand leading-relaxed font-medium">
                          {value.description}
                        </p>

                        {/* Principles List */}
                        <div className="mt-6 pt-6 border-t border-soft-blush/10">
                          <h4 className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/70 mb-4">
                            Key Principles
                          </h4>
                          <ul className="space-y-3">
                            {value.principles.map((principle, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 font-alta text-sm text-muted-sand font-medium"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-elegant-mocha/40 mt-1.5 flex-shrink-0"></span>
                                <span>{principle}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            className="mt-16 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2, ease: LUXURY_EASING }}
          >
            <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mx-auto mb-6"></div>
            <p className="font-alice text-base md:text-lg italic text-elegant-mocha/80 leading-relaxed">
              These values aren&apos;t just words—they&apos;re the foundation of every
              service, every interaction, and every lasting relationship with our
              clients.
            </p>
            <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mx-auto mt-6"></div>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default CoreValues;
