/**
 * EmotionalCTA Component
 *
 * Final call-to-action section that creates an emotional connection
 * and invites the user to take the next step in their beauty journey.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
import { EmotionalCTAProps } from "../design/types";

const EmotionalCTA: React.FC<EmotionalCTAProps> = ({
  headline = [
    "Your transformation begins",
    "with a single choice.",
    "The choice to honor",
    "your authentic beauty.",
  ],
  description = [
    "Behind every confident woman is a moment",
    "when she decided to see herself differently.",
    "This could be your moment.",
    "This could be your transformation.",
  ],
  button = {
    text: "Begin Your Journey",
    href: "/consultation",
    variant: "primary",
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
      maxWidth="xl"
      centerContent
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 border border-opacity-10 rounded-full"
          style={{ borderColor: iggyTokens.colors.border.subtle }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-48 h-48 border border-opacity-10 rounded-full"
          style={{ borderColor: iggyTokens.colors.border.subtle }}
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={staggerContainers.dramatic}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfigs.editorial}
      >
        {/* Headline Section */}
        <motion.div
          className="mb-16 lg:mb-20"
          variants={staggerContainers.editorial}
        >
          {headline.map((line, index) => (
            <motion.div
              key={index}
              variants={iggyAnimations.fadeInUp}
              className="mb-6 lg:mb-8"
            >
              <IggyTypography
                variant="display-sm"
                font="primary"
                color="primary"
                italic={index === headline.length - 1}
                tracking="wide"
                leading="snug"
                weight="normal"
                className={cn(
                  "text-center",
                  index === headline.length - 1 && "mt-8 lg:mt-12"
                )}
              >
                {line}
              </IggyTypography>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          variants={iggyAnimations.scaleIn}
          className="mb-16 lg:mb-20"
        >
          <motion.div
            className="flex items-center justify-center space-x-8"
            whileHover={{ scale: 1.1 }}
            transition={{
              duration: iggyTokens.animations.duration.normal,
              ease: iggyTokens.animations.easing.luxury,
            }}
          >
            <div
              className="w-16 h-px"
              style={{ backgroundColor: iggyTokens.colors.border.medium }}
            />
            <motion.div
              className="w-4 h-4 rounded-full border-2"
              style={{ borderColor: iggyTokens.colors.border.medium }}
              animate={{
                scale: [1, 1.3, 1],
                borderColor: [
                  iggyTokens.colors.border.medium,
                  iggyTokens.colors.border.strong,
                  iggyTokens.colors.border.medium,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div
              className="w-16 h-px"
              style={{ backgroundColor: iggyTokens.colors.border.medium }}
            />
          </motion.div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          className="mb-20 lg:mb-24"
          variants={staggerContainers.standard}
        >
          {description.map((line, index) => (
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
                className={cn(
                  "text-center",
                  index >= description.length - 2 && "italic font-medium"
                )}
              >
                {line}
              </IggyTypography>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={iggyAnimations.scaleIn}
          className="mb-16 lg:mb-20"
        >
          <Link href={button.href}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: iggyTokens.animations.duration.fast,
                ease: iggyTokens.animations.easing.luxury,
              }}
            >
              <div
                className="relative px-12 py-6 lg:px-16 lg:py-8 rounded-full border-2 overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor:
                    button.variant === "primary"
                      ? iggyTokens.colors.background.accent
                      : "transparent",
                  borderColor: iggyTokens.colors.border.strong,
                }}
              >
                {/* Hover Effect Background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: iggyTokens.colors.background.primary,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    duration: iggyTokens.animations.duration.normal,
                    ease: iggyTokens.animations.easing.luxury,
                  }}
                />

                <div className="relative z-10">
                  <IggyTypography
                    variant="heading-sm"
                    font="secondary"
                    color="primary"
                    tracking="xl"
                    weight="normal"
                    className="uppercase transition-colors duration-300 group-hover:text-elegant-mocha"
                  >
                    {button.text}
                  </IggyTypography>
                </div>

                {/* Decorative Corner Elements */}
                <motion.div
                  className="absolute top-2 right-2 w-3 h-3 border-t border-r opacity-50"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-3 h-3 border-b border-l opacity-50"
                  style={{ borderColor: iggyTokens.colors.border.medium }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Final Message */}
        <motion.div variants={iggyAnimations.fadeIn} className="relative">
          {/* Subtle Background Glow */}
          <motion.div
            className="absolute inset-0 -mx-16 -my-8 rounded-2xl blur-3xl opacity-20"
            style={{ backgroundColor: iggyTokens.colors.background.accent }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 px-8 py-8 lg:px-16 lg:py-12">
            <IggyTypography
              variant="body-md"
              font="primary"
              color="tertiary"
              italic
              tracking="widest"
              leading="relaxed"
              className="text-center opacity-80"
            >
              Your most beautiful self is waiting.
            </IggyTypography>

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfigs.standard}
              transition={{
                duration: iggyTokens.animations.duration.slow,
                delay: iggyTokens.animations.delay.lg,
                ease: iggyTokens.animations.easing.luxury,
              }}
            >
              <IggyDivider
                variant="dot"
                width="xs"
                color="subtle"
                thickness="hairline"
                animate={false}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </IggySection>
  );
};

export default EmotionalCTA;
