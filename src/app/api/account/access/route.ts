import { NextRequest, NextResponse } from "next/server";
import {
  acuityGet,
  createSession,
  phonesMatch,
  SESSION_COOKIE,
  type AcuityAppointment,
} from "@/lib/acuityAccount";

/**
 * POST /api/account/access — { email, phone }
 *
 * Grants an account session when BOTH the email and the phone number match
 * an existing booking record in Acuity (same verification factor airlines
 * use: something you know that's on the reservation). Admin credentials
 * stay server-side; the client receives only a signed HttpOnly cookie.
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 8) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts — please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: { email?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const phone = (body.phone ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { error: "Please enter the email address and phone number you book with." },
      { status: 400 },
    );
  }

  try {
    const appointments = await acuityGet<AcuityAppointment[]>("/appointments", {
      email,
      max: "25",
      showall: "true",
      excludeForms: "true",
    });
    const verified = appointments.some((a) => phonesMatch(a.phone ?? "", phone));
    if (!verified) {
      return NextResponse.json(
        {
          error:
            "We couldn't match those details to a booking. Please use the email and phone number from your appointment confirmation — or book your first treatment to create your record.",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, createSession(email), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the booking system — please try again shortly." },
      { status: 502 },
    );
  }
}
