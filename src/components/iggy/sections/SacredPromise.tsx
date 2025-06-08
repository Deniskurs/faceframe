/**
 * SacredPromise Component
 *
 * Sacred commitment section that showcases Iggy's expertise, experience,
 * and the transformational promise she makes to each client.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import IggySection from "../shared/IggySection";
import IggyTypography from "../shared/IggyTypography";
import IggyDivider from "../shared/IggyDivider";
import { iggyTokens } from "../design/tokens";
import {
  iggyAnimations,
  staggerContainers,
  viewportConfigs,
} from "../design/animations";
import { SacredPromiseProps } from "../design/types";

const SacredPromise: React.FC<SacredPromiseProps> = ({
  promise = {
    opening: [
      "When you sit in my chair, you're not just receiving a service.",
      "You're entering a sacred space where your story is honored,",
      "your beauty is celebrated, and your confidence is awakened.",
    ],
    core: [
      "I promise to see you—truly see you—",
      "beyond trends, beyond expectations,",
      "and create something that feels",
      "authentically, undeniably you.",
    ],
    experience: [
      "You'll leave not just looking beautiful,",
      "but feeling more like yourself",
      "than you have in years.",
      "This is my sacred promise to you.",
    ],
  },
  expertise = {
    years: 8,
    focus: "Authentic Beauty Enhancement",
  },
  transformation = {
    feeling: [
      "Confidence that comes from within",
      "Beauty that feels like coming home",
      "Self-love that radiates outward",
    ],
    revelation: [
      "You'll rediscover parts of yourself you'd forgotten.",
      "You'll see beauty you never knew existed.",
      "You'll feel powerful in your own skin.",
    ],
  },
  signature = "— Iggy",
  spacing = "xl",
  background = "subtle",
  className,
  ...props
}) => {
  return (
    <IggySection
      spacing={spacing}
      background={background}
      maxWidth="xl"
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainers.editorial}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfigs.editorial}
      >
        {/* Opening Promise */}
        <motion.div
          className="text-center mb-20 lg:mb-28"
          variants={iggyAnimations.fadeInUp}
        >
          <motion.div
            className="mb-12 lg:mb-16"
            variants={staggerContainers.standard}
          >
            {promise.opening.map((line, index) => (
              <motion.div
                key={index}
                variants={iggyAnimations.fadeInUp}
                className="mb-4 lg:mb-6"
              >
                <IggyTypography
                  variant="body-lg"
                  font="secondary"
                  color="secondary"
                  leading="relaxed"
                  tracking="wide"
                  className="text-center"
                >
                  {line}
                </IggyTypography>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={iggyAnimations.scaleIn}>
            <IggyDivider
              variant="dot"
              width="lg"
              color="medium"
              thickness="thin"
              delay="md"
              duration="slow"
            />
          </motion.div>
        </motion.div>

        {/* Core Promise Section */}
        <motion.div
          className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-20 lg:mb-28"
          variants={staggerContainers.standard}
        >
          {/* Expertise Card */}
          <motion.div variants={iggyAnimations.scaleIn} className="text-center">
            <div
              className="relative p-8 lg:p-10 rounded-2xl border-2"
              style={{
                backgroundColor: iggyTokens.colors.background.primary,
                borderColor: iggyTokens.colors.border.subtle,
              }}
            >
              {/* Years Counter */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.md,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              >
                <IggyTypography
                  variant="display-md"
                  font="primary"
                  color="primary"
                  tracking="tight"
                  leading="tight"
                  weight="normal"
                  className="mb-4"
                >
                  {expertise.years}+
                </IggyTypography>

                <IggyTypography
                  variant="body-sm"
                  font="secondary"
                  color="tertiary"
                  tracking="xl"
                  weight="normal"
                  className="uppercase"
                >
                  Years of Mastery
                </IggyTypography>
              </motion.div>

              <IggyTypography
                variant="heading-xs"
                font="primary"
                color="secondary"
                italic
                tracking="wide"
                leading="relaxed"
                className="text-center"
              >
                {expertise.focus}
              </IggyTypography>

              {/* Decorative Element */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 border-2 rounded-full opacity-30"
                style={{ borderColor: iggyTokens.colors.border.medium }}
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.lg,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              />
            </div>
          </motion.div>

          {/* Core Promise */}
          <motion.div
            variants={iggyAnimations.editorialEntry}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Background */}
              <motion.div
                className="absolute inset-0 -mx-4 -my-8 lg:-mx-8 lg:-my-12 rounded-2xl"
                style={{
                  backgroundColor: iggyTokens.colors.background.accent,
                  border: `1px solid ${iggyTokens.colors.border.subtle}`,
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.sm,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              />

              <div className="relative z-10 px-4 py-8 lg:px-8 lg:py-12">
                <motion.div
                  className="space-y-6"
                  variants={staggerContainers.fast}
                >
                  {promise.core.map((line, index) => (
                    <motion.div key={index} variants={iggyAnimations.fadeInUp}>
                      <IggyTypography
                        variant="heading-sm"
                        font="primary"
                        color="primary"
                        italic={index === promise.core.length - 1}
                        tracking="wide"
                        leading="relaxed"
                        className="text-center"
                      >
                        {line}
                      </IggyTypography>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Transformation Promise */}
        <motion.div
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-28"
          variants={staggerContainers.standard}
        >
          {/* Feelings Column */}
          <motion.div variants={iggyAnimations.fadeInUp}>
            <IggyTypography
              variant="heading-md"
              font="primary"
              color="secondary"
              tracking="xl"
              leading="tight"
              weight="normal"
              className="mb-12"
            >
              You&rsquo;ll feel:
            </IggyTypography>

            <motion.div className="space-y-8" variants={staggerContainers.fast}>
              {transformation.feeling.map((feeling, index) => (
                <motion.div
                  key={index}
                  variants={iggyAnimations.slideInLeft}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2"
                    style={{ backgroundColor: iggyTokens.colors.border.medium }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportConfigs.standard}
                    transition={{
                      duration: iggyTokens.animations.duration.fast,
                      delay: iggyTokens.animations.delay.sm + index * 0.1,
                      ease: iggyTokens.animations.easing.luxury,
                    }}
                  />
                  <IggyTypography
                    variant="body-md"
                    font="secondary"
                    color="secondary"
                    leading="relaxed"
                    tracking="normal"
                  >
                    {feeling}
                  </IggyTypography>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Revelations Column */}
          <motion.div variants={iggyAnimations.fadeInUp}>
            <IggyTypography
              variant="heading-md"
              font="primary"
              color="secondary"
              tracking="xl"
              leading="tight"
              weight="normal"
              className="mb-12"
            >
              You&rsquo;ll discover:
            </IggyTypography>

            <motion.div className="space-y-8" variants={staggerContainers.fast}>
              {transformation.revelation.map((revelation, index) => (
                <motion.div key={index} variants={iggyAnimations.fadeIn}>
                  <IggyTypography
                    variant="body-md"
                    font="secondary"
                    color="tertiary"
                    italic
                    leading="relaxed"
                    tracking="wide"
                  >
                    {revelation}
                  </IggyTypography>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Experience Promise */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          variants={iggyAnimations.scaleIn}
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Background Accent */}
            <motion.div
              className="absolute inset-0 -mx-8 -my-12 lg:-mx-16 lg:-my-20 rounded-3xl"
              style={{
                backgroundColor: iggyTokens.colors.background.primary,
                border: `3px solid ${iggyTokens.colors.border.medium}`,
              }}
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={viewportConfigs.standard}
              transition={{
                duration: iggyTokens.animations.duration.cinematic,
                delay: iggyTokens.animations.delay.md,
                ease: iggyTokens.animations.easing.luxury,
              }}
            />

            <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-20">
              <motion.div
                className="space-y-8"
                variants={staggerContainers.standard}
              >
                {promise.experience.map((line, index) => (
                  <motion.div key={index} variants={iggyAnimations.fadeInUp}>
                    <IggyTypography
                      variant="heading-lg"
                      font="primary"
                      color="primary"
                      italic={index === promise.experience.length - 1}
                      tracking="wide"
                      leading="relaxed"
                      weight="normal"
                      className="text-center"
                    >
                      {line}
                    </IggyTypography>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div className="text-center" variants={iggyAnimations.fadeIn}>
          <IggyDivider
            variant="line"
            width="sm"
            color="medium"
            thickness="hairline"
            delay="md"
            className="mx-auto mb-8"
          />

          <IggyTypography
            variant="body-lg"
            font="primary"
            color="tertiary"
            italic
            tracking="widest"
            className="text-center"
          >
            {signature}
          </IggyTypography>
        </motion.div>
      </motion.div>

      {/* Section Transition */}
      <motion.div
        className="mt-24 lg:mt-32 flex justify-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfigs.standard}
        transition={{
          duration: iggyTokens.animations.duration.cinematic,
          delay: iggyTokens.animations.delay.lg,
          ease: iggyTokens.animations.easing.luxury,
        }}
      >
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.1 }}
          transition={{
            duration: iggyTokens.animations.duration.normal,
            ease: iggyTokens.animations.easing.luxury,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: iggyTokens.colors.border.subtle }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: iggyTokens.colors.border.medium }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: iggyTokens.colors.border.subtle }}
          />
        </motion.div>
      </motion.div>
    </IggySection>
  );
};

export default SacredPromise;
