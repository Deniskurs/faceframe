# FaceFrame Beauty — Acuity Migration

Files for migrating FaceFrame Beauty's service catalogue from Booksolo into Acuity Scheduling.

> **STATUS: MIGRATION EXECUTED 2026-07-05.** All 60 appointment types, 2 add-ons,
> and 2 packages are live in Acuity (owner `36291837`), entered via browser
> automation against the dashboard's internal API and verified field-by-field
> against this workbook via the read-only public API (zero mismatches).
> Account fixes applied: timezone Europe/London (was Casablanca!), country GB,
> business name "FaceFrame Beauty", single calendar "Face Frame" (deleted
> "Private Studio"), scheduling page styled with brand palette + Libre
> Baskerville.
>
> **Website integration (2026-07-05, v2 — native journey):** the site no longer
> embeds Acuity's 60-row list. `/booking` hosts a native journey
> (`src/components/booking/BookingJourney.tsx`): category pills → treatment
> rows (site design system, expandable descriptions, consultation-first badges)
> → Acuity iframe scoped to ONE service via `appointmentType=<id>` (calendar +
> form only). Deep links: `?category=<id>`, `?service=<slug>`. Packages & gift
> certificates surface natively and purchase via
> `catalog.php?owner=36291837`. Service data lives in
> `src/data/acuityCatalog.ts` — GENERATED from the live account; regenerate it
> if services change in Acuity (names/prices/durations/descriptions/IDs).
>
> **Client account portal (2026-07-05, v3):** `/account` is a native "My
> Account" surface backed by our own API routes (`src/app/api/account/*`),
> which call the Acuity ADMIN API server-side (`src/lib/acuityAccount.ts` —
> credentials never reach the browser). Access = email + phone matched
> against the client's booking records → signed HttpOnly session cookie
> (`ACCOUNT_SESSION_SECRET` in `.env.local`). Shows upcoming appointments
> (per-appointment Acuity `confirmationPage` manage links), history with
> "book again" journey deep-links, package certificates w/ remaining
> sessions + codes, and an offers block. Header/mobile LOGIN routes here.
> "Powered by Acuity" watermark disabled in Settings → Customization.
> A test client record exists in Acuity (faceframe.byvil+testclient@gmail.com,
> one canceled Eyebrow Shaping) — harmless, may be deleted in the dashboard.
>
> **Outstanding (owner actions):**
> 1. Connect Stripe (Settings → Payments) — account has NO processor yet; then
>    enable "Require credit card to book" globally, leave auto-charge OFF.
> 2. Confirm Ombré Brows £295 (owner's sheet said £15, assumed typo).
> 3. Acuity caps descriptions at 512 bytes — 11 long descriptions were trimmed
>    at sentence boundaries (originals in `build_workbook.py`). Review in
>    dashboard if desired.
> 4. Set business hours / availability on the "Face Frame" calendar.
> 5. Create the 4 intake forms (SPMU, Skin Consent, Tint Patch Test, Pregnancy)
>    and attach to services — see Pre-flight tab.
>
> **Acuity-side scheduler styling (2026-07-05):** Acuity's new scheduling page ignores the
> "Advanced CSS" box (legacy-template only) — styling is driven by the 5-slot
> palette + font in Scheduling Page → Styles. Applied: ivory ramp
> `#FAF6F1 / #EFE4D8 / #C9A88A / #7F5539 / #2C2420` (ivory bg blends with the
> site instead of a solid cream slab; noir text/CTAs match site buttons) and
> **Libre Baskerville** (closest available to Alice). Start-time intervals set
> to **30 min** (was 5-min wall). Verified desktop + 390px mobile.

## Files

| File | Purpose |
|---|---|
| `acuity-import.xlsx` | **The main artefact.** Open this in Excel / Numbers / Google Sheets. Seven tabs, walk them in order. |
| `build_workbook.py` | Generator script. Run if data is updated. |
| `booksolo_raw.py` | Verbatim Booksolo data — Python list, imported by the builder. |
| `booksolo-source.json` | Same data as JSON for non-Python consumers. |
| `merged-services.json` | Owner-merged dataset (2026-07-05) — canonical 60-service list used for the import. |
| `acuity-payloads.json` | Exact payloads pushed to Acuity's internal API — audit record of what was entered. |
| `.venv/` | Local virtualenv for openpyxl (gitignored). |

## Why no API auto-import

Acuity Scheduling's public API is **read-only** for appointment types. There is no `POST /appointment-types` endpoint. Services must be entered through the Acuity dashboard UI. This workbook is built to make that manual entry as fast and error-free as possible.

The only alternatives to manual entry are (a) browser automation against the Acuity dashboard (fragile, not worth it for a one-time 60-service migration) or (b) switching to a different booking platform (Cal.com, Square, Fresha) that supports service creation via API.

## Workflow

1. Open `acuity-import.xlsx`.
2. Read the **README** tab.
3. Work the **Pre-flight** tab end-to-end (account setup, payments, intake forms, business hours, branding). Do not skip — every item gates the next phase.
4. Skim the **Categories** tab so the canonical names and colours are in mind.
5. **AppointmentTypes** tab — 60 services. Open Acuity → Appointment Types → "New Type of Service" and copy each row across. The column order matches the form. Tick each row's `✓` checkbox column as you go.
6. **Add-ons** tab — 2 items. Acuity → Appointment Types → Add-ons.
7. **Packages** tab — 2 bundles. Acuity → Sell → Packages, Gift Certificates & Subscriptions.
8. **Source-Booksolo** tab — read-only audit reference; do not edit.

Estimated time for steps 5–7 with focus: **2–2.5 hours**.

## Key decisions baked in

These are deliberate departures from the raw Booksolo data — review before importing.

- **Free Consultation duration set to 15 min.** Booksolo had it at `0`; Acuity requires a duration. £0 price retained.
- **Saline 3/6 session bundles moved to Packages.** Booksolo listed them as single 180-min and 360-min appointments — almost certainly a misuse. Re-modelled as packages of 3 and 6 credits, each redeemable against the single 60-min saline session.
- **Two "Add on" entries moved to the Add-ons tab.** Acuity's add-on mechanic is the right fit and they no longer clutter the appointment-types list.
- **Padding added per category.** 5 min for waxing/tints, 10 min for facials, 15 min for SPMU and microneedling (preparation + cleanup time).
- **Touch-up explicitly called out for SPMU.** Microblading / Ombré / Combination Brows all bundle a 5–8 week touch-up. Recommend creating a private appointment type `SPMU Touch-Up (Included)` so Iggy can book those follow-ups without taking another payment.
- **Brand colour assigned per category.** Drives calendar-view visual grouping in Acuity.
- **Service names normalised to title case** and apostrophes fixed (smart-quote sanitised).
- **Descriptions rewritten** for the five SPMU colour-boost variants (Booksolo used the same description verbatim for all five).
- **Suspicious durations flagged** in the `Notes for Iggy` column — several waxing services were 30 min on Booksolo (lip, chin, nose); industry standard is 15 min. Men's Facial 65 min / £65 also flagged as likely a data-entry coincidence on Booksolo's side.

## Regenerating the workbook

```sh
cd migration
python3 -m venv .venv
.venv/bin/pip install openpyxl
.venv/bin/python build_workbook.py
```

Edit `build_workbook.py` (the `APPOINTMENT_TYPES`, `ADDONS`, `PACKAGES`, `PREFLIGHT` lists) and re-run to regenerate.

## Owner content merge (2026-07-05)

Iggy returned an edited copy of this workbook (`FaceFrame Services.xlsx`) with her real
descriptions and aftercare messages. Merged into `build_workbook.py` and regenerated:

- **24 services updated** — authentic descriptions (SPMU brows, facials) and detailed
  post-booking aftercare (lash extensions, lash lift, facials, tints/waxes).
- **Whitespace sanitised** — copy-paste artifacts (multiple spaces, trailing blanks) collapsed.
- **Free Consultation post-booking message removed** — owner wrote "No need for post message."
- **Ombré Brows price restored to £295** — owner's sheet said **£15**, almost certainly a typo
  (Microblading £295, Booksolo had £285, 2-hour procedure). CONFIRM before entering.
- Her copy's Pre-flight tab was an older revision — the confirmed payment-policy rows
  (card-on-file, no deposit, manual charging) in this workbook are newer and were kept.
- Categories / Add-ons / Packages: no owner changes.

## What I'd love confirmed before Iggy starts typing

1. **Acuity plan tier** — Packages require Standard or higher. Confirm before importing.
2. **Currency** — set to GBP first; cannot be changed afterwards without contacting Acuity support.
3. **Ombré Brows price** — owner's sheet said £15; £295 restored as an assumed typo.
4. **The five flagged durations** — owner left them unchanged (lip/chin/nose wax 30min, full leg wax 30min, Men's Facial 65min/£65). Treat as unconfirmed.
5. **Whether Iggy wants the touch-up booking flow** described above — if yes, add one private appointment type.

## Payment & cancellation policy (confirmed with Iggy 2026-05-13)

- Stripe is already connected on Iggy's account.
- Card-on-file required to book — every appointment type, globally.
- No deposit at booking.
- 100% charge for no-shows or cancellations/reschedules within 48 hours — **at Iggy's discretion**. Exception: genuine illness or emergency, no charge.
- Auto-charging is therefore **OFF** in Acuity. Iggy charges manually from the appointment record when she decides the fee applies.
- Same rule applies to every service — no per-service overrides.
