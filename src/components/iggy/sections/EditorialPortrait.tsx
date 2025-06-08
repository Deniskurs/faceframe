/**
 * EditorialPortrait Component
 *
 * Single, focused image treatment with editorial styling.
 * Designed for perfect mobile flow and professional presentation.
 */

"use client";

import React from "react";
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
import { EditorialPortraitProps } from "../design/types";

const EditorialPortrait: React.FC<EditorialPortraitProps> = ({
  image = {
    src: "/images/gallery/image23.webp",
    alt: "Iggy's artistic vision",
    caption: "Every face tells a story. Every story deserves to be honored.",
  },
  quote = {
    text: "I don't believe in creating someone new. I believe in revealing who you've always been.",
    lines: [
      "In my years as a makeup artist, I've discovered that true artistry",
      "isn't about following trends or applying formulas.",
      "It's about listening deeply to each person's unique essence",
      "and creating space for their authentic beauty to emerge.",
    ],
    signature: "— Iggy",
  },
  manifesto = {
    statement: "Authenticity is the ultimate luxury.",
    details: [
      "Every brushstroke is intentional.",
      "Every color choice is meaningful.",
      "Every moment together is sacred.",
      "This is more than makeup—it's a homecoming to yourself.",
    ],
  },
  spacing = "xl",
  background = "primary",
  className,
  ...props
}) => {
  return (
    <IggySection
      spacing={spacing}
      background={background}
      maxWidth="full"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Single Editorial Image - Mobile Optimized */}
      <motion.div
        className="relative max-w-4xl mx-auto mb-16 lg:mb-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportConfigs.editorial}
        transition={{
          duration: iggyTokens.animations.duration.cinematic,
          ease: iggyTokens.animations.easing.luxury,
        }}
      >
        <div className="relative">
          <IggyImage
            src={image.src}
            alt={image.alt}
            aspectRatio="landscape"
            quality={98}
            priority
            objectFit="cover"
            objectPosition="center"
            shadow="editorial"
            overlay={{
              type: "gradient",
              color: "primary",
              opacity: 0.05,
            }}
            className="w-full"
          />

          {/* Image Caption Overlay */}
          {image.caption && (
            <motion.div
              className="absolute bottom-8 left-8 right-8 lg:bottom-12 lg:left-12 lg:right-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfigs.standard}
              transition={{
                duration: iggyTokens.animations.duration.slow,
                delay: iggyTokens.animations.delay.lg,
                ease: iggyTokens.animations.easing.luxury,
              }}
            >
              <div
                className="backdrop-blur-sm rounded-lg p-4 lg:p-6"
                style={{
                  backgroundColor: iggyTokens.colors.background.primary + "90", // 90% opacity
                  border: `1px solid ${iggyTokens.colors.border.subtle}`,
                }}
              >
                <IggyTypography
                  variant="body-sm"
                  font="primary"
                  color="secondary"
                  italic
                  tracking="wide"
                  leading="relaxed"
                  className="text-center"
                >
                  {image.caption}
                </IggyTypography>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"
          variants={staggerContainers.editorial}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfigs.standard}
        >
          {/* Quote Column */}
          <motion.div className="space-y-12" variants={iggyAnimations.fadeInUp}>
            {/* Main Quote */}
            <motion.div variants={iggyAnimations.scaleIn}>
              <IggyTypography
                variant="heading-lg"
                font="primary"
                color="primary"
                italic
                tracking="wide"
                leading="snug"
                className="mb-8"
              >
                &ldquo;{quote.text}&rdquo;
              </IggyTypography>

              <IggyDivider
                variant="line"
                width="lg"
                color="medium"
                thickness="thin"
                delay="md"
              />
            </motion.div>

            {/* Quote Details */}
            <motion.div
              className="space-y-6"
              variants={staggerContainers.standard}
            >
              {quote.lines.map((line, index) => (
                <motion.div key={index} variants={iggyAnimations.fadeInUp}>
                  <IggyTypography
                    variant="body-md"
                    font="secondary"
                    color="secondary"
                    leading="relaxed"
                    tracking="normal"
                  >
                    {line}
                  </IggyTypography>
                </motion.div>
              ))}
            </motion.div>

            {/* Signature */}
            {quote.signature && (
              <motion.div variants={iggyAnimations.fadeIn} className="pt-8">
                <IggyTypography
                  variant="body-md"
                  font="primary"
                  color="tertiary"
                  italic
                  tracking="widest"
                  className="text-right"
                >
                  {quote.signature}
                </IggyTypography>
              </motion.div>
            )}
          </motion.div>

          {/* Manifesto Column */}
          <motion.div className="space-y-12" variants={iggyAnimations.fadeInUp}>
            {/* Manifesto Statement */}
            <motion.div
              className="relative"
              variants={iggyAnimations.editorialEntry}
            >
              <div className="relative p-12 lg:p-16">
                {/* Background */}
                <div
                  className="absolute inset-0 rounded-lg border-2"
                  style={{
                    backgroundColor: iggyTokens.colors.background.subtle,
                    borderColor: iggyTokens.colors.border.subtle,
                  }}
                />

                <div className="relative z-10 text-center">
                  <IggyTypography
                    variant="heading-md"
                    font="primary"
                    color="primary"
                    tracking="xl"
                    leading="tight"
                    weight="normal"
                    className="mb-12"
                  >
                    {manifesto.statement}
                  </IggyTypography>

                  <IggyDivider
                    variant="dot"
                    width="sm"
                    color="medium"
                    thickness="hairline"
                    animate={false}
                    className="mx-auto mb-12"
                  />

                  <motion.div
                    className="space-y-8"
                    variants={staggerContainers.fast}
                  >
                    {manifesto.details.map((detail, index) => (
                      <motion.div key={index} variants={iggyAnimations.fadeIn}>
                        <IggyTypography
                          variant="body-sm"
                          font="secondary"
                          color="tertiary"
                          leading="relaxed"
                          tracking="wide"
                          className="text-center"
                        >
                          {detail}
                        </IggyTypography>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 opacity-30"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={viewportConfigs.standard}
                  transition={{
                    duration: iggyTokens.animations.duration.slow,
                    delay: iggyTokens.animations.delay.xl,
                    ease: iggyTokens.animations.easing.luxury,
                  }}
                />
                <motion.div
                  className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 opacity-30"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={viewportConfigs.standard}
                  transition={{
                    duration: iggyTokens.animations.duration.slow,
                    delay: iggyTokens.animations.delay.xl + 0.1,
                    ease: iggyTokens.animations.easing.luxury,
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 opacity-30"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={viewportConfigs.standard}
                  transition={{
                    duration: iggyTokens.animations.duration.slow,
                    delay: iggyTokens.animations.delay.xl + 0.2,
                    ease: iggyTokens.animations.easing.luxury,
                  }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 opacity-30"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.3, scale: 1 }}
                  viewport={viewportConfigs.standard}
                  transition={{
                    duration: iggyTokens.animations.duration.slow,
                    delay: iggyTokens.animations.delay.xl + 0.3,
                    ease: iggyTokens.animations.easing.luxury,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section Transition */}
      <motion.div
        className="mt-24 lg:mt-32 flex justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfigs.standard}
        transition={{
          duration: iggyTokens.animations.duration.slow,
          delay: iggyTokens.animations.delay.lg,
          ease: iggyTokens.animations.easing.luxury,
        }}
      >
        <IggyDivider
          variant="gradient"
          width="xl"
          color="subtle"
          thickness="hairline"
          animate={false}
        />
      </motion.div>
    </IggySection>
  );
};

export default EditorialPortrait;
