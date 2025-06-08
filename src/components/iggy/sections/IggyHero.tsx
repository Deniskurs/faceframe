/**
 * IggyHero Component
 *
 * Hero section for the Iggy page using the consistent design system.
 * Features single image treatment for better mobile flow and
 * professional typography using design tokens.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import IggySection from "../shared/IggySection";
import IggyTypography from "../shared/IggyTypography";
import IggyImage from "../shared/IggyImage";
import IggyDivider from "../shared/IggyDivider";
import { iggyTokens } from "../design/tokens";
import {
  iggyAnimations,
  staggerContainers,
  viewportConfigs,
} from "../design/animations";
import { IggyHeroProps } from "../design/types";

const IggyHero: React.FC<IggyHeroProps> = ({
  title = "IGGY",
  subtitle = "Founder & Master Artist",
  description = "Where artistry meets authenticity",
  whisperWords = [
    "breathe",
    "softness",
    "stillness",
    "grace",
    "light",
    "presence",
    "authenticity",
  ],
  scrollIndicator = true,
  spacing = "xl",
  background = "primary",
  className,
  ...props
}) => {
  // Enhanced whisper animation state
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [, setCurrentWordIndex] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  // Sophisticated typewriter animation
  useEffect(() => {
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

    const initialDelay = setTimeout(runAnimationCycle, 1000);

    return () => {
      isActiveRef.current = false;
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (initialDelay) {
        clearTimeout(initialDelay);
      }
    };
  }, [whisperWords]);

  // Cursor blinking animation
  useEffect(() => {
    const blinkCursor = () => {
      if (!isActiveRef.current) return;
      setShowCursor((prev) => !prev);
      cursorTimeoutRef.current = setTimeout(blinkCursor, 650);
    };

    blinkCursor();

    return () => {
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, []);

  return (
    <IggySection
      spacing={spacing}
      background={background}
      maxWidth="full"
      centerContent
      className={cn("min-h-screen relative overflow-hidden", className)}
      {...props}
    >
      {/* Background Image - Single, Clean Treatment */}
      <div className="absolute inset-0 z-0">
        <IggyImage
          src="/images/brand/IMG_5461.webp"
          alt="Iggy - Founder and Master Artist"
          fill
          quality={98}
          priority
          objectFit="cover"
          objectPosition="center"
          overlay={{
            type: "gradient",
            color: "primary",
            opacity: 0.15,
          }}
          animate={false}
          className="filter brightness-110 contrast-105"
        />

        {/* Additional subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-cream/20" />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={staggerContainers.dramatic}
        initial="initial"
        animate="animate"
        viewport={viewportConfigs.immediate}
      >
        {/* Title Section */}
        <motion.div
          className="mb-16 lg:mb-24"
          variants={iggyAnimations.fadeInUp}
        >
          <IggyTypography
            variant="display-xl"
            font="primary"
            color="primary"
            tracking="xl"
            leading="xs"
            weight="normal"
            className="mb-8 lg:mb-12"
            animate={false}
          >
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={{
                  initial: { y: 60, opacity: 0, rotateX: 90 },
                  animate: { y: 0, opacity: 1, rotateX: 0 },
                }}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.lg + index * 0.1,
                  ease: iggyTokens.animations.easing.luxury,
                }}
                style={{
                  transformOrigin: "bottom",
                  textShadow: "0 2px 4px rgba(127, 85, 57, 0.1)",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </IggyTypography>

          {/* Elegant Divider */}
          <motion.div
            variants={iggyAnimations.fadeIn}
            className="flex justify-center"
          >
            <IggyDivider
              variant="dot"
              width="lg"
              color="medium"
              delay="xl"
              duration="cinematic"
            />
          </motion.div>
        </motion.div>

        {/* Whispered Poetry Section */}
        <motion.div
          className="relative h-16 sm:h-20 lg:h-24 flex items-center justify-center mb-20 lg:mb-28"
          variants={iggyAnimations.fadeIn}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.6,
              ease: iggyTokens.animations.easing.luxury,
            }}
          >
            <IggyTypography
              variant="heading-md"
              font="secondary"
              color="accent"
              tracking="xl"
              className="flex items-center justify-center relative"
              animate={false}
            >
              <span className="relative z-10">
                {displayText}
                <motion.span
                  className="inline-block w-[2px] h-5 sm:h-6 lg:h-7 ml-1"
                  style={{ backgroundColor: iggyTokens.colors.text.accent }}
                  animate={{ opacity: showCursor ? 1 : 0 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </span>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 blur-2xl"
                style={{
                  background: `linear-gradient(to right, transparent, ${iggyTokens.colors.background.subtle}, transparent)`,
                }}
                animate={{
                  opacity: displayText.length > 3 ? 0.4 : 0,
                  scale: displayText.length > 3 ? 1.2 : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              />
            </IggyTypography>
          </motion.div>
        </motion.div>

        {/* Subtitle Section */}
        <motion.div
          className="space-y-6 lg:space-y-8"
          variants={iggyAnimations.fadeInUp}
        >
          <IggyTypography
            variant="heading-xs"
            font="secondary"
            color="tertiary"
            tracking="xxl"
            weight="normal"
            className="uppercase"
            animate={false}
          >
            {subtitle}
          </IggyTypography>

          <IggyTypography
            variant="heading-lg"
            font="primary"
            color="secondary"
            italic
            tracking="wide"
            leading="relaxed"
            className="max-w-2xl mx-auto"
            animate={false}
          >
            &ldquo;{description}&rdquo;
          </IggyTypography>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {scrollIndicator && (
        <motion.div
          className="absolute bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: iggyTokens.animations.duration.normal,
            delay: iggyTokens.animations.delay.xxl,
            ease: iggyTokens.animations.easing.luxury,
          }}
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
            <IggyDivider
              variant="gradient"
              width="xs"
              orientation="horizontal"
              thickness="hairline"
              color="medium"
              animate={false}
              className="rotate-90 h-20 lg:h-24"
            />

            <motion.div
              className="w-10 h-10 lg:w-12 lg:h-12 border rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                borderColor: iggyTokens.colors.border.medium,
                backgroundColor: iggyTokens.colors.background.primary + "33", // 20% opacity
              }}
              whileHover={{
                scale: 1.4,
                borderColor: iggyTokens.colors.border.strong,
                backgroundColor: iggyTokens.colors.background.overlay,
              }}
              transition={{
                duration: 0.5,
                ease: iggyTokens.animations.easing.luxury,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: iggyTokens.colors.border.medium }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </IggySection>
  );
};

export default IggyHero;
