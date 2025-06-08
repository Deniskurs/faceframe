/**
 * TransformationManifesto Component
 *
 * Core message section that communicates Iggy's transformation philosophy
 * with powerful typography and emotional storytelling.
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
import { TransformationManifestoProps } from "../design/types";

const TransformationManifesto: React.FC<TransformationManifestoProps> = ({
  title = {
    negative: [
      "This is not about",
      "changing who you are.",
      "This is not about",
      "becoming someone else.",
      "This is not about",
      "perfection or pretense.",
    ],
    positive: "This is about coming home to yourself.",
  },
  journey = {
    destinations: [
      "Confidence that radiates from within",
      "Beauty that honors your authentic self",
      "Artistry that tells your unique story",
      "Transformation that feels like remembering",
    ],
    description:
      "Every session is a sacred journey of self-discovery, where makeup becomes the bridge between who you've always been and who you're ready to become.",
  },
  spacing = "xl",
  background = "accent",
  className,
  ...props
}) => {
  return (
    <IggySection
      spacing={spacing}
      background={background}
      maxWidth="xl"
      centerContent
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={staggerContainers.dramatic}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfigs.editorial}
      >
        {/* Negative Statements */}
        <motion.div
          className="mb-20 lg:mb-28"
          variants={staggerContainers.editorial}
        >
          {title.negative.map((line, index) => (
            <motion.div
              key={index}
              variants={iggyAnimations.fadeInUp}
              className="mb-4 lg:mb-6"
            >
              <IggyTypography
                variant="heading-sm"
                font="secondary"
                color="tertiary"
                tracking="wide"
                leading="relaxed"
                weight="normal"
                className={cn(
                  "opacity-80",
                  index % 2 === 0
                    ? "text-left lg:text-left"
                    : "text-right lg:text-right",
                  // Add subtle italic styling to every third line
                  (index + 1) % 3 === 0 && "italic"
                )}
              >
                {line}
              </IggyTypography>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={iggyAnimations.scaleIn}
          className="mb-20 lg:mb-28"
        >
          <IggyDivider
            variant="dot"
            width="xl"
            color="medium"
            thickness="thin"
            delay="lg"
            duration="cinematic"
          />
        </motion.div>

        {/* Positive Statement */}
        <motion.div
          className="mb-24 lg:mb-32"
          variants={iggyAnimations.editorialEntry}
        >
          <div className="relative">
            {/* Background Accent */}
            <motion.div
              className="absolute inset-0 -mx-8 -my-16 lg:-mx-16 lg:-my-24 rounded-2xl"
              style={{
                backgroundColor: iggyTokens.colors.background.primary,
                border: `2px solid ${iggyTokens.colors.border.subtle}`,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportConfigs.standard}
              transition={{
                duration: iggyTokens.animations.duration.cinematic,
                delay: iggyTokens.animations.delay.md,
                ease: iggyTokens.animations.easing.luxury,
              }}
            />

            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
              <IggyTypography
                variant="display-sm"
                font="primary"
                color="primary"
                italic
                tracking="wide"
                leading="tight"
                weight="normal"
                className="mb-12"
              >
                &ldquo;{title.positive}&rdquo;
              </IggyTypography>

              {/* Decorative Quote Marks */}
              <motion.div
                className="absolute top-4 left-4 lg:top-8 lg:left-8"
                style={{ color: iggyTokens.colors.border.medium }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.xl,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              >
                <IggyTypography
                  variant="display-md"
                  font="primary"
                  color="tertiary"
                  className="opacity-30"
                >
                  &ldquo;
                </IggyTypography>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8"
                style={{ color: iggyTokens.colors.border.medium }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.slow,
                  delay: iggyTokens.animations.delay.xl + 0.2,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              >
                <IggyTypography
                  variant="display-md"
                  font="primary"
                  color="tertiary"
                  className="opacity-30"
                >
                  &rdquo;
                </IggyTypography>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          className="space-y-16 lg:space-y-20"
          variants={staggerContainers.standard}
        >
          {/* Journey Destinations */}
          <motion.div variants={iggyAnimations.fadeInUp}>
            <IggyTypography
              variant="heading-md"
              font="primary"
              color="secondary"
              tracking="xl"
              leading="relaxed"
              weight="normal"
              className="mb-12 lg:mb-16"
            >
              Together, we journey toward:
            </IggyTypography>

            <motion.div
              className="grid sm:grid-cols-2 gap-8 lg:gap-12"
              variants={staggerContainers.fast}
            >
              {journey.destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  variants={iggyAnimations.scaleIn}
                  className="relative"
                >
                  <div
                    className="p-8 lg:p-10 rounded-lg border"
                    style={{
                      backgroundColor: iggyTokens.colors.background.primary,
                      borderColor: iggyTokens.colors.border.subtle,
                    }}
                  >
                    {/* Destination Number */}
                    <motion.div
                      className="absolute -top-6 -left-6 w-12 h-12 rounded-full flex items-center justify-center border-2"
                      style={{
                        backgroundColor: iggyTokens.colors.background.accent,
                        borderColor: iggyTokens.colors.border.medium,
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={viewportConfigs.standard}
                      transition={{
                        duration: iggyTokens.animations.duration.slow,
                        delay: iggyTokens.animations.delay.sm + index * 0.1,
                        ease: iggyTokens.animations.easing.luxury,
                      }}
                    >
                      <IggyTypography
                        variant="body-sm"
                        font="secondary"
                        color="secondary"
                        weight="medium"
                        tracking="normal"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </IggyTypography>
                    </motion.div>

                    <IggyTypography
                      variant="body-md"
                      font="secondary"
                      color="secondary"
                      leading="relaxed"
                      tracking="wide"
                      className="text-center"
                    >
                      {destination}
                    </IggyTypography>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Journey Description */}
          <motion.div
            variants={iggyAnimations.fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <IggyDivider
              variant="line"
              width="md"
              color="medium"
              thickness="hairline"
              delay="md"
              className="mx-auto mb-12"
            />

            <IggyTypography
              variant="body-lg"
              font="primary"
              color="primary"
              italic
              tracking="wide"
              leading="relaxed"
              className="text-center"
            >
              {journey.description}
            </IggyTypography>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section Transition */}
      <motion.div
        className="mt-24 lg:mt-32 flex justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportConfigs.standard}
        transition={{
          duration: iggyTokens.animations.duration.cinematic,
          delay: iggyTokens.animations.delay.lg,
          ease: iggyTokens.animations.easing.luxury,
        }}
      >
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.1,
            rotate: 360,
          }}
          transition={{
            duration: iggyTokens.animations.duration.cinematic,
            ease: iggyTokens.animations.easing.luxury,
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: iggyTokens.colors.border.medium }}
          />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full border-2 opacity-50"
            style={{ borderColor: iggyTokens.colors.border.medium }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </IggySection>
  );
};

export default TransformationManifesto;
