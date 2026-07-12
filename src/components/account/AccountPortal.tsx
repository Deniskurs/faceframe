"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Gift, LogOut, Sparkles } from "lucide-react";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { CATALOG_SERVICES, PACKAGES_CATALOG_URL } from "@/data/acuityCatalog";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: LUXURY_EASING },
};

const SLUG_BY_ACUITY_ID: Record<number, string> = Object.fromEntries(
  CATALOG_SERVICES.map((s) => [s.acuityId, s.slug]),
);

/** Acuity sends "45.00" strings — show £45, £47.50, or "Free". */
function formatPrice(price: string): string {
  const value = Number.parseFloat(price);
  if (Number.isNaN(value)) return price;
  if (value === 0) return "Free";
  return `£${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`;
}

interface PortalAppointment {
  id: number;
  type: string;
  appointmentTypeID: number;
  date: string;
  time: string;
  datetime: string;
  price: string;
  paid: string;
  canClientCancel: boolean;
  canClientReschedule: boolean;
  confirmationPage: string;
}

interface PortalCertificate {
  id: number;
  code: string;
  name: string;
  type: string;
  appointmentTypeIDs: number[];
  remainingCounts: Record<string, number> | null;
  remainingMinutes: number | null;
  expiration: string | null;
}

interface PortalData {
  email: string;
  firstName: string | null;
  upcoming: PortalAppointment[];
  past: PortalAppointment[];
  certificates: PortalCertificate[];
}

/**
 * Client account portal — verified against booking records (email + phone),
 * served by our own API routes; Acuity admin credentials never reach the
 * browser. Everything renders in the site's design system.
 */
export function AccountPortal() {
  const [data, setData] = useState<PortalData | null>(null);
  const [checking, setChecking] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/account/data");
      if (res.ok) setData(await res.json());
      else setData(null);
    } catch {
      setData(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const logout = useCallback(async () => {
    await fetch("/api/account/logout", { method: "POST" });
    setData(null);
  }, []);

  if (checking) {
    return (
      <div className="min-h-[280px] flex items-center justify-center">
        <p className="font-alta text-xs tracking-[0.25em] uppercase text-elegant-mocha/80 animate-pulse">
          Checking your session…
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {data ? (
        <motion.div key="dashboard" {...fade}>
          <Dashboard data={data} onLogout={logout} />
        </motion.div>
      ) : (
        <motion.div key="access" {...fade}>
          <AccessForm onVerified={loadData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Access — email + phone, verified against booking records            */
/* ------------------------------------------------------------------ */

function AccessForm({ onVerified }: { onVerified: () => void }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/account/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      if (res.ok) {
        onVerified();
        return;
      }
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Something went wrong — please try again.");
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <p className="font-alta text-[11px] tracking-[0.3em] uppercase text-deep-bronze mb-3">
          Client Account
        </p>
        <h2 className="font-alice text-2xl sm:text-3xl text-elegant-mocha tracking-wide mb-3">
          Access your appointments
        </h2>
        <div className="h-[0.5px] w-12 bg-elegant-mocha/30 mx-auto mb-4" />
        <p className="font-alice text-sm sm:text-base text-elegant-mocha/80 leading-relaxed tracking-wide">
          Enter the email address and phone number you book with — we&rsquo;ll
          match them against your appointment records.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label
            htmlFor="account-email"
            className="block font-alta text-[11px] tracking-[0.2em] uppercase text-elegant-mocha/80 mb-2"
          >
            Email address
          </label>
          <input
            id="account-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-elegant-mocha/25 rounded-sm bg-white px-4 py-3 font-alice text-base text-elegant-mocha placeholder:text-elegant-mocha/40 focus:outline-none focus:border-deep-bronze transition-colors duration-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="account-phone"
            className="block font-alta text-[11px] tracking-[0.2em] uppercase text-elegant-mocha/80 mb-2"
          >
            Phone number
          </label>
          <input
            id="account-phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-elegant-mocha/25 rounded-sm bg-white px-4 py-3 font-alice text-base text-elegant-mocha placeholder:text-elegant-mocha/40 focus:outline-none focus:border-deep-bronze transition-colors duration-300"
            placeholder="07123 456789"
          />
        </div>

        {error && (
          <p role="alert" className="font-alice text-sm text-deep-bronze leading-relaxed">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full font-alta text-xs tracking-[0.25em] uppercase px-8 py-4 bg-elegant-mocha text-white rounded-sm hover:bg-deep-bronze transition-colors duration-300 disabled:opacity-60"
        >
          {submitting ? "Checking…" : "View my account"}
        </button>
      </form>

      <p className="font-alice text-sm text-elegant-mocha/80 leading-relaxed tracking-wide text-center mt-6">
        New to FaceFrame?{" "}
        <Link
          href="/booking"
          className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
        >
          Book your first treatment
        </Link>{" "}
        and your account is created automatically.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

function Dashboard({ data, onLogout }: { data: PortalData; onLogout: () => void }) {
  return (
    <div>
      {/* Greeting */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b-hairline border-elegant-mocha/15">
        <div>
          <p className="font-alta text-[11px] tracking-[0.3em] uppercase text-deep-bronze mb-2">
            Client Account
          </p>
          <h2 className="font-alice text-2xl sm:text-3xl text-elegant-mocha tracking-wide">
            Welcome back{data.firstName ? `, ${data.firstName}` : ""}
          </h2>
          <p className="font-alta text-xs tracking-[0.08em] text-elegant-mocha/80 mt-1">
            {data.email}
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 font-alta text-[11px] tracking-[0.2em] uppercase text-elegant-mocha/80 hover:text-deep-bronze transition-colors duration-300 py-2"
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
          Sign out
        </button>
      </div>

      {/* Upcoming */}
      <Section icon={<CalendarDays className="w-4 h-4" aria-hidden="true" />} title="Upcoming appointments">
        {data.upcoming.length === 0 ? (
          <EmptyRow>
            Nothing booked yet —{" "}
            <Link href="/booking" className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors">
              choose a treatment
            </Link>
            .
          </EmptyRow>
        ) : (
          <ul className="space-y-4">
            {data.upcoming.map((a) => (
              <li
                key={a.id}
                className="border border-elegant-mocha/15 bg-light-cream/20 rounded-sm px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="font-alice text-base sm:text-lg text-elegant-mocha tracking-wide">
                    {a.type}
                  </p>
                  <p className="font-alta text-xs tracking-[0.08em] text-elegant-mocha/80 mt-1">
                    {a.date} · {a.time}
                    <span className="mx-2 text-elegant-mocha/30">·</span>
                    {formatPrice(a.price)}
                  </p>
                </div>
                {a.canClientCancel || a.canClientReschedule ? (
                  <a
                    href={a.confirmationPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 font-alta text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border border-elegant-mocha/40 text-elegant-mocha rounded-sm hover:bg-elegant-mocha hover:text-white transition-colors duration-300"
                  >
                    Manage
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="mt-3 sm:mt-0 shrink-0 inline-flex items-center gap-1.5 font-alta text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border border-elegant-mocha/40 text-elegant-mocha rounded-sm hover:bg-elegant-mocha hover:text-white transition-colors duration-300"
                  >
                    Contact us to change this booking
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Packages & credits */}
      <Section icon={<Gift className="w-4 h-4" aria-hidden="true" />} title="Packages & credits">
        {data.certificates.length === 0 ? (
          <EmptyRow>
            No active packages.{" "}
            <a
              href={PACKAGES_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-bronze underline underline-offset-2 hover:text-elegant-mocha transition-colors"
            >
              Browse packages &amp; gift certificates
            </a>
            .
          </EmptyRow>
        ) : (
          <ul className="space-y-4">
            {data.certificates.map((c) => {
              const remaining =
                c.remainingCounts
                  ? Object.values(c.remainingCounts).reduce((a, b) => a + b, 0)
                  : null;
              return (
                <li
                  key={c.id}
                  className="border border-elegant-mocha/15 bg-light-cream/20 rounded-sm px-5 py-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-alice text-base text-elegant-mocha tracking-wide">{c.name}</p>
                    <p className="font-alta text-xs tracking-[0.08em] text-elegant-mocha/80">
                      {[
                        remaining !== null
                          ? `${remaining} session${remaining === 1 ? "" : "s"} left`
                          : null,
                        c.remainingMinutes !== null
                          ? `${c.remainingMinutes} minutes left`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="font-alta text-xs tracking-[0.08em] text-elegant-mocha/80 mt-1.5">
                    Code <span className="text-deep-bronze font-medium tracking-[0.15em]">{c.code}</span>
                    {c.expiration && <> · expires {c.expiration}</>}
                    <span className="mx-2 text-elegant-mocha/30">·</span>
                    Enter the code at checkout to redeem a session.
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {/* History */}
      <Section icon={<CalendarDays className="w-4 h-4" aria-hidden="true" />} title="Appointment history">
        {data.past.length === 0 ? (
          <EmptyRow>Your visits will appear here after your first appointment.</EmptyRow>
        ) : (
          <ul className="divide-y divide-elegant-mocha/10 border-y-hairline border-elegant-mocha/15">
            {data.past.map((a) => {
              const slug = SLUG_BY_ACUITY_ID[a.appointmentTypeID];
              return (
                <li key={a.id} className="py-3.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <span className="font-alice text-sm sm:text-base text-elegant-mocha tracking-wide">
                      {a.type}
                    </span>
                    <span className="ml-3 font-alta text-xs tracking-[0.08em] text-elegant-mocha/80">
                      {a.date}
                    </span>
                  </div>
                  {slug && (
                    <Link
                      href={`/booking?service=${slug}`}
                      className="font-alta text-[11px] tracking-[0.2em] uppercase text-deep-bronze hover:text-elegant-mocha transition-colors duration-300 py-1"
                    >
                      Book again
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {/* Offers */}
      <Section icon={<Sparkles className="w-4 h-4" aria-hidden="true" />} title="For you">
        <div className="border border-deep-bronze/20 bg-soft-blush/15 rounded-sm px-6 py-5">
          <p className="font-alice text-sm sm:text-base text-elegant-mocha/85 leading-relaxed tracking-wide">
            Treat yourself or someone special — gift certificates are available
            for any amount, and saline removal packages save up to £40 versus
            single sessions.
          </p>
          <a
            href={PACKAGES_CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-alta text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border border-deep-bronze/40 text-deep-bronze rounded-sm hover:bg-deep-bronze hover:text-white transition-colors duration-300"
          >
            View packages &amp; gifts
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h3 className="inline-flex items-center gap-2 font-alta text-[11px] tracking-[0.25em] uppercase text-deep-bronze mb-4">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-alice text-sm sm:text-base text-elegant-mocha/80 leading-relaxed tracking-wide">
      {children}
    </p>
  );
}
