import { NextRequest, NextResponse } from "next/server";
import { buildChainSchedule, getAvailableDates, getAvailableTimes, getTimesForTypes } from "@/lib/acuity";
import { CATALOG_SERVICES } from "@/data/acuityCatalog";

/**
 * GET /api/booking/availability?type=<acuityId>&month=YYYY-MM  -> { dates: string[] }
 * GET /api/booking/availability?type=<acuityId>&date=YYYY-MM-DD -> { times, chains? }
 *
 * With &types=<id,id,...> the times are basket-chain starts and `chains`
 * maps each start to its resolved per-item schedule and true visit span.
 *
 * Optional &addons=<comma-separated add-on IDs> scopes slots to the base
 * treatment PLUS the extras' added time, per Acuity's appointment-addons API.
 *
 * Times come back as ISO datetimes with offset (Europe/London account).
 * Slots change constantly, but a minute of shared cache smooths bursts.
 */
export const dynamic = "force-dynamic";

const TYPE_RE = /^\d+$/;
const MONTH_RE = /^\d{4}-\d{2}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
/** Comma-separated add-on IDs: "7121871" or "7121871,7121872" */
const ADDONS_RE = /^\d{1,8}(,\d{1,8})*$/;
/** Two to six comma-separated treatment IDs for basket chains */
const CHAIN_RE = /^\d{1,8}(,\d{1,8}){1,5}$/;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
};

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type") ?? "";
  const month = params.get("month");
  const date = params.get("date");

  // Basket chains: ?types=<id,id,...> scopes slots so EVERY treatment fits
  // back-to-back (order preserved). Validated first - when present, the
  // single-treatment parameter is not required.
  let chainIds: number[] | null = null;
  const typesParam = params.get("types");
  if (typesParam) {
    if (!CHAIN_RE.test(typesParam)) {
      return NextResponse.json({ error: "invalid types" }, { status: 400 });
    }
    const requested = typesParam.split(",").map(Number);
    const known = requested.filter((id) =>
      CATALOG_SERVICES.some((s) => s.acuityId === id),
    );
    if (known.length !== requested.length) {
      return NextResponse.json({ error: "unknown treatment" }, { status: 400 });
    }
    chainIds = known;
  }

  const typeId = Number(type);
  if (
    !chainIds &&
    (!TYPE_RE.test(type) || !Number.isSafeInteger(typeId) || typeId <= 0)
  ) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }
  if (date ? !DATE_RE.test(date) : !month || !MONTH_RE.test(month)) {
    return NextResponse.json(
      { error: "expected month=YYYY-MM or date=YYYY-MM-DD" },
      { status: 400 },
    );
  }

  let addonIds: number[] = [];
  const addonsParam = params.get("addons");
  if (addonsParam) {
    if (!ADDONS_RE.test(addonsParam)) {
      return NextResponse.json({ error: "invalid addons" }, { status: 400 });
    }
    addonIds = addonsParam.split(",").map(Number);
  }


  try {
    if (chainIds) {
      const durations = chainIds.map(
        (id) => CATALOG_SERVICES.find((s) => s.acuityId === id)!.duration,
      );
      if (date) {
        const perType = await getTimesForTypes(chainIds, date);
        const { starts, chains } = buildChainSchedule(perType, durations);
        return NextResponse.json(
          { times: starts, chains },
          { headers: CACHE_HEADERS },
        );
      }
      // Month view: intersection of per-type openings. A listed day can still
      // fill up mid-chain; the date call then returns no times and the UI says
      // so, same as a single treatment that lost its last slot.
      const lists = await Promise.all(
        chainIds.map((id) => getAvailableDates(id, month as string)),
      );
      const dates = lists.reduce((acc, l) => acc.filter((d) => l.includes(d)));
      return NextResponse.json({ dates }, { headers: CACHE_HEADERS });
    }
    if (date) {
      const times = await getAvailableTimes(typeId, date, addonIds);
      return NextResponse.json({ times }, { headers: CACHE_HEADERS });
    }
    const dates = await getAvailableDates(typeId, month as string, addonIds);
    return NextResponse.json({ dates }, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(
      { error: "We couldn't reach the booking system — please try again shortly." },
      { status: 502 },
    );
  }
}
