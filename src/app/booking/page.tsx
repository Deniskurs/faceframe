import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { BookingJourney } from "@/components/booking/BookingJourney";
import { BRAND, STUDIO } from "@/config/business";

export const metadata: Metadata = {
  title: `Book an Appointment | ${BRAND.name}`,
  description: `Reserve your appointment with Iggy at ${BRAND.name} — semi-permanent makeup, lashes, brows, and luxury facials in East London.`,
  openGraph: {
    title: `Book with ${BRAND.name}`,
    description: "Reserve your appointment in East London. Limited slots each week.",
    type: "website",
  },
};

export default function BookingPage() {
  return (
    <main>
      <PageHero
        label="Schedule"
        title="Book Your Appointment"
        description="Choose a treatment, then pick a time that suits you. Iggy takes a limited number of clients each week."
        height="minimal"
      />

      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 lg:pb-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-5xl">
          {/*
            Native journey: category → treatment → scoped Acuity calendar.
            useSearchParams inside requires a Suspense boundary for static rendering.
          */}
          <Suspense
            fallback={
              <div className="min-h-[400px] flex items-center justify-center">
                <p className="font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80 animate-pulse">
                  Preparing your calendar…
                </p>
              </div>
            }
          >
            <BookingJourney />
          </Suspense>

          {/* Client-account hint — the portal lives at /account */}
          <div className="mt-12 pt-6 border-t-hairline border-elegant-mocha/15 text-center">
            <p className="font-alice text-base text-elegant-mocha mb-1">
              Already booked?
            </p>
            <p className="font-alice text-sm sm:text-base text-elegant-mocha/85 leading-relaxed tracking-wide max-w-2xl mx-auto">
              Visit{" "}
              <Link
                href="/account"
                className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
              >
                My Account
              </Link>{" "}
              to view, reschedule, or cancel your appointments and see your
              package credits — or use the link in your confirmation email.
            </p>
          </div>

          {/* Reassurance row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "East London studio",
                body: `${STUDIO.name} · ${STUDIO.streetAddress} · ${STUDIO.postcode}.`,
              },
              {
                title: "One-to-one appointments",
                body: "Every appointment is one-to-one with Iggy — your treatment is never rushed or shared.",
              },
              {
                title: "Aftercare included",
                body: "You’ll receive tailored aftercare guidance by email before and after your appointment.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <p className="font-alta text-xs tracking-luxury uppercase text-deep-bronze/80 mb-2">
                  {item.title}
                </p>
                <p className="font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center font-alta text-xs tracking-wider text-elegant-mocha/80 mt-12">
            Questions before booking?{" "}
            <Link
              href="/faq"
              className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 underline underline-offset-2"
            >
              Read the FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 underline underline-offset-2"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
