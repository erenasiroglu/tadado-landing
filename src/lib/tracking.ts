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

function buildPayload(
  properties: Record<string, string | number | boolean | undefined>,
  attribution?: AttributionData,
) {
  const activeAttribution = attribution ?? getActiveAttribution();
  return { ...attributionToAnalyticsPayload(activeAttribution), ...properties };
}

export function registerAttribution(attribution: AttributionData) {
  const payload = attributionToAnalyticsPayload(attribution);
  if (Object.keys(payload).length === 0) return;

  if (isGa4Enabled()) {
    configureGaSession(payload);
  }
}

export function registerSessionContext(locale: string, pagePath: string) {
  const context = { locale, page_path: pagePath, site: "tadado_landing" };

  if (isGa4Enabled()) {
    configureGaSession(context);
  }
}

export function trackEvent({ event, properties = {}, attribution }: TrackEventOptions) {
  const payload = buildPayload(properties, attribution);

  if (isGa4Enabled()) {
    trackGaEvent(event, payload);
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

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "PageView", payload);
  }
}
