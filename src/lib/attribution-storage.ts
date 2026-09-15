import {
  type AttributionData,
  hasAttributionParams,
  mergeAttribution,
  parseAttributionFromSearch,
} from "@/lib/utm";

const FIRST_TOUCH_KEY = "tadado_attribution_first";
const LAST_TOUCH_KEY = "tadado_attribution_last";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredAttribution {
  data: AttributionData;
  saved_at: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStorage(storage: Storage, key: string): StoredAttribution | null {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed?.data || !parsed.saved_at) return null;

    const age = Date.now() - new Date(parsed.saved_at).getTime();
    if (age > ATTRIBUTION_TTL_MS) {
      storage.removeItem(key);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage, key: string, data: AttributionData) {
  const payload: StoredAttribution = {
    data,
    saved_at: new Date().toISOString(),
  };
  storage.setItem(key, JSON.stringify(payload));
}

export function captureAttributionFromLocation(): AttributionData | null {
  if (!isBrowser()) return null;

  const fromUrl = parseAttributionFromSearch(window.location.search);
  if (!hasAttributionParams(fromUrl)) return null;

  const enriched: AttributionData = {
    ...fromUrl,
    landing_page: window.location.pathname,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  };

  const firstTouch = readStorage(localStorage, FIRST_TOUCH_KEY);
  if (!firstTouch) {
    writeStorage(localStorage, FIRST_TOUCH_KEY, enriched);
  }

  writeStorage(sessionStorage, LAST_TOUCH_KEY, enriched);

  return enriched;
}

export function getFirstTouchAttribution(): AttributionData {
  if (!isBrowser()) return {};
  return readStorage(localStorage, FIRST_TOUCH_KEY)?.data ?? {};
}

export function getLastTouchAttribution(): AttributionData {
  if (!isBrowser()) return {};
  return readStorage(sessionStorage, LAST_TOUCH_KEY)?.data ?? {};
}

export function getActiveAttribution(): AttributionData {
  const lastTouch = getLastTouchAttribution();
  const firstTouch = getFirstTouchAttribution();
  return mergeAttribution(firstTouch, lastTouch);
}
