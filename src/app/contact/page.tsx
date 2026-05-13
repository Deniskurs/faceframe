import { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
import {
  BookOrMessage,
  QuickInfo,
  StudioComparison,
} from "@/components/contact";
import { BRAND, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.name}`,
  description: `Book a treatment or send Iggy a message. The intimate ${BRAND.name} studio in East London — semi-permanent makeup, lashes, brows, and luxury facials.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `Contact ${BRAND.name}`,
    description:
      "Schedule directly or message Iggy. East London studio. Response within 24 hours.",
    type: "website",
    url: `${SITE.url}/contact`,
  },
};

/**
 * Contact page — clean, opinionated, Acuity-ready.
 *
 * Layout (top → bottom):
 *  1. PageHero — single light hero, no contact-info cards
 *  2. BookOrMessage — shadcn Tabs (Schedule | Message). Schedule tab houses
 *     the Acuity embed once `BOOKING.acuityEmbedHtml` is filled in.
 *  3. QuickInfo — compact horizontal strip (email · hours · studio · IG)
 *  4. StudioComparison — single studio location card (kept, lives further
 *     down so the booking surface stays primary)
 *  5. Footer note → /faq for anything else
 */
export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Get in Touch"
        title="Let's talk"
        description="Schedule directly, or send Iggy a message — she reads every note personally and replies within 24 hours."
        height="functional"
      />

      <BookOrMessage />

      <QuickInfo />

      <StudioComparison />

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8 max-w-3xl text-center">
          <p className="font-alta text-xs tracking-[0.25em] uppercase text-elegant-mocha/75 mb-3">
            Still curious?
          </p>
          <p className="font-alice text-base sm:text-lg text-elegant-mocha/85 leading-relaxed tracking-wide">
            Most pre-booking questions are already answered on the{" "}
            <Link
              href="/faq"
              className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2 transition-colors"
            >
              FAQ page
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
