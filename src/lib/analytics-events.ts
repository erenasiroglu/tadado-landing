/** Investor-ready event taxonomy for PostHog / GA4 dashboards */

export const ANALYTICS_EVENTS = {
  // Acquisition & navigation
  PAGE_VIEW: "page_view",
  SECTION_VIEW: "section_view",
  INTERNAL_NAV_CLICK: "internal_nav_click",
  LANGUAGE_VIEW: "language_view",

  // Product interest
  HERO_TAB_SELECT: "hero_tab_select",
  TRENDING_TAB_SELECT: "trending_tab_select",
  GAME_MODE_VIEW: "game_mode_view",

  // Deck funnel (key investor metric)
  DECK_PLAY_CLICK: "deck_play_click",
  DECK_CARD_VIEW: "deck_card_view",

  // AI demo
  AI_DEMO_START: "ai_demo_start",
  AI_DEMO_DIFFICULTY: "ai_demo_difficulty_change",
  AI_DEMO_GENERATED: "ai_demo_card_generated",
  AI_DEMO_CREATE_CLICK: "ai_demo_create_click",

  // Conversion
  DOWNLOAD_CLICK: "download_click",
  NEWSLETTER_SIGNUP: "newsletter_signup",
  AFFILIATE_APPLY_CLICK: "affiliate_apply_click",
  PARTNERSHIP_EMAIL_CLICK: "partnership_email_click",

  // Content & support
  FAQ_OPEN: "faq_open",
  BLOG_POST_CLICK: "blog_post_click",
  BLOG_VIEW_ALL_CLICK: "blog_view_all_click",
  COMPARE_CTA_CLICK: "compare_cta_click",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type DownloadSource =
  | "hero_badges"
  | "header"
  | "header_mobile"
  | "sticky_bar"
  | "pricing"
  | "cta_bottom"
  | "compare"
  | "deck_catalog"
  | "trending_deck"
  | "ai_demo";

export type SectionId =
  | "hero"
  | "proof"
  | "modes"
  | "how_to_play"
  | "trending"
  | "decks"
  | "ai_deck_builder"
  | "pricing"
  | "reviews"
  | "features"
  | "how_it_works"
  | "community"
  | "seo_guides"
  | "compare"
  | "blog"
  | "faq"
  | "newsletter"
  | "affiliate"
  | "partnerships"
  | "cta";

export interface DeckPlayPayload {
  deck_id: string;
  deck_name: string;
  is_free: boolean;
  locale: string;
}

export interface DownloadClickPayload {
  platform: "ios" | "android";
  locale: string;
  source: DownloadSource;
  deck_id?: string;
  deck_name?: string;
}
