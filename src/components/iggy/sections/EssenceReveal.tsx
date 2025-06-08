/**
 * EssenceReveal Component
 *
 * Emotional opening section that reveals Iggy's authentic essence
 * through carefully crafted storytelling and professional design.
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
import { EssenceRevealProps } from "../design/types";

const EssenceReveal: React.FC<EssenceRevealProps> = ({
  greeting = "Hello, beautiful soul...",
  openingLines = [
    "I'm Iggy, and I believe that true beauty isn't found in perfection—",
    "it's discovered in the quiet moments of authentic self-expression,",
    "in the way light catches your eyes when you finally see yourself",
    "the way you were always meant to be seen.",
  ],
  emotionalCore = {
    statement: "Beauty is not a destination. It's a homecoming.",
    details: [
      "After years of working with incredible women from all walks of life,",
      "I've learned that makeup isn't about transformation—it's about revelation.",
      "It's about creating space for your truest self to emerge,",
      "honoring the light that has always lived within you.",
    ],
  },
  image = {
    src: "/images/brand/IMG_5460.webp",
    alt: "Iggy in her creative space",
    caption: "In my element, creating beauty",
  },
  spacing = "lg",
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
        className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        variants={staggerContainers.editorial}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfigs.editorial}
      >
        {/* Content Column */}
        <motion.div
          className="space-y-12 lg:space-y-16"
          variants={iggyAnimations.fadeInUp}
        >
          {/* Greeting */}
          <motion.div variants={iggyAnimations.fadeInUp}>
            <IggyTypography
              variant="heading-lg"
              font="primary"
              color="primary"
              italic
              tracking="wide"
              leading="relaxed"
              className="mb-8"
            >
              {greeting}
            </IggyTypography>

            <IggyDivider
              variant="line"
              width="sm"
              color="medium"
              thickness="hairline"
              delay="sm"
            />
          </motion.div>

          {/* Opening Lines */}
          <motion.div
            className="space-y-6"
            variants={staggerContainers.standard}
          >
            {openingLines.map((line, index) => (
              <motion.div key={index} variants={iggyAnimations.fadeInUp}>
                <IggyTypography
                  variant="body-md"
                  font="secondary"
                  color="secondary"
                  leading="relaxed"
                  tracking="wide"
                >
                  {line}
                </IggyTypography>
              </motion.div>
            ))}
          </motion.div>

          {/* Emotional Core Statement */}
          <motion.div className="relative" variants={iggyAnimations.scaleIn}>
            <div className="relative px-8 py-12 lg:px-12 lg:py-16">
              {/* Background accent */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundColor: iggyTokens.colors.background.accent,
                  borderLeft: `4px solid ${iggyTokens.colors.border.medium}`,
                }}
              />

              <div className="relative z-10">
                <IggyTypography
                  variant="heading-md"
                  font="primary"
                  color="primary"
                  italic
                  tracking="wide"
                  leading="snug"
                  className="mb-8"
                >
                  &ldquo;{emotionalCore.statement}&rdquo;
                </IggyTypography>

                <motion.div
                  className="space-y-4"
                  variants={staggerContainers.fast}
                >
                  {emotionalCore.details.map((detail, index) => (
                    <motion.div key={index} variants={iggyAnimations.fadeIn}>
                      <IggyTypography
                        variant="body-sm"
                        font="secondary"
                        color="tertiary"
                        leading="relaxed"
                        tracking="normal"
                      >
                        {detail}
                      </IggyTypography>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Column */}
        <motion.div className="relative" variants={iggyAnimations.fadeInUp}>
          <div className="relative">
            <IggyImage
              src={image.src}
              alt={image.alt}
              aspectRatio="portrait"
              quality={95}
              objectFit="cover"
              objectPosition="center"
              border
              shadow="editorial"
              className="w-full"
              delay="md"
            />

            {/* Image Caption */}
            {image.caption && (
              <motion.div
                className="absolute -bottom-8 left-0 right-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfigs.standard}
                transition={{
                  duration: iggyTokens.animations.duration.normal,
                  delay: iggyTokens.animations.delay.lg,
                  ease: iggyTokens.animations.easing.luxury,
                }}
              >
                <IggyTypography
                  variant="body-xs"
                  font="secondary"
                  color="subtle"
                  italic
                  tracking="wide"
                  className="text-center"
                >
                  {image.caption}
                </IggyTypography>
              </motion.div>
            )}
          </div>

          {/* Decorative Element */}
          <motion.div
            className="absolute -top-8 -right-8 w-32 h-32 opacity-20"
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={viewportConfigs.standard}
            transition={{
              duration: iggyTokens.animations.duration.cinematic,
              delay: iggyTokens.animations.delay.xl,
              ease: iggyTokens.animations.easing.luxury,
            }}
          >
            <div
              className="w-full h-full border-2 rounded-full"
              style={{ borderColor: iggyTokens.colors.border.subtle }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section Transition */}
      <motion.div
        className="mt-24 lg:mt-32 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportConfigs.standard}
        transition={{
          duration: iggyTokens.animations.duration.slow,
          delay: iggyTokens.animations.delay.xl,
          ease: iggyTokens.animations.easing.luxury,
        }}
      >
        <IggyDivider
          variant="dot"
          width="md"
          color="subtle"
          thickness="hairline"
          animate={false}
        />
      </motion.div>
    </IggySection>
  );
};

export default EssenceReveal;
