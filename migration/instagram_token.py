#!/usr/bin/env python3
"""One-time helper: mint a NEVER-EXPIRING Facebook Page access token for the
Instagram feed on /gallery.

Usage:
    python3 migration/instagram_token.py <short-lived-user-token>

Get the short-lived token from https://developers.facebook.com/tools/explorer
(select the FaceFrame app, "User Token", grant instagram_basic +
pages_show_list + pages_read_engagement).

The script:
  1. exchanges it for a long-lived user token (60 days),
  2. derives the Page access token from it — Page tokens obtained this way
     have NO expiry (verified against the token debugger),
  3. confirms the token can actually read the linked Instagram account's media,
  4. prints the permanent token to paste into Vercel as FB_LONG_LIVED_TOKEN.

Reads FB_APP_ID / FB_APP_SECRET / FB_PAGE_ID / FB_GRAPH_API_URL from
.env.local in the repo root (run from the repo root or migration/).
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


def load_env() -> dict[str, str]:
    for candidate in (Path(".env.local"), Path("../.env.local")):
        if candidate.exists():
            env: dict[str, str] = {}
            for line in candidate.read_text().splitlines():
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    env[key.strip()] = value.strip().strip('"')
            return env
    sys.exit("error: .env.local not found (run from the repo root)")


def get(base: str, path: str, **params: str) -> dict:
    url = f"{base}/{path}?{urllib.parse.urlencode(params)}"
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            return json.load(response)
    except urllib.error.HTTPError as err:
        detail = json.load(err).get("error", {}).get("message", str(err))
        sys.exit(f"error: {path} -> {detail}")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    short_token = sys.argv[1].strip()

    env = load_env()
    app_id = env["FB_APP_ID"]
    app_secret = env["FB_APP_SECRET"]
    page_id = env["FB_PAGE_ID"]
    base = env.get("FB_GRAPH_API_URL", "https://graph.facebook.com/v23.0")

    print("1/4 exchanging for a long-lived user token…")
    long_lived = get(
        base,
        "oauth/access_token",
        grant_type="fb_exchange_token",
        client_id=app_id,
        client_secret=app_secret,
        fb_exchange_token=short_token,
    )["access_token"]

    print("2/4 deriving the permanent Page token…")
    accounts = get(base, "me/accounts", access_token=long_lived).get("data", [])
    page = next((p for p in accounts if p["id"] == page_id), None)
    if page is None:
        listed = ", ".join(f'{p["name"]} ({p["id"]})' for p in accounts) or "none"
        sys.exit(
            f"error: page {page_id} not among this user's pages: {listed}.\n"
            "Log into Graph Explorer with the account that manages the "
            "FaceFrame Beauty page."
        )
    page_token = page["access_token"]

    print("3/4 checking expiry with the token debugger…")
    debug = get(
        base,
        "debug_token",
        input_token=page_token,
        access_token=f"{app_id}|{app_secret}",
    )["data"]
    expires = debug.get("expires_at", 0)
    print(
        "    expires_at=0 — never expires"
        if expires == 0
        else f"    WARNING: token reports expiry timestamp {expires}"
    )

    print("4/4 verifying Instagram media access…")
    ig = get(base, page_id, fields="instagram_business_account", access_token=page_token)
    ig_id = ig.get("instagram_business_account", {}).get("id")
    if not ig_id:
        sys.exit(
            "error: no Instagram business account linked to the page — link "
            "@faceframe_beauty to the Facebook page in Meta Business Suite first."
        )
    media = get(base, f"{ig_id}/media", fields="id", limit="3", access_token=page_token)
    print(f"    OK — Instagram account {ig_id}, {len(media.get('data', []))}+ posts readable")

    print("\nPermanent Page token (set as FB_LONG_LIVED_TOKEN in Vercel):\n")
    print(page_token)


if __name__ == "__main__":
    main()
