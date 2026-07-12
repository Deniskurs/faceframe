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

/** Days with any openings for a type in a month — returns "YYYY-MM-DD" strings. */
export async function getAvailableDates(typeId: number, month: string): Promise<string[]> {
  const qs = new URLSearchParams({ appointmentTypeID: String(typeId), month });
  const rows = await acuityFetch<Array<{ date: string }>>(`/availability/dates?${qs}`);
  return rows.map((r) => r.date);
}

/** Open slots for a type on a day — returns ISO datetimes with offset (Europe/London account). */
export async function getAvailableTimes(typeId: number, date: string): Promise<string[]> {
  const qs = new URLSearchParams({ appointmentTypeID: String(typeId), date });
  const rows = await acuityFetch<Array<{ time: string }>>(`/availability/times?${qs}`);
  return rows.map((r) => r.time);
}

export interface AppointmentPayload {
  appointmentTypeID: number;
  datetime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
