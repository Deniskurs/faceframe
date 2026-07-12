import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Weekly self-maintenance for the Instagram feed token (Vercel cron — see
 * vercel.json). Instagram-Login long-lived tokens expire after 60 days but
 * can be refreshed indefinitely once they are older than 24 hours. This
 * route:
 *   1. refreshes the current token against graph.instagram.com,
 *   2. persists the new value to the project's production env via the
 *      Vercel API (VERCEL_TOKEN required),
 *   3. triggers a production redeploy so the running deployment picks it up.
 *
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically when the
 * CRON_SECRET env var is set; any other caller is rejected.
 */

const PROJECT_ID = process.env.VERCEL_PROJECT_ID ?? "prj_uIFsCvhBIQo4nf4tQugcdzNDPj2s";
const TEAM_ID = process.env.VERCEL_TEAM_ID ?? "team_jLw4ZVqzdx6pWTNDLK1Jzhva";
const ENV_KEY = "INSTAGRAM_ACCESS_TOKEN";

async function vercelApi(path: string, init?: RequestInit): Promise<Response> {
  const url = `https://api.vercel.com${path}${path.includes("?") ? "&" : "?"}teamId=${TEAM_ID}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const current = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!current) {
    return NextResponse.json(
      { skipped: "INSTAGRAM_ACCESS_TOKEN not configured" },
      { status: 200 },
    );
  }
  if (!process.env.VERCEL_TOKEN) {
    return NextResponse.json(
      { error: "VERCEL_TOKEN not configured — cannot persist refreshed token" },
      { status: 500 },
    );
  }

  // 1. Refresh the Instagram token.
  const refreshRes = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${current}`,
    { cache: "no-store" },
  );
  if (!refreshRes.ok) {
    const body = await refreshRes.text();
    console.error(`[instagram-refresh] refresh failed (${refreshRes.status}): ${body.slice(0, 200)}`);
    return NextResponse.json({ error: "token refresh failed" }, { status: 502 });
  }
  const { access_token: nextToken, expires_in } = (await refreshRes.json()) as {
    access_token: string;
    expires_in: number;
  };

  // 2. Persist to the project env (find the env record, then patch it).
  const listRes = await vercelApi(`/v9/projects/${PROJECT_ID}/env`);
  if (!listRes.ok) {
    return NextResponse.json({ error: "env list failed" }, { status: 502 });
  }
  const { envs } = (await listRes.json()) as {
    envs: Array<{ id: string; key: string; target: string[] }>;
  };
  const record = envs.find(
    (e) => e.key === ENV_KEY && e.target.includes("production"),
  );
  if (!record) {
    return NextResponse.json({ error: `${ENV_KEY} env record not found` }, { status: 500 });
  }
  const patchRes = await vercelApi(`/v9/projects/${PROJECT_ID}/env/${record.id}`, {
    method: "PATCH",
    body: JSON.stringify({ value: nextToken }),
  });
  if (!patchRes.ok) {
    return NextResponse.json({ error: "env update failed" }, { status: 502 });
  }

  // 3. Redeploy production from main so the new token takes effect.
  const deployRes = await vercelApi(`/v13/deployments`, {
    method: "POST",
    body: JSON.stringify({
      name: "faceframe",
      project: PROJECT_ID,
      target: "production",
      gitSource: { type: "github", org: "Deniskurs", repo: "faceframe", ref: "main" },
    }),
  });
  if (!deployRes.ok) {
    const body = await deployRes.text();
    console.error(`[instagram-refresh] redeploy failed: ${body.slice(0, 200)}`);
    // Token IS refreshed and persisted — the next git push will pick it up.
    return NextResponse.json(
      { refreshed: true, redeployed: false, expiresInDays: Math.round(expires_in / 86400) },
      { status: 200 },
    );
  }

  return NextResponse.json({
    refreshed: true,
    redeployed: true,
    expiresInDays: Math.round(expires_in / 86400),
  });
}
