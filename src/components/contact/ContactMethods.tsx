"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Facebook, Calendar } from "lucide-react";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";

const ContactMethods = () => {
  const contactMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email",
      description: "Get a personalized response within 24 hours",
      action: "faceframe.byvil@gmail.com",
      href: "mailto:faceframe.byvil@gmail.com",
      external: false,
    },
    {
      id: "instagram",
      icon: Instagram,
      title: "Instagram",
      description: "Follow for daily inspiration and beauty transformations",
      action: "@faceframe_beauty",
      href: "https://instagram.com/faceframe_beauty",
      external: true,
    },
    {
      id: "facebook",
      icon: Facebook,
      title: "Facebook",
      description: "Connect with our community and see client reviews",
      action: "FaceFrameBeauty",
      href: "https://facebook.com/FaceFrameBeauty",
      external: true,
    },
  ];

  return (
    <FadeInSection intensity="subtle">
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <h2 className="font-alice text-3xl md:text-4xl text-elegant-mocha mb-4 tracking-[0.2em] uppercase">
              Ways to Connect
            </h2>
            <p className="font-alta text-base text-elegant-mocha/70 max-w-2xl mx-auto tracking-wide">
              Choose your preferred method to reach out
            </p>
            <div className="w-16 h-[0.5px] bg-elegant-mocha/20 mx-auto mt-6"></div>
          </motion.div>

          {/* Contact Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.a
                  key={method.id}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="group block"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                >
                  <div className="relative border border-elegant-mocha/10 p-8 bg-light-cream/30 transition-all duration-700 hover:border-elegant-mocha/30 hover:shadow-lg h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-full bg-elegant-mocha/10 flex items-center justify-center group-hover:bg-elegant-mocha/20 transition-all duration-700">
                        <IconComponent className="w-6 h-6 text-elegant-mocha" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-alice text-xl text-elegant-mocha mb-3 tracking-[0.15em] uppercase">
                      {method.title}
                    </h3>

                    {/* Description */}
                    <p className="font-alta text-sm text-elegant-mocha/70 mb-4 flex-grow">
                      {method.description}
                    </p>

                    {/* Action Link */}
                    <div className="pt-4 border-t border-elegant-mocha/10">
                      <p className="font-alta text-sm text-elegant-mocha font-medium group-hover:text-deep-bronze transition-colors duration-300">
                        {method.action} →
                      </p>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-elegant-mocha group-hover:w-full transition-all duration-700"></div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Direct Booking CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <div className="inline-block border border-elegant-mocha/20 p-8 bg-light-cream/50">
              <Calendar className="w-8 h-8 text-elegant-mocha mx-auto mb-4" />
              <h3 className="font-alice text-xl text-elegant-mocha mb-3 tracking-[0.15em] uppercase">
                Ready to Book?
              </h3>
              <p className="font-alta text-sm text-elegant-mocha/70 mb-6 max-w-md">
                Skip the wait and book your appointment directly through our booking system
              </p>
              <LuxuryShadcnButton
                href="/booking"
                text="BOOK NOW"
                luxuryVariant="elegant"
                luxuryTheme="light"
                luxurySize="medium"
                enableMobilePatternInterrupt={true}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ContactMethods;
