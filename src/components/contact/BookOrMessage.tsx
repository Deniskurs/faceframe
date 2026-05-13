"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "./ContactForm";
import { BOOKING, CONTACT, HOURS } from "@/config/business";

/**
 * Two-tab booking surface:
 *  - "Schedule" — embedded Acuity calendar (when BOOKING.acuityEmbedHtml is
 *    set) or a polished placeholder that funnels to the message tab.
 *  - "Message" — full shadcn Form + zod validation + react-hook-form.
 *
 * Defaults to the Schedule tab once Acuity is live; otherwise opens on
 * Message so the user can do something useful immediately.
 */
export function BookOrMessage() {
  const acuityReady = Boolean(BOOKING.acuityEmbedHtml);
  const defaultTab = acuityReady ? "schedule" : "message";

  return (
    <section
      id="contact-form"
      className="py-12 sm:py-16 lg:py-20 bg-white"
      aria-label="Book or message Iggy"
    >
      <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full bg-light-cream/60 border border-elegant-mocha/15 rounded-sm h-auto p-1 grid grid-cols-2 gap-1">
            <TabsTrigger
              value="schedule"
              className="font-alta tracking-[0.18em] uppercase text-xs sm:text-sm py-3 rounded-sm data-[state=active]:bg-elegant-mocha data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="message"
              className="font-alta tracking-[0.18em] uppercase text-xs sm:text-sm py-3 rounded-sm data-[state=active]:bg-elegant-mocha data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 mr-2" aria-hidden="true" />
              Message
            </TabsTrigger>
          </TabsList>

          {/* SCHEDULE TAB — Acuity embed slot */}
          <TabsContent value="schedule" className="mt-8">
            {acuityReady ? (
              <div
                className="acuity-embed-container [&_iframe]:w-full [&_iframe]:min-h-[820px] [&_iframe]:border-0"
                /* Acuity provides a vetted iframe snippet — safe to inject. */
                dangerouslySetInnerHTML={{
                  __html: BOOKING.acuityEmbedHtml ?? "",
                }}
              />
            ) : (
              <div className="border border-elegant-mocha/15 bg-light-cream/30 rounded-sm p-8 sm:p-12 text-center">
                <p className="font-alta text-[11px] tracking-[0.3em] uppercase text-elegant-mocha/75 mb-3">
                  Online Scheduling
                </p>
                <h3 className="font-alice text-xl sm:text-2xl text-elegant-mocha tracking-wide mb-4">
                  Online booking opens shortly
                </h3>
                <div className="h-[0.5px] w-10 bg-elegant-mocha/30 mx-auto mb-5" />
                <p className="font-alice text-base text-elegant-mocha/80 leading-relaxed tracking-wide max-w-md mx-auto">
                  In the meantime, send Iggy a message — she&rsquo;ll
                  personally confirm a slot, usually {CONTACT.responseTime}.
                </p>
                <p className="font-alta text-xs tracking-[0.04em] text-elegant-mocha/55 mt-6">
                  Studio hours · {HOURS.display}
                </p>
              </div>
            )}
          </TabsContent>

          {/* MESSAGE TAB — clean shadcn Form */}
          <TabsContent value="message" className="mt-8">
            <ContactForm />

            <p className="text-center font-alta text-xs tracking-[0.04em] text-elegant-mocha/55 mt-8">
              Prefer email?{" "}
              <Link
                href={`mailto:${CONTACT.email}`}
                className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2"
              >
                {CONTACT.email}
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
