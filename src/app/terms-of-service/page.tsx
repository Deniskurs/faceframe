import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BRAND, CONTACT, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND.name}`,
  description: `Booking, cancellation, and treatment terms for ${BRAND.name}.`,
  alternates: { canonical: `${SITE.url}/terms-of-service` },
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 2025";

  return (
    <main>
      <PageHero
        label="Legal"
        title="Terms of Service"
        description="Booking, cancellation, and treatment terms."
        height="minimal"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-3xl">
          <article className="space-y-8 font-alice text-elegant-mocha/85 leading-relaxed tracking-wide">
            <p className="font-alta text-xs tracking-[0.25em] uppercase text-elegant-mocha/70">
              Last updated · {lastUpdated}
            </p>

            <p>
              These terms apply when you book or attend an appointment at{" "}
              {BRAND.name}. They&rsquo;re written to be clear and fair — please
              read them before confirming your booking.
            </p>

            <Section title="Bookings & deposits">
              <p>
                A non-refundable deposit may be required to secure your
                appointment, particularly for semi-permanent makeup treatments.
                The deposit is deducted from the total cost on the day of your
                treatment.
              </p>
            </Section>

            <Section title="Cancellation & rescheduling">
              <p>
                We ask for at least <strong>48 hours&rsquo; notice</strong> if
                you need to cancel or reschedule. With less than 48 hours&rsquo;
                notice, the deposit is retained to cover the reserved studio
                time.
              </p>
              <p className="mt-3">
                Same-day cancellations and no-shows may be charged 100% of the
                treatment cost.
              </p>
            </Section>

            <Section title="Late arrival">
              <p>
                If you arrive more than 15 minutes late we may need to shorten
                or reschedule your appointment so the next client isn&rsquo;t
                affected.
              </p>
            </Section>

            <Section title="Suitability & consultations">
              <p>
                Some treatments require a consultation or patch test in
                advance. Iggy may decline a treatment if it is not suitable —
                your safety always comes first. In that case, deposits are
                refunded in full.
              </p>
            </Section>

            <Section title="Aftercare">
              <p>
                You&rsquo;ll receive written aftercare instructions by email.
                Following them carefully is essential to your results — outcomes
                cannot be guaranteed if aftercare is not followed.
              </p>
            </Section>

            <Section title="Refunds">
              <p>
                Treatments are bespoke and personally performed. Once completed,
                they are non-refundable. If you have any concerns, contact us
                within 7 days and we&rsquo;ll discuss next steps.
              </p>
            </Section>

            <Section title="Children & guests">
              <p>
                For everyone&rsquo;s comfort and safety, please attend
                appointments alone unless agreed in advance.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Any questions before you book?{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2"
                >
                  {CONTACT.email}
                </a>
              </p>
            </Section>
          </article>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-alice text-xl sm:text-2xl text-elegant-mocha tracking-wide mb-3">
        {title}
      </h2>
      <div className="font-alice text-base md:text-lg leading-relaxed tracking-wide">
        {children}
      </div>
    </div>
  );
}
