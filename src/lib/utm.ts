export const UTM_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

export const CLICK_ID_KEYS = ["fbclid", "ttclid", "gclid"] as const;

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number];
export type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
}

export interface ClickIds {
  fbclid?: string;
  ttclid?: string;
  gclid?: string;
}

export interface AttributionData extends UtmParams, ClickIds {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
}

export interface UtmCampaignPreset extends UtmParams {
  name: string;
  description?: string;
}

function isNonEmpty(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseAttributionFromSearch(search: string): AttributionData {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const data: AttributionData = {};

  for (const key of UTM_PARAM_KEYS) {
    const value = params.get(key);
    if (isNonEmpty(value)) data[key] = value;
  }

  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key);
    if (isNonEmpty(value)) data[key] = value;
  }

  return data;
}

export function parseAttributionFromUrl(url: string): AttributionData {
  try {
    const { search } = new URL(url);
    return parseAttributionFromSearch(search);
  } catch {
    return {};
  }
}

export function hasAttributionParams(data: AttributionData): boolean {
  return UTM_PARAM_KEYS.some((key) => isNonEmpty(data[key])) ||
    CLICK_ID_KEYS.some((key) => isNonEmpty(data[key]));
}

export function mergeAttribution(
  base: AttributionData,
  patch: AttributionData,
): AttributionData {
  const merged: AttributionData = { ...base };

  for (const key of [...UTM_PARAM_KEYS, ...CLICK_ID_KEYS] as const) {
    const value = patch[key];
    if (isNonEmpty(value)) merged[key] = value;
  }

  if (isNonEmpty(patch.landing_page)) merged.landing_page = patch.landing_page;
  if (isNonEmpty(patch.referrer)) merged.referrer = patch.referrer;
  if (isNonEmpty(patch.captured_at)) merged.captured_at = patch.captured_at;

  return merged;
}

export function appendAttributionToUrl(
  url: string,
  attribution: AttributionData,
): string {
  try {
    const parsed = new URL(url);

    for (const key of [...UTM_PARAM_KEYS, ...CLICK_ID_KEYS] as const) {
      const value = attribution[key];
      if (isNonEmpty(value) && !parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, value);
      }
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function buildCampaignUrl(
  path: string,
  campaign: UtmParams,
  baseUrl = "https://tadado.app",
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalizedPath, baseUrl);

  for (const key of UTM_PARAM_KEYS) {
    const value = campaign[key];
    if (isNonEmpty(value)) url.searchParams.set(key, value);
  }

  return url.toString();
}

export function attributionToAnalyticsPayload(
  attribution: AttributionData,
): Record<string, string> {
  const payload: Record<string, string> = {};

  for (const key of [...UTM_PARAM_KEYS, ...CLICK_ID_KEYS] as const) {
    const value = attribution[key];
    if (isNonEmpty(value)) payload[key] = value;
  }

  if (isNonEmpty(attribution.landing_page)) payload.landing_page = attribution.landing_page;
  if (isNonEmpty(attribution.referrer)) payload.referrer = attribution.referrer;

  return payload;
}
