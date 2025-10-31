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
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { CheckCircle2, AlertCircle, Send, MessagesSquare, Calendar, Sparkles } from "lucide-react";

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

const processSteps = [
  {
    number: "01",
    title: "Contact",
    description: "We respond within 24h",
    icon: Send,
  },
  {
    number: "02",
    title: "Consultation",
    description: "Discuss your beauty goals",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "Booking",
    description: "Reserve your session",
    icon: Calendar,
  },
  {
    number: "04",
    title: "Transform",
    description: "Experience FaceFrame",
    icon: Sparkles,
  },
];

/**
 * ContactFormWithProcess - Combined Form and Process Timeline
 * 2-column layout: Form (60%) | Process (40%) on desktop, stacked on mobile
 */
export function ContactFormWithProcess() {
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
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact-form" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        {/* Section title */}
        <SectionTitle
          title="LET'S BEGIN"
          subtitle="Request Consultation"
          variant="dark"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
          {/* LEFT SIDE - Contact Form (60%) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.1 }}
          >
            <div className="bg-white rounded-sm p-6 sm:p-8 lg:p-10 border border-elegant-mocha/10">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                    >
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className={`bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] h-11 sm:h-10 text-base ${
                        errors.firstName ? "border-red-400" : ""
                      }`}
                      placeholder="Jane"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs sm:text-sm font-alta tracking-[0.02em]">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                    >
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] h-11 sm:h-10 text-base ${
                        errors.lastName ? "border-red-400" : ""
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs sm:text-sm font-alta tracking-[0.02em]">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] h-11 sm:h-10 text-base ${
                      errors.email ? "border-red-400" : ""
                    }`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm font-alta tracking-[0.02em]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                  >
                    Phone <span className="text-elegant-mocha/50">(Optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] h-11 sm:h-10 text-base"
                    placeholder="+44 20 1234 5678"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label
                    htmlFor="service"
                    className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                  >
                    Service Interest *
                  </Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                    <SelectTrigger
                      id="service"
                      className={`bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] h-11 sm:h-10 text-base ${
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
                          className="font-alta tracking-[0.02em] text-base"
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-500 text-xs sm:text-sm font-alta tracking-[0.02em]">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="message"
                      className="font-alta text-elegant-mocha tracking-[0.04em] text-sm uppercase"
                    >
                      Message <span className="text-elegant-mocha/50">(Optional)</span>
                    </Label>
                    <span className="text-xs font-alta text-elegant-mocha/50 tracking-[0.02em]">
                      {messageLength}/{messageMaxLength}
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value.slice(0, messageMaxLength))}
                    className="bg-light-cream/30 border-elegant-mocha/20 focus:border-elegant-mocha font-alta tracking-[0.02em] min-h-[140px] sm:min-h-[120px] resize-none text-base"
                    placeholder="Tell me about your beauty goals, preferred dates, or any questions..."
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
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
                    transition={{ duration: 0.4, ease: LUXURY_EASING }}
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
                    transition={{ duration: 0.4, ease: LUXURY_EASING }}
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
            </div>
          </motion.div>

          {/* RIGHT SIDE - Process Timeline (40%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: LUXURY_EASING, delay: 0.2 }}
          >
            <div className="bg-white rounded-sm p-8 border border-elegant-mocha/10 h-full">
              <h3 className="font-alta text-sm tracking-wide text-deep-bronze/80 uppercase mb-6">
                What Happens Next
              </h3>
              <div className="space-y-6">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-elegant-mocha/10 flex items-center justify-center border border-elegant-mocha/20 relative">
                          <Icon className="w-5 h-5 text-elegant-mocha" />
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-deep-bronze text-white flex items-center justify-center font-alta text-[9px] tracking-wider">
                            {step.number}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-alice text-lg tracking-wide text-elegant-mocha uppercase mb-1">
                          {step.title}
                        </h4>
                        <p className="font-alice text-base text-elegant-mocha/70 leading-relaxed tracking-wide">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-elegant-mocha/10">
                <p className="font-alta text-elegant-mocha/60 text-xs tracking-[0.02em] leading-relaxed">
                  Every step is designed to ensure your comfort, confidence, and complete satisfaction.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
