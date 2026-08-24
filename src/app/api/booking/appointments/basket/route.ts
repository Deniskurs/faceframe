import { NextRequest, NextResponse } from "next/server";
import {
  AcuityError,
  cancelAppointment,
  createAppointment,
  getTimesForTypes,
  scheduleChain,
  type AcuityAppointmentConfirmation,
} from "@/lib/acuity";
import { CATALOG_SERVICES } from "@/data/acuityCatalog";

/**
 * POST /api/booking/appointments/basket
 * Body: { appointmentTypeIDs, datetime, firstName, lastName, email, phone, company? }
 *
 * Books several treatments as back-to-back Acuity appointments starting at
 * `datetime` (order = array order). The chain is re-verified against live
 * availability immediately before creation; if a later appointment fails, the
 * already-created ones are cancelled in reverse order via Acuity's cancel API
 * so the calendar never keeps half a visit.
 * `company` is a honeypot - bots that fill it get a fake success.
 */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

const SLOT_TAKEN = "That time was just taken - please pick another.";

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

  const idsRaw = Array.isArray(body.appointmentTypeIDs) ? body.appointmentTypeIDs : [];
  const allInts = idsRaw.every(
    (id): id is number => typeof id === "number" && Number.isSafeInteger(id) && id > 0,
  );
  // Strict: never truncate. A trimmed basket would book fewer treatments
  // than the client confirmed.
  if (!allInts || idsRaw.length < 2 || idsRaw.length > 6) {
    return NextResponse.json(
      {
        error:
          idsRaw.length > 6
            ? "You can combine up to six treatments in one visit."
            : "All fields are required.",
      },
      { status: 400 },
    );
  }
  const ids = idsRaw as number[];
  if (new Set(ids).size !== ids.length) {
    return NextResponse.json(
      { error: "Please choose each treatment only once." },
      { status: 400 },
    );
  }

  // Honeypot - humans never see this field; silently pretend it worked.
  if (company) {
    return NextResponse.json({
      confirmations: [{ id: Date.now(), datetime, type: "", duration: "", price: "" }],
    });
  }

  if (!firstName || !lastName || !email || !phone || !datetime || ids.length < 2) {
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

  const services = ids.map((id) => CATALOG_SERVICES.find((s) => s.acuityId === id));
  if (services.some((s) => !s)) {
    return NextResponse.json({ error: "That treatment is no longer offered." }, { status: 400 });
  }

  // Fresh chain check - the slot grid may have moved since the client loaded.
  const date = datetime.slice(0, 10);
  const durations = services.map((s) => s!.duration);
  try {
    const perType = await getTimesForTypes(ids, date);
    if (!perType[0].includes(datetime)) {
      return NextResponse.json({ error: SLOT_TAKEN, code: "slot_taken" }, { status: 409 });
    }
    const chain = scheduleChain(perType, durations, datetime);
    if (!chain) {
      return NextResponse.json({ error: SLOT_TAKEN, code: "slot_taken" }, { status: 409 });
    }

    const created: AcuityAppointmentConfirmation[] = [];
    for (let i = 0; i < ids.length; i++) {
      try {
        const conf = await createAppointment({
          appointmentTypeID: ids[i],
          datetime: chain[i],
          firstName,
          lastName,
          email,
          phone,
        });
        created.push(conf);
      } catch (err) {
        // Cancel whatever landed, newest first.
        const rollback = await Promise.allSettled(
          [...created].reverse().map((c) =>
            cancelAppointment(c.id, "Booking could not be completed - this slot was released."),
          ),
        );
        const rolledBack = rollback.every((r) => r.status === "fulfilled");
        if (err instanceof AcuityError && err.status < 500) {
          if (err.code && (err.code.includes("available") || err.code.includes("calendar"))) {
            return NextResponse.json(
              {
                error: rolledBack
                  ? SLOT_TAKEN
                  : "Part of that visit could not be reserved and was released - please pick another time or call us.",
                code: "slot_taken",
              },
              { status: 409 },
            );
          }
          return NextResponse.json(
            { error: "We couldn't confirm that booking - please check your details and try again." },
            { status: 400 },
          );
        }
        throw err;
      }
    }

    return NextResponse.json({
      confirmations: created.map((a) => ({
        id: a.id,
        datetime: a.datetime,
        date: a.date,
        time: a.time,
        type: a.type,
        duration: a.duration,
        price: a.price,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the booking system - please try again shortly." },
      { status: 502 },
    );
  }
}
