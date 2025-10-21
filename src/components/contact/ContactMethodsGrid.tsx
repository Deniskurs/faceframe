"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Mail, Instagram, MapPin, MessageCircle } from "lucide-react";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";

interface ContactMethod {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  action: string;
  actionUrl: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    subtitle: "faceframe.byvil@gmail.com",
    description: "Direct communication for detailed inquiries. Response within 24 hours.",
    action: "Send Email",
    actionUrl: "mailto:faceframe.byvil@gmail.com",
    color: "from-elegant-mocha/10 to-deep-bronze/10",
  },
  {
    id: "instagram",
    icon: Instagram,
    title: "Instagram",
    subtitle: "@faceframe_beauty",
    description: "Follow the journey. See latest transformations and beauty insights.",
    action: "Visit Profile",
    actionUrl: "https://instagram.com/faceframe_beauty",
    color: "from-deep-bronze/10 to-warm-beige/20",
  },
  {
    id: "inperson",
    icon: MapPin,
    title: "In-Person",
    subtitle: "Two Intimate Studios",
    description: "Professional Studio (E2) and Private Studio (E3) in East London.",
    action: "View Studios",
    actionUrl: "#studios",
    color: "from-soft-blush/15 to-elegant-mocha/10",
  },
  {
    id: "form",
    icon: MessageCircle,
    title: "Direct Message",
    subtitle: "Consultation Request",
    description: "Fill out the form below for personalized consultation and booking.",
    action: "Go to Form",
    actionUrl: "#contact-form",
    color: "from-warm-beige/15 to-soft-blush/15",
  },
];

/**
 * ContactMethodsGrid - Four Paths to Connect
 * Interactive 2x2 grid of contact methods with luxury hover effects
 */
export function ContactMethodsGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-soft-blush/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-elegant-mocha/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-6xl relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
            Choose Your Path
          </h3>
          <div className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6" />
          <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350]">
            Four Ways to Connect
          </h2>
        </motion.div>

        {/* Grid of contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isHovered = hoveredCard === method.id;

            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  ease: LUXURY_EASING,
                  delay: index * 0.1,
                }}
                onHoverStart={() => setHoveredCard(method.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="relative overflow-hidden border border-elegant-mocha/15 bg-white shadow-sm hover:shadow-lg transition-all duration-700 group h-full">
                  {/* Gradient background that reveals on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  {/* CHANEL corner accents */}
                  <div className="absolute top-0 left-0 w-0 h-[0.5px] bg-deep-bronze/40 group-hover:w-8 transition-all duration-700 z-10" />
                  <div className="absolute top-0 left-0 w-[0.5px] h-0 bg-deep-bronze/40 group-hover:h-8 transition-all duration-700 z-10" />
                  <div className="absolute bottom-0 right-0 w-0 h-[0.5px] bg-deep-bronze/40 group-hover:w-8 transition-all duration-700 z-10" />
                  <div className="absolute bottom-0 right-0 w-[0.5px] h-0 bg-deep-bronze/40 group-hover:h-8 transition-all duration-700 z-10" />

                  <CardContent className="relative z-20 p-8 lg:p-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className="mb-6"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotate: isHovered ? 3 : 0,
                      }}
                      transition={{ duration: 0.6, ease: LUXURY_EASING }}
                    >
                      <div className="w-14 h-14 rounded-full bg-elegant-mocha/10 flex items-center justify-center group-hover:bg-elegant-mocha/20 transition-colors duration-700">
                        <Icon className="w-6 h-6 text-elegant-mocha" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-alice text-2xl tracking-[0.15em] text-elegant-mocha uppercase mb-2">
                          {method.title}
                        </h3>
                        <p className="font-alta text-deep-bronze/80 text-sm tracking-[0.06em]">
                          {method.subtitle}
                        </p>
                      </div>

                      {/* Animated dash */}
                      <motion.div
                        className="h-[0.5px] bg-elegant-mocha/30"
                        initial={{ width: "2rem" }}
                        animate={{ width: isHovered ? "3rem" : "2rem" }}
                        transition={{ duration: 0.6, ease: LUXURY_EASING }}
                      />

                      <p className="font-alta text-elegant-mocha/70 text-sm leading-relaxed tracking-[0.02em]">
                        {method.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                      transition={{ duration: 0.5, ease: LUXURY_EASING }}
                    >
                      <LuxuryShadcnButton
                        text={method.action}
                        href={method.actionUrl}
                        luxuryVariant="outline"
                        luxuryTheme="light"
                        luxurySize="small"
                        className="w-full"
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
