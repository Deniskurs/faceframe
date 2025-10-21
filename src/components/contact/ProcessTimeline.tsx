"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import GlassMorphicCard from "@/components/shared/GlassMorphicCard";
import { Send, MessagesSquare, Calendar, Sparkles } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Contact",
    description: "We respond within 24h",
    icon: Send,
  },
  {
    number: "02",
    title: "Consultation",
    description: "Discuss your beauty goals",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "Booking",
    description: "Reserve your exclusive session",
    icon: Calendar,
  },
  {
    number: "04",
    title: "Transform",
    description: "Experience FaceFrame luxury",
    icon: Sparkles,
  },
];

/**
 * ProcessTimeline - What Happens Next
 * 4-step journey visualization in a glass morphic card
 */
export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-light-cream/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-soft-blush/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-elegant-mocha/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-5xl relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
            Your Journey
          </h3>
          <div className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6" />
          <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350]">
            What Happens Next
          </h2>
        </motion.div>

        {/* Glass morphic timeline card */}
        <GlassMorphicCard
          intensity="medium"
          className="rounded-sm p-8 lg:p-12"
          animateOnScroll
          delayAnimation={0.2}
          decorativeElement="corner-line"
        >
          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;

              return (
                <React.Fragment key={step.number}>
                  <motion.div
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.7,
                      ease: LUXURY_EASING,
                      delay: 0.3 + index * 0.15,
                    }}
                  >
                    {/* Icon circle */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-elegant-mocha/10 flex items-center justify-center border border-elegant-mocha/20 backdrop-blur-sm">
                        <Icon className="w-7 h-7 text-elegant-mocha" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-deep-bronze text-white flex items-center justify-center font-alta text-[10px] tracking-wider">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-alice text-xl tracking-[0.15em] text-elegant-mocha uppercase mb-2">
                      {step.title}
                    </h3>
                    <p className="font-alta text-elegant-mocha/70 text-sm tracking-[0.02em] leading-relaxed">
                      {step.description}
                    </p>

                    {/* Connecting line (except last item) */}
                    {!isLast && (
                      <motion.div
                        className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%+0.5rem)] h-[1px] bg-elegant-mocha/20 hidden lg:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.8,
                          ease: LUXURY_EASING,
                          delay: 0.5 + index * 0.15,
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === processSteps.length - 1;

              return (
                <React.Fragment key={step.number}>
                  <motion.div
                    className="relative flex gap-6"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.7,
                      ease: LUXURY_EASING,
                      delay: 0.3 + index * 0.15,
                    }}
                  >
                    {/* Icon column */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-elegant-mocha/10 flex items-center justify-center border border-elegant-mocha/20 backdrop-blur-sm">
                        <Icon className="w-6 h-6 text-elegant-mocha" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-deep-bronze text-white flex items-center justify-center font-alta text-[9px] tracking-wider">
                        {step.number}
                      </div>

                      {/* Connecting line (except last item) */}
                      {!isLast && (
                        <motion.div
                          className="absolute top-14 left-7 w-[1px] h-[calc(100%+2rem)] bg-elegant-mocha/20"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{
                            duration: 0.8,
                            ease: LUXURY_EASING,
                            delay: 0.5 + index * 0.15,
                          }}
                          style={{ transformOrigin: "top" }}
                        />
                      )}
                    </div>

                    {/* Content column */}
                    <div className="flex-1 pt-2">
                      <h3 className="font-alice text-xl tracking-[0.15em] text-elegant-mocha uppercase mb-2">
                        {step.title}
                      </h3>
                      <p className="font-alta text-elegant-mocha/70 text-sm tracking-[0.02em] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom decorative note */}
          <motion.div
            className="mt-12 pt-8 border-t border-elegant-mocha/10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASING, delay: 1 }}
          >
            <p className="font-alta text-elegant-mocha/60 text-sm tracking-[0.04em] leading-relaxed max-w-2xl mx-auto">
              From your first inquiry to your final reveal, every step is designed to ensure
              your comfort, confidence, and complete satisfaction.
            </p>
          </motion.div>
        </GlassMorphicCard>
      </div>
    </section>
  );
}
