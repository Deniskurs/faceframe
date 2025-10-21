"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Clock, Instagram, Facebook } from "lucide-react";
import FadeInSection from "@/components/shared/FadeInSection";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

const ContactHub = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll respond within 24 hours.",
          duration: 5000,
        });
        reset();
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: result.error || "Please try again or contact us directly via email.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Unable to send your message. Please try again or email us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in Touch
            </h2>
            <div className="w-16 h-[0.5px] bg-elegant-mocha/20 mx-auto"></div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    First Name <span className="text-deep-bronze">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName", { required: "First name is required" })}
                    className="font-alta text-elegant-mocha"
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-deep-bronze mt-1 font-alta">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    Last Name <span className="text-deep-bronze">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName", { required: "Last name is required" })}
                    className="font-alta text-elegant-mocha"
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-deep-bronze mt-1 font-alta">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    Email Address <span className="text-deep-bronze">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="font-alta text-elegant-mocha"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-deep-bronze mt-1 font-alta">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="font-alta text-elegant-mocha"
                    placeholder="+44 7700 900000"
                  />
                </div>

                {/* Service Interest */}
                <div>
                  <Label htmlFor="service" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    Service Interest <span className="text-deep-bronze">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("service", value)}
                  >
                    <SelectTrigger className="font-alta text-elegant-mocha">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semi-permanent-makeup">Semi-Permanent Makeup</SelectItem>
                      <SelectItem value="microblading">Microblading</SelectItem>
                      <SelectItem value="lash-extensions">Lash Extensions</SelectItem>
                      <SelectItem value="lash-lift-tint">Lash Lift & Tint</SelectItem>
                      <SelectItem value="brow-styling">Brow Styling</SelectItem>
                      <SelectItem value="luxury-facials">Luxury Facials</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-xs text-deep-bronze mt-1 font-alta">{errors.service.message}</p>
                  )}
                  <input
                    type="hidden"
                    {...register("service", { required: "Please select a service" })}
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="font-alta text-sm text-elegant-mocha tracking-wide mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    className="font-alta text-elegant-mocha min-h-[120px]"
                    placeholder="Tell me about your beauty goals or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <LuxuryShadcnButton
                    type="submit"
                    text="SEND MESSAGE"
                    luxuryVariant="elegant"
                    luxuryTheme="light"
                    luxurySize="large"
                    className="w-full justify-center"
                    isLoading={isSubmitting}
                  />
                </div>
              </form>
            </motion.div>

            {/* Right Column - Quick Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              {/* Quick Info Card */}
              <div className="border border-elegant-mocha/10 p-8 bg-light-cream/30">
                <h3 className="font-alice text-xl text-elegant-mocha mb-6 tracking-[0.15em] uppercase">
                  Quick Information
                </h3>

                {/* Response Time */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-elegant-mocha/10">
                  <Clock className="w-5 h-5 text-elegant-mocha flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-alta text-sm text-elegant-mocha font-medium mb-1">Response Time</p>
                    <p className="font-alta text-sm text-elegant-mocha/70">Within 24 hours</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-elegant-mocha/10">
                  <Mail className="w-5 h-5 text-elegant-mocha flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-alta text-sm text-elegant-mocha font-medium mb-1">Email</p>
                    <a
                      href="mailto:faceframe.byvil@gmail.com"
                      className="font-alta text-sm text-elegant-mocha/70 hover:text-elegant-mocha transition-colors duration-300"
                    >
                      faceframe.byvil@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <p className="font-alta text-sm text-elegant-mocha font-medium mb-3">Connect on Social Media</p>

                  <a
                    href="https://instagram.com/faceframe_beauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-elegant-mocha/10 hover:border-elegant-mocha/30 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5 text-elegant-mocha" />
                    <span className="font-alta text-sm text-elegant-mocha">@faceframe_beauty</span>
                  </a>

                  <a
                    href="https://facebook.com/FaceFrameBeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-elegant-mocha/10 hover:border-elegant-mocha/30 transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5 text-elegant-mocha" />
                    <span className="font-alta text-sm text-elegant-mocha">FaceFrameBeauty</span>
                  </a>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="border border-elegant-mocha/10 p-8 bg-light-cream/30">
                <h3 className="font-alice text-xl text-elegant-mocha mb-6 tracking-[0.15em] uppercase">
                  Business Hours
                </h3>
                <div className="space-y-3 font-alta text-sm">
                  <div className="flex justify-between">
                    <span className="text-elegant-mocha/70">Monday</span>
                    <span className="text-elegant-mocha font-medium">Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elegant-mocha/70">Tuesday - Saturday</span>
                    <span className="text-elegant-mocha font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-elegant-mocha/70">Sunday</span>
                    <span className="text-elegant-mocha font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ContactHub;
