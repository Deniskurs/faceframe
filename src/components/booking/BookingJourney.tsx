"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, Gift } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import {
  CATALOG_CATEGORIES,
  CATALOG_PACKAGES,
  CATALOG_SERVICES,
  CONSULTATION_SLUG,
  PACKAGES_CATALOG_URL,
  serviceSchedulerUrl,
  type CatalogService,
} from "@/data/acuityCatalog";
import { FEATURES } from "@/config/business";
import { NativeScheduler } from "@/components/booking/NativeScheduler";

const PACKAGES_TAB = "packages";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: LUXURY_EASING },
};

const SERVICE_BY_SLUG: Record<string, CatalogService> = Object.fromEntries(
  CATALOG_SERVICES.map((s) => [s.slug, s]),
);

/** One consistent duration format everywhere: 90 → "1 hr 30 min" */
function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hr${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} min`);
  return parts.join(" ") || `${mins} min`;
}

/**
 * Native booking journey — service selection lives in the site's own design
 * system; Acuity appears only at the final step, scoped to ONE treatment
 * (its calendar + client-details form). Clients never see the raw 60-row
 * scheduler list.
 *
 * URL contract (shareable / deep-linkable):
 *   ?category=<category-id>  → journey opens on that category
 *   ?service=<service-slug>  → straight to that treatment's calendar
 */
export function BookingJourney() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramService = searchParams.get("service");
  const paramCategory = searchParams.get("category");

  const selected = paramService ? SERVICE_BY_SLUG[paramService] ?? null : null;
  // Deep links to slugs no longer in the catalog fall back to the list —
  // with a notice, and the dead param cleaned from the URL below.
  const staleService = Boolean(paramService) && !selected;
  const [staleNotice, setStaleNotice] = useState(false);
  const activeCategory =
    paramCategory === PACKAGES_TAB
      ? PACKAGES_TAB
      : CATALOG_CATEGORIES.some((c) => c.id === paramCategory)
        ? (paramCategory as string)
        : CATALOG_CATEGORIES[0].id;

  // How many history entries this journey has pushed (entering the scheduler
  // pushes; everything else replaces). Lets "All treatments" call
  // router.back() when we own the previous entry, so browser history never
  // accumulates duplicates — while direct deep links still fall back to
  // replace instead of leaving the site.
  const pushCountRef = useRef(0);

  const setParams = useCallback(
    (
      next: { category?: string | null; service?: string | null },
      mode: "replace" | "push" = "replace",
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(next)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      // push when entering the scheduler so browser-back returns to the list
      if (mode === "push") {
        pushCountRef.current += 1;
        router.push(url, { scroll: false });
      } else {
        router.replace(url, { scroll: false });
      }
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    if (!staleService || !paramService) return;
    setStaleNotice(true);
    setParams({ service: null });
  }, [staleService, paramService, setParams]);

  const goBackToList = useCallback(
    (category: string) => {
      if (pushCountRef.current > 0) {
        pushCountRef.current -= 1;
        router.back();
      } else {
        setParams({ service: null, category });
      }
    },
    [router, setParams],
  );

  const consultation: CatalogService | undefined = SERVICE_BY_SLUG[CONSULTATION_SLUG];

  return (
    <div>
      {/* Acuity's resizer keeps the scoped iframe at its natural height */}
      <Script
        src="https://embed.acuityscheduling.com/js/embed.js"
        strategy="lazyOnload"
      />

      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <ScheduleStep
            key={`schedule-${selected.slug}`}
            service={selected}
            consultation={consultation}
            onBack={() => goBackToList(selected.category)}
            onBookConsultation={
              consultation
                ? () => setParams({ service: consultation.slug, category: null }, "push")
                : undefined
            }
          />
        ) : (
          <motion.div key="select" {...fade}>
            {staleNotice && (
              <p className="mb-6 border border-elegant-mocha/15 bg-light-cream/30 rounded-sm px-5 py-3 font-alice text-sm text-elegant-mocha/85 leading-relaxed tracking-wide text-center">
                That treatment is no longer offered — browse the current menu below.
              </p>
            )}
            <SelectStep
              activeCategory={activeCategory}
              onCategory={(id) => setParams({ category: id, service: null })}
              onService={(slug) => setParams({ service: slug, category: null }, "push")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1+2 — category pills + treatment rows                          */
/* ------------------------------------------------------------------ */

function SelectStep({
  activeCategory,
  onCategory,
  onService,
}: {
  activeCategory: string;
  onCategory: (id: string) => void;
  onService: (slug: string) => void;
}) {
  const services = useMemo(() => {
    const list = CATALOG_SERVICES.filter((s) => s.category === activeCategory);
    // the free consultation gates all SPMU work — pin it first
    return [...list].sort((a, b) => {
      if (a.slug === CONSULTATION_SLUG) return -1;
      if (b.slug === CONSULTATION_SLUG) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [activeCategory]);

  const stripRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  // keep the active pill visible on mobile (deep links land mid-strip).
  // Deterministic scrollTo — smooth scrollIntoView gets swallowed during
  // mount animations, and we must not scroll the page itself.
  useEffect(() => {
    const center = () => {
      const strip = stripRef.current;
      if (!strip) return;
      setOverflowing(strip.scrollWidth > strip.clientWidth + 4);
      const active = strip.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      const target = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
      strip.scrollTo({ left: Math.max(0, target) });
    };
    const raf = requestAnimationFrame(center);
    const retry = setTimeout(center, 350); // fonts/layout settling
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(retry);
    };
  }, [activeCategory]);

  return (
    <div>
      {/* Category pills */}
      <div className="relative -mx-6 sm:mx-0">
        <div
          ref={stripRef}
          className="flex gap-2.5 sm:gap-3 sm:flex-wrap sm:justify-center overflow-x-auto sm:overflow-visible
                     pb-2 sm:pb-0 px-6 sm:px-0 scrollbar-hide"
          role="group"
          aria-label="Treatment categories"
        >
          {CATALOG_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.displayName}
              active={activeCategory === cat.id}
              onClick={() => onCategory(cat.id)}
            />
          ))}
        </div>
        {/* overflow cue while the strip scrolls (mobile) */}
        {overflowing && (
          <span
            aria-hidden="true"
            className="sm:hidden pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent"
          />
        )}
      </div>

      {/* Commerce entry point — deliberately separate from treatment filters */}
      <div className="mt-5 text-center sm:text-right">
        <button
          type="button"
          onClick={() => onCategory(PACKAGES_TAB)}
          aria-pressed={activeCategory === PACKAGES_TAB}
          className={`inline-flex items-center gap-1.5 font-alta text-xs tracking-refined uppercase transition-colors duration-300 py-2 ${
            activeCategory === PACKAGES_TAB
              ? "text-elegant-mocha"
              : "text-deep-bronze hover:text-elegant-mocha"
          }`}
        >
          <Gift className="w-3.5 h-3.5" aria-hidden="true" />
          Packages &amp; Gift Certificates
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={activeCategory} {...fade} className="mt-6 sm:mt-8">
          {activeCategory === PACKAGES_TAB ? (
            <PackagesPanel />
          ) : (
            <Accordion type="single" collapsible className="border-t-hairline border-elegant-mocha/15">
              {services.map((service) => (
                <ServiceRow key={service.slug} service={service} onBook={onService} />
              ))}
            </Accordion>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-full border font-alta text-xs sm:text-sm tracking-wider transition-all duration-300 ${
        active
          ? "bg-deep-bronze text-light-cream border-deep-bronze shadow-md"
          : "bg-white text-elegant-mocha border-elegant-mocha/25 hover:border-elegant-mocha/50 hover:shadow-sm"
      }`}
    >
      {label}
    </button>
  );
}

/** Splits "…\n\nIncluded in the price:\n• a\n• b" into prose + bullet lines. */
function splitDescription(description: string): { prose: string; included: string[] } {
  const marker = "Included in the price:";
  const idx = description.indexOf(marker);
  if (idx === -1) return { prose: description.trim(), included: [] };
  const included = description
    .slice(idx + marker.length)
    .split("\n")
    .map((line) => line.replace(/^\s*•\s*/, "").trim())
    .filter(Boolean);
  return { prose: description.slice(0, idx).trim(), included };
}

function ServiceRow({
  service,
  onBook,
}: {
  service: CatalogService;
  onBook: (slug: string) => void;
}) {
  const isConsultation = service.slug === CONSULTATION_SLUG;
  const { prose, included } = useMemo(
    () => splitDescription(service.description),
    [service.description],
  );

  // Long descriptions clamp to three lines with a quiet toggle — shown only
  // when the prose actually overflows. The accordion unmounts its content
  // while closed, so the element arrives via a state ref and a ResizeObserver
  // measures the moment it gains real dimensions.
  const [proseEl, setProseEl] = useState<HTMLParagraphElement | null>(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded || !proseEl) return; // unclamped prose never overflows — keep the toggle
    const observer = new ResizeObserver(() => {
      if (proseEl.clientHeight > 0) {
        setOverflows(proseEl.scrollHeight > proseEl.clientHeight + 1);
      }
    });
    observer.observe(proseEl);
    return () => observer.disconnect();
  }, [proseEl, expanded]);

  return (
    <AccordionItem
      value={service.slug}
      className={`border-b-hairline border-elegant-mocha/15 ${isConsultation ? "bg-soft-blush/10 -mx-3 px-3 rounded-sm" : ""}`}
    >
      <AccordionTrigger className="group py-5 hover:no-underline [&>svg]:text-elegant-mocha/40">
        <div className="flex items-baseline justify-between gap-4 w-full pr-2 text-left">
          <div className="min-w-0">
            <span className="font-alice text-base sm:text-lg text-elegant-mocha tracking-wide group-hover:text-deep-bronze transition-colors duration-300">
              {service.name}
            </span>
            {service.consultationRequired && (
              <span className="ml-3 inline-block align-middle font-alta text-xs tracking-editorial uppercase text-deep-bronze border border-deep-bronze/30 rounded-full px-2.5 py-0.5">
                Consultation first
              </span>
            )}
          </div>
          <span className="shrink-0 flex items-center font-alta text-xs sm:text-sm tracking-widest text-elegant-mocha/80">
            {/* Fixed columns: clocks and prices align vertically across rows */}
            <span className="flex w-[110px] sm:w-[128px] items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0 opacity-60" aria-hidden="true" />
              {formatDuration(service.duration)}
            </span>
            <span className="w-[48px] sm:w-[56px] text-right text-elegant-mocha tabular-nums">
              {service.priceDisplay}
            </span>
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-6">
        <div className="sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl min-w-0">
            <p
              ref={setProseEl}
              className={`font-alice text-sm sm:text-base text-elegant-mocha/80 leading-relaxed tracking-wide whitespace-pre-line ${expanded ? "" : "line-clamp-3"}`}
            >
              {prose}
            </p>
            {overflows && (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
                className="min-h-[44px] -mb-2 font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-300"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
            {included.length > 0 && (
              <div className="mt-4">
                <p className="font-alta text-xs tracking-refined uppercase text-elegant-mocha/70 mb-2">
                  Included in the price
                </p>
                <ul className="space-y-1.5">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide"
                    >
                      <span aria-hidden="true" className="shrink-0 mt-2.5 w-3 h-px bg-deep-bronze/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-5 sm:mt-0 shrink-0">
            <button
              type="button"
              onClick={() => onBook(service.slug)}
              className="inline-block font-alta text-xs tracking-luxury uppercase px-8 py-3.5 bg-elegant-mocha text-white border border-elegant-mocha rounded-sm hover:bg-deep-bronze hover:border-deep-bronze transition-colors duration-300"
            >
              Choose a time
            </button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

/* ------------------------------------------------------------------ */
/* Packages & gift certificates                                        */
/* ------------------------------------------------------------------ */

function PackagesPanel() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {CATALOG_PACKAGES.map((pkg) => (
          <article
            key={pkg.name}
            className="flex flex-col h-full border border-elegant-mocha/15 rounded-sm p-7 bg-light-cream/20"
          >
            <p className="font-alta text-xs tracking-luxury uppercase text-deep-bronze mb-3">
              {pkg.sessions} sessions
            </p>
            <h3 className="font-alice text-xl text-elegant-mocha tracking-wide mb-3">
              {pkg.name}
            </h3>
            <p className="font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide mb-5">
              {pkg.description}
            </p>
            <div className="mt-auto">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-alice text-xl text-elegant-mocha tabular-nums">
                  {pkg.priceDisplay}
                </span>
                <span className="font-alta text-xs tracking-refined uppercase text-deep-bronze whitespace-nowrap">
                  {pkg.savings}
                </span>
              </div>
              <a
                href={PACKAGES_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] font-alta text-xs tracking-luxury uppercase px-6 py-3 border border-elegant-mocha/40 text-elegant-mocha rounded-sm hover:bg-elegant-mocha hover:text-white transition-colors duration-300"
              >
                Purchase
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center font-alta text-xs tracking-widest uppercase text-elegant-mocha/80 mt-6">
        Checkout opens in Acuity, our secure booking partner
      </p>
      <p className="text-center font-alice text-sm text-elegant-mocha/80 tracking-wide mt-4">
        Looking to treat someone? Gift certificates are available for any amount{" "}
        <a
          href={PACKAGES_CATALOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
        >
          via the same secure checkout
        </a>
        . Codes are emailed instantly and redeemed at booking.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — scoped Acuity scheduler for ONE treatment                  */
/* ------------------------------------------------------------------ */

function ScheduleStep({
  service,
  consultation,
  onBack,
  onBookConsultation,
}: {
  service: CatalogService;
  consultation?: CatalogService;
  onBack: () => void;
  onBookConsultation?: () => void;
}) {
  const isConsultation = service.slug === consultation?.slug;
  const gated = service.consultationRequired && !isConsultation && Boolean(onBookConsultation);

  // Gated treatments ask about the consultation before any calendar renders;
  // "Yes" reveals the scheduler for this visit only (state resets per service
  // — ScheduleStep is keyed by slug).
  const [consultationConfirmed, setConsultationConfirmed] = useState(false);
  const showCalendar = !gated || consultationConfirmed;

  const [schedulerLoaded, setSchedulerLoaded] = useState(false); // veil lift
  const [iframeLoaded, setIframeLoaded] = useState(false); // real onLoad
  const [loadStalled, setLoadStalled] = useState(false);

  // Native scheduler by default; any availability failure flips this row to
  // the embedded Acuity iframe below — same journey, zero dead ends.
  const [iframeFallback, setIframeFallback] = useState(false);
  const useNative = FEATURES.nativeBooking && !iframeFallback;

  // Scroll the step header into view when arriving via deep link / selection.
  useEffect(() => {
    document.getElementById("booking-journey-top")?.scrollIntoView({ block: "nearest" });
  }, [service.slug]);

  // Fallback timer: the iframe's load event can fire BEFORE hydration attaches
  // onLoad (SSR + fast cache), which would leave the calendar invisible — lift
  // the veil at 4s regardless. If onLoad still hasn't fired by 10s, surface a
  // quiet escape hatch beneath the (still mounted) iframe.
  useEffect(() => {
    if (!showCalendar || useNative) return;
    setSchedulerLoaded(false);
    setIframeLoaded(false);
    setLoadStalled(false);
    const veil = setTimeout(() => setSchedulerLoaded(true), 4000);
    const stall = setTimeout(() => setLoadStalled(true), 10000);
    return () => {
      clearTimeout(veil);
      clearTimeout(stall);
    };
  }, [service.slug, showCalendar, useNative]);

  return (
    <motion.div key="schedule" {...fade} id="booking-journey-top">
      {/* Summary header */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 min-h-[44px] -my-2 px-2 -mx-2 font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        All treatments
      </button>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-5 border-b-hairline border-elegant-mocha/15">
        <h2 className="font-alice text-2xl sm:text-3xl text-elegant-mocha tracking-wide">
          {service.name}
        </h2>
        <p className="font-alta text-sm tracking-widest text-elegant-mocha/80">
          {formatDuration(service.duration)}
          <span className="mx-2 text-elegant-mocha/30">·</span>
          <span className="text-elegant-mocha">{service.priceDisplay}</span>
        </p>
      </div>

      {/* Consultation gate — first-time clients never see the calendar before answering */}
      {gated && !consultationConfirmed ? (
        <div className="mt-6 border border-elegant-mocha/15 bg-light-cream/20 rounded-sm px-6 py-8 sm:px-10 sm:py-10 text-center">
          <p className="font-alta text-xs tracking-[0.3em] uppercase text-deep-bronze mb-3">
            Before you book
          </p>
          <h3 className="font-alice text-xl sm:text-2xl text-elegant-mocha tracking-wide mb-3">
            Have you had your free consultation and patch test?
          </h3>
          <p className="font-alice text-sm sm:text-base text-elegant-mocha/80 leading-relaxed tracking-wide max-w-xl mx-auto mb-7">
            This treatment requires a consultation and patch test before your
            first appointment — it keeps you safe and lets us plan your result
            together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setConsultationConfirmed(true)}
              className="w-full sm:w-auto font-alta text-xs tracking-luxury uppercase px-8 py-3.5 bg-elegant-mocha text-white border border-elegant-mocha rounded-sm hover:bg-deep-bronze hover:border-deep-bronze transition-colors duration-300"
            >
              Yes — show available times
            </button>
            <button
              type="button"
              onClick={onBookConsultation}
              className="w-full sm:w-auto font-alta text-xs tracking-luxury uppercase px-8 py-3.5 border border-deep-bronze/40 text-deep-bronze rounded-sm hover:bg-deep-bronze hover:text-white transition-colors duration-300"
            >
              Not yet — book the consultation first
            </button>
          </div>
        </div>
      ) : useNative ? (
        <NativeScheduler service={service} onUnavailable={() => setIframeFallback(true)} />
      ) : (
        <>
          {/* Scoped Acuity scheduler — calendar + details for this ONE treatment */}
          <div
            aria-busy={!schedulerLoaded}
            className="relative mt-6 border-hairline border border-elegant-mocha/10 bg-light-cream/20 rounded-sm p-1 sm:p-2 acuity-embed-container [&_iframe]:w-full [&_iframe]:min-h-[760px] [&_iframe]:border-0"
          >
            <iframe
              src={serviceSchedulerUrl(service.acuityId)}
              title={`Book ${service.name} — choose a date and time`}
              width="100%"
              height="760"
              frameBorder="0"
              allow="payment"
              onLoad={() => {
                setSchedulerLoaded(true);
                setIframeLoaded(true);
              }}
            />
            {/* Overlay unmounts once the calendar has painted beneath it */}
            {!schedulerLoaded && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-1 sm:inset-2 flex items-center justify-center bg-light-cream/60 backdrop-blur-[1px] rounded-sm"
              >
                <p className="font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80 animate-pulse">
                  Preparing your calendar…
                </p>
              </div>
            )}
          </div>
          {/* Escape hatch when the embed never reports load — non-destructive */}
          {loadStalled && !iframeLoaded && (
            <p className="mt-3 text-center font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide">
              Calendar not loading?{" "}
              <a
                href={serviceSchedulerUrl(service.acuityId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
              >
                Open it in a new tab
              </a>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
              >
                get in touch
              </Link>
              .
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}
