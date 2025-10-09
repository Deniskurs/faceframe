"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionTitle } from "@/components/shared/SectionTitle";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface CredentialItem {
  title: string;
  value: string;
  description: string;
  details: string[];
}

const credentials: CredentialItem[] = [
  {
    title: "Experience",
    value: "10+ Years",
    description: "Decade of mastery in semi-permanent makeup and aesthetics",
    details: [
      "Founded FaceFrame Beauty in 2018",
      "Trained across Europe's leading academies",
      "Thousands of satisfied clients",
      "Continuous education in latest techniques",
    ],
  },
  {
    title: "Specialization",
    value: "Microblading Expert",
    description: "Advanced certification in precision brow architecture",
    details: [
      "Hair-stroke technique specialist",
      "Custom brow mapping & design",
      "Color theory & pigmentation expert",
      "Natural-looking results guaranteed",
    ],
  },
  {
    title: "Training Locations",
    value: "Europe-Wide",
    description: "Studied with master artists across multiple countries",
    details: [
      "Milan - Hair-stroke microblading",
      "Paris - Color theory & aesthetics",
      "London - Advanced facial treatments",
      "Ongoing masterclasses & certifications",
    ],
  },
];

const ExpertiseCredentials = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section
        className="py-24 md:py-32 px-6 bg-light-cream relative"
        ref={ref}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <SectionTitle
            title="EXPERTISE"
            subtitle="Credentials & Mastery"
            align="center"
            variant="dark"
          />

          {/* Credentials Grid - Mobile-friendly, no hover dependency */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASING }}
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                className="bg-white border border-soft-blush/20 p-8 transition-all duration-500 hover:border-elegant-mocha/30 hover:shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.1,
                  ease: LUXURY_EASING,
                }}
              >
                {/* Title */}
                <p className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/60 mb-4">
                  {credential.title}
                </p>

                {/* Value */}
                <h3 className="font-alice text-3xl text-elegant-mocha mb-4 group-hover:text-deep-bronze transition-colors duration-500">
                  {credential.value}
                </h3>

                {/* Description */}
                <p className="font-alta text-sm text-muted-sand leading-relaxed font-medium mb-6">
                  {credential.description}
                </p>

                {/* Details List - Always visible, no hover needed */}
                <div className="pt-6 border-t border-soft-blush/10">
                  <ul className="space-y-2">
                    {credential.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-alta text-xs text-muted-sand/80 font-medium"
                      >
                        <span className="w-1 h-1 rounded-full bg-elegant-mocha/30 mt-1.5 flex-shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Quote */}
          <motion.div
            className="mt-20 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9, ease: LUXURY_EASING }}
          >
            <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mx-auto mb-8"></div>
            <p className="font-alice text-lg md:text-xl italic text-elegant-mocha/80 leading-relaxed">
              &ldquo;Excellence is not a destination, but a continuous journey of
              learning, refining, and mastering the art of beauty enhancement.&rdquo;
            </p>
            <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ExpertiseCredentials;
