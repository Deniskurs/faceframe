import "server-only";
import { SOCIAL } from "@/config/business";

/**
 * Server-side Instagram feed.
 *
 * PRIMARY — "Instagram API with Instagram Login" (matches the GalleryWebsite
 * Meta app): set INSTAGRAM_ACCESS_TOKEN to a long-lived Instagram user token
 * (App Dashboard -> Instagram -> API setup with Instagram login -> Generate
 * access tokens). These tokens last 60 days; /api/instagram/refresh (weekly
 * Vercel cron) refreshes the token, persists it to the project env via the
 * Vercel API, and triggers a redeploy — fully self-maintaining.
 *
 * LEGACY — Facebook-Page-backed Graph API: FB_LONG_LIVED_TOKEN + FB_PAGE_ID
 * (never-expiring Page token via migration/instagram_token.py). Used only
 * when INSTAGRAM_ACCESS_TOKEN is absent.
 *
 * Any failure in either path returns null and callers fall back to
 * FALLBACK_POSTS — the gallery never breaks.
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

async function fetchMedia(
  url: string,
  limit: number,
): Promise<InstagramPost[] | null> {
  const mediaRes = await fetch(url, { next: { revalidate: 3600 } });
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
    .slice(0, limit)
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
}

const MEDIA_FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption";

export async function getInstagramFeed(limit = 12): Promise<InstagramPost[] | null> {
  // Primary: Instagram-Login user token — direct, no page hop.
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (igToken) {
    try {
      return await fetchMedia(
        `https://graph.instagram.com/me/media?fields=${MEDIA_FIELDS}&limit=${limit}&access_token=${igToken}`,
        limit,
      );
    } catch (error) {
      console.warn("[instagram] feed fetch failed — using fallback gallery", error);
      return null;
    }
  }

  // Legacy: Facebook-Page-backed flow.
  const token = process.env.FB_LONG_LIVED_TOKEN;
  const pageId = process.env.FB_PAGE_ID;
  const base = process.env.FB_GRAPH_API_URL || "https://graph.facebook.com/v23.0";

  if (!token || !pageId) {
    console.warn("[instagram] no Instagram credentials configured — using fallback gallery");
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

    return await fetchMedia(
      `${base}/${igId}/media?fields=${MEDIA_FIELDS}&limit=${limit}&access_token=${token}`,
      limit,
    );
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
