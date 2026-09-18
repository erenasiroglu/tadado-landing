import posthog from "posthog-js";

import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
  type DeckPlayPayload,
  type DownloadClickPayload,
  type DownloadSource,
  type SectionId,
} from "@/lib/analytics-events";
import { getActiveAttribution } from "@/lib/attribution-storage";
import {
  configureGaSession,
  isGa4Enabled,
  trackGaEvent,
  trackGaPageView,
} from "@/lib/ga4";
import { isPostHogEnabled } from "@/lib/posthog-config";
import { attributionToAnalyticsPayload, type AttributionData } from "@/lib/utm";

export type DownloadPlatform = DownloadClickPayload["platform"];

/** @deprecated Use AnalyticsEventName */
export type TrackingEventName = AnalyticsEventName;

interface TrackEventOptions {
  event: AnalyticsEventName;
  properties?: Record<string, string | number | boolean | undefined>;
  attribution?: AttributionData;
}

function getFbq(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
}

function getTtq(): {
  track: (event: string, props?: Record<string, unknown>) => void;
  page: () => void;
} | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { ttq?: { track: (event: string, props?: Record<string, unknown>) => void; page: () => void } }).ttq;
}

function buildPayload(
  properties: Record<string, string | number | boolean | undefined>,
  attribution?: AttributionData,
) {
  const activeAttribution = attribution ?? getActiveAttribution();
  return { ...attributionToAnalyticsPayload(activeAttribution), ...properties };
}

async function sendTikTokServerEvent(event: string, properties: Record<string, string | number | boolean | undefined>) {
  if (typeof window === "undefined") return;

  const normalized: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined || value === null || value === "") continue;
    normalized[key] = value;
  }

  try {
    await fetch("/api/tiktok-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, properties: normalized }),
    });
  } catch {
    // Ignore server-side measurement failures; client pixels remain as primary fallback.
  }
}

export function registerAttribution(attribution: AttributionData) {
  const payload = attributionToAnalyticsPayload(attribution);
  if (Object.keys(payload).length === 0) return;

  if (isGa4Enabled()) {
    configureGaSession(payload);
  }

  if (isPostHogEnabled()) {
    posthog.register(payload);
  }
}

export function registerSessionContext(locale: string, pagePath: string) {
  const context = { locale, page_path: pagePath, site: "tadado_landing" };

  if (isPostHogEnabled()) {
    posthog.register(context);
  }

  if (isGa4Enabled()) {
    configureGaSession(context);
  }
}

export function trackEvent({ event, properties = {}, attribution }: TrackEventOptions) {
  const payload = buildPayload(properties, attribution);

  if (isGa4Enabled()) {
    trackGaEvent(event, payload);
  }

  if (isPostHogEnabled()) {
    posthog.capture(event, payload);
  }

  const fbq = getFbq();
  if (fbq) {
    if (event === ANALYTICS_EVENTS.DOWNLOAD_CLICK || event === ANALYTICS_EVENTS.DECK_PLAY_CLICK) {
      fbq("track", "Lead", payload);
    } else if (event === ANALYTICS_EVENTS.NEWSLETTER_SIGNUP) {
      fbq("track", "CompleteRegistration", payload);
    } else {
      fbq("trackCustom", event, payload);
    }
  }

  const ttq = getTtq();
  if (ttq) {
    if (event === ANALYTICS_EVENTS.DOWNLOAD_CLICK || event === ANALYTICS_EVENTS.DECK_PLAY_CLICK) {
      ttq.track("ClickButton", { ...payload, content_type: "app_download" });
    } else if (event === ANALYTICS_EVENTS.NEWSLETTER_SIGNUP) {
      ttq.track("Subscribe", payload);
    } else {
      ttq.track(event, payload);
    }
  }

  void sendTikTokServerEvent(event, payload);
}

export function trackSectionView(sectionId: SectionId) {
  trackEvent({
    event: ANALYTICS_EVENTS.SECTION_VIEW,
    properties: { section_id: sectionId },
  });
}

export function trackDeckPlayClick(payload: DeckPlayPayload) {
  trackEvent({
    event: ANALYTICS_EVENTS.DECK_PLAY_CLICK,
    properties: { ...payload },
  });
}

export function trackDownloadClick(
  platform: DownloadPlatform,
  locale: string,
  source: DownloadSource,
  deck?: { id: string; name: string },
) {
  const properties: DownloadClickPayload = {
    platform,
    locale,
    source,
    ...(deck ? { deck_id: deck.id, deck_name: deck.name } : {}),
  };

  trackEvent({
    event: ANALYTICS_EVENTS.DOWNLOAD_CLICK,
    properties: { ...properties },
  });
}

export function trackPageView(path: string, locale?: string) {
  const payload = buildPayload({
    page_path: path,
    content_id: path,
    content_type: "content",
    ...(locale ? { locale } : {}),
  });

  if (isGa4Enabled()) {
    trackGaPageView(path, payload);
  }

  if (isPostHogEnabled()) {
    posthog.capture("$pageview", payload);
  }

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "PageView", payload);
  }

  const ttq = getTtq();
  if (ttq) {
    ttq.page();
    ttq.track("ViewContent", payload);
  }

  void sendTikTokServerEvent("ViewContent", payload);
}
