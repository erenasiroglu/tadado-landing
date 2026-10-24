import { cache } from "react";

/** Public Supabase project the app uses. The publishable key is safe to ship to browsers. */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ztgofrwncdclgbvurclf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_wsa8FpiD_thxc6Y52GmsVQ_Bnyu4x6p";

export interface SharedDeckSample {
  word: string;
  forbidden_words: string[] | null;
}

export interface SharedDeckPreview {
  code: string;
  name: string;
  description: string | null;
  content_language: string | null;
  creator_name: string | null;
  card_count: number;
  samples: SharedDeckSample[];
}

/** Same rules as the app's normalizeShareCode: uppercase, letters and digits only, 4 to 12 long. */
export function normalizeShareCode(raw: string | string[] | undefined | null): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const code = value?.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  return code && code.length >= 4 && code.length <= 12 ? code : null;
}

export function normalizeReferralSource(raw: string | string[] | undefined | null): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "deck" || value === "game_result" || value === "screenshot" ? value : "invite";
}

/** Deduped per request, so metadata and the page share one RPC call (it counts opens). */
export const getSharedDeckPreview = cache(async (code: string): Promise<SharedDeckPreview | null> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_shared_deck_preview`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_code: code }),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as SharedDeckPreview | null;
    return data?.name ? data : null;
  } catch {
    return null;
  }
});

/** Custom-scheme link that opens the app on the matching expo-router screen. */
export function buildAppDeepLink(path: string, params: Record<string, string | null | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return `tadado://${path}${query ? `?${query}` : ""}`;
}

export { fillTemplate, getShareLinkCopy, type ShareLinkCopy } from "./copy";
