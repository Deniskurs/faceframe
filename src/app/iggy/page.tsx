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

            {/* Professional Editorial Subtitle */}
            <motion.div
              className="space-y-12 lg:space-y-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 2, delay: 3.8, ease: LUXURY_EASING }}
            >
              {/* Refined role designation */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 4.2, ease: LUXURY_EASING }}
              >
                <div className="flex justify-center">
                  <div className="w-24 h-[1px] bg-elegant-mocha/20" />
                </div>
                <p className="font-alta text-elegant-mocha/65 text-xs sm:text-sm lg:text-base tracking-[0.5em] uppercase leading-loose">
                  Founder & Master Artist
                </p>
                <div className="flex justify-center">
                  <div className="w-24 h-[1px] bg-elegant-mocha/20" />
                </div>
              </motion.div>

              {/* Sophisticated quote treatment */}
              <motion.div
                className="max-w-3xl mx-auto space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: heroInView ? 1 : 0,
                  scale: heroInView ? 1 : 0.95,
                }}
                transition={{ duration: 2, delay: 4.8, ease: LUXURY_EASING }}
              >
                <blockquote className="relative">
                  {/* Opening quote mark */}
                  <div className="absolute -top-4 -left-2 text-4xl lg:text-6xl text-elegant-mocha/15 font-alice leading-none">
                    &ldquo;
                  </div>

                  <p className="font-alice text-elegant-mocha/85 text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide italic text-center relative z-10">
                    Where artistry meets authenticity
                  </p>

                  {/* Closing quote mark */}
                  <div className="absolute -bottom-8 -right-2 text-4xl lg:text-6xl text-elegant-mocha/15 font-alice leading-none">
                    &rdquo;
                  </div>
                </blockquote>

                {/* Elegant attribution */}
                <motion.div
                  className="flex justify-center pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: heroInView ? 1 : 0 }}
                  transition={{ duration: 1, delay: 5.5, ease: LUXURY_EASING }}
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-[1px] bg-elegant-mocha/25 mx-auto" />
                    <p className="font-alta text-elegant-mocha/50 text-xs tracking-[0.3em] uppercase">
                      Philosophy
                    </p>
                  </div>
                </motion.div>
              </motion.div>
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
            <motion.div
              className="text-center mb-32 lg:mb-48"
              initial={{ opacity: 0, y: 80 }}
              animate={{
                opacity: essenceInView ? 1 : 0,
                y: essenceInView ? 0 : 80,
              }}
              transition={{ duration: 2.5, delay: 0.3, ease: LUXURY_EASING }}
            >
              <motion.h2
                className="font-alice text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-elegant-mocha/95 tracking-[0.06em] leading-[0.9] mb-16 lg:mb-24"
                style={{ y: textParallax2 }}
              >
                Hey you.
              </motion.h2>

              <div className="space-y-8 max-w-4xl mx-auto">
                <p className="font-alta text-elegant-mocha/75 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                  I don&apos;t know how you got here,
                </p>
                <p className="font-alice text-elegant-mocha/90 text-3xl sm:text-4xl lg:text-5xl leading-relaxed tracking-wide italic">
                  but I&apos;m so glad you did.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: essenceInView ? 1 : 0 }}
              transition={{ duration: 2.5, delay: 1, ease: LUXURY_EASING }}
            >
              <div className="lg:col-span-7 space-y-12 lg:space-y-16">
                <motion.p
                  className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-loose tracking-wide"
                  style={{ y: textParallax1 }}
                >
                  Because something tells me... you&apos;ve been{" "}
                  <span className="font-alice text-3xl sm:text-4xl lg:text-5xl italic text-elegant-mocha/95 block mt-4">
                    holding your breath.
                  </span>
                </motion.p>

                <div className="pl-8 lg:pl-12 border-l-2 border-elegant-mocha/12 space-y-8 lg:space-y-10">
                  <p className="font-alta text-elegant-mocha/70 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide">
                    You&apos;ve been showing up for work, for people, for
                    expectations.
                  </p>
                  <div className="space-y-6">
                    <p className="font-alta text-elegant-mocha/65 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide italic">
                      Even when your body&apos;s been whispering,{" "}
                      <span className="not-italic font-alice text-elegant-mocha/85 text-lg sm:text-xl lg:text-2xl">
                        slow down
                      </span>
                      .
                    </p>
                    <p className="font-alta text-elegant-mocha/65 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide italic">
                      Even when your reflection hasn&apos;t quite felt like{" "}
                      <span className="font-alice italic text-elegant-mocha/90 text-lg sm:text-xl lg:text-2xl not-italic">
                        you
                      </span>{" "}
                      lately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <motion.div
                  className="relative space-y-8"
                  style={{ y: imageParallax }}
                >
                  {/* Primary Editorial Image */}
                  <motion.div
                    className="relative aspect-[3/4] overflow-hidden group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: essenceInView ? 1 : 0,
                      scale: essenceInView ? 1 : 0.95,
                    }}
                    transition={{
                      duration: 2.8,
                      delay: 3.5,
                      ease: LUXURY_EASING,
                    }}
                  >
                    {/* Luxury overlay system */}
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

                    {/* Editorial frame */}
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

                    {/* Floating emotional quote overlay */}
                    <motion.div
                      className="absolute top-8 left-8 z-30 max-w-[60%]"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{
                        opacity: essenceInView ? 1 : 0,
                        x: essenceInView ? 0 : -40,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 5,
                        ease: LUXURY_EASING,
                      }}
                    >
                      <div className="bg-black/75 backdrop-blur-md px-6 py-4">
                        <p className="font-alice text-white text-sm lg:text-base italic leading-relaxed">
                          &ldquo;That&apos;s what this space is for&rdquo;
                        </p>
                      </div>
                    </motion.div>

                    {/* Signature label */}
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
                        delay: 5.2,
                        ease: LUXURY_EASING,
                      }}
                    >
                      <div className="bg-light-cream/95 backdrop-blur-md border border-elegant-mocha/8 px-4 py-3 shadow-lg">
                        <p className="font-alice text-elegant-mocha/80 text-xs tracking-[0.25em] uppercase">
                          Authenticity
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Secondary Luxury Image Treatment */}
                  <motion.div
                    className="relative h-32 lg:h-40 overflow-hidden"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{
                      opacity: essenceInView ? 1 : 0,
                      x: essenceInView ? 0 : 40,
                    }}
                    transition={{
                      duration: 2,
                      delay: 5.5,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <Image
                      src="/images/gallery/image25.webp"
                      alt="Luxury beauty experience"
                      fill
                      className="object-cover object-center filter contrast-[1.06] brightness-[1.05] saturate-[1.08] opacity-80"
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-light-cream/20 to-transparent" />

                    {/* Floating text */}
                    <div className="absolute inset-0 flex items-center justify-end pr-6">
                      <p className="font-alice text-elegant-mocha/90 text-sm italic text-right">
                        Slowly forget what it feels like
                        <br />
                        to <span className="not-italic text-base">be held</span>
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========== TRANSFORMATION MANIFESTO ========== */}
        <section ref={manifestoRef} className="relative py-48 lg:py-64">
          <motion.div
            className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 80 }}
            animate={{
              opacity: manifestoInView ? 1 : 0,
              y: manifestoInView ? 0 : 80,
            }}
            transition={{ duration: 2.5, ease: LUXURY_EASING }}
          >
            <motion.h3 className="font-alice text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-elegant-mocha/95 tracking-[0.05em] leading-tight space-y-8 mb-24">
              Not to <span className="text-elegant-mocha/60">"fix"</span> you.
              <br />
              Not to <span className="text-elegant-mocha/60">cover you up</span>
              .
              <br />
              <em className="font-alice text-elegant-mocha/95 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                But to bring you back.
              </em>
            </motion.h3>

            <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
              <p className="font-alta text-elegant-mocha/75 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Back to your{" "}
                <span className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95">
                  softness
                </span>
                .
              </p>
              <p className="font-alta text-elegant-mocha/75 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Back to your{" "}
                <span className="font-alice text-2xl sm:text-3xl lg:text-4xl italic text-elegant-mocha/95">
                  stillness
                </span>
                .
              </p>
              <p className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide italic">
                Back to the version of you that feels...{" "}
                <span className="font-alice text-2xl sm:text-3xl lg:text-4xl not-italic text-elegant-mocha/95">
                  at ease in her skin
                </span>
                .
              </p>
            </div>
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
              <blockquote className="space-y-16 lg:space-y-24">
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
              </blockquote>

              <div className="space-y-16 lg:space-y-24">
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

                {/* Professional Editorial Flow - Core Emotional Journey */}
                <motion.div
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: revelationInView ? 1 : 0,
                    y: revelationInView ? 0 : 40,
                  }}
                  transition={{ duration: 2, delay: 1, ease: LUXURY_EASING }}
                >
                  {/* Primary Statement */}
                  <motion.div
                    className="text-center mb-20 lg:mb-28"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: revelationInView ? 1 : 0,
                      scale: revelationInView ? 1 : 0.95,
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 1.5,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <p className="font-alice text-elegant-mocha/95 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide italic">
                      It&apos;s about how you{" "}
                      <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl not-italic text-elegant-mocha/95">
                        feel
                      </span>
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>when it&apos;s done.
                    </p>
                  </motion.div>

                  {/* Flowing Narrative Block */}
                  <motion.div
                    className="prose prose-lg max-w-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: revelationInView ? 1 : 0 }}
                    transition={{
                      duration: 2,
                      delay: 2.2,
                      ease: LUXURY_EASING,
                    }}
                  >
                    <article className="space-y-8 lg:space-y-12 text-center leading-loose">
                      {/* First flow paragraph */}
                      <motion.p
                        className="font-alta text-elegant-mocha/85 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-relaxed tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: revelationInView ? 1 : 0,
                          y: revelationInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 2.8,
                          ease: LUXURY_EASING,
                        }}
                      >
                        Not just beautiful. But{" "}
                        <span className="font-alice text-3xl sm:text-4xl lg:text-5xl xl:text-6xl italic text-elegant-mocha/95">
                          lighter
                        </span>
                        .
                      </motion.p>

                      {/* Second flow paragraph */}
                      <motion.p
                        className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: revelationInView ? 1 : 0,
                          y: revelationInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 3.2,
                          ease: LUXURY_EASING,
                        }}
                      >
                        Like someone reached in and gently reminded you...{" "}
                        <span className="font-alice text-2xl sm:text-3xl lg:text-4xl xl:text-5xl not-italic text-elegant-mocha/95">
                          hey... you&apos;re still in there.
                        </span>
                      </motion.p>

                      {/* Third flow paragraph */}
                      <motion.div
                        className="space-y-6 lg:space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: revelationInView ? 1 : 0,
                          y: revelationInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 3.6,
                          ease: LUXURY_EASING,
                        }}
                      >
                        <p className="font-alice text-elegant-mocha/95 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-relaxed tracking-wide">
                          And you are.
                        </p>
                        <p className="font-alta text-elegant-mocha/75 text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide italic">
                          You always have been.
                        </p>
                      </motion.div>

                      {/* Final flow paragraph */}
                      <motion.p
                        className="font-alta text-elegant-mocha/80 text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide pt-8 lg:pt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: revelationInView ? 1 : 0,
                          y: revelationInView ? 0 : 20,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 4,
                          ease: LUXURY_EASING,
                        }}
                      >
                        Sometimes it just takes{" "}
                        <span className="font-alice text-2xl sm:text-3xl lg:text-4xl xl:text-5xl italic text-elegant-mocha/95">
                          the right moment... the right hands...
                        </span>{" "}
                        to help you feel it again.
                      </motion.p>
                    </article>
                  </motion.div>
                </motion.div>

                <div className="pt-12 lg:pt-16 space-y-6">
                  <p className="font-alta text-elegant-mocha/85 text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                    So if you&apos;ve been craving something softer... something
                    real...
                  </p>

                  <div className="space-y-4">
                    <p className="font-alice text-elegant-mocha/95 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                      I&apos;m here.
                    </p>
                    <p className="font-alice text-elegant-mocha/95 text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wide">
                      And I&apos;m already holding space for you.
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
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Client Testimonials - Standalone Component */}
        <LuxuryClientVoices />

        {/* Final Emotional CTA with Cinematic Treatment */}
        <section className="py-56 lg:py-72">
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
                    href="/consultation"
                    text="BOOK YOUR CONSULTATION"
                    luxuryVariant="elegant"
                    luxuryTheme="dark"
                    luxurySize="large"
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
