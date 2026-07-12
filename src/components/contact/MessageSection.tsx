"use client";

import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { CONTACT } from "@/config/business";

/**
 * Contact is for conversation — booking lives at /booking.
 * A single focused message form with a quiet pointer for people who
 * actually came here to book.
 */
export function MessageSection() {
  return (
    <section
      id="contact-form"
      className="scroll-mt-24 py-12 sm:py-16 lg:py-20 bg-white"
      aria-label="Message Iggy"
    >
      <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
        {/* Booking pointer — catches people who came here to book */}
        <p className="text-center font-alice text-sm sm:text-base text-elegant-mocha/85 leading-relaxed tracking-wide mb-10">
          Looking to book a treatment?{" "}
          <Link
            href="/booking"
            className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
          >
            Choose a time on the booking page
          </Link>{" "}
          — it takes under a minute.
        </p>

        <ContactForm />

        <p className="text-center font-alta text-xs tracking-wider text-elegant-mocha/80 mt-8">
          Prefer email?{" "}
          <Link
            href={`mailto:${CONTACT.email}`}
            className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 underline underline-offset-2"
          >
            {CONTACT.email}
          </Link>
        </p>
      </div>
    </section>
  );
}
