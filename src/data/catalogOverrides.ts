/**
 * Editorial description overrides — hand-written copy that replaces the
 * generated Acuity descriptions where the source text contains typos,
 * run-ons, or off-brand phrasing. Keyed by service slug (see
 * CATALOG_SERVICES in acuityCatalog.ts). Applied at the bottom of
 * acuityCatalog.ts so they survive catalog regeneration.
 *
 * Verified slugs (all present in CATALOG_SERVICES, 2026-07-12):
 * brow-microblading, combination-brows, ombre-brows, deep-cleansing-facial,
 * dermaplaning, immaculate-peel, men-s-facial, microneedling,
 * million-dollar-facial, million-dollar-miracle-mask.
 * A dev-time console.warn in acuityCatalog.ts flags any slug that drifts.
 */

export const DESCRIPTION_OVERRIDES: Record<string, string> = {
  "brow-microblading":
    "A semi-permanent technique for enhancing the appearance of the eyebrows, in which pigment is implanted into the skin in fine, short strokes resembling hair, using a hand tool with a blade formed of tiny needles. Shape and style are adapted to each client individually, following their facial features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test\n• Initial procedure\n• Touch-up in 5–8 weeks",

  "combination-brows":
    "Combination brows pair hair-stroke simulation with a soft mist of colour, applied with shading techniques using a digital machine. Bringing microblading and ombré powder together creates a more defined brow than hair strokes alone. Shape and style are adapted to each client individually, following their facial features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test",

  "ombre-brows":
    "A semi-permanent make-up treatment in which a digital machine inserts tiny dots of pigment into the skin, creating a soft, shaded effect rather than the crisp hair strokes associated with microblading. Shape and style are adapted to each client individually, following their facial features, skin and preferences.\n\nIncluded in the price:\n• Free consultation and a patch test\n• Initial procedure",

  "deep-cleansing-facial":
    "A thorough skin treatment designed to remove impurities, toxins and dead skin cells from the face. It involves cleansing, exfoliation, steam, extractions and a mask suited to your individual skin needs, leaving the skin refreshed, clear and rejuvenated. Ideal for congested skin, it helps to unclog pores, reduce breakouts and improve overall texture and tone.",

  dermaplaning:
    "Dermaplaning is a manual exfoliation procedure that gently lifts away the dead outer layers of the skin using a surgical blade, helping skincare products absorb more effectively and softening the appearance of fine lines and wrinkles. It leaves the skin’s surface smooth and radiant, and also removes the short, soft vellus hair — often called peach fuzz — from the face. Particularly suited to congested, dry or dull skin.",

  "immaculate-peel":
    "A chemical peel that enhances and smooths the texture of the skin — an effective treatment for facial blemishes, wrinkles, uneven pigmentation, problematic skin and pustules. The peel exfoliates the outer layers of dead skin, revealing a new layer with improved tone, texture and colour.\n\nIt is designed to give near-immediate results without the downtime often associated with chemical peels.",

  "men-s-facial":
    "The men’s facial is a revitalising treatment tailored to men’s skin, targeting clogged pores, rough texture and irritation from shaving. It includes a deep cleanse, exfoliation to remove dead skin cells, and a soothing mask to reduce redness and inflammation — designed to hydrate, smooth and refresh the skin while addressing concerns such as ingrown hairs and environmental stress.",

  microneedling:
    "Microneedling is a treatment for the face and body that targets acne scarring, pore size, fine lines and wrinkles. It creates multiple superficial micro-channels in the skin, releasing growth factors that stimulate the fibroblasts to produce new collagen and elastin, without collateral damage to the epidermis or the surrounding healthy tissue. Recovery is rapid, with very little downtime, residual pain or discomfort.",

  "million-dollar-facial":
    "The Million Dollar Facial works the skin from the outside in — designed to deeply exfoliate dead skin cells, remove non-terminal hair, flush toxins, increase cell turnover and stimulate collagen production.\n\nThis ten-step protocol combines dermaplaning, skin needling and lymphatic drainage massage to leave clients looking and feeling a million dollars.",

  "million-dollar-miracle-mask":
    "The Million Dollar Miracle Mask is a facial mask packed with clinically proven ingredients, leaving the skin tighter, firmer and brighter.\n\nThe formula stimulates plasma into the deeper levels of the skin to enhance cellular renewal. Using the latest peptide technology, the mask creates micro-circulation, promotes collagen and detoxifies the skin.",
};
