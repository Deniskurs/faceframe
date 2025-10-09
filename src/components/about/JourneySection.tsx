"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionTitle } from "@/components/shared/SectionTitle";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const JourneySection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <FadeInSection intensity="subtle">
      <section className="py-24 md:py-32 px-6 bg-white relative" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <SectionTitle
            title="THE JOURNEY"
            subtitle="From Vision to Mastery"
            align="center"
            variant="dark"
          />

          {/* Tabs Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASING }}
            className="mt-16"
          >
            <Tabs defaultValue="origin" className="w-full">
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-light-cream/30 p-1 border border-soft-blush/20">
                <TabsTrigger
                  value="origin"
                  className="font-alta text-xs tracking-[0.2em] uppercase data-[state=active]:bg-white data-[state=active]:text-elegant-mocha data-[state=active]:shadow-sm transition-all duration-500"
                >
                  Origin
                </TabsTrigger>
                <TabsTrigger
                  value="training"
                  className="font-alta text-xs tracking-[0.2em] uppercase data-[state=active]:bg-white data-[state=active]:text-elegant-mocha data-[state=active]:shadow-sm transition-all duration-500"
                >
                  Training
                </TabsTrigger>
                <TabsTrigger
                  value="philosophy"
                  className="font-alta text-xs tracking-[0.2em] uppercase data-[state=active]:bg-white data-[state=active]:text-elegant-mocha data-[state=active]:shadow-sm transition-all duration-500"
                >
                  Philosophy
                </TabsTrigger>
              </TabsList>

              {/* Origin Tab */}
              <TabsContent value="origin" className="mt-8">
                <div className="space-y-6">
                  <motion.h3
                    className="font-alice text-2xl md:text-3xl text-elegant-mocha mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: LUXURY_EASING }}
                  >
                    Where It All Began
                  </motion.h3>

                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
                  >
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      In 2018, after more than a decade of training with some of
                      Europe&apos;s most prestigious beauty academies, Iggy founded
                      FaceFrame Beauty with a singular vision: to create a sanctuary
                      where precision meets artistry.
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      Having witnessed countless clients left disappointed by
                      treatments that altered rather than enhanced, she set out to
                      redefine what semi-permanent makeup could be—subtle,
                      sophisticated, and uniquely tailored to each individual&apos;s
                      natural features.
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      What started as a small studio in London has grown into a
                      trusted destination for discerning clients who value quality,
                      authenticity, and the transformative power of feeling
                      confidently beautiful in their own skin.
                    </p>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training" className="mt-8">
                <div className="space-y-6">
                  <motion.h3
                    className="font-alice text-2xl md:text-3xl text-elegant-mocha mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: LUXURY_EASING }}
                  >
                    A Decade of European Excellence
                  </motion.h3>

                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
                  >
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      Iggy&apos;s journey began with intensive training across Europe&apos;s
                      leading beauty academies, where she mastered the intricate
                      techniques of microblading, semi-permanent makeup, and
                      advanced facial treatments.
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      From perfecting the hair-stroke method in Milan to studying
                      color theory in Paris, each experience refined her approach
                      and deepened her commitment to achieving results that look
                      naturally flawless—never overdone.
                    </p>

                    {/* Training Highlights */}
                    <div className="mt-8 pt-8 border-t border-soft-blush/20">
                      <h4 className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/70 mb-6">
                        Areas of Specialization
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Microblading & Brow Architecture",
                          "Semi-Permanent Lip Enhancement",
                          "Advanced Volume Lash Application",
                          "Million Dollar Facial Techniques",
                          "Dermaplaning & Skin Rejuvenation",
                          "Color Theory & Pigmentation",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + index * 0.1,
                              ease: LUXURY_EASING,
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-elegant-mocha/40 mt-2 flex-shrink-0"></div>
                            <span className="font-alta text-sm text-muted-sand font-medium">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Philosophy Tab */}
              <TabsContent value="philosophy" className="mt-8">
                <div className="space-y-6">
                  <motion.h3
                    className="font-alice text-2xl md:text-3xl text-elegant-mocha mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: LUXURY_EASING }}
                  >
                    Enhancement, Not Alteration
                  </motion.h3>

                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
                  >
                    <p className="font-alice text-lg md:text-xl italic text-elegant-mocha/90 leading-relaxed">
                      &ldquo;I believe beauty is not about perfection—it&apos;s about
                      enhancing your natural features with precision and care.&rdquo;
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      At the heart of FaceFrame Beauty is a philosophy that
                      respects and celebrates each client&apos;s unique features. Every
                      treatment is approached with meticulous attention to detail,
                      ensuring results that complement rather than compete with
                      your natural beauty.
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      The goal is simple: you should wake up each morning
                      recognizing yourself in the mirror—just more rested, more
                      defined, and more confident. This approach requires patience,
                      precision, and a deep understanding of facial structure, skin
                      tone, and personal style.
                    </p>
                    <p className="font-alta text-base md:text-lg leading-relaxed text-muted-sand tracking-wide font-medium">
                      Whether creating hair-like strokes that blend seamlessly
                      with your natural brows or applying lashes that enhance
                      without overwhelming, every decision is made with your
                      individual beauty in mind.
                    </p>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default JourneySection;
