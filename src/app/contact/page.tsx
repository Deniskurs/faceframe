import { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
import {
  MessageSection,
  QuickInfo,
  StudioComparison,
} from "@/components/contact";
import { BRAND, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.name}`,
  description: `Send Iggy a message. The intimate ${BRAND.name} studio in East London — semi-permanent makeup, lashes, brows, and luxury facials.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: `Contact ${BRAND.name}`,
    description:
      "Message Iggy directly. East London studio. Response within 24 hours.",
    type: "website",
    url: `${SITE.url}/contact`,
  },
};

/**
 * Contact page — conversation only; booking lives at /booking.
 *
 * Layout (top → bottom):
 *  1. PageHero — single light hero
 *  2. MessageSection — message form + quiet booking pointer
 *  3. QuickInfo — compact horizontal strip (email · hours · studio · IG)
 *  4. StudioComparison — single studio location card
 *  5. Footer note → /faq for anything else
 */
export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Get in Touch"
        title="Let’s talk"
        description="Send Iggy a message — she reads every note personally and replies within 24 hours."
        height="functional"
      />

      <MessageSection />

      <QuickInfo />

      <StudioComparison />

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8 max-w-3xl text-center">
          <p className="font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80 mb-3">
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
