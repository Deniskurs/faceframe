/**
 * Acuity service catalog — GENERATED from the live Acuity account (owner 36291837).
 * Regenerate via migration tooling when services change in Acuity (see migration/README.md).
 * Generated 2026-07-05. Source of truth: the Acuity dashboard.
 */

export interface CatalogService {
  slug: string;
  acuityId: number;
  name: string;
  category: string;
  priceDisplay: string;
  durationDisplay: string;
  duration: number;
  description: string;
  consultationRequired: boolean;
  patchTest: boolean;
}

export interface CatalogCategory {
  id: string;
  /** Exact category name in Acuity */
  acuityName: string;
  /** Client-facing display name */
  displayName: string;
}

export interface CatalogPackage {
  name: string;
  priceDisplay: string;
  sessions: number;
  description: string;
  savings: string;
}

export const ACUITY_OWNER = "36291837";

/** Direct scheduler for ONE service — skips the list, opens its calendar */
export function serviceSchedulerUrl(acuityId: number): string {
  return `https://app.acuityscheduling.com/schedule.php?owner=${ACUITY_OWNER}&appointmentType=${acuityId}`;
}

/** Branded Acuity catalog — packages & gift certificates with cart */
export const PACKAGES_CATALOG_URL = `https://app.acuityscheduling.com/catalog.php?owner=${ACUITY_OWNER}`;

/** The free consultation & patch test service (gateway to all SPMU work) */
export const CONSULTATION_SLUG = "free-consultation-patch-test";

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    "id": "semi-permanent-makeup",
    "acuityName": "Semi-Permanent Make-up",
    "displayName": "Semi-Permanent Makeup"
  },
  {
    "id": "lashes-brows",
    "acuityName": "Lashes & Brows",
    "displayName": "Lashes & Brows"
  },
  {
    "id": "facials",
    "acuityName": "Facials",
    "displayName": "Facials"
  },
  {
    "id": "waxing",
    "acuityName": "Waxing",
    "displayName": "Waxing"
  },
  {
    "id": "saline-tattoo-removal",
    "acuityName": "Saline Tattoo Removal",
    "displayName": "Saline Tattoo Removal"
  }
];

export const CATALOG_SERVICES: CatalogService[] = [
  {
    "slug": "beauty-spots",
    "acuityId": 95376909,
    "name": "Beauty Spots",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£35",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "A small artificial beauty mark applied with permanent cosmetics — face, shoulder, neck, or anywhere on the body. Permanent placement of a single dark spot.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "brow-microblading",
    "acuityId": 95376913,
    "name": "Brow Microblading",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£295",
    "durationDisplay": "2 hours",
    "duration": 120,
    "description": "Semi-permanent technique for enhancing the appearance of the eyebrows, in which pigment is implanted into the skin in fine, short strokes resembling hair, using a hand tool with a blade formed of tiny needles. Shape and style is adapted to every client individually following their face features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test\n• Initial procedure\n• Touch up in 5-8 weeks",
    "consultationRequired": true,
    "patchTest": true
  },
  {
    "slug": "combination-brows",
    "acuityId": 95376915,
    "name": "Combination Brows",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£320",
    "durationDisplay": "2 hours",
    "duration": 120,
    "description": "The Combination Brows is a treatment that combines hair stroke simulation with a mist of colour using shading techniques with digital machine. Combining microblading with ombre powder together creates a more defined looking brow than just hairstrokes alone. Shape and style is adapted to every client individually following their face features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test",
    "consultationRequired": true,
    "patchTest": true
  },
  {
    "slug": "freckles",
    "acuityId": 95376912,
    "name": "Freckles",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£70",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Semi-permanent freckle tattoos — soft, natural-looking pigment dots that fade over 1–3 years.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "free-consultation-patch-test",
    "acuityId": 95376769,
    "name": "Free Consultation & Patch Test",
    "category": "semi-permanent-makeup",
    "priceDisplay": "Free",
    "durationDisplay": "15 min",
    "duration": 15,
    "description": "Skin suitability assessment for semi-permanent brow procedures. We discuss your goals and expectations, perform a colour match, and carry out an allergy patch test.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "ombre-brows",
    "acuityId": 95376914,
    "name": "Ombré Brows",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£295",
    "durationDisplay": "2 hours",
    "duration": 120,
    "description": "Semi- permanent make up treatment that uses either a digital machine to insert tiny dots of pigment into the skin. It creates a more shaded effect, rather than the crisp hair strokes that are often associated with microblading. Shape and style is adapted to every client individually following their face features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test\n• Initial procedure",
    "consultationRequired": true,
    "patchTest": true
  },
  {
    "slug": "spmu-brow-colour-boost-up-to-12-months",
    "acuityId": 95376918,
    "name": "SPMU Brow Colour Boost — up to 12 months",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£120",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Annual maintenance touch-up. Restores pigment depth and adjusts shape to suit your face today.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "spmu-brow-colour-boost-up-to-18-months",
    "acuityId": 95376920,
    "name": "SPMU Brow Colour Boost — up to 18 months",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£135",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Maintenance touch-up for clients up to 18 months post-procedure. Includes more substantial re-pigmentation work.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "spmu-brow-colour-boost-up-to-6-months",
    "acuityId": 95376916,
    "name": "SPMU Brow Colour Boost — up to 6 months",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£90",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Touch-up for existing clients within 6 months of their original treatment. Refreshes colour saturation while pigment is still strong.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "spmu-brow-colour-boost-up-to-9-months",
    "acuityId": 95376917,
    "name": "SPMU Brow Colour Boost — up to 9 months",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£100",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Touch-up for existing clients within 9 months of their original treatment. Light pigment refresh and shape correction.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "spmu-brow-correction-or-colour-boost-over-18-months",
    "acuityId": 95376921,
    "name": "SPMU Brow Correction or Colour Boost — over 18 months",
    "category": "semi-permanent-makeup",
    "priceDisplay": "£150",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Full correction or re-pigmentation for clients whose original treatment was over 18 months ago. May include shape redesign.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "classic-lash-extensions-full-set",
    "acuityId": 95376936,
    "name": "Classic Lash Extensions — Full Set",
    "category": "lashes-brows",
    "priceDisplay": "£60",
    "durationDisplay": "1h 30min",
    "duration": 90,
    "description": "Individual lash extensions applied one-to-one to natural lashes for a fuller, longer look.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "classic-lash-infill-2-weeks",
    "acuityId": 95376937,
    "name": "Classic Lash Infill — 2 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£35",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Maintenance infill for classic lash extensions, booked within 2 weeks of last appointment. Outgrown extensions are removed and new ones applied.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "classic-lash-infill-3-weeks",
    "acuityId": 95376938,
    "name": "Classic Lash Infill — 3 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£45",
    "durationDisplay": "45 min",
    "duration": 45,
    "description": "Maintenance infill for classic lash extensions, booked within 3 weeks. More fill required than 2-week infill.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "eyebrow-shaping",
    "acuityId": 95376925,
    "name": "Eyebrow Shaping",
    "category": "lashes-brows",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Wax, tweeze, and trim to define and tidy the brow shape.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "eyebrow-tint",
    "acuityId": 95376927,
    "name": "Eyebrow Tint",
    "category": "lashes-brows",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Colour and depth added to brow hairs and skin using professional brow tint.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "eyebrow-tint-wax",
    "acuityId": 95376930,
    "name": "Eyebrow Tint & Wax",
    "category": "lashes-brows",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Combination treatment — brow tint plus shaping wax in a single appointment.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "hybrid-lash-extensions-new-set",
    "acuityId": 95376940,
    "name": "Hybrid Lash Extensions — New Set",
    "category": "lashes-brows",
    "priceDisplay": "£65",
    "durationDisplay": "1h 30min",
    "duration": 90,
    "description": "Mix of individual classic lashes and small fan-style volume lashes for a textured, mid-density look.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "hybrid-lash-infill-2-weeks",
    "acuityId": 95376941,
    "name": "Hybrid Lash Infill — 2 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£40",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Maintenance infill for hybrid lash extensions, booked within 2 weeks of last appointment.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "hybrid-lash-infill-3-weeks",
    "acuityId": 95376942,
    "name": "Hybrid Lash Infill — 3 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£50",
    "durationDisplay": "45 min",
    "duration": 45,
    "description": "Maintenance infill for hybrid lash extensions, booked within 3 weeks.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lash-eyebrow-tint",
    "acuityId": 95376932,
    "name": "Lash & Eyebrow Tint",
    "category": "lashes-brows",
    "priceDisplay": "£25",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Combined lash and brow tint to deepen colour on both areas in one visit.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lash-extension-removal",
    "acuityId": 95376948,
    "name": "Lash Extension Removal",
    "category": "lashes-brows",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Professional removal of all lash extensions without damage to the natural lashes.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lash-lift-tint",
    "acuityId": 95376935,
    "name": "Lash Lift & Tint",
    "category": "lashes-brows",
    "priceDisplay": "£45",
    "durationDisplay": "45 min",
    "duration": 45,
    "description": "Lifts and curls natural lashes at the root for a wide-eyed effect, finished with a tint for added depth.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lash-tint",
    "acuityId": 95376928,
    "name": "Lash Tint",
    "category": "lashes-brows",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Adds depth, shine, and definition to natural lashes — particularly useful for fair lash colour.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lash-tint-eyebrow-tint-wax",
    "acuityId": 95376934,
    "name": "Lash Tint, Eyebrow Tint & Wax",
    "category": "lashes-brows",
    "priceDisplay": "£30",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Complete brow-and-lash refresh — lash tint, brow tint, and brow shaping in one appointment.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "men-s-eyebrow-shaping",
    "acuityId": 95376926,
    "name": "Men's Eyebrow Shaping",
    "category": "lashes-brows",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Wax, tweeze, and trim to tidy and neaten masculine brow shape without over-defining.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "volume-lash-extensions-new-set",
    "acuityId": 95376944,
    "name": "Volume Lash Extensions — New Set",
    "category": "lashes-brows",
    "priceDisplay": "£70",
    "durationDisplay": "1h 30min",
    "duration": 90,
    "description": "Fans of ultra-fine lash extensions applied to each natural lash for the densest, dramatic look.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "volume-lash-infill-2-weeks",
    "acuityId": 95376945,
    "name": "Volume Lash Infill — 2 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£40",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Maintenance infill for volume lash extensions, booked within 2 weeks of last appointment.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "volume-lash-infill-3-weeks",
    "acuityId": 95376947,
    "name": "Volume Lash Infill — 3 Weeks",
    "category": "lashes-brows",
    "priceDisplay": "£50",
    "durationDisplay": "45 min",
    "duration": 45,
    "description": "Maintenance infill for volume lash extensions, booked within 3 weeks.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "back-cleansing-facial",
    "acuityId": 95376961,
    "name": "Back Cleansing Facial",
    "category": "facials",
    "priceDisplay": "£60",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "A back cleansing facial is a targeted treatment that focuses on deep cleaning the skin on the back, an area prone to breakouts, clogged pores, and uneven texture. This facial typically includes cleansing, exfoliation, steam, and extractions to remove impurities and excess oil, followed by a soothing mask to hydrate and calm the skin. It helps to clear acne, reduce blemishes, and leave the back smooth and refreshed.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "deep-cleansing-facial",
    "acuityId": 95376950,
    "name": "Deep Cleansing Facial",
    "category": "facials",
    "priceDisplay": "£60",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "A deep cleansing facial is a thorough skin treatment designed to remove impurities, toxins, and dead skin cells from the face. It typically involves cleansing, exfoliation, steam, extractions, and a mask suited to each individual skin needs, leaving the skin refreshed, clear, and rejuvenated. Ideal for congested skin, this facial helps to unclog pores, reduce breakouts, and improve overall skin texture and tone.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "dermaplaning",
    "acuityId": 95376952,
    "name": "Dermaplaning",
    "category": "facials",
    "priceDisplay": "£50",
    "durationDisplay": "50 min",
    "duration": 50,
    "description": "Dermaplaning is a manual exfoliation procedure that gently abrades the dead layers of the skin using a surgical blade. The procedure aims to increase the absorption of skincare products and diminish fine lines and wrinkles. The treatment creates a healthy glow and a radiant complexion.\nDermaplane aims to make your skins surface smooth, youthful and radiant. It is also used to remove \"peach fuzz\" the short soft vellus nonterminal hair from your face.\n. Perfect for clients with congested, dry and dull skin.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "immaculate-peel",
    "acuityId": 95376955,
    "name": "Immaculate Peel",
    "category": "facials",
    "priceDisplay": "£55",
    "durationDisplay": "55 min",
    "duration": 55,
    "description": "A chemical peel enhances and smoothens the texture of the skin. It is an effective treatment for facial blemishes, wrinkles and uneven pigmentation, problematic skin and pustules. They exfoliate the outer layers of dead skin, revealing a new skin layer with improved tone, texture and colour.\n\nIt is designed to give near immediate results without the downtime often associated with chemical peels.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "men-s-facial",
    "acuityId": 95376949,
    "name": "Men's Facial",
    "category": "facials",
    "priceDisplay": "£65",
    "durationDisplay": "1h 5min",
    "duration": 65,
    "description": "The Men’s Facial is a revitalizing treatment tailored specifically for men’s skin, targeting issues like clogged pores, rough texture, and irritation from shaving. This facial includes a deep cleanse, exfoliation to remove dead skin cells, and a soothing mask to reduce redness and inflammation. It’s designed to hydrate, smooth, and refresh the skin, addressing common concerns such as ingrown hairs and environmental stress.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "microneedling",
    "acuityId": 95376953,
    "name": "Microneedling",
    "category": "facials",
    "priceDisplay": "£80",
    "durationDisplay": "1h 20min",
    "duration": 80,
    "description": "Microneedling is a treatment used on the face& bodyspecifically targeting acne scarring, pore size and fine lines & wrinkles. The act of Microneedling creates multiple superficial puncture wounds, releasing growth factors\nthat stimulate the fibroblasts creating new collagen and elastin.\nThe aim of the treatment is to traumatise the skin without collateral damage to the epidermis and healthy tissue.\nThe recovery is rapid with very little downtime, residual pain or discomfort.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "million-dollar-facial",
    "acuityId": 95376954,
    "name": "Million Dollar Facial",
    "category": "facials",
    "priceDisplay": "£100",
    "durationDisplay": "1h 40min",
    "duration": 100,
    "description": "Million Dollar Facial is a luxurious facial where science meets indulgence. Working the skin from the outside in, it has been designed to deeply exfoliate dead skin cells, remove non-terminal hair, flush toxins, increase cell turnover and stimulate collagen production.\nOur Million-dollar facial treatment is a 10-step unique protocol which combines dermaplaning, skin needling and lymphatic drainage massage to leave clients looking and feeling a million dollars.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "million-dollar-miracle-mask",
    "acuityId": 95376959,
    "name": "Million Dollar Miracle Mask",
    "category": "facials",
    "priceDisplay": "£55",
    "durationDisplay": "55 min",
    "duration": 55,
    "description": "Million Dollar Miracle Mask is a ground breaking facial mask packed with clinically proven ingredients. Leaving skin tighter, firmer and brighter.\n\nThe formula stimulates plasma into the deeper levels of the skin in order to enhance cellular renewal. Using the latest in peptide technology, this Miracle Mask has the unique ability to create micro circulation, promote collagen and detoxify skin.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "pregnacare-facial",
    "acuityId": 95376957,
    "name": "PregnaCare Facial",
    "category": "facials",
    "priceDisplay": "£55",
    "durationDisplay": "55 min",
    "duration": 55,
    "description": "The Pampering Cleansing & Hydrating Facial for Pregnant Women is a gentle, nourishing treatment designed to address the unique skincare needs of expectant mothers. This facial uses pregnancy-safe products to deeply cleanse, hydrate, and soothe sensitive skin without any harsh chemicals. It includes a gentle cleanse, light exfoliation, pore cleanse, calming mask, and a hydrating serum to restore moisture, leaving skin soft, glowing, and refreshed.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "back-wax",
    "acuityId": 95376987,
    "name": "Back Wax",
    "category": "waxing",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of back hair using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "bikini-line-wax",
    "acuityId": 95376980,
    "name": "Bikini Line Wax",
    "category": "waxing",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from outside the knicker line.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "brazilian-bikini-wax",
    "acuityId": 95376983,
    "name": "Brazilian Bikini Wax",
    "category": "waxing",
    "priceDisplay": "£35",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of most bikini hair, leaving a small landing strip.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "brow-lip-wax",
    "acuityId": 95376965,
    "name": "Brow & Lip Wax",
    "category": "waxing",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Eyebrow wax combined with upper-lip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "brow-lip-chin-wax",
    "acuityId": 95376964,
    "name": "Brow, Lip & Chin Wax",
    "category": "waxing",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Eyebrow wax with upper-lip wax and chin wax in one appointment.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "chest-wax",
    "acuityId": 95376988,
    "name": "Chest Wax",
    "category": "waxing",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of chest hair using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "chin-wax",
    "acuityId": 95376966,
    "name": "Chin Wax",
    "category": "waxing",
    "priceDisplay": "£6",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of any hair from the chin area using wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "extended-bikini-wax",
    "acuityId": 95376982,
    "name": "Extended Bikini Wax",
    "category": "waxing",
    "priceDisplay": "£30",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal further beyond the standard knicker line.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "eyebrow-wax",
    "acuityId": 95376962,
    "name": "Eyebrow Wax",
    "category": "waxing",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Shaping using wax, finished with tweezing and trimming where needed.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "facial-sides-wax",
    "acuityId": 95376972,
    "name": "Facial Sides Wax",
    "category": "waxing",
    "priceDisplay": "£8",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from the sides of the face using wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "full-leg-wax",
    "acuityId": 95376979,
    "name": "Full Leg Wax",
    "category": "waxing",
    "priceDisplay": "£30",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Complete leg hair removal — thigh to ankle — using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "full-or-3-4-arm-wax",
    "acuityId": 95376976,
    "name": "Full or 3/4 Arm Wax",
    "category": "waxing",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from the full or three-quarter length of the arm.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "half-arm-wax",
    "acuityId": 95376975,
    "name": "Half Arm Wax",
    "category": "waxing",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from the forearm (elbow down) or upper arm.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "half-leg-wax-lower",
    "acuityId": 95376978,
    "name": "Half Leg Wax — Lower",
    "category": "waxing",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from the knee down using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "half-leg-wax-upper",
    "acuityId": 95376977,
    "name": "Half Leg Wax — Upper",
    "category": "waxing",
    "priceDisplay": "£20",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal from the thigh using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "hollywood-bikini-wax",
    "acuityId": 95376984,
    "name": "Hollywood Bikini Wax",
    "category": "waxing",
    "priceDisplay": "£35",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Full removal of all bikini hair.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "lip-wax",
    "acuityId": 95376970,
    "name": "Lip Wax",
    "category": "waxing",
    "priceDisplay": "£5",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of upper-lip hair using wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "men-s-brow-wax",
    "acuityId": 95376963,
    "name": "Men's Brow Wax",
    "category": "waxing",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Tidy and shape men's brows using wax, tweezers, and scissors for a clean, masculine finish.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "nose-wax",
    "acuityId": 95376971,
    "name": "Nose Wax",
    "category": "waxing",
    "priceDisplay": "£6",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of nose hair using hot wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "stomach-wax",
    "acuityId": 95376986,
    "name": "Stomach Wax",
    "category": "waxing",
    "priceDisplay": "£15",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Removal of stomach hair using strip wax.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "underarm-wax",
    "acuityId": 95376974,
    "name": "Underarm Wax",
    "category": "waxing",
    "priceDisplay": "£10",
    "durationDisplay": "30 min",
    "duration": 30,
    "description": "Hair removal under the arms.",
    "consultationRequired": false,
    "patchTest": false
  },
  {
    "slug": "saline-tattoo-removal-single-session",
    "acuityId": 95376923,
    "name": "Saline Tattoo Removal — Single Session",
    "category": "saline-tattoo-removal",
    "priceDisplay": "£45",
    "durationDisplay": "1 hour",
    "duration": 60,
    "description": "Lightens or removes existing semi-permanent makeup using a saline solution to draw pigment back out of the skin. Each client typically needs 3–6 sessions spaced 6–8 weeks apart.",
    "consultationRequired": true,
    "patchTest": false
  }
];

export const CATALOG_PACKAGES: CatalogPackage[] = [
  {
    "name": "Saline Tattoo Removal — 3 Session Package",
    "priceDisplay": "£120",
    "sessions": 3,
    "description": "Three saline tattoo-removal sessions at a discounted rate. Sessions spaced 6–8 weeks apart.",
    "savings": "Save £15 vs single sessions"
  },
  {
    "name": "Saline Tattoo Removal — 6 Session Package",
    "priceDisplay": "£230",
    "sessions": 6,
    "description": "Six sessions for full removal of denser pigment. Sessions spaced 6–8 weeks apart.",
    "savings": "Save £40 vs single sessions"
  }
];
