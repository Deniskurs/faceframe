import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { BOOKING, CONTACT, HOURS, BRAND, CTA } from "@/config/business";

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
  const acuityReady = Boolean(BOOKING.acuityEmbedHtml);

  return (
    <main>
      <PageHero
        label="Schedule"
        title="Book Your Appointment"
        description="Select your service and a time that suits you. Iggy takes a limited number of clients each week."
        height="functional"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-5xl">
          {acuityReady ? (
            <div
              className="acuity-embed-container [&_iframe]:w-full [&_iframe]:min-h-[820px] [&_iframe]:border-0"
              // Acuity provides a vetted iframe snippet — safe to inject.
              dangerouslySetInnerHTML={{ __html: BOOKING.acuityEmbedHtml ?? "" }}
            />
          ) : (
            <div className="border border-elegant-mocha/15 bg-light-cream/30 rounded-sm p-8 sm:p-12 text-center">
              <p className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/75 mb-3">
                Online Scheduling
              </p>
              <h2 className="font-alice text-2xl sm:text-3xl text-elegant-mocha tracking-wide mb-4">
                Online booking opening soon
              </h2>
              <div className="h-[0.5px] w-12 bg-elegant-mocha/30 mx-auto mb-5" />
              <p className="font-alice text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide max-w-xl mx-auto mb-8">
                In the meantime, message Iggy directly and she&rsquo;ll confirm
                your slot personally — usually {CONTACT.responseTime}.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <LuxuryShadcnButton
                  href="/contact#contact-form"
                  text="MESSAGE IGGY"
                  luxuryVariant="elegant"
                  luxuryTheme="dark"
                  luxurySize="medium"
                />
                <LuxuryShadcnButton
                  href="/services"
                  text={CTA.viewServices}
                  luxuryVariant="outline"
                  luxuryTheme="light"
                  luxurySize="medium"
                />
              </div>

              <p className="font-alta text-xs tracking-[0.04em] text-elegant-mocha/55 mt-8">
                Studio hours · {HOURS.display}
              </p>
            </div>
          )}

          {/* Reassurance row — visible whether Acuity is live or not */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "East London studio",
                body: "Luma Glow Studio · 82 O'Leary Square · E1 3AS.",
              },
              {
                title: "Personal service",
                body: "Iggy works with a small number of clients each week. Every appointment is one-to-one.",
              },
              {
                title: "Easy aftercare",
                body: "You'll receive aftercare guidance by email before and after your appointment.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <p className="font-alta text-[11px] tracking-[0.25em] uppercase text-deep-bronze/80 mb-2">
                  {item.title}
                </p>
                <p className="font-alice text-sm text-elegant-mocha/75 leading-relaxed tracking-wide">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center font-alta text-xs tracking-[0.04em] text-elegant-mocha/55 mt-12">
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
