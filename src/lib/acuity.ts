import "server-only";

/**
 * Server-side helpers for the native booking scheduler.
 * The Acuity ADMIN credentials never leave the server — API routes expose
 * only availability (dates/times) and a strictly validated create-appointment
 * path in CLIENT mode, so Acuity itself enforces availability and limits.
 *
 * Mirrors the conventions of src/lib/acuityAccount.ts (account portal).
 */

const ACUITY_BASE = "https://acuityscheduling.com/api/v1";
const TIMEOUT_MS = 10_000;

/** Non-2xx Acuity response, with the API's error code preserved for mapping. */
export class AcuityError extends Error {
  constructor(
    readonly status: number,
    readonly code: string | null,
    message: string,
  ) {
    super(message);
    this.name = "AcuityError";
  }
}

export async function acuityFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const user = process.env.ACUITY_USER_ID;
  const key = process.env.ACUITY_API_KEY;
  if (!user || !key) throw new Error("Acuity credentials missing");
  const res = await fetch(`${ACUITY_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: "Basic " + Buffer.from(`${user}:${key}`).toString("base64"),
      Accept: "application/json",
      ...init.headers,
    },
    // availability changes minute to minute — never cache at the fetch layer
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    let code: string | null = null;
    let message = `Acuity ${path} -> ${res.status}`;
    try {
      const body = (await res.json()) as { error?: string; message?: string };
      if (typeof body.error === "string") code = body.error;
      if (typeof body.message === "string") message = body.message;
    } catch {
      /* non-JSON error body — keep the status message */
    }
    throw new AcuityError(res.status, code, message);
  }
  return res.json() as Promise<T>;
}

/**
 * Appends Acuity's repeated bracket params (`addonIDs[]=1`) so availability
 * reflects base treatment PLUS selected add-ons' extra time (per the
 * appointment-addons API guide).
 */
function withAddons(qs: URLSearchParams, addonIds: readonly number[]): void {
  for (const id of addonIds) qs.append("addonIDs[]", String(id));
}

/** Days with any openings for a type in a month — returns "YYYY-MM-DD" strings. */
export async function getAvailableDates(
  typeId: number,
  month: string,
  addonIds: readonly number[] = [],
): Promise<string[]> {
  const qs = new URLSearchParams({ appointmentTypeID: String(typeId), month });
  withAddons(qs, addonIds);
  const rows = await acuityFetch<Array<{ date: string }>>(`/availability/dates?${qs}`);
  return rows.map((r) => r.date);
}

/** Open slots for a type on a day — returns ISO datetimes with offset (Europe/London account). */
export async function getAvailableTimes(
  typeId: number,
  date: string,
  addonIds: readonly number[] = [],
): Promise<string[]> {
  const qs = new URLSearchParams({ appointmentTypeID: String(typeId), date });
  withAddons(qs, addonIds);
  const rows = await acuityFetch<Array<{ time: string }>>(`/availability/times?${qs}`);
  return rows.map((r) => r.time);
}

/** Offered start times for several types on a day, fetched in parallel. */
export async function getTimesForTypes(
  typeIds: readonly number[],
  date: string,
): Promise<string[][]> {
  return Promise.all(typeIds.map((id) => getAvailableTimes(id, date)));
}

/** Acuity offsets look like "+0100"; Safari-style strict ISO needs a colon. */
function isoToMs(iso: string): number {
  return Date.parse(iso.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}


import type { ResolvedChain } from "@/data/acuityCatalog";

/**
 * Start times where EVERY treatment fits back-to-back in the given order,
 * tolerating gaps of up to maxGapMin between consecutive items (Acuity only
 * offers starts on its 30-minute grid, so odd durations leave small gaps).
 * Returns the valid first-item start times plus each visit's resolved
 * schedule, so the UI can show the real span instead of a duration sum.
 */
export function buildChainSchedule(
  timesPerType: readonly string[][],
  durationsMin: readonly number[],
  maxGapMin = 20,
): { starts: string[]; chains: Record<string, ResolvedChain> } {
  if (timesPerType.length === 0 || timesPerType.length !== durationsMin.length) {
    return { starts: [], chains: {} };
  }
  const maxGapMs = maxGapMin * 60_000;
  const first = [...new Set(timesPerType[0])].sort(
    (a, b) => isoToMs(a) - isoToMs(b),
  );
  const starts: string[] = [];
  const chains: Record<string, ResolvedChain> = {};
  for (const t0 of first) {
    const items = scheduleChain(timesPerType, durationsMin, t0, maxGapMs);
    if (!items) continue;
    const lastMs = isoToMs(items[items.length - 1]);
    const endMs = lastMs + durationsMin[durationsMin.length - 1] * 60_000;
    const end = new Date(endMs).toISOString();
    chains[t0] = {
      items,
      end,
      spanMin: Math.round((endMs - isoToMs(t0)) / 60_000),
    };
    starts.push(t0);
  }
  return { starts, chains };
}

/**
 * Given a first start, resolves each later item's earliest feasible offered
 * time. Returns the full ISO datetime list, or null when the chain breaks.
 */
export function scheduleChain(
  timesPerType: readonly string[][],
  durationsMin: readonly number[],
  firstStart: string,
  maxGapMs = 20 * 60_000,
): string[] | null {
  const chain: string[] = [firstStart];
  let cursor = isoToMs(firstStart);
  for (let i = 1; i < timesPerType.length; i++) {
    const earliest = cursor + durationsMin[i - 1] * 60_000;
    let next: string | null = null;
    for (const t of timesPerType[i]) {
      const ms = isoToMs(t);
      if (ms >= earliest && ms <= earliest + maxGapMs) {
        if (next === null || ms < isoToMs(next)) next = t;
      }
    }
    if (next === null) return null;
    chain.push(next);
    cursor = isoToMs(next);
  }
  return chain;
}

/**
 * Cancels an appointment as admin (bypasses client cancellation rules,
 * suppresses the cancellation email/SMS).
 */
export function cancelAppointment(id: number, cancelNote?: string): Promise<unknown> {
  const qs = new URLSearchParams({ admin: "true", noEmail: "true" });
  return acuityFetch(`/appointments/${id}/cancel?${qs}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cancelNote ? { cancelNote } : {}),
  });
}

export interface AppointmentPayload {
  appointmentTypeID: number;
  datetime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Validated add-on IDs. Acuity applies their price/time deltas. */
  addonIDs?: number[];
}

/** Subset of Acuity's appointment response the booking flow consumes. */
export interface AcuityAppointmentConfirmation {
  id: number;
  datetime: string;
  date: string;
  time: string;
  type: string;
  duration: string;
  price: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmationPage: string;
}

/**
 * Creates the appointment in CLIENT mode (no ?admin=true) so Acuity enforces
 * availability, scheduling limits and double-booking rules server-side.
 */
export function createAppointment(
  payload: AppointmentPayload,
): Promise<AcuityAppointmentConfirmation> {
  return acuityFetch<AcuityAppointmentConfirmation>("/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
