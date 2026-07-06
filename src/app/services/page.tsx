import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { BRAND, CTA } from "@/config/business";
import serviceService from "@/services/serviceService";
import { CATALOG_SERVICES } from "@/data/acuityCatalog";
import { ServicesCatalogJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: `Services | ${BRAND.name}`,
  description: `Semi-permanent makeup, lashes & brows, and luxury facials at ${BRAND.name} in East London. Book a consultation with Iggy.`,
  openGraph: {
    title: `Services | ${BRAND.name}`,
    description:
      "Microblading, lash extensions, brow styling, and luxury facials. Crafted by Iggy at her East London studio.",
    type: "website",
  },
};

const CATEGORY_COPY: Record<
  string,
  { headline: string; description: string; image: string }
> = {
  "semi-permanent-makeup": {
    headline: "Semi-Permanent Makeup",
    description:
      "Microblading, ombré brows, lip blush. Hair-stroke precision designed to enhance your natural features rather than mask them.",
    image: "/images/gallery/services-preview/semi-permanent.webp",
  },
  "lashes-brows": {
    headline: "Lashes & Brows",
    description:
      "Volume lash extensions, lash lifts, brow lamination, and tinting. Subtle definition that complements every face.",
    image: "/images/gallery/services-preview/lashes-brows.webp",
  },
  facials: {
    headline: "Luxury Facials",
    description:
      "Million Dollar Facial, dermaplaning, hydrafacials. Deep, bespoke skincare for a calm, luminous result.",
    image: "/images/gallery/services-preview/facials.webp",
  },
  // no services-preview shot exists for waxing yet — gallery image stays
  waxing: {
    headline: "Waxing",
    description:
      "Premium wax formulations and gentle technique for lasting, comfortable results.",
    image: "/images/gallery/image7.webp",
  },
};

/** Real treatment counts + cheapest non-free price per category, from the live catalog. */
function catalogFacts(): Record<string, { count: number; from: number | null }> {
  const facts: Record<string, { count: number; from: number | null }> = {};
  for (const s of CATALOG_SERVICES) {
    const entry = (facts[s.category] ??= { count: 0, from: null });
    entry.count++;
    const price = Number(s.priceDisplay.replace(/[^0-9.]/g, ""));
    if (price && (entry.from === null || price < entry.from)) entry.from = price;
  }
  return facts;
}

export default async function ServicesPage() {
  const categories = await serviceService.getCategories();
  const facts = catalogFacts();

  return (
    <main>
      <ServicesCatalogJsonLd />
      <PageHero
        label="Our Craft"
        title="Services"
        description="A focused menu — every treatment performed personally by Iggy. Browse a category, see prices and live availability, and book in under a minute."
        height="functional"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => {
              const copy =
                CATEGORY_COPY[category.id as keyof typeof CATEGORY_COPY] ?? {
                  headline: category.name,
                  description: "",
                  image: "/images/gallery/image1.webp",
                };
              return (
                <article
                  key={category.id}
                  id={category.id}
                  className="flex flex-col bg-white border border-elegant-mocha/10 rounded-sm overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-luxury"
                >
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <Image
                      src={copy.image}
                      alt={`${copy.headline} — ${BRAND.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-luxury hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-elegant-mocha/30 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <p className="font-alta text-[11px] tracking-[0.25em] uppercase text-deep-bronze mb-2">
                      {facts[category.id]?.count ?? category.count} treatment
                      {(facts[category.id]?.count ?? category.count) === 1 ? "" : "s"}
                      {facts[category.id]?.from && (
                        <> · from £{facts[category.id].from}</>
                      )}
                    </p>
                    <h2 className="font-alice text-2xl text-elegant-mocha tracking-wide mb-3">
                      {copy.headline}
                    </h2>
                    <div className="h-[0.5px] w-10 bg-elegant-mocha/30 mb-4" />
                    <p className="font-alice text-base text-elegant-mocha/80 leading-relaxed tracking-wide mb-6">
                      {copy.description}
                    </p>
                    <div className="mt-auto pt-1">
                      <LuxuryShadcnButton
                        href={`/booking?category=${encodeURIComponent(category.id)}`}
                        text={CTA.bookPrimary}
                        luxuryVariant="elegant"
                        luxuryTheme="dark"
                        luxurySize="small"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Surfaces that live in the booking journey but have no card above */}
          <p className="text-center font-alice text-sm sm:text-base text-elegant-mocha/80 tracking-wide mt-10">
            Also available:{" "}
            <Link
              href="/booking?category=saline-tattoo-removal"
              className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2 transition-colors duration-300"
            >
              Saline Tattoo Removal
            </Link>{" "}
            ·{" "}
            <Link
              href="/booking?category=packages"
              className="text-deep-bronze hover:text-elegant-mocha underline underline-offset-2 transition-colors duration-300"
            >
              Packages &amp; Gift Certificates
            </Link>
          </p>

          <div className="mt-16 text-center">
            <p className="font-alta text-xs tracking-[0.25em] uppercase text-elegant-mocha/75 mb-3">
              Not sure which service?
            </p>
            <p className="font-alice text-base md:text-lg text-elegant-mocha/80 leading-relaxed tracking-wide max-w-xl mx-auto mb-6">
              A short consultation helps Iggy recommend the right treatment for
              your skin and goals.
            </p>
            <LuxuryShadcnButton
              href="/contact#contact-form"
              text={CTA.bookConsultation}
              luxuryVariant="outline"
              luxuryTheme="light"
              luxurySize="medium"
            />
            <p className="font-alta text-xs tracking-[0.04em] text-elegant-mocha/75 mt-8">
              Want to see results first?{" "}
              <Link
                href="/gallery"
                className="text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 underline underline-offset-2"
              >
                View the transformations gallery
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
