import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics-events";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-LYSWJHHH9L";

/** Register these as custom dimensions in GA4 (Event scope) for full reporting */
export const GA4_CUSTOM_DIMENSIONS = [
  "deck_id",
  "deck_name",
  "source",
  "section_id",
  "platform",
  "locale",
  "is_free",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "ttclid",
  "gclid",
  "lead_source",
  "question_index",
  "tab",
  "difficulty",
  "variant",
  "slug",
  "site",
] as const;

function getGtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
}

export function toGa4Params(
  params: Record<string, string | number | boolean | undefined>,
): Record<string, string | number> {
  const out: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "boolean") {
      out[key] = value ? "true" : "false";
    } else {
      out[key] = value;
    }
  }

  return out;
}

function setGaUserProperties(properties: Record<string, string | number | boolean | undefined>) {
  const gtag = getGtag();
  if (!gtag) return;

  const stringProps: Record<string, string> = {};
  for (const [key, value] of Object.entries(toGa4Params(properties))) {
    stringProps[key] = String(value);
  }

  if (Object.keys(stringProps).length > 0) {
    gtag("set", "user_properties", stringProps);
  }
}

export function configureGaSession(context: Record<string, string | number | boolean | undefined>) {
  const gtag = getGtag();
  if (!gtag) return;

  const params = toGa4Params(context);
  const config: Record<string, string> = {};

  if (params.page_path) config.page_path = String(params.page_path);
  if (params.locale) config.language = String(params.locale);

  if (Object.keys(config).length > 0) {
    gtag("config", GA_MEASUREMENT_ID, config);
  }

  setGaUserProperties(context);
}

export function trackGaPageView(
  path: string,
  properties: Record<string, string | number | boolean | undefined>,
) {
  const gtag = getGtag();
  if (!gtag) return;

  const pageLocation =
    typeof window !== "undefined"
      ? window.location.href
      : `https://tadado.app${path.startsWith("/") ? path : `/${path}`}`;

  const params = toGa4Params({
    ...properties,
    page_path: path,
    page_location: pageLocation,
    page_title: typeof document !== "undefined" ? document.title : "Tadado",
  });

  gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_location: pageLocation,
  });

  gtag("event", "page_view", params);
}

function mirrorRecommendedGaEvent(
  event: AnalyticsEventName,
  params: Record<string, string | number>,
) {
  const gtag = getGtag();
  if (!gtag) return;

  switch (event) {
    case ANALYTICS_EVENTS.DOWNLOAD_CLICK:
      gtag(
        "event",
        "generate_lead",
        toGa4Params({
          lead_source: params.source,
          platform: params.platform,
          locale: params.locale,
          deck_id: params.deck_id,
          deck_name: params.deck_name,
          currency: "USD",
          value: 0,
        }),
      );
      break;

    case ANALYTICS_EVENTS.DECK_PLAY_CLICK:
      gtag("event", "select_item", {
        item_list_id: "tadado_decks",
        item_list_name: "Deck catalog",
        items: [
          {
            item_id: String(params.deck_id ?? ""),
            item_name: String(params.deck_name ?? ""),
            item_category: params.is_free === "true" ? "free_deck" : "premium_deck",
          },
        ],
        locale: params.locale,
      });
      break;

    case ANALYTICS_EVENTS.DECK_CARD_VIEW:
      gtag("event", "view_item", {
        item_list_id: "tadado_decks",
        items: [
          {
            item_id: String(params.deck_id ?? ""),
            item_name: String(params.deck_name ?? ""),
            item_category: params.is_free === "true" ? "free_deck" : "premium_deck",
          },
        ],
        locale: params.locale,
      });
      break;

    case ANALYTICS_EVENTS.NEWSLETTER_SIGNUP:
      gtag(
        "event",
        "sign_up",
        toGa4Params({
          method: "waitlist",
          locale: params.locale,
        }),
      );
      break;

    case ANALYTICS_EVENTS.AFFILIATE_APPLY_CLICK:
      gtag(
        "event",
        "generate_lead",
        toGa4Params({
          lead_source: "affiliate",
          variant: params.variant,
          locale: params.locale,
        }),
      );
      break;

    case ANALYTICS_EVENTS.SECTION_VIEW:
      gtag(
        "event",
        "view_item_list",
        toGa4Params({
          item_list_id: String(params.section_id ?? ""),
          item_list_name: String(params.section_id ?? ""),
        }),
      );
      break;

    default:
      break;
  }
}

export function trackGaEvent(
  event: AnalyticsEventName,
  properties: Record<string, string | number | boolean | undefined>,
) {
  const gtag = getGtag();
  if (!gtag) return;

  const params = toGa4Params(properties);

  gtag("event", event, params);
  mirrorRecommendedGaEvent(event, params);
}

export function isGa4Enabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}
