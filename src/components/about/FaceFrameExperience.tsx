"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionTitle } from "@/components/shared/SectionTitle";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface ExperienceStep {
  number: string;
  title: string;
  description: string;
}

const experienceSteps: ExperienceStep[] = [
  {
    number: "01",
    title: "Personal Consultation",
    description:
      "In-depth discussion to understand your vision and design a bespoke treatment plan.",
  },
  {
    number: "02",
    title: "Precision Mapping",
    description:
      "Advanced facial analysis to map perfect proportions that enhance your natural features.",
  },
  {
    number: "03",
    title: "Expert Application",
    description:
      "Meticulous treatment performed with precision, care, and premium quality products.",
  },
  {
    number: "04",
    title: "Aftercare Guidance",
    description:
      "Comprehensive instructions and ongoing support to ensure lasting, beautiful results.",
  },
];

const studioImages = [
  {
    src: "/images/gallery/image1.webp",
    alt: "FaceFrame Beauty Studio - Treatment Room",
  },
  {
    src: "/images/gallery/image4.webp",
    alt: "FaceFrame Beauty Studio - Consultation Area",
  },
  {
    src: "/images/gallery/image16.webp",
    alt: "FaceFrame Beauty Studio - Relaxation Space",
  },
  {
    src: "/images/gallery/image11.webp",
    alt: "FaceFrame Beauty Studio - Detail",
  },
];

const FaceFrameExperience = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section className="py-24 md:py-32 px-6 bg-white relative" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <SectionTitle
            title="THE EXPERIENCE"
            subtitle="What to Expect at FaceFrame Beauty"
            align="center"
            variant="dark"
          />

          {/* Two Column Layout */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Process Steps */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASING }}
            >
              <h3 className="font-alice text-2xl md:text-3xl text-elegant-mocha mb-8">
                Your Journey to Enhanced Beauty
              </h3>

              {experienceSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="flex gap-6 pb-8 border-b border-soft-blush/20 last:border-0"
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
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <span className="font-alice text-4xl text-soft-blush/40">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <h4 className="font-alta text-sm tracking-[0.2em] uppercase text-elegant-mocha mb-3">
                      {step.title}
                    </h4>
                    <p className="font-alta text-sm text-muted-sand leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Sanctuary Description */}
              <motion.div
                className="mt-12 pt-8 border-t border-soft-blush/20"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease: LUXURY_EASING }}
              >
                <p className="font-alice text-base md:text-lg italic text-elegant-mocha/80 leading-relaxed">
                  &ldquo;Our studio is designed as a sanctuary—a calm, elegant space
                  where you can relax, feel cared for, and trust that you&apos;re in
                  expert hands.&rdquo;
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Studio Carousel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.5, ease: LUXURY_EASING }}
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {studioImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[4/5] overflow-hidden border border-soft-blush/20">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover object-center transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          quality={90}
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/10 to-transparent"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom styled navigation */}
                <div className="mt-8 flex justify-center gap-4">
                  <CarouselPrevious className="static transform-none border-elegant-mocha/30 text-elegant-mocha hover:bg-light-cream hover:text-elegant-mocha" />
                  <CarouselNext className="static transform-none border-elegant-mocha/30 text-elegant-mocha hover:bg-light-cream hover:text-elegant-mocha" />
                </div>
              </Carousel>

              {/* Caption */}
              <p className="mt-6 text-center font-alta text-xs tracking-wide text-elegant-mocha/60 uppercase">
                The FaceFrame Beauty Studio
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </FadeInSection>
  );
};

export default FaceFrameExperience;
