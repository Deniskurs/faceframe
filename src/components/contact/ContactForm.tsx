"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { CheckCircle2, AlertCircle } from "lucide-react";
import GlassMorphicCard from "@/components/shared/GlassMorphicCard";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  service?: string;
}

const services = [
  { value: "semi-permanent-makeup", label: "Semi-Permanent Makeup" },
  { value: "microblading", label: "Microblading" },
  { value: "lash-extensions", label: "Lash Extensions" },
  { value: "lash-lift-tint", label: "Lash Lift & Tint" },
  { value: "brow-styling", label: "Brow Styling" },
  { value: "luxury-facials", label: "Luxury Facials" },
  { value: "consultation", label: "Consultation" },
  { value: "other", label: "Other" },
];

/**
 * ContactForm - The Consultation Request
 * Luxury form with glass morphism, floating labels, and elegant validation
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const messageMaxLength = 500;
  const messageLength = formData.message.length;

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you! Your message has been sent. I'll respond within 24 hours.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 lg:py-32 bg-light-cream relative overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-light-cream to-white opacity-70 pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-2xl relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASING }}
        >
          <h3 className="font-alta text-sm tracking-luxury text-deep-bronze/80 uppercase mb-3">
            Request Consultation
          </h3>
          <div className="w-16 h-[0.5px] bg-elegant-mocha/25 mx-auto mb-6" />
          <h2 className="font-alice text-3xl sm:text-4xl lg:text-5xl tracking-luxury text-elegant-mocha uppercase font-[350]">
            Let&apos;s Begin
          </h2>
        </motion.div>

        {/* Glass morphic form card */}
        <GlassMorphicCard
          intensity="medium"
          className="rounded-sm p-8 lg:p-12"
          animateOnScroll
          decorativeElement="corner-line"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
                >
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={`bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.04em] transition-all duration-500 ${
                    errors.firstName ? "border-red-400" : ""
                  }`}
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs font-alta tracking-[0.04em] mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
                >
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={`bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.04em] transition-all duration-500 ${
                    errors.lastName ? "border-red-400" : ""
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs font-alta tracking-[0.04em] mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.04em] transition-all duration-500 ${
                  errors.email ? "border-red-400" : ""
                }`}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-alta tracking-[0.04em] mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone (optional) */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
              >
                Phone <span className="text-elegant-mocha/50">(Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.04em] transition-all duration-500"
                placeholder="+44 20 1234 5678"
              />
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label
                htmlFor="service"
                className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
              >
                Service Interest *
              </Label>
              <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                <SelectTrigger
                  id="service"
                  className={`bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.04em] transition-all duration-500 ${
                    errors.service ? "border-red-400" : ""
                  }`}
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-white border-elegant-mocha/20">
                  {services.map((service) => (
                    <SelectItem
                      key={service.value}
                      value={service.value}
                      className="font-alta tracking-[0.04em]"
                    >
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="text-red-500 text-xs font-alta tracking-[0.04em] mt-1">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="message"
                  className="font-alta text-elegant-mocha tracking-[0.08em] text-sm uppercase"
                >
                  Message <span className="text-elegant-mocha/50">(Optional)</span>
                </Label>
                <span className="text-xs font-alta text-elegant-mocha/50 tracking-[0.04em]">
                  {messageLength}/{messageMaxLength}
                </span>
              </div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value.slice(0, messageMaxLength))}
                className="bg-white/80 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] min-h-[120px] transition-all duration-500 resize-none"
                placeholder="Tell me about your beauty goals, preferred dates, or any questions..."
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <LuxuryShadcnButton
                text={isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                luxuryVariant="elegant"
                luxuryTheme="dark"
                luxurySize="large"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>

            {/* Success/Error messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              >
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription className="font-alta tracking-[0.02em] text-sm">
                    {submitMessage}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              >
                <Alert className="bg-red-50 border-red-200 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-alta tracking-[0.02em] text-sm">
                    {submitMessage}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </form>
        </GlassMorphicCard>
      </div>
    </section>
  );
}
