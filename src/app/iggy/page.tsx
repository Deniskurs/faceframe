"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Layout from "@/components/layout/Layout";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

const IggyPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Advanced parallax transforms with golden ratio proportions
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textParallax1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textParallax2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const floatingParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Sophisticated intersection observers for cinematic reveals
  const [heroRef, heroInView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });
  const [essenceRef, essenceInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [editorialRef, editorialInView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });
  const [manifestoRef, manifestoInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [revelationRef, revelationInView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  // Enhanced whisper animation with more sophisticated timing
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  const whisperWords = [
    "breathe",
    "softness",
    "stillness",
    "grace",
    "light",
    "presence",
    "authenticity",
  ];

  // Refined cursor animation
  useEffect(() => {
    const blinkCursor = () => {
      if (!isActiveRef.current) return;
      setShowCursor((prev) => !prev);
      cursorTimeoutRef.current = setTimeout(blinkCursor, 650);
    };

    if (heroInView) {
      blinkCursor();
    }

    return () => {
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, [heroInView]);

  // Sophisticated typewriter animation
  useEffect(() => {
    if (!heroInView) return;

    isActiveRef.current = true;
    let wordIndex = 0;

    const runAnimationCycle = () => {
      if (!isActiveRef.current) return;

      const currentWord = whisperWords[wordIndex];
      let charIndex = 0;

      const typeCharacter = () => {
        if (!isActiveRef.current) return;

        if (charIndex <= currentWord.length) {
          setDisplayText(currentWord.slice(0, charIndex));
          charIndex++;
          animationTimeoutRef.current = setTimeout(
            typeCharacter,
            120 + Math.random() * 60
          );
        } else {
          animationTimeoutRef.current = setTimeout(startDelete, 2800);
        }
      };

      const startDelete = () => {
        if (!isActiveRef.current) return;

        const deleteCharacter = () => {
          if (!isActiveRef.current) return;

          if (charIndex > 0) {
            charIndex--;
            setDisplayText(currentWord.slice(0, charIndex));
            animationTimeoutRef.current = setTimeout(
              deleteCharacter,
              60 + Math.random() * 40
            );
          } else {
            wordIndex = (wordIndex + 1) % whisperWords.length;
            setCurrentWordIndex(wordIndex);
            animationTimeoutRef.current = setTimeout(runAnimationCycle, 1200);
          }
        };

        deleteCharacter();
      };

      typeCharacter();
    };

    animationTimeoutRef.current = setTimeout(runAnimationCycle, 1000);

    return () => {
      isActiveRef.current = false;
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [heroInView]);

  return (
    <Layout>
      <div
        ref={containerRef}
        className="relative bg-gradient-to-b from-light-cream via-light-cream to-soft-blush/[0.02] overflow-hidden"
      >
        {/* ========== CINEMATIC HERO MASTHEAD ========== */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          {/* Layered Artistic Background */}
          <div className="absolute inset-0">
            {/* Primary gradient foundation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-light-cream via-soft-blush/[0.06] to-elegant-mocha/[0.08]"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 5, ease: LUXURY_EASING }}
            />

            {/* Sophisticated texture overlay */}
            <motion.div
              className="absolute inset-0 opacity-[0.02]"
              initial={{ scale: 1.3, rotate: -2, opacity: 0 }}
              animate={{
                scale: heroInView ? 1 : 1.3,
                rotate: heroInView ? 0 : -2,
                opacity: heroInView ? 0.02 : 0,
              }}
              transition={{ duration: 8, ease: LUXURY_EASING }}
              style={{
                backgroundImage: "url('/images/brand/IMG_5461.webp')",
                backgroundPosition: "65% center",
                backgroundSize: "110%",
                filter: "blur(2px) contrast(1.2) brightness(1.1)",
                mixBlendMode: "soft-light",
              }}
            />

            {/* Editorial vignette effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-elegant-mocha/[0.15]"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 4, delay: 1.5, ease: LUXURY_EASING }}
            />
          </div>

          {/* Hero Typography Composition */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Masthead Title */}
            <motion.div
              className="mb-16 lg:mb-24"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: heroInView ? 0 : 120, opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 2.5, delay: 0.8, ease: LUXURY_EASING }}
            >
              <motion.h1
                className="font-alice text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] text-elegant-mocha/[0.97] tracking-[0.15em] uppercase relative"
                style={{ y: textParallax1 }}
              >
                <div className="flex justify-center items-center space-x-4 lg:space-x-8">
                  {["I", "G", "G", "Y"].map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ y: 60, opacity: 0, rotateX: 90 }}
                      animate={{
                        y: heroInView ? 0 : 60,
                        opacity: heroInView ? 1 : 0,
                        rotateX: heroInView ? 0 : 90,
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.2 + index * 0.1,
                        ease: LUXURY_EASING,
                      }}
                      style={{
                        transformOrigin: "bottom",
                        textShadow: "0 2px 4px rgba(127, 85, 57, 0.1)",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.h1>

              {/* Sophisticated divider */}
              <motion.div
                className="relative flex justify-center mt-12 lg:mt-16"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: heroInView ? 1 : 0,
                  opacity: heroInView ? 1 : 0,
                }}
                transition={{ duration: 3, delay: 2, ease: LUXURY_EASING }}
              >
                <div className="relative">
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/30 to-transparent w-80 sm:w-96 lg:w-[30rem]" />
                  <motion.div
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-elegant-mocha/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: heroInView ? 1 : 0,
                      opacity: heroInView ? 1 : 0,
                    }}
                    transition={{ duration: 1, delay: 3, ease: LUXURY_EASING }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Whispered Poetry */}
            <motion.div
              className="relative h-16 sm:h-20 lg:h-24 flex items-center justify-center mb-20 lg:mb-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 2.5, delay: 3, ease: LUXURY_EASING }}
            >
              <motion.div className="relative" style={{ y: floatingParallax }}>
                <motion.div
                  className="font-alta text-elegant-mocha/50 text-lg sm:text-xl lg:text-2xl tracking-[0.35em] flex items-center justify-center relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: LUXURY_EASING }}
                >
                  <span className="relative z-10">
                    {displayText}
                    <motion.span
                      className="inline-block w-[2px] h-5 sm:h-6 lg:h-7 bg-elegant-mocha/40 ml-1"
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1, ease: "linear" }}
                    />
                  </span>

                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-soft-blush/15 to-transparent blur-2xl"
                    animate={{
                      opacity: displayText.length > 3 ? 0.4 : 0,
                      scale: displayText.length > 3 ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.8, ease: LUXURY_EASING }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Editorial Subtitle */}
            <motion.div
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 2, delay: 3.8, ease: LUXURY_EASING }}
            >
              <p className="font-alta text-elegant-mocha/65 text-sm sm:text-base lg:text-lg tracking-[0.4em] uppercase">
                Founder & Master Artist
              </p>
              <motion.p
                className="font-alice text-elegant-mocha/80 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide italic max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 4.5, ease: LUXURY_EASING }}
              >
                "Where artistry meets authenticity"
              </motion.p>
            </motion.div>
          </div>

          {/* Enhanced Scroll Invitation */}
          <motion.div
            className="absolute bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 40 }}
            transition={{ duration: 1.5, delay: 5, ease: LUXURY_EASING }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-[1px] h-20 lg:h-24 bg-gradient-to-b from-transparent via-elegant-mocha/30 to-transparent" />
              <motion.div
                className="w-10 h-10 lg:w-12 lg:h-12 border border-elegant-mocha/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-light-cream/20"
                whileHover={{
                  scale: 1.4,
                  borderColor: "rgba(127, 85, 57, 0.6)",
                  backgroundColor: "rgba(127, 85, 57, 0.05)",
                }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              >
                <div className="w-2 h-2 bg-elegant-mocha/50 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ========== ESSENCE REVELATION ========== */}
        <section className="relative py-32 lg:py-48">
          <motion.div
            ref={essenceRef}
            className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {/* Opening Statement */}
            <motion.div
              className="text-center mb-32 lg:mb-48"
              initial={{ opacity: 0, y: 80 }}
              animate={{
                opacity: essenceInView ? 1 : 0,
                y: essenceInView ? 0 : 80,
              }}
              transition={{ duration: 2.5, delay: 0.3, ease: LUXURY_EASING }}
            >
              <motion.div
                className="max-w-5xl mx-auto space-y-16 lg:space-y-24"
                style={{ y: textParallax2 }}
              >
                <motion.h2
                  className="font-alice text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-elegant-mocha/95 tracking-[0.06em] leading-[0.9]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{
                    scale: essenceInView ? 1 : 0.95,
                    opacity: essenceInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.8,
                    ease: LUXURY_EASING,
                  }}
                >
                  Hey you.
                </motion.h2>

                <motion.div
                  className="space-y-12 lg:space-y-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: essenceInView ? 1 : 0 }}
                  transition={{ duration: 2, delay: 1.5, ease: LUXURY_EASING }}
                >
                  <div className="space-y-8">
                    <p className="font-alta text-elegant-mocha/75 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide max-w-4xl mx-auto">
                      I don't know how you got here,
                    </p>
                    <p className="font-alice text-elegant-mocha/90 text-3xl sm:text-4xl lg:text-5xl leading-relaxed tracking-wide italic max-w-4xl mx-auto">
                      but I'm so glad you did.
                    </p>
                  </div>

                  {/* Editorial divider */}
                  <motion.div
                    className="relative flex justify-center pt-12"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: essenceInView ? 1 : 0,
                      opacity: essenceInView ? 1 : 0,
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 2.2,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/25 to-transparent w-80 sm:w-96 lg:w-[32rem]" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Emotional Core Statement */}
            <motion.div
              className="relative mb-32 lg:mb-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: essenceInView ? 1 : 0 }}
              transition={{ duration: 2.5, delay: 2, ease: LUXURY_EASING }}
            >
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                {/* Typography as Emotional Art */}
                <div className="lg:col-span-7 space-y-12 lg:space-y-16">
                  <motion.div
                    className="space-y-10 lg:space-y-12"
                    style={{ y: textParallax1 }}
                  >
                    <motion.p
                      className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-loose tracking-wide"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{
                        opacity: essenceInView ? 1 : 0,
                        x: essenceInView ? 0 : -50,
                      }}
                      transition={{
                        duration: 2,
                        delay: 2.5,
                        ease: LUXURY_EASING,
                      }}
                    >
                      Because something tells me... you've been{" "}
                      <span className="font-alice text-3xl sm:text-4xl lg:text-5xl italic text-elegant-mocha/95 block mt-4">
                        holding your breath.
                      </span>
                    </motion.p>

                    <motion.div
                      className="pl-8 lg:pl-12 border-l-2 border-elegant-mocha/12 space-y-8 lg:space-y-10"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{
                        opacity: essenceInView ? 1 : 0,
                        x: essenceInView ? 0 : -40,
                      }}
                      transition={{
                        duration: 2,
                        delay: 3,
                        ease: LUXURY_EASING,
                      }}
                    >
                      <p className="font-alta text-elegant-mocha/70 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide">
                        You've been showing up for work, for people, for
                        expectations.
                      </p>

                      <div className="space-y-6">
                        <p className="font-alta text-elegant-mocha/65 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide italic">
                          Even when your body's been whispering,{" "}
                          <span className="not-italic font-alice text-elegant-mocha/85 text-lg sm:text-xl lg:text-2xl">
                            slow down
                          </span>
                          .
                        </p>
                        <p className="font-alta text-elegant-mocha/65 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide italic">
                          Even when your reflection hasn't quite felt like{" "}
                          <span className="font-alice italic text-elegant-mocha/90 text-lg sm:text-xl lg:text-2xl not-italic">
                            you
                          </span>{" "}
                          lately.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Editorial Image Treatment */}
                <div className="lg:col-span-5">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9, y: 60 }}
                    animate={{
                      opacity: essenceInView ? 1 : 0,
                      scale: essenceInView ? 1 : 0.9,
                      y: essenceInView ? 0 : 60,
                    }}
                    transition={{
                      duration: 2.8,
                      delay: 3.5,
                      ease: LUXURY_EASING,
                    }}
                    style={{ y: imageParallax }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden group">
                      {/* Sophisticated overlay system */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-elegant-mocha/[0.03] to-elegant-mocha/[0.08] z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: essenceInView ? 1 : 0 }}
                        transition={{
                          duration: 2.5,
                          delay: 4,
                          ease: LUXURY_EASING,
                        }}
                      />

                      {/* Editorial border effect */}
                      <motion.div
                        className="absolute inset-0 border border-elegant-mocha/15 z-20"
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{
                          scale: essenceInView ? 1 : 1.05,
                          opacity: essenceInView ? 1 : 0,
                        }}
                        transition={{
                          duration: 2.2,
                          delay: 4.2,
                          ease: LUXURY_EASING,
                        }}
                      />

                      <Image
                        src="/images/gallery/image24.webp"
                        alt="Feminine grace and authenticity"
                        fill
                        className="object-cover object-center filter contrast-[1.08] brightness-[1.02] saturate-[1.05] transition-all duration-700 group-hover:scale-105"
                        quality={98}
                        priority
                      />

                      {/* Floating signature label */}
                      <motion.div
                        className="absolute bottom-6 right-6 z-30"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{
                          opacity: essenceInView ? 1 : 0,
                          y: essenceInView ? 0 : 30,
                          scale: essenceInView ? 1 : 0.9,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 5,
                          ease: LUXURY_EASING,
                        }}
                      >
                        <div className="bg-light-cream/95 backdrop-blur-md border border-elegant-mocha/8 px-4 py-3 shadow-lg">
                          <p className="font-alice text-elegant-mocha/80 text-xs tracking-[0.25em] uppercase">
                            Authenticity
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========== EDITORIAL PORTRAIT MANIFESTO ========== */}
        <motion.div
          ref={editorialRef}
          className="relative py-32 lg:py-48 bg-gradient-to-b from-transparent via-elegant-mocha/[0.008] to-transparent"
        >
          <div className="max-w-full overflow-hidden">
            <motion.div
              className="grid lg:grid-cols-12 gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: editorialInView ? 1 : 0 }}
              transition={{ duration: 3.5, ease: LUXURY_EASING }}
            >
              {/* Magazine-Style Portrait */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  className="relative h-[85vh] lg:h-screen overflow-hidden"
                  initial={{
                    clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
                  }}
                  animate={{
                    clipPath: editorialInView
                      ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                      : "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
                  }}
                  transition={{
                    duration: 3.5,
                    delay: 0.5,
                    ease: LUXURY_EASING,
                  }}
                >
                  {/* Editorial mask effect */}
                  <motion.div
                    className="absolute inset-0 bg-elegant-mocha/15 z-20 mix-blend-multiply"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: editorialInView ? 0 : 1 }}
                    transition={{
                      duration: 2.5,
                      delay: 2,
                      ease: LUXURY_EASING,
                    }}
                  />

                  <Image
                    src="/images/gallery/image22.webp"
                    alt="Iggy - Master of her craft and emotional artistry"
                    fill
                    className="object-cover object-center filter contrast-[1.06] brightness-[1.08] saturate-[1.08]"
                    quality={98}
                    priority
                  />

                  {/* Editorial masthead */}
                  <motion.div
                    className="absolute top-8 left-8 z-30"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{
                      opacity: editorialInView ? 1 : 0,
                      x: editorialInView ? 0 : -40,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 3,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <div className="bg-black/85 backdrop-blur-md border border-white/8 px-8 py-4">
                      <p className="font-alice text-white text-xl lg:text-2xl tracking-[0.2em] mb-2">
                        IGGY
                      </p>
                      <p className="font-alta text-white/70 text-xs tracking-[0.35em] uppercase">
                        Master Artist & Emotional Curator
                      </p>
                    </div>
                  </motion.div>

                  {/* Corner accent detail */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-elegant-mocha/20 via-elegant-mocha/5 to-transparent z-25"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: editorialInView ? 1 : 0,
                      scale: editorialInView ? 1 : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 3.5,
                      ease: LUXURY_EASING,
                    }}
                  />
                </motion.div>
              </div>

              {/* Typography as Emotional Manifesto */}
              <div className="lg:col-span-7 flex items-center">
                <motion.div
                  className="px-8 sm:px-12 lg:px-20 py-16 lg:py-24 space-y-16 lg:space-y-20"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{
                    opacity: editorialInView ? 1 : 0,
                    x: editorialInView ? 0 : 80,
                  }}
                  transition={{ duration: 2.5, delay: 1, ease: LUXURY_EASING }}
                >
                  <motion.blockquote
                    className="space-y-16 lg:space-y-20"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{
                      opacity: editorialInView ? 1 : 0,
                      y: editorialInView ? 0 : 60,
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.5,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <div className="space-y-12 lg:space-y-16">
                      <p className="font-alice text-4xl sm:text-5xl lg:text-6xl text-elegant-mocha/95 leading-tight tracking-wide italic">
                        "I see it all the time.
                      </p>
                      <p className="font-alice text-3xl sm:text-4xl lg:text-5xl text-elegant-mocha/70 leading-tight tracking-wide italic pl-8">
                        Women who give everything.
                      </p>
                      <p className="font-alice text-3xl sm:text-4xl lg:text-5xl text-elegant-mocha/95 leading-tight tracking-wide italic pl-16">
                        Who hold everything."
                      </p>
                    </div>

                    <motion.div
                      className="flex justify-start pl-8"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: editorialInView ? 1 : 0 }}
                      transition={{
                        duration: 2,
                        delay: 2.5,
                        ease: LUXURY_EASING,
                      }}
                    >
                      <div className="w-32 h-[1px] bg-elegant-mocha/30" />
                    </motion.div>
                  </motion.blockquote>

                  <motion.div
                    className="space-y-12 lg:space-y-16 pl-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: editorialInView ? 1 : 0 }}
                    transition={{
                      duration: 2,
                      delay: 3,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <p className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl leading-relaxed tracking-wide">
                      And slowly forget what it feels like to{" "}
                      <span className="font-alice text-2xl sm:text-3xl italic text-elegant-mocha/95">
                        be held
                      </span>
                      .
                    </p>

                    <div className="bg-soft-blush/8 border-l-4 border-elegant-mocha/15 pl-8 py-8">
                      <p className="font-alice text-elegant-mocha/90 text-2xl sm:text-3xl leading-relaxed tracking-wide italic">
                        That's what this space is for.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========== TRANSFORMATION MANIFESTO ========== */}
        <section className="relative py-48 lg:py-64">
          <motion.div
            ref={manifestoRef}
            className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
          >
            <motion.div
              className="space-y-24 lg:space-y-32"
              initial={{ opacity: 0, y: 80 }}
              animate={{
                opacity: manifestoInView ? 1 : 0,
                y: manifestoInView ? 0 : 80,
              }}
              transition={{ duration: 2.5, ease: LUXURY_EASING }}
            >
              <motion.div
                className="space-y-16 lg:space-y-24"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: manifestoInView ? 1 : 0,
                  scale: manifestoInView ? 1 : 0.9,
                }}
                transition={{
                  duration: 2.2,
                  delay: 0.5,
                  ease: LUXURY_EASING,
                }}
              >
                <h3 className="font-alice text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-elegant-mocha/95 tracking-[0.05em] leading-tight space-y-8">
                  Not to <span className="text-elegant-mocha/60">"fix"</span>{" "}
                  you.
                  <br />
                  Not to{" "}
                  <span className="text-elegant-mocha/60">cover you up</span>.
                  <br />
                  <em className="font-alice text-elegant-mocha/95 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                    But to bring you back.
                  </em>
                </h3>

                <motion.div
                  className="max-w-4xl mx-auto space-y-12 lg:space-y-16 pt-16 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: manifestoInView ? 1 : 0 }}
                  transition={{ duration: 2, delay: 1, ease: LUXURY_EASING }}
                >
                  <motion.div
                    className="space-y-8 lg:space-y-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: manifestoInView ? 1 : 0,
                      y: manifestoInView ? 0 : 40,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 1.5,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <p className="font-alta text-elegant-mocha/75 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide text-center">
                      Back to your{" "}
                      <motion.span
                        className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: manifestoInView ? 1 : 0,
                          y: manifestoInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 2.3,
                          ease: LUXURY_EASING,
                        }}
                      >
                        softness
                      </motion.span>
                      .
                    </p>

                    <p className="font-alta text-elegant-mocha/75 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide text-center">
                      Back to your{" "}
                      <motion.span
                        className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: manifestoInView ? 1 : 0,
                          y: manifestoInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 2.8,
                          ease: LUXURY_EASING,
                        }}
                      >
                        stillness
                      </motion.span>
                      .
                    </p>

                    <p className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide text-center italic">
                      Back to the version of you that feels...{" "}
                      <span className="font-alice text-2xl sm:text-3xl lg:text-4xl not-italic text-elegant-mocha/95">
                        at ease in her skin
                      </span>
                      .
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========== SACRED PROMISE ========== */}
        <motion.div
          ref={revelationRef}
          className="relative py-48 lg:py-64 bg-gradient-to-b from-transparent via-elegant-mocha/[0.02] to-transparent"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-20 lg:space-y-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: revelationInView ? 1 : 0 }}
              transition={{ duration: 2.5, ease: LUXURY_EASING }}
            >
              <motion.blockquote
                className="space-y-16 lg:space-y-24"
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: revelationInView ? 1 : 0,
                  y: revelationInView ? 0 : 60,
                }}
                transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
              >
                <div className="space-y-12 lg:space-y-16">
                  <p className="font-alice text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-elegant-mocha/95 leading-tight tracking-wide italic">
                    "When you lie down on my table,
                    <br />
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-elegant-mocha/70">
                      the world gets quiet.
                    </span>
                  </p>
                  <p className="font-alice text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-elegant-mocha/95 leading-tight tracking-wide italic">
                    The noise drops away.
                    <br />
                    And for a little while... it's just{" "}
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                      you
                    </span>
                    .
                  </p>
                  <p className="font-alta text-lg sm:text-xl md:text-2xl lg:text-3xl text-elegant-mocha/80 leading-relaxed tracking-wide not-italic max-w-3xl mx-auto">
                    Being cared for. Without asking. Without earning it. Without
                    performing."
                  </p>
                </div>

                <motion.div
                  className="flex justify-center"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: revelationInView ? 1 : 0,
                    opacity: revelationInView ? 1 : 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    ease: LUXURY_EASING,
                  }}
                >
                  <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/40 to-transparent" />
                </motion.div>
              </motion.blockquote>

              <motion.div
                className="space-y-16 lg:space-y-24"
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: revelationInView ? 1 : 0,
                  y: revelationInView ? 0 : 40,
                }}
                transition={{ duration: 2, delay: 2, ease: LUXURY_EASING }}
              >
                <p className="font-alice text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-elegant-mocha/95 leading-tight tracking-wide">
                  This isn't just about lashes, brows, or skin...
                </p>

                <p className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                  though I've spent over{" "}
                  <span className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95">
                    12 years
                  </span>{" "}
                  perfecting every touch, every treatment.
                </p>

                <motion.div
                  className="space-y-12 lg:space-y-16 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: revelationInView ? 1 : 0 }}
                  transition={{
                    duration: 2,
                    delay: 2.5,
                    ease: LUXURY_EASING,
                  }}
                >
                  <p className="font-alice text-elegant-mocha/95 text-3xl sm:text-4xl md:text-5xl leading-relaxed tracking-wide italic">
                    It's about how you{" "}
                    <span className="text-4xl sm:text-5xl md:text-6xl not-italic">
                      feel
                    </span>{" "}
                    when it's done.
                  </p>

                  <div className="space-y-10 lg:space-y-12">
                    <p className="font-alta text-elegant-mocha/85 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                      Not just beautiful.
                      <br />
                      But{" "}
                      <span className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95">
                        lighter
                      </span>
                      .
                    </p>

                    <div className="space-y-8 lg:space-y-10">
                      <p className="font-alta text-elegant-mocha/75 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide italic">
                        Like someone reached in and gently reminded you...{" "}
                        <span className="font-alice text-xl sm:text-2xl lg:text-3xl not-italic text-elegant-mocha/95">
                          hey... you're still in there.
                        </span>
                      </p>

                      <div className="space-y-6">
                        <p className="font-alice text-elegant-mocha/95 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                          And you are.
                        </p>
                        <p className="font-alta text-elegant-mocha/75 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide italic">
                          You always have been.
                        </p>
                      </div>

                      <p className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                        Sometimes it just takes{" "}
                        <span className="font-alice text-xl sm:text-2xl lg:text-3xl italic text-elegant-mocha/95">
                          the right moment... the right hands...
                        </span>{" "}
                        to help you feel it again.
                      </p>
                    </div>

                    <motion.div
                      className="pt-12 lg:pt-16 space-y-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: revelationInView ? 1 : 0,
                        y: revelationInView ? 0 : 30,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 3.5,
                        ease: LUXURY_EASING,
                      }}
                    >
                      <p className="font-alta text-elegant-mocha/85 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                        So if you've been craving something softer... something
                        real...
                      </p>

                      <div className="space-y-4">
                        <p className="font-alice text-elegant-mocha/95 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                          I'm here.
                        </p>
                        <p className="font-alice text-elegant-mocha/95 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                          And I'm already holding space for you.
                        </p>
                      </div>

                      {/* Simple Signature */}
                      <motion.div
                        className="pt-16 text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: revelationInView ? 1 : 0 }}
                        transition={{
                          duration: 1.5,
                          delay: 4,
                          ease: LUXURY_EASING,
                        }}
                      >
                        <p className="font-alice text-elegant-mocha/70 text-lg sm:text-xl lg:text-2xl italic tracking-[0.3em]">
                          — IGGY
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Client Testimonials with Enhanced Spacing */}
        <section className="py-48 lg:py-64 bg-elegant-mocha/[0.015]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-32 lg:mb-48"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              <h3 className="font-alice text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-elegant-mocha/95 tracking-wide mb-12">
                What My Clients Say
              </h3>
              <div className="w-32 h-[1px] bg-elegant-mocha/25 mx-auto" />
            </motion.div>

            <LuxuryClientVoices />
          </div>
        </section>

        {/* Final Emotional CTA with Cinematic Treatment */}
        <section className="py-56 lg:py-72 bg-gradient-to-b from-light-cream via-soft-blush/[0.03] to-elegant-mocha/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="space-y-24 lg:space-y-32"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              <motion.h4
                className="font-alice text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-elegant-mocha/95 leading-tight tracking-wide space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2, delay: 0.3, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8,
                    ease: LUXURY_EASING,
                  }}
                  viewport={{ once: true }}
                >
                  I AM HOLDING
                </motion.div>
                <motion.div
                  className="text-elegant-mocha/75"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 1.2,
                    ease: LUXURY_EASING,
                  }}
                  viewport={{ once: true }}
                >
                  A SPACE FOR YOU.
                </motion.div>
              </motion.h4>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 2.5, delay: 1.5, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-elegant-mocha/50 to-transparent" />
              </motion.div>

              <motion.div
                className="space-y-12 lg:space-y-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                <p className="font-alta text-elegant-mocha/85 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide max-w-4xl mx-auto">
                  Ready to remember what it feels like to be truly cared for?
                  <br />
                  To look in the mirror and see yourself... really see yourself?
                </p>

                <motion.div
                  className="pt-16"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 2.5,
                    ease: LUXURY_EASING,
                  }}
                  viewport={{ once: true }}
                >
                  <LuxuryShadcnButton
                    text="BOOK YOUR CONSULTATION"
                    size="lg"
                    className="px-16 py-6 text-xl tracking-wider"
                    onClick={() => window.open("/consultation", "_self")}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IggyPage;
