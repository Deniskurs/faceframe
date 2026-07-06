import {
  BRAND,
  CONTACT,
  HOURS,
  SOCIAL,
  STUDIO,
  SITE,
} from "@/config/business";
import {
  CATALOG_CATEGORIES,
  CATALOG_SERVICES,
} from "@/data/acuityCatalog";
import type { FAQ } from "@/types";

/**
 * Renders schema.org JSON-LD as a script tag. Server-rendered for SEO.
 */
function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BeautySalon — root identity for the brand. Drop into root layout. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE.url}/#business`,
    name: BRAND.name,
    url: SITE.url,
    email: CONTACT.email,
    description:
      "Luxury semi-permanent makeup, lashes, brows, and facials by Iggy. An intimate studio in East London.",
    image: `${SITE.url}/images/brand/IMG_5461.webp`,
    sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url],
    priceRange: "££££",
    areaServed: {
      "@type": "City",
      name: "London",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO.streetAddress,
      addressLocality: STUDIO.area,
      postalCode: STUDIO.postcode,
      addressCountry: "GB",
    },
    location: {
      "@type": "Place",
      name: STUDIO.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: STUDIO.streetAddress,
        addressLocality: STUDIO.area,
        postalCode: STUDIO.postcode,
        addressCountry: "GB",
      },
      hasMap: STUDIO.mapUrl,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    knowsAbout: [
      "Microblading",
      "Semi-permanent makeup",
      "Lash extensions",
      "Brow lamination",
      "Luxury facials",
    ],
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Hours",
      value: HOURS.detailed,
    },
    currenciesAccepted: "GBP",
    paymentAccepted: "Credit Card, Debit Card",
    // Online booking — tells Google the site takes reservations directly
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/booking`,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Beauty treatment appointment" },
    },
  };
  return <JsonLdScript data={data} />;
}

/** Person — Iggy as the founder. Drop into /about. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BRAND.founder,
    jobTitle: "Founder & Lead Beauty Specialist",
    worksFor: {
      "@type": "BeautySalon",
      name: BRAND.name,
      "@id": `${SITE.url}/#business`,
    },
    image: `${SITE.url}/images/gallery/image25.webp`,
    knowsAbout: [
      "Microblading",
      "Semi-permanent makeup",
      "Lash extensions",
      "Brow styling",
      "Luxury facial treatments",
    ],
  };
  return <JsonLdScript data={data} />;
}

/** FAQPage — drop into /faq. */
export function FaqJsonLd({ faqs }: { faqs: FAQ[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return <JsonLdScript data={data} />;
}

/**
 * OfferCatalog — the live treatment menu with real GBP prices, generated
 * from the Acuity catalog. Drop into /services (and only there — 60 offers
 * is too heavy for every page).
 */
export function ServicesCatalogJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE.url}/#business`,
    name: BRAND.name,
    url: SITE.url,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${BRAND.name} treatment menu`,
      itemListElement: CATALOG_CATEGORIES.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.displayName,
        itemListElement: CATALOG_SERVICES.filter(
          (s) => s.category === cat.id && s.priceDisplay !== "Free",
        ).map((s) => ({
          "@type": "Offer",
          name: s.name,
          price: s.priceDisplay.replace(/[^0-9.]/g, ""),
          priceCurrency: "GBP",
          url: `${SITE.url}/booking?service=${s.slug}`,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description.slice(0, 200),
            provider: { "@id": `${SITE.url}/#business` },
          },
        })),
      })),
    },
  };
  return <JsonLdScript data={data} />;
}
