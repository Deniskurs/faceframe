"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import ParallaxContainer from "../shared/ParallaxContainer";
import GlassMorphicCard from "../shared/GlassMorphicCard";

interface AboutStripProps {
  className?: string;
  founderImage?: string;
  founderName?: string;
  quote?: string;
  paragraphs?: string[];
}

const AboutStrip = ({
  className = "",
  founderImage = "/images/gallery/image17.webp",
  founderName = "Iggy",
  quote = "Beauty is not about perfection. It's about enhancing your natural features with precision and care.",
  paragraphs = [
    "After training with elite artists across Europe and perfecting her craft for over a decade, Iggy established FaceFrame Beauty with a singular vision: to create a sanctuary where precision meets luxury.",
    "Each treatment at FaceFrame Beauty is approached with meticulous attention to detail, ensuring that every client leaves with results that enhance their natural beauty rather than masking it.",
  ],
}: AboutStripProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageHovered, setImageHovered] = useState(false);

  // Parallax effect for quote
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 px-4 bg-light-cream/20 overflow-hidden ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
          {/* Founder Image - Left Column */}
          <div className="md:col-span-5 relative">
            <FadeInSection direction="left" className="relative">
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-xl"
                ref={imageRef}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] },
                }}
              >
                {/* Animated Image Container */}
                <motion.div
                  className="w-full h-[400px] md:h-[600px] overflow-hidden relative"
                  animate={{
                    scale: imageHovered ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.19, 1.0, 0.22, 1.0] }}
                >
                  <Image
                    src={founderImage}
                    alt={`${founderName} - FaceFrame Beauty Founder`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />

                  {/* Hover overlay with subtle gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/30 to-transparent opacity-0"
                    animate={{ opacity: imageHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Elegant Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-light-cream opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-light-cream opacity-70"></div>

                {/* Founder label */}
                <motion.div
                  className="absolute bottom-4 left-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <GlassMorphicCard
                    intensity="light"
                    className="px-4 py-2"
                    backgroundColor="rgba(255,255,255,0.15)"
                  >
                    <p className="font-alice text-white text-lg">
                      {founderName}, Founder
                    </p>
                  </GlassMorphicCard>
                </motion.div>
              </motion.div>
            </FadeInSection>
          </div>

          {/* Founder Story - Right Column */}
          <div className="md:col-span-7">
            <FadeInSection direction="right" delay={0.2}>
              <h2 className="font-alice text-3xl md:text-4xl text-elegant-mocha mb-8">
                Our Founder&apos;s Vision
              </h2>

              {/* Brand Philosophy Quote */}
              <ParallaxContainer
                scale={false}
                opacity={false}
                responsive={true}
              >
                <motion.div className="mb-10 relative" style={{ y: quoteY }}>
                  <motion.div
                    className="absolute -left-8 top-0 text-6xl text-soft-blush/20 font-serif"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    &ldquo;
                  </motion.div>
                  <blockquote className="font-alice text-2xl md:text-3xl text-muted-sand italic pl-6 border-l-2 border-warm-beige">
                    {quote}
                  </blockquote>
                  <motion.div
                    className="absolute -right-4 bottom-0 text-6xl text-soft-blush/20 font-serif"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    &rdquo;
                  </motion.div>
                </motion.div>
              </ParallaxContainer>

              {/* Founder Story */}
              <div className="font-alta text-muted-sand space-y-5">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Signature */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.svg
                  width="180"
                  height="60"
                  viewBox="0 0 180 60"
                  className="text-elegant-mocha"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  {/* Animated signature path */}
                  <motion.path
                    d="M10,40 C20,20 40,10 60,30 C80,50 100,20 120,30 C140,40 160,20 170,30"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                  />
                </motion.svg>
                <p className="font-alice text-elegant-mocha mt-2">
                  {founderName}, Founder
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
