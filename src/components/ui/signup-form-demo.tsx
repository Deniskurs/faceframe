"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import validator from "validator";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceInterest: "",
    preferredTime: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Validation functions
  const validateName = (name: string, fieldName: "firstName" | "lastName") => {
    if (!name.trim()) {
      return "";
    }

    // Check for minimum length
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }

    // Check for maximum length
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s'\-]+$/;
    if (!nameRegex.test(name.trim())) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Check for suspicious patterns (repeated characters, numbers)
    const suspiciousPatterns = [
      /(.)\1{3,}/, // 4+ repeated characters
      /\d/, // numbers
      /[!@#$%^&*()_+={}[\]:;"<>,.?/\\|`~]/, // special characters except allowed ones
    ];

    if (suspiciousPatterns.some((pattern) => pattern.test(name))) {
      return "Please enter a valid name";
    }

    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return "";
    }

    // Basic format validation
    if (!validator.isEmail(email)) {
      return "Please enter a valid email address";
    }

    // Check for common disposable email domains (basic bot prevention)
    const disposableDomains = [
      "10minutemail.com",
      "tempmail.org",
      "guerrillamail.com",
      "mailinator.com",
      "yopmail.com",
      "throwaway.email",
    ];

    const domain = email.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      return "Please use a permanent email address";
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /^[a-z]+\d+@/, // common bot pattern: letters followed by numbers
      /^test\d*@/, // test emails
      /^spam\d*@/, // spam emails
      /^\d+@/, // emails starting with numbers only
    ];

    if (
      suspiciousPatterns.some((pattern) => pattern.test(email.toLowerCase()))
    ) {
      return "Please enter a valid personal email address";
    }

    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    let error = "";
    if (name === "firstName" || name === "lastName") {
      error = validateName(value, name as "firstName" | "lastName");
    } else if (name === "email") {
      error = validateEmail(value);
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phone) {
      return "";
    }

    if (isValidPhoneNumber(phone)) {
      return "";
    } else {
      return "Please enter a valid phone number for the selected country";
    }
  };

  const handlePhoneChange = (phone: string | undefined) => {
    const phoneValue = phone || "";
    setFormData({ ...formData, phone: phoneValue });

    // Validate phone number in real-time
    const error = validatePhoneNumber(phoneValue);
    setValidationErrors((prev) => ({
      ...prev,
      phone: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous states
    setSubmitError("");

    // Validate all fields before submission
    const errors = {
      firstName: validateName(formData.firstName, "firstName"),
      lastName: validateName(formData.lastName, "lastName"),
      email: validateEmail(formData.email),
      phone: validatePhoneNumber(formData.phone),
    };

    setValidationErrors(errors);

    // Check if there are any validation errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      return; // Don't submit if there are validation errors
    }

    // Additional required field checks
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      return; // Don't submit if required fields are empty
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_faceframetest";
      const autoReplyTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0ut5e7c";
      const businessTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_BUSINESS_TEMPLATE_ID || "template_pwwlrrd";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "DYk4lOm4x_ia_stx2";

      console.log("EmailJS Config:", { serviceId, autoReplyTemplateId, businessTemplateId, publicKey });

      // Prepare template parameters - matching your EmailJS templates exactly
      const templateParams = {
        email: formData.email, // ✅ Matches {{email}} in your EmailJS template "To Email" field
        from_name: `${formData.firstName} ${formData.lastName}`, // ✅ Matches {{from_name}} 
        phone: formData.phone || "Not provided",
        service_interest: formData.serviceInterest || "Not specified", 
        preferred_time: formData.preferredTime || "Not specified",
        message: formData.message || "No additional message"
      };

      console.log("Template Params:", templateParams);

      // Send auto-reply to client
      console.log("Sending auto-reply to client...");
      const autoReplyResult = await emailjs.send(
        serviceId, 
        autoReplyTemplateId, 
        templateParams,
        {
          publicKey: publicKey
        }
      );
      console.log("Auto-reply sent:", autoReplyResult);

      // Send business notification to you
      console.log("Sending business notification...");
      const businessResult = await emailjs.send(
        serviceId, 
        businessTemplateId, 
        templateParams,
        {
          publicKey: publicKey
        }
      );
      console.log("Business notification sent:", businessResult);

      // Success
      setIsSubmitted(true);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceInterest: "",
        preferredTime: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Full Error:", error);
      console.error("Error details:", {
        message: error?.message,
        text: error?.text,
        status: error?.status,
        name: error?.name
      });
      setSubmitError(
        "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Semi-Permanent Makeup",
    "Microblading",
    "Lash Extensions",
    "Lash Lift & Tint",
    "Brow Styling",
    "Luxury Facials",
    "Consultation",
    "Other",
  ];

  const timeSlots = [
    "Morning (9am - 12pm)",
    "Afternoon (12pm - 5pm)",
    "Evening (5pm - 8pm)",
    "Weekend",
    "Flexible",
  ];

  return (
    <>
      <style jsx global>{`
        /* Aggressive removal of all blue highlights */
        * {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Custom selection colors for luxury aesthetic */
        ::selection {
          background-color: rgba(139, 116, 102, 0.2) !important;
          color: rgb(139, 116, 102) !important;
        }

        ::-moz-selection {
          background-color: rgba(139, 116, 102, 0.2) !important;
          color: rgb(139, 116, 102) !important;
        }

        /* Remove all focus rings and blue highlights */
        input:focus,
        select:focus,
        textarea:focus,
        button:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: rgba(139, 116, 102, 0.5) !important;
          --tw-ring-shadow: none !important;
          --tw-ring-color: transparent !important;
        }

        /* Remove Tailwind focus rings specifically */
        .focus\\:ring-blue-500:focus,
        .focus\\:ring-blue-600:focus,
        .focus\\:ring-indigo-500:focus {
          --tw-ring-color: transparent !important;
          box-shadow: none !important;
        }

        /* Custom select dropdown styling */
        select option {
          background-color: white !important;
          color: rgb(139, 116, 102) !important;
          padding: 8px !important;
        }

        select option:checked,
        select option:hover {
          background-color: rgba(139, 116, 102, 0.1) !important;
          color: rgb(139, 116, 102) !important;
        }

        /* Custom placeholder styling */
        input::placeholder,
        textarea::placeholder {
          color: rgba(139, 116, 102, 0.4) !important;
        }

        /* Remove webkit autofill blue */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: rgb(139, 116, 102) !important;
        }

        /* Custom styling for PhoneInput component */
        .phone-input-container .PhoneInput {
          display: flex !important;
          align-items: center !important;
          height: 48px !important;
          border: none !important;
          border-bottom: 1px solid rgba(139, 116, 102, 0.2) !important;
          background: transparent !important;
          border-radius: 0 !important;
        }

        .phone-input-container .PhoneInputCountry {
          margin-right: 12px !important;
          border: none !important;
          background: transparent !important;
        }

        .phone-input-container .PhoneInputCountrySelect {
          border: none !important;
          background: transparent !important;
          font-family: var(--font-alta) !important;
          color: rgb(139, 116, 102) !important;
          font-size: 14px !important;
          outline: none !important;
          cursor: pointer !important;
        }

        .phone-input-container .PhoneInputCountrySelect:focus {
          border-color: rgba(139, 116, 102, 0.5) !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .phone-input-container .PhoneInputInput {
          flex: 1 !important;
          border: none !important;
          background: transparent !important;
          font-family: var(--font-alta) !important;
          color: rgb(139, 116, 102) !important;
          font-size: 16px !important;
          outline: none !important;
          padding: 16px 0 !important;
          height: 48px !important;
        }

        .phone-input-container .PhoneInputInput::placeholder {
          color: rgba(139, 116, 102, 0.3) !important;
        }

        .phone-input-container .PhoneInputInput:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        /* Flag styling */
        .phone-input-container .PhoneInputCountryIcon {
          margin-right: 8px !important;
        }

        .phone-input-container .PhoneInput:focus-within {
          border-bottom-color: rgba(139, 116, 102, 0.5) !important;
        }
      `}</style>

      <motion.div
        className="mx-auto w-full max-w-4xl bg-white border border-elegant-mocha/15 p-12 md:p-16 lg:p-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASING }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-alice text-2xl md:text-3xl text-elegant-mocha uppercase tracking-luxury mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: LUXURY_EASING }}
          >
            Let&apos;s Connect
          </motion.h2>

          <motion.div
            className="w-16 h-[0.5px] bg-elegant-mocha/40 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.4, duration: 1, ease: LUXURY_EASING }}
          />

          <motion.p
            className="font-alta text-elegant-mocha/80 tracking-refined leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: LUXURY_EASING }}
          >
            Whether you&apos;re ready to book your transformation or simply have
            questions — I&apos;m here to help you feel beautiful.
          </motion.p>
        </div>

        <motion.form
          className="space-y-12"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: LUXURY_EASING }}
        >
          {/* Personal Information Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-alice text-lg text-elegant-mocha uppercase tracking-luxury mb-6">
                Personal Information
              </h3>
              <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <LabelInputContainer>
                <Label
                  htmlFor="firstName"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-12 px-0 py-4 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 rounded-none outline-none font-alta text-elegant-mocha placeholder:text-elegant-mocha/30 transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[0.5px] transition-colors duration-300 ${
                      validationErrors.firstName
                        ? "bg-red-400"
                        : "bg-elegant-mocha"
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "firstName" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />

                  {/* Error message */}
                  {validationErrors.firstName && (
                    <motion.p
                      className="font-alta text-xs text-red-400 mt-2 tracking-refined"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASING }}
                    >
                      {validationErrors.firstName}
                    </motion.p>
                  )}
                </div>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor="lastName"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-12 px-0 py-4 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 rounded-none outline-none font-alta text-elegant-mocha placeholder:text-elegant-mocha/30 transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[0.5px] transition-colors duration-300 ${
                      validationErrors.lastName
                        ? "bg-red-400"
                        : "bg-elegant-mocha"
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "lastName" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />

                  {/* Error message */}
                  {validationErrors.lastName && (
                    <motion.p
                      className="font-alta text-xs text-red-400 mt-2 tracking-refined"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASING }}
                    >
                      {validationErrors.lastName}
                    </motion.p>
                  )}
                </div>
              </LabelInputContainer>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-alice text-lg text-elegant-mocha uppercase tracking-luxury mb-6">
                Contact Details
              </h3>
              <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <LabelInputContainer>
                <Label
                  htmlFor="email"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-12 px-0 py-4 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 rounded-none outline-none font-alta text-elegant-mocha placeholder:text-elegant-mocha/30 transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[0.5px] transition-colors duration-300 ${
                      validationErrors.email ? "bg-red-400" : "bg-elegant-mocha"
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "email" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />

                  {/* Error message */}
                  {validationErrors.email && (
                    <motion.p
                      className="font-alta text-xs text-red-400 mt-2 tracking-refined"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASING }}
                    >
                      {validationErrors.email}
                    </motion.p>
                  )}
                </div>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor="phone"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Phone Number
                </Label>
                <div className="relative phone-input-container">
                  <PhoneInput
                    international
                    defaultCountry="GB"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter phone number"
                    className="luxury-phone-input"
                    error={
                      validationErrors.phone
                        ? validationErrors.phone
                        : undefined
                    }
                  />
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[0.5px] transition-colors duration-300 ${
                      validationErrors.phone ? "bg-red-400" : "bg-elegant-mocha"
                    }`}
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "phone" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />

                  {/* Error message */}
                  {validationErrors.phone && (
                    <motion.p
                      className="font-alta text-xs text-red-400 mt-2 tracking-refined"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASING }}
                    >
                      {validationErrors.phone}
                    </motion.p>
                  )}
                </div>
              </LabelInputContainer>
            </div>
          </div>

          {/* Service Preferences Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-alice text-lg text-elegant-mocha uppercase tracking-luxury mb-6">
                Service Preferences
              </h3>
              <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <LabelInputContainer>
                <Label
                  htmlFor="serviceInterest"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Service Interest
                </Label>
                <div className="relative">
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("serviceInterest")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-14 px-0 py-3 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 outline-none font-alta text-elegant-mocha appearance-none cursor-pointer transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[0.5px] bg-elegant-mocha"
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "serviceInterest" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />
                </div>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor="preferredTime"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Preferred Time
                </Label>
                <div className="relative">
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("preferredTime")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-14 px-0 py-3 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 outline-none font-alta text-elegant-mocha appearance-none cursor-pointer transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  >
                    <option value="">Select preferred time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[0.5px] bg-elegant-mocha"
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "preferredTime" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />
                </div>
              </LabelInputContainer>
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="font-alice text-lg text-elegant-mocha uppercase tracking-luxury mb-6">
                Your Message
              </h3>
              <div className="w-12 h-[0.25px] bg-elegant-mocha/30 mx-auto mb-8"></div>
            </div>

            <div className="max-w-3xl mx-auto">
              <LabelInputContainer>
                <Label
                  htmlFor="message"
                  className="font-alta text-elegant-mocha/70 tracking-luxury text-xs uppercase mb-3 block"
                >
                  Tell me about your beauty goals
                </Label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Share your vision, questions, or any special requests..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-elegant-mocha/20 focus:border-elegant-mocha/50 outline-none font-alta text-elegant-mocha placeholder:text-elegant-mocha/30 resize-none transition-all duration-500 focus:ring-0 focus:ring-transparent focus:shadow-none"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-[0.5px] bg-elegant-mocha"
                    initial={{ width: 0 }}
                    animate={{
                      width: focusedField === "message" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: LUXURY_EASING }}
                  />
                </div>
              </LabelInputContainer>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            {/* Error message display */}
            {submitError && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: LUXURY_EASING }}
              >
                <p className="font-alta text-sm text-red-600 tracking-refined text-center">
                  {submitError}
                </p>
              </motion.div>
            )}

            {/* Success message display */}
            {isSubmitted && (
              <motion.div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: LUXURY_EASING }}
              >
                <p className="font-alta text-sm text-green-600 tracking-refined text-center">
                  Message sent successfully! We'll respond within 24 hours.
                </p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-elegant-mocha text-white font-alta uppercase tracking-luxury py-4 px-12 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-elegant-mocha/90 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-elegant-mocha/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: LUXURY_EASING }}
              />

              <span className="relative z-10">
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {children}
    </div>
  );
};
