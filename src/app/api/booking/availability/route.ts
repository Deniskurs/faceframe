import { NextRequest, NextResponse } from "next/server";
import { getAvailableDates, getAvailableTimes } from "@/lib/acuity";

/**
 * GET /api/booking/availability?type=<acuityId>&month=YYYY-MM  -> { dates: string[] }
 * GET /api/booking/availability?type=<acuityId>&date=YYYY-MM-DD -> { times: string[] }
 *
 * Times come back as ISO datetimes with offset (Europe/London account).
 * Slots change constantly, but a minute of shared cache smooths bursts.
 */
export const dynamic = "force-dynamic";

const TYPE_RE = /^\d+$/;
const MONTH_RE = /^\d{4}-\d{2}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
};

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type") ?? "";
  const month = params.get("month");
  const date = params.get("date");

  const typeId = Number(type);
  if (!TYPE_RE.test(type) || !Number.isSafeInteger(typeId) || typeId <= 0) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }
  if (date ? !DATE_RE.test(date) : !month || !MONTH_RE.test(month)) {
    return NextResponse.json(
      { error: "expected month=YYYY-MM or date=YYYY-MM-DD" },
      { status: 400 },
    );
  }

  try {
    if (date) {
      const times = await getAvailableTimes(typeId, date);
      return NextResponse.json({ times }, { headers: CACHE_HEADERS });
    }
    const dates = await getAvailableDates(typeId, month as string);
    return NextResponse.json({ dates }, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the booking system — please try again shortly." },
      { status: 502 },
    );
  }
}
