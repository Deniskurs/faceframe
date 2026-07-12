"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { CONTACT, BRAND } from "@/config/business";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-light-cream px-6 py-20">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-alta text-xs tracking-[0.3em] uppercase text-elegant-mocha/80 mb-3">
          Something went wrong
        </p>
        <h1 className="font-alice text-3xl sm:text-4xl text-elegant-mocha tracking-wide mb-5">
          We&rsquo;ve hit a small snag
        </h1>
        <div className="h-[0.5px] w-12 bg-elegant-mocha/30 mx-auto mb-6" />
        <p className="font-alice text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide mb-8">
          The page didn&rsquo;t load correctly. Please try again, or get in
          touch with Iggy directly — she&rsquo;ll make sure you&rsquo;re looked
          after.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <LuxuryShadcnButton
            text="TRY AGAIN"
            luxuryVariant="elegant"
            luxuryTheme="dark"
            luxurySize="medium"
            onClick={() => reset()}
          />
          <LuxuryShadcnButton
            href="/"
            text="RETURN HOME"
            luxuryVariant="outline"
            luxuryTheme="light"
            luxurySize="medium"
          />
        </div>

        <p className="font-alta text-xs tracking-[0.04em] text-elegant-mocha/80 mt-10">
          Need a hand?{" "}
          <Link
            href={`mailto:${CONTACT.email}`}
            className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2"
          >
            {CONTACT.email}
          </Link>
        </p>
        <p className="sr-only">
          {BRAND.name} encountered an error
          {error.digest ? ` — reference: ${error.digest}` : ""}.
        </p>
      </div>
    </main>
  );
}
