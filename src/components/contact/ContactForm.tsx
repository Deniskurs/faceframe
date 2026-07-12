"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { CTA, CONTACT } from "@/config/business";

const SERVICE_OPTIONS = [
  { value: "semi-permanent-makeup", label: "Semi-Permanent Makeup" },
  { value: "microblading", label: "Microblading" },
  { value: "lash-extensions", label: "Lash Extensions" },
  { value: "lash-lift-tint", label: "Lash Lift & Tint" },
  { value: "brow-styling", label: "Brow Styling" },
  { value: "luxury-facials", label: "Facials" },
  { value: "consultation", label: "Consultation (unsure)" },
  { value: "other", label: "Other" },
] as const;

const MESSAGE_MAX = 500;

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(60),
  lastName: z.string().min(1, "Last name is required").max(60),
  email: z.string().email("Please enter a valid email address").max(120),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().max(MESSAGE_MAX).optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const [submitState, setSubmitState] =
    useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const messageLength = form.watch("message")?.length ?? 0;

  async function onSubmit(values: ContactFormValues) {
    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitState("success");
        setSubmitMessage(
          `Thank you — your message is on its way to Iggy. She’ll respond ${CONTACT.responseTime}.`
        );
        form.reset();
      } else {
        setSubmitState("error");
        setSubmitMessage(
          (data && (data.error as string)) ||
            "Something went wrong. Please try again or email Iggy directly."
        );
      }
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                  First name
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="given-name"
                    placeholder="Jane"
                    className="h-11 bg-light-cream/40 border-elegant-mocha/20 focus-visible:border-elegant-mocha font-alta text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-alta tracking-wide" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                  Last name
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="family-name"
                    placeholder="Doe"
                    className="h-11 bg-light-cream/40 border-elegant-mocha/20 focus-visible:border-elegant-mocha font-alta text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-alta tracking-wide" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className="h-11 bg-light-cream/40 border-elegant-mocha/20 focus-visible:border-elegant-mocha font-alta text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-alta tracking-wide" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                Phone
                <span className="ml-2 normal-case text-elegant-mocha/65">
                  optional
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+44 20 1234 5678"
                  className="h-11 bg-light-cream/40 border-elegant-mocha/20 focus-visible:border-elegant-mocha font-alta text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-alta tracking-wide" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                Service interest
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 bg-light-cream/40 border-elegant-mocha/20 focus:border-elegant-mocha font-alta text-base">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-elegant-mocha/20">
                  {SERVICE_OPTIONS.map((s) => (
                    <SelectItem
                      key={s.value}
                      value={s.value}
                      className="font-alta text-base"
                    >
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="font-alta tracking-wide" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline justify-between">
                <FormLabel className="font-alta tracking-wider uppercase text-xs text-elegant-mocha/85">
                  Message
                  <span className="ml-2 normal-case text-elegant-mocha/65">
                    optional
                  </span>
                </FormLabel>
                <span className="text-xs font-alta text-elegant-mocha/80 tabular-nums">
                  {messageLength}/{MESSAGE_MAX}
                </span>
              </div>
              <FormControl>
                <Textarea
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  placeholder="Tell Iggy about your goals, preferred dates, or any questions…"
                  className="bg-light-cream/40 border-elegant-mocha/20 focus-visible:border-elegant-mocha font-alta text-base min-h-[140px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="font-alta text-xs text-elegant-mocha/80">
                Iggy reads every message personally — there&rsquo;s no template
                reply.
              </FormDescription>
              <FormMessage className="font-alta tracking-wide" />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <LuxuryShadcnButton
            type="submit"
            text={submitState === "submitting" ? "SENDING…" : CTA.sendMessage}
            luxuryVariant="elegant"
            luxuryTheme="dark"
            luxurySize="large"
            className="w-full"
            isLoading={submitState === "submitting"}
            disabled={submitState === "submitting"}
          />
        </div>

        {submitState === "success" && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <AlertDescription className="font-alta tracking-wide text-sm">
              {submitMessage}
            </AlertDescription>
          </Alert>
        )}

        {submitState === "error" && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription className="font-alta tracking-wide text-sm">
              {submitMessage}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
