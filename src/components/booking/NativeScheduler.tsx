"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import type { CatalogService } from "@/data/acuityCatalog";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: LUXURY_EASING },
};

/* ------------------------------------------------------------------ */
/* Formatting — the account runs on Europe/London; ISO times arrive     */
/* with their offset, so formatting pins the zone rather than the user. */
/* ------------------------------------------------------------------ */

const LONDON = "Europe/London";

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: LONDON,
});
const weekdayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: LONDON });
const shortDateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: LONDON,
});
const longDateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: LONDON,
});

/** 90 → "1 hr 30 min" — same wording as the journey header. */
function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} hr${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} min`);
  return parts.join(" ") || `${mins} min`;
}

/** Current + next month as "YYYY-MM", anchored to the London calendar. */
function londonMonths(): [string, string] {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: LONDON }).format(new Date());
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  const current = `${year}-${String(month).padStart(2, "0")}`;
  const nextY = month === 12 ? year + 1 : year;
  const nextM = month === 12 ? 1 : month + 1;
  return [current, `${nextY}-${String(nextM).padStart(2, "0")}`];
}

/** GET JSON with one quiet retry — throws only once both attempts fail. */
async function getJson<T>(url: string): Promise<T> {
  const attempt = async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  };
  try {
    return await attempt();
  } catch {
    return attempt();
  }
}

/**
 * Acuity returns offsets without a colon ("+0100"), which Safari's Date
 * parser rejects — normalise to strict ISO ("+01:00") before constructing.
 */
function parseSlot(iso: string): Date {
  return new Date(iso.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}

interface Confirmation {
  id: number;
  datetime: string;
}

/* ------------------------------------------------------------------ */
/* NativeScheduler — dates strip → times grid → details → booked        */
/* ------------------------------------------------------------------ */

export function NativeScheduler({
  service,
  onUnavailable,
}: {
  service: CatalogService;
  /** Availability could not be fetched — parent switches to the iframe. */
  onUnavailable: () => void;
}) {
  const [dates, setDates] = useState<string[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [times, setTimes] = useState<string[] | null>(null);
  const [timesVersion, setTimesVersion] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "", // honeypot — humans never see it
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  /* -------------------- Step A: available dates -------------------- */

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const months = londonMonths();
        const results = await Promise.all(
          months.map((m) =>
            getJson<{ dates: string[] }>(
              `/api/booking/availability?type=${service.acuityId}&month=${m}`,
            ),
          ),
        );
        if (cancelled) return;
        const merged = [...new Set(results.flatMap((r) => r.dates))].sort();
        setDates(merged);
        setSelectedDate(merged[0] ?? null);
      } catch {
        if (!cancelled) onUnavailable();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [service.acuityId, onUnavailable]);

  /* -------------------- Step B: times for a date -------------------- */

  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setTimes(null);
    (async () => {
      try {
        const { times: slots } = await getJson<{ times: string[] }>(
          `/api/booking/availability?type=${service.acuityId}&date=${selectedDate}`,
        );
        if (!cancelled) setTimes(slots);
      } catch {
        if (!cancelled) onUnavailable();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [service.acuityId, selectedDate, timesVersion, onUnavailable]);

  const backToTimes = useCallback(() => {
    setSelectedTime(null);
    setFormError(null);
    setTimesVersion((v) => v + 1); // slots may have moved — refresh quietly
  }, []);

  /* -------------------- Step C: confirm booking -------------------- */

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!selectedTime || submitting) return;
      setFormError(null);
      setSubmitting(true);
      const post = () =>
        fetch("/api/booking/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointmentTypeID: service.acuityId,
            datetime: selectedTime,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            company: form.company,
          }),
        });
      try {
        let res: Response;
        try {
          res = await post();
        } catch {
          res = await post(); // one quiet retry on network failure
        }
        const body = (await res.json().catch(() => ({}))) as {
          confirmation?: Confirmation;
          error?: string;
        };
        if (res.ok && body.confirmation) {
          setConfirmation(body.confirmation);
        } else if (res.status === 409) {
          // the slot went while they typed — back to fresh times, calmly
          setNotice(body.error ?? "That time was just taken — please pick another.");
          backToTimes();
        } else {
          setFormError(
            body.error ?? "We couldn't confirm that booking — please try again.",
          );
        }
      } catch {
        onUnavailable(); // network is down after a retry — hand over to the iframe
      } finally {
        setSubmitting(false);
      }
    },
    [service.acuityId, selectedTime, form, submitting, backToTimes, onUnavailable],
  );

  const setField = useCallback(
    (name: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [name]: event.target.value })),
    [],
  );

  const step = confirmation ? "done" : selectedTime ? "details" : "pick";

  const summary = useMemo(() => {
    if (!selectedTime) return null;
    const when = parseSlot(selectedTime);
    return {
      shortDate: shortDateFmt.format(when),
      longDate: longDateFmt.format(when),
      time: timeFmt.format(when),
    };
  }, [selectedTime]);

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {step === "done" && confirmation && summary ? (
          <motion.div key="done" {...fade}>
            <BookedPanel
              service={service}
              longDate={summary.longDate}
              time={summary.time}
            />
          </motion.div>
        ) : step === "details" && summary ? (
          <motion.div key="details" {...fade}>
            <button
              type="button"
              onClick={backToTimes}
              className="inline-flex items-center gap-1.5 min-h-[44px] -my-2 px-2 -mx-2 font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Change time
            </button>

            {/* Compact summary of the chosen slot */}
            <p className="mt-2 pb-4 border-b-hairline border-elegant-mocha/15 font-alice text-sm sm:text-base text-elegant-mocha tracking-wide tabular-nums">
              {service.name}
              <span className="mx-2 text-elegant-mocha/30">·</span>
              {summary.shortDate}
              <span className="mx-2 text-elegant-mocha/30">·</span>
              {summary.time}
              <span className="mx-2 text-elegant-mocha/30">·</span>
              {service.priceDisplay}
            </p>

            <form onSubmit={submit} noValidate className="mt-6 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                <Field
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={setField("firstName")}
                />
                <Field
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={setField("lastName")}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={setField("email")}
                />
                <Field
                  label="Mobile"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={setField("phone")}
                  hint="Used to look up your bookings in the client portal."
                />
              </div>

              {/* Honeypot — off-screen for humans, tempting for bots */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={setField("company")}
                  />
                </label>
              </div>

              {formError && (
                <p role="alert" className="mt-5 font-alice text-sm text-deep-bronze leading-relaxed tracking-wide">
                  {formError}
                </p>
              )}

              <div className="mt-7">
                <LuxuryShadcnButton
                  type="submit"
                  text="CONFIRM BOOKING"
                  luxuryVariant="elegant"
                  isLoading={submitting}
                  loadingText="CONFIRMING…"
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="mt-4 font-alice text-sm text-elegant-mocha/70 leading-relaxed tracking-wide">
                You’ll receive a confirmation email with reschedule and cancellation links.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div key="pick" {...fade}>
            <p className="font-alta text-xs tracking-refined uppercase text-elegant-mocha/70 mb-4">
              All times London (GMT+1)
            </p>

            {notice && (
              <p role="status" className="mb-5 border border-elegant-mocha/15 bg-light-cream/30 rounded-sm px-5 py-3 font-alice text-sm text-elegant-mocha/85 leading-relaxed tracking-wide">
                {notice}
              </p>
            )}

            {dates === null ? (
              <DateStripSkeleton />
            ) : dates.length === 0 ? (
              <p className="font-alice text-sm sm:text-base text-elegant-mocha/80 leading-relaxed tracking-wide">
                No times are available in the next two months —{" "}
                <Link
                  href="/contact"
                  className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
                >
                  get in touch
                </Link>{" "}
                and we’ll find you one.
              </p>
            ) : (
              <>
                {/* Date strip */}
                <div
                  className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 pb-1"
                  role="group"
                  aria-label="Available dates"
                >
                  {dates.map((day) => {
                    const active = day === selectedDate;
                    // noon UTC sits safely inside the same London calendar day
                    const when = new Date(`${day}T12:00:00Z`);
                    return (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSelectedDate(day);
                          setNotice(null);
                        }}
                        className={`shrink-0 flex flex-col items-center justify-center min-w-[3.5rem] min-h-[44px] px-3 py-2 rounded-sm border transition-colors duration-300 ${
                          active
                            ? "bg-elegant-mocha text-white border-elegant-mocha"
                            : "bg-white text-elegant-mocha border-elegant-mocha/20 hover:border-elegant-mocha/50"
                        }`}
                      >
                        <span className={`font-alta text-xs uppercase tracking-wider ${active ? "text-white/80" : "text-elegant-mocha/60"}`}>
                          {weekdayFmt.format(when)}
                        </span>
                        <span className="font-alice text-lg leading-tight tabular-nums">
                          {Number(day.slice(8))}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Times grid */}
                <div className="mt-6">
                  {selectedDate && (
                    <p className="font-alice text-sm text-elegant-mocha/70 tracking-wide mb-3">
                      {longDateFmt.format(new Date(`${selectedDate}T12:00:00Z`))}
                    </p>
                  )}
                  {times === null ? (
                    <TimesGridSkeleton />
                  ) : times.length === 0 ? (
                    <p className="font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide">
                      That day has just filled up — please pick another date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="group" aria-label="Available times">
                      {times.map((iso) => (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => {
                            setSelectedTime(iso);
                            setNotice(null);
                          }}
                          className="min-h-[44px] px-2 font-alta text-xs sm:text-sm tracking-wider text-elegant-mocha border-hairline border border-elegant-mocha/25 rounded-sm bg-white hover:border-elegant-mocha hover:bg-light-cream/40 transition-colors duration-300 tabular-nums"
                        >
                          {timeFmt.format(parseSlot(iso))}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  const id = `booking-${name}`;
  return (
    <div className={hint ? "sm:col-span-1" : undefined}>
      <label
        htmlFor={id}
        className="block font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="w-full min-h-[44px] px-4 py-3 font-alice text-base text-elegant-mocha bg-white border border-elegant-mocha/25 rounded-sm focus:outline-none focus:border-elegant-mocha transition-colors duration-300"
      />
      {hint && (
        <p className="mt-1.5 font-alice text-xs text-elegant-mocha/60 leading-relaxed tracking-wide">
          {hint}
        </p>
      )}
    </div>
  );
}

function DateStripSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="shrink-0 w-14 h-14 rounded-sm bg-light-cream animate-pulse" />
      ))}
    </div>
  );
}

function TimesGridSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="min-h-[44px] rounded-sm bg-light-cream animate-pulse" />
      ))}
    </div>
  );
}

function BookedPanel({
  service,
  longDate,
  time,
}: {
  service: CatalogService;
  longDate: string;
  time: string;
}) {
  return (
    <div className="border border-elegant-mocha/15 bg-light-cream/20 rounded-sm px-6 py-10 sm:px-10 text-center">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-elegant-mocha/30 mb-5">
        <Check className="w-5 h-5 text-elegant-mocha" aria-hidden="true" />
      </span>
      <h3 className="font-alice text-2xl sm:text-3xl text-elegant-mocha tracking-wide mb-5">
        Booked
      </h3>
      <div className="font-alice text-sm sm:text-base text-elegant-mocha/85 leading-relaxed tracking-wide space-y-1">
        <p>{service.name}</p>
        <p className="tabular-nums">
          {longDate}
          <span className="mx-2 text-elegant-mocha/30">·</span>
          {time}
        </p>
        <p className="tabular-nums">
          {formatDuration(service.duration)}
          <span className="mx-2 text-elegant-mocha/30">·</span>
          {service.priceDisplay}
        </p>
      </div>
      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
        <Link
          href="/account"
          className="font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha underline underline-offset-4 transition-colors duration-300 min-h-[44px] inline-flex items-center"
        >
          View or manage in your account
        </Link>
        <Link
          href="/booking"
          className="font-alta text-xs tracking-refined uppercase text-deep-bronze hover:text-elegant-mocha underline underline-offset-4 transition-colors duration-300 min-h-[44px] inline-flex items-center"
        >
          Book another treatment
        </Link>
      </div>
    </div>
  );
}
