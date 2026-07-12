import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BRAND, CONTACT, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: `How ${BRAND.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2025";

  return (
    <main>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description={`How ${BRAND.name} collects, uses, and protects your information.`}
        height="minimal"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-3xl">
          <article className="prose-luxury space-y-8 font-alice text-elegant-mocha/85 leading-relaxed tracking-wide">
            <p className="font-alta text-xs tracking-[0.25em] uppercase text-elegant-mocha/80">
              Last updated · {lastUpdated}
            </p>

            <p>
              {BRAND.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
              privacy. This page explains what information we collect when you
              use our website or book a treatment, and how we look after it.
            </p>

            <Section title="What we collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>Your name, email, and phone number when you contact us or book.</li>
                <li>The service you&rsquo;re interested in and any notes you share.</li>
                <li>
                  Standard technical data your browser sends (e.g. device type,
                  pages visited) to keep the site fast and secure.
                </li>
                <li>
                  Payment details are processed by our scheduling provider
                  (Acuity Scheduling) and the payment processor — we do not
                  store card numbers ourselves.
                </li>
              </ul>
            </Section>

            <Section title="How we use it">
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to enquiries and confirm appointments.</li>
                <li>To send aftercare instructions and appointment reminders.</li>
                <li>To improve the website and our services.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data, and we do not send marketing emails
                unless you have explicitly opted in.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                Enquiries are kept for up to 24 months. Treatment records (for
                client safety and continuity of care) are kept for 7 years in
                line with UK industry guidance.
              </p>
            </Section>

            <Section title="Your rights (UK GDPR)">
              <p>
                You can ask us to access, correct, or delete the personal data
                we hold about you, or to stop using it for a specific purpose.
                Email{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2"
                >
                  {CONTACT.email}
                </a>{" "}
                and we&rsquo;ll respond {CONTACT.responseTime}.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                We use only essential cookies needed for the site to work. We
                do not use advertising or third-party tracking cookies.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Any questions about this policy?{" "}
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
