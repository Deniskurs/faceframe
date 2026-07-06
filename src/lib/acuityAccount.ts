import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Server-side helpers for the client account portal.
 * The Acuity ADMIN credentials never leave the server — routes verify a
 * client's identity (email + phone against booking records) and return
 * only that client's own, sanitized data.
 */

const ACUITY_BASE = "https://acuityscheduling.com/api/v1";

export async function acuityGet<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const user = process.env.ACUITY_USER_ID;
  const key = process.env.ACUITY_API_KEY;
  if (!user || !key) throw new Error("Acuity credentials missing");
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${ACUITY_BASE}${path}${qs ? `?${qs}` : ""}`, {
    headers: {
      Authorization: "Basic " + Buffer.from(`${user}:${key}`).toString("base64"),
      Accept: "application/json",
    },
    // client data must never be cached across users
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Acuity ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

/** Keep only digits; compare the trailing 9 so +44 / 0-prefix variants match. */
export function phonesMatch(a: string, b: string): boolean {
  const da = a.replace(/\D/g, "");
  const db = b.replace(/\D/g, "");
  if (da.length < 7 || db.length < 7) return false;
  const n = Math.min(da.length, db.length, 9);
  return da.slice(-n) === db.slice(-n);
}

/* ------------------------------------------------------------------ */
/* Signed session cookie (HMAC-SHA256)                                 */
/* ------------------------------------------------------------------ */

export const SESSION_COOKIE = "ff_account";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** HMAC-SHA256 over the payload — locksteps createSession/verifySession. */
function sign(payload: string): string {
  const secret = process.env.ACCOUNT_SESSION_SECRET;
  if (!secret) throw new Error("ACCOUNT_SESSION_SECRET missing");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSession(email: string): string {
  const payload = `${email.toLowerCase()}|${Date.now() + SESSION_TTL_MS}`;
  const token = `${payload}|${sign(payload)}`;
  return Buffer.from(token).toString("base64url");
}

export function verifySession(cookieValue: string | undefined): string | null {
  if (!cookieValue) return null;
  let decoded: string;
  try {
    decoded = Buffer.from(cookieValue, "base64url").toString();
  } catch {
    return null;
  }
  const idx = decoded.lastIndexOf("|");
  if (idx < 0) return null;
  const payload = decoded.slice(0, idx);
  const mac = decoded.slice(idx + 1);
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [email, expStr] = payload.split("|");
  if (!email || Number(expStr) < Date.now()) return null;
  return email;
}

/* ------------------------------------------------------------------ */
/* Acuity response shapes (subset we consume)                          */
/* ------------------------------------------------------------------ */

export interface AcuityAppointment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  endTime: string;
  datetime: string;
  price: string;
  paid: string;
  type: string;
  appointmentTypeID: number;
  duration: string;
  canClientCancel: boolean;
  canClientReschedule: boolean;
  confirmationPage: string;
}

export interface AcuityCertificate {
  id: number;
  certificate: string;
  name: string;
  email: string;
  type: string;
  appointmentTypeIDs: number[];
  remainingCounts: Record<string, number> | null;
  remainingMinutes: number | null;
  expiration: string | null;
}
