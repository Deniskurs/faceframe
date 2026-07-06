import { NextRequest, NextResponse } from "next/server";
import {
  acuityGet,
  SESSION_COOKIE,
  verifySession,
  type AcuityAppointment,
  type AcuityCertificate,
} from "@/lib/acuityAccount";

/**
 * GET /api/account/data — requires the signed session cookie.
 * Returns the client's own appointments (upcoming + history) and package
 * certificates, sanitized to exactly what the portal renders.
 */
export async function GET(request: NextRequest) {
  const email = verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const [appointments, certificates] = await Promise.all([
      acuityGet<AcuityAppointment[]>("/appointments", {
        email,
        max: "100",
        excludeForms: "true",
        direction: "DESC",
      }),
      acuityGet<AcuityCertificate[]>("/certificates", { email }),
    ]);

    const now = Date.now();
    const slim = appointments.map((a) => ({
      id: a.id,
      type: a.type,
      appointmentTypeID: a.appointmentTypeID,
      date: a.date,
      time: a.time,
      datetime: a.datetime,
      price: a.price,
      paid: a.paid,
      canClientCancel: a.canClientCancel,
      canClientReschedule: a.canClientReschedule,
      confirmationPage: a.confirmationPage,
    }));

    const upcoming = slim
      .filter((a) => new Date(a.datetime).getTime() >= now)
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    const past = slim.filter((a) => new Date(a.datetime).getTime() < now);

    const firstName = appointments[0]?.firstName ?? null;

    return NextResponse.json({
      email,
      firstName,
      upcoming,
      past: past.slice(0, 12),
      certificates: certificates.map((c) => ({
        id: c.id,
        code: c.certificate,
        name: c.name,
        type: c.type,
        appointmentTypeIDs: c.appointmentTypeIDs,
        remainingCounts: c.remainingCounts,
        remainingMinutes: c.remainingMinutes,
        expiration: c.expiration,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the booking system — please try again shortly." },
      { status: 502 },
    );
  }
}
