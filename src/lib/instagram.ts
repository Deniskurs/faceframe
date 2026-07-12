import "server-only";
import { SOCIAL } from "@/config/business";

/**
 * Server-side Instagram feed via the Facebook Graph API.
 *
 * TOKEN: use a NEVER-EXPIRING Page access token (a Page token derived from a
 * long-lived user token has no expiry — this is documented Meta behaviour).
 * One-time setup, no renewal:
 *   1. Open the Graph API Explorer (developers.facebook.com/tools/explorer),
 *      select the FaceFrame app, choose "User Token" and grant
 *      `instagram_basic`, `pages_show_list`, `pages_read_engagement`.
 *      Copy the short-lived token it shows.
 *   2. Run `python3 migration/instagram_token.py <that-token>` — it exchanges
 *      it for a long-lived user token, derives the permanent Page token,
 *      verifies it can read the Instagram media, and prints it.
 *   3. Set FB_LONG_LIVED_TOKEN to the printed value (and FB_PAGE_ID if unset)
 *      in the Vercel environment and redeploy.
 *
 * The permanent token only dies if the Facebook account password changes,
 * permissions are revoked, or the app is deleted — rerun the script then.
 *
 * NOTE: the token currently in .env.local was a 60-day user token that
 * expired in August 2025, so getInstagramFeed() returns null today and
 * callers fall back to FALLBACK_POSTS. That null path is intentional and safe.
 */

export interface InstagramPost {
  id: string;
  src: string;
  alt: string;
  permalink: string;
}

interface GraphMediaItem {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

const GENERIC_ALT = "FaceFrame Beauty treatment result on Instagram";

function captionToAlt(caption?: string): string {
  if (!caption) return GENERIC_ALT;
  const firstLine = caption.split("\n")[0].trim();
  if (!firstLine) return GENERIC_ALT;
  return firstLine.length > 80 ? `${firstLine.slice(0, 80).trimEnd()}…` : firstLine;
}

export async function getInstagramFeed(limit = 12): Promise<InstagramPost[] | null> {
  const token = process.env.FB_LONG_LIVED_TOKEN;
  const pageId = process.env.FB_PAGE_ID;
  const base = process.env.FB_GRAPH_API_URL || "https://graph.facebook.com/v23.0";

  if (!token || !pageId) {
    console.warn("[instagram] FB_LONG_LIVED_TOKEN / FB_PAGE_ID missing — using fallback gallery");
    return null;
  }

  try {
    const pageRes = await fetch(
      `${base}/${pageId}?fields=instagram_business_account&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );
    if (!pageRes.ok) {
      console.warn(`[instagram] page lookup failed (${pageRes.status}) — using fallback gallery`);
      return null;
    }
    const page = (await pageRes.json()) as {
      instagram_business_account?: { id: string };
    };
    const igId = page.instagram_business_account?.id;
    if (!igId) {
      console.warn("[instagram] no instagram_business_account on page — using fallback gallery");
      return null;
    }

    const mediaRes = await fetch(
      `${base}/${igId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );
    if (!mediaRes.ok) {
      console.warn(`[instagram] media fetch failed (${mediaRes.status}) — using fallback gallery`);
      return null;
    }
    const media = (await mediaRes.json()) as { data?: GraphMediaItem[] };
    if (!media.data?.length) {
      console.warn("[instagram] media response empty — using fallback gallery");
      return null;
    }

    const posts = media.data
      .map((item): InstagramPost | null => {
        const src = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
        if (!src) return null;
        return {
          id: item.id,
          src,
          alt: captionToAlt(item.caption),
          permalink: item.permalink,
        };
      })
      .filter((post): post is InstagramPost => post !== null);

    return posts.length ? posts : null;
  } catch (error) {
    console.warn("[instagram] feed fetch failed — using fallback gallery", error);
    return null;
  }
}

/** Curated local stand-ins shown whenever the live feed is unavailable. */
export const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "fallback-1",
    src: "/images/gallery/image1.webp",
    alt: "Softly defined brows after semi-permanent styling",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-2",
    src: "/images/gallery/image3.webp",
    alt: "Natural lash extensions framing the eyes",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-3",
    src: "/images/gallery/image5.webp",
    alt: "Healed microblading with fine, hair-like strokes",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-4",
    src: "/images/gallery/image7.webp",
    alt: "Balanced brow shape after precision mapping",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-5",
    src: "/images/gallery/image10.webp",
    alt: "Fresh, even skin tone after a facial treatment",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-6",
    src: "/images/gallery/image12.webp",
    alt: "Subtle lip blush enhancing natural colour",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-7",
    src: "/images/gallery/image20.webp",
    alt: "Client portrait showing finished brow and lash work",
    permalink: SOCIAL.instagram.url,
  },
  {
    id: "fallback-8",
    src: "/images/gallery/image21.webp",
    alt: "Close-up of defined lashes after a volume set",
    permalink: SOCIAL.instagram.url,
  },
];
