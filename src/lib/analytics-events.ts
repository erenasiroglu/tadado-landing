export const ANALYTICS_EVENTS = {
  // Acquisition & navigation
  PAGE_VIEW: "page_view",
  SECTION_VIEW: "section_view",
  INTERNAL_NAV_CLICK: "internal_nav_click",
  LANGUAGE_VIEW: "language_view",
  LANGUAGE_CHANGED: "language_changed",

  // Hero & conversion
  HERO_CTA_CLICK: "hero_cta_click",
  HERO_TAB_SELECT: "hero_tab_select",
  FINAL_CTA_CLICK: "final_cta_click",
  APP_STORE_CLICK: "app_store_click",
  GOOGLE_PLAY_CLICK: "google_play_click",

  // Product interest
  TRENDING_TAB_SELECT: "trending_tab_select",
  GAME_MODE_VIEW: "game_mode_view",
  MODE_DEMO_STARTED: "mode_demo_started",
  MODE_SWITCHED: "mode_switched",

  // Deck funnel
  DECK_PLAY_CLICK: "deck_play_click",
  DECK_CARD_VIEW: "deck_card_view",
  DECK_CAROUSEL_INTERACTION: "deck_carousel_interaction",
  DECK_CLICKED: "deck_clicked",
  PREMIUM_DECK_CLICKED: "premium_deck_clicked",

  // AI demo
  AI_DEMO_START: "ai_demo_start",
  AI_DEMO_STARTED: "ai_demo_started",
  AI_DEMO_COMPLETED: "ai_demo_completed",
  AI_DEMO_DIFFICULTY: "ai_demo_difficulty_change",
  AI_DEMO_GENERATED: "ai_demo_card_generated",
  AI_DEMO_CREATE_CLICK: "ai_demo_create_click",

  // Conversion
  DOWNLOAD_CLICK: "download_click",
  NEWSLETTER_SIGNUP: "newsletter_signup",
  AFFILIATE_APPLY_CLICK: "affiliate_apply_click",
  PARTNERSHIP_EMAIL_CLICK: "partnership_email_click",

  // Community
  COMMUNITY_CLICK: "community_click",
  SOCIAL_CLICK: "social_click",

  // Content & support
  FAQ_OPEN: "faq_open",
  FAQ_OPENED: "faq_opened",
  BLOG_POST_CLICK: "blog_post_click",
  BLOG_VIEW_ALL_CLICK: "blog_view_all_click",
  COMPARE_CTA_CLICK: "compare_cta_click",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type DownloadSource =
  | "hero_badges"
  | "hero_primary"
  | "hero_secondary"
  | "header"
  | "header_mobile"
  | "sticky_bar"
  | "pricing"
  | "cta_bottom"
  | "final_cta"
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
  | "personalization"
  | "product_benefits"
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
