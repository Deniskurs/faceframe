/**
 * FaceFrame Beauty — single source of truth for brand & business constants.
 *
 * Update values here; do NOT hardcode email/hours/social/booking URLs anywhere
 * else in the codebase. When the live Acuity Scheduling links arrive, fill in
 * `BOOKING.acuityUrl` and `BOOKING.servicesUrl` (plus per-service IDs) and
 * every CTA on the site will route through them.
 */

export const BRAND = {
  name: "FaceFrame Beauty",
  shortName: "FaceFrame",
  founder: "Iggy",
  city: "London",
  country: "UK",
  tagline: "Where artistry meets permanence",
} as const;

export const CONTACT = {
  email: "faceframe.byvil@gmail.com",
  responseTime: "within 24 hours",
} as const;

export const HOURS = {
  display: "Tue–Sat · 9:00–18:00",
  detailed: "Tuesday – Saturday, 9:00 – 18:00",
  closed: "Sunday & Monday",
} as const;

export const SOCIAL = {
  instagram: {
    handle: "@faceframe_beauty",
    url: "https://instagram.com/faceframe_beauty",
  },
  facebook: {
    handle: "FaceFrameBeauty",
    url: "https://facebook.com/FaceFrameBeauty",
  },
} as const;

export const STUDIO = {
  name: "Luma Glow Studio",
  streetAddress: "82 O'Leary Square",
  area: "East London",
  postcode: "E1 3AS",
  type: "Luxury beauty studio",
  ambiance: "Contemporary luxury, intimate and personal",
  bestFor: "All services — facials, semi-permanent makeup, lash treatments",
  features: [
    "Complete treatment suite",
    "Professional equipment",
    "One-to-one appointments",
    "Easy public transport access",
  ],
  image: "/images/gallery/image1.webp",
  mapUrl: "https://maps.app.goo.gl/uftPwrgDKAFMP1iJ9",
} as const;

/**
 * BOOKING — Acuity Scheduling configuration (LIVE as of 2026-07-05).
 *
 * Account: owner 36291837, GBP, Europe/London, single calendar "Face Frame".
 * Master scheduler: https://app.acuityscheduling.com/schedule.php?owner=36291837
 *
 * `acuityUrl` is deliberately null so every booking CTA routes to /booking,
 * which renders the live embedded scheduler (`acuityEmbedHtml`) — clients
 * stay on-site. Set `acuityUrl` to the master scheduler URL above to send
 * CTAs directly to Acuity's hosted page instead.
 *
 * Category keys in `serviceIds` use Acuity's `appointmentType=category:<name>`
 * deep-link filter (pre-encoded); service keys use numeric appointmentType IDs.
 * All 60 services + 2 add-ons + 2 packages were imported and verified
 * against `migration/acuity-import.xlsx` — see `migration/README.md`.
 */
export const BOOKING = {
  /** Master Acuity URL — null keeps CTAs on-site at /booking (see above) */
  acuityUrl: null as string | null,
  /** Off-site services page — intentionally null, /services stays canonical */
  servicesUrl: null as string | null,
  /** Acuity's vetted iframe snippet, embedded on /booking and /contact */
  acuityEmbedHtml:
    '<iframe src="https://app.acuityscheduling.com/schedule.php?owner=36291837" width="100%" height="800" frameBorder="0" allow="payment"></iframe>\n<script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>' as
      | string
      | null,
  /** Acuity appointmentType IDs (numeric) or category deep-link filters */
  serviceIds: {
    "semi-permanent-makeup": "category:Semi-Permanent%20Make-up" as string | null,
    "microblading": "95376913" as string | null,
    "lash-extensions": "95376936" as string | null,
    "lash-lift-tint": "95376935" as string | null,
    "brow-styling": "category:Lashes%20%26%20Brows" as string | null,
    "luxury-facials": "category:Facials" as string | null,
    "consultation": "95376769" as string | null,
  },
} as const;

/**
 * On-site catalog slugs for service keys — used when Acuity is not live so
 * booking CTAs can still deep-link into /booking?service=<slug>.
 * Slugs must match `CATALOG_SERVICES` in src/data/acuityCatalog.ts.
 */
const ONSITE_SERVICE_SLUGS: Partial<Record<keyof typeof BOOKING.serviceIds, string>> = {
  consultation: "free-consultation-patch-test",
  microblading: "brow-microblading",
};

/**
 * Resolves the URL a booking CTA should point to.
 * - If Acuity is live → external Acuity URL (optionally per-service)
 * - Otherwise → /booking, deep-linked to the service when a slug is mapped
 */
export function getBookingHref(serviceKey?: keyof typeof BOOKING.serviceIds): string {
  const base = BOOKING.acuityUrl;
  if (!base) {
    const slug = serviceKey && ONSITE_SERVICE_SLUGS[serviceKey];
    return slug ? `/booking?service=${slug}` : "/booking";
  }
  if (serviceKey && BOOKING.serviceIds[serviceKey]) {
    return `${base}${base.includes("?") ? "&" : "?"}appointmentType=${BOOKING.serviceIds[serviceKey]}`;
  }
  return base;
}

/** Resolves the URL the "View Services" / browse-services CTA should use. */
export function getServicesHref(): string {
  return BOOKING.servicesUrl ?? "/services";
}

/**
 * CTAs — single canonical label set so the site speaks with one voice.
 * Use these constants instead of inline strings on every Book button.
 */
export const CTA = {
  bookPrimary: "BOOK NOW",
  bookConsultation: "BOOK CONSULTATION",
  viewServices: "VIEW SERVICES",
  viewGallery: "VIEW GALLERY",
  viewAll: "VIEW ALL",
  sendMessage: "SEND MESSAGE",
  askQuestion: "ASK A QUESTION",
} as const;

export const SITE = {
  /**
   * Public production URL — used for canonical, OG, sitemap, and schema.
   * Driven by NEXT_PUBLIC_SITE_URL so the final domain (faceframe.co.uk /
   * faceframe.com — TBD) is a Vercel env change + redeploy, no code edit.
   * Fallback = the live Vercel alias, so canonicals are never wrong.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://faceframe-lac.vercel.app",
} as const;

/**
 * Feature flags — gate experimental or paid features that may be off in
 * production. Flip to true when the dependency is ready (API key, billing,
 * etc.). The code stays in the repo so re-enabling is a one-line change.
 */
export const FEATURES = {
  /**
   * AI-powered "Ask a question" panel on /faq.
   * Off by default — uses an OpenAI API key the client doesn't currently
   * pay for. Re-enable once billing is in place.
   */
  aiFaq: false as boolean,
} as const;
