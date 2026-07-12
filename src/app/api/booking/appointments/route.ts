import { NextRequest, NextResponse } from "next/server";
import { AcuityError, createAppointment } from "@/lib/acuity";
import { CATALOG_SERVICES } from "@/data/acuityCatalog";

/**
 * POST /api/booking/appointments
 * Body: { appointmentTypeID, datetime, firstName, lastName, email, phone, company? }
 *
 * Creates the appointment in CLIENT mode so Acuity enforces availability and
 * scheduling limits. `company` is a honeypot — bots that fill it get a fake
 * success and nothing is created.
 */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

const SLOT_TAKEN = "That time was just taken — please pick another.";

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }
  const body = (raw ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email);
  const phone = str(body.phone);
  const datetime = str(body.datetime);
  const company = str(body.company);
  const appointmentTypeID =
    typeof body.appointmentTypeID === "number" && Number.isSafeInteger(body.appointmentTypeID)
      ? body.appointmentTypeID
      : 0;

  // Honeypot — humans never see this field; silently pretend it worked.
  if (company) {
    return NextResponse.json({
      confirmation: { id: Date.now(), datetime, type: "", duration: "", price: "" },
    });
  }

  if (!firstName || !lastName || !email || !phone || !datetime || !appointmentTypeID) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!DATETIME_RE.test(datetime)) {
    return NextResponse.json({ error: "Please pick a time from the calendar." }, { status: 400 });
  }
  const service = CATALOG_SERVICES.find((s) => s.acuityId === appointmentTypeID);
  if (!service) {
    return NextResponse.json({ error: "That treatment is no longer offered." }, { status: 400 });
  }

  try {
    const a = await createAppointment({
      appointmentTypeID,
      datetime,
      firstName,
      lastName,
      email,
      phone,
    });
    return NextResponse.json({
      confirmation: {
        id: a.id,
        datetime: a.datetime,
        date: a.date,
        time: a.time,
        type: a.type,
        duration: a.duration,
        price: a.price,
      },
    });
  } catch (err) {
    if (err instanceof AcuityError && err.status < 500) {
      // Acuity codes like no_available_calendar / not_available_* mean the slot went
      if (err.code && (err.code.includes("available") || err.code.includes("calendar"))) {
        return NextResponse.json({ error: SLOT_TAKEN, code: "slot_taken" }, { status: 409 });
      }
      return NextResponse.json(
        { error: "We couldn't confirm that booking — please check your details and try again." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "We couldn't reach the booking system — please try again shortly." },
      { status: 502 },
    );
  }
}
