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
 * BOOKING — Acuity Scheduling configuration.
 *
 * When live Acuity URLs are ready, fill these in. While `acuityUrl` is null,
 * every booking CTA falls back to `/booking` (the shell page) so nothing
 * breaks. The shell page itself will swap a "coming soon" panel for the
 * embedded Acuity widget once `acuityEmbedHtml` is provided.
 *
 * Per-service deep links use Acuity's `appointmentType` query param.
 */
export const BOOKING = {
  /** Master Acuity scheduling URL (e.g. https://app.acuityscheduling.com/schedule.php?owner=XXXXXX) */
  acuityUrl: null as string | null,
  /** Optional dedicated services / category page on Acuity */
  servicesUrl: null as string | null,
  /** Raw <iframe> snippet from Acuity for embedding on /booking */
  acuityEmbedHtml: null as string | null,
  /** Acuity appointmentType IDs per service — fill in when ready */
  serviceIds: {
    "semi-permanent-makeup": null as string | null,
    "microblading": null as string | null,
    "lash-extensions": null as string | null,
    "lash-lift-tint": null as string | null,
    "brow-styling": null as string | null,
    "luxury-facials": null as string | null,
    "consultation": null as string | null,
  },
} as const;

/**
 * Resolves the URL a booking CTA should point to.
 * - If Acuity is live → external Acuity URL (optionally per-service)
 * - Otherwise → /booking shell page (which keeps the user on-site)
 */
export function getBookingHref(serviceKey?: keyof typeof BOOKING.serviceIds): string {
  const base = BOOKING.acuityUrl;
  if (!base) return "/booking";
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
  sendMessage: "SEND MESSAGE",
} as const;

export const SITE = {
  /** Public production URL — used for canonical, OG, sitemap. */
  url: "https://faceframebeauty.com",
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
