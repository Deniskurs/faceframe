"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface Testimonial {
  id: string;
  name: string;
  initials: string;
  service: string;
  quote: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sophie M.",
    initials: "SM",
    service: "Signature Brows",
    quote:
      "Iggy transformed my sparse brows into something I never have to think about. They look so natural that people think I was born with them. Life-changing!",
    avatar: "/images/gallery/image5.webp",
  },
  {
    id: "2",
    name: "Alexandra T.",
    initials: "AT",
    service: "Volume Lashes",
    quote:
      "I've been coming to FaceFrame for three years now. The attention to detail and care Iggy puts into each treatment is unmatched. I wouldn't trust anyone else.",
  },
  {
    id: "3",
    name: "Emma R.",
    initials: "ER",
    service: "Million Dollar Facial",
    quote:
      "From the moment you walk in, you feel like you're in expert hands. The studio is beautiful, Iggy is incredibly skilled, and the results speak for themselves.",
    avatar: "/images/gallery/image7.webp",
  },
];

const ClientVoicesPreview = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section className="py-24 md:py-32 px-6 bg-white relative" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <SectionTitle
            title="CLIENT VOICES"
            subtitle="Stories of Transformation"
            align="center"
            variant="dark"
          />

          {/* Testimonials Grid */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASING }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="border border-soft-blush/20 bg-light-cream/30 p-8 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.15,
                  ease: LUXURY_EASING,
                }}
              >
                {/* Quote */}
                <div className="flex-1 mb-6">
                  <svg
                    className="w-6 h-6 text-elegant-mocha/20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="font-alta text-sm text-muted-sand leading-relaxed font-medium">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-soft-blush/20">
                  <Avatar className="w-12 h-12 border border-soft-blush/30">
                    {testimonial.avatar && (
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                    )}
                    <AvatarFallback className="bg-elegant-mocha/10 font-alta text-elegant-mocha text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="font-alta text-sm text-elegant-mocha mb-1">
                      {testimonial.name}
                    </p>
                    <p className="font-alta text-xs tracking-wide text-elegant-mocha/60 uppercase">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Statistics Bar */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-soft-blush/20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9, ease: LUXURY_EASING }}
          >
            {[
              { value: "2018", label: "Established" },
              { value: "1000+", label: "Happy Clients" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "10+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: 1 + index * 0.1,
                  ease: LUXURY_EASING,
                }}
              >
                <p className="font-alice text-3xl md:text-4xl text-elegant-mocha mb-2">
                  {stat.value}
                </p>
                <p className="font-alta text-xs tracking-[0.2em] uppercase text-elegant-mocha/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA to full testimonials */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.5, ease: LUXURY_EASING }}
          >
            <p className="font-alta text-sm text-muted-sand mb-8 tracking-wide font-medium">
              Discover more transformations and client stories
            </p>
            <LuxuryShadcnButton
              href="/transformations"
              text="VIEW ALL TESTIMONIALS"
              luxuryVariant="outline"
              luxuryTheme="light"
              luxurySize="medium"
            />
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ClientVoicesPreview;
