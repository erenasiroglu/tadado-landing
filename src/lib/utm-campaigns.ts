import { buildCampaignUrl, type UtmCampaignPreset } from "@/lib/utm";

/** Preset UTM campaigns for social, ads, and partner links */
export const UTM_CAMPAIGNS: Record<string, UtmCampaignPreset> = {
  instagramBio: {
    name: "Instagram bio",
    utm_source: "instagram",
    utm_medium: "social",
    utm_campaign: "bio_link",
  },
  tiktokBio: {
    name: "TikTok bio",
    utm_source: "tiktok",
    utm_medium: "social",
    utm_campaign: "bio_link",
  },
  linkedinBio: {
    name: "LinkedIn bio",
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "bio_link",
  },
  productHuntBio: {
    name: "Product Hunt",
    utm_source: "producthunt",
    utm_medium: "social",
    utm_campaign: "product_page",
  },
  metaAds: {
    name: "Meta ads",
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "app_install",
  },
  tiktokAds: {
    name: "TikTok ads",
    utm_source: "tiktok",
    utm_medium: "paid_social",
    utm_campaign: "app_install",
  },
  googleAds: {
    name: "Google ads",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "brand_search",
  },
  affiliate: {
    name: "Affiliate",
    utm_source: "affiliate",
    utm_medium: "referral",
    utm_campaign: "creator_program",
  },
  blog: {
    name: "Blog",
    utm_source: "tadado",
    utm_medium: "content",
    utm_campaign: "blog_cta",
  },
  email: {
    name: "Email",
    utm_source: "newsletter",
    utm_medium: "email",
    utm_campaign: "product_update",
  },
};

export function getCampaignUrl(
  campaignKey: keyof typeof UTM_CAMPAIGNS,
  path = "/en",
  content?: string,
): string {
  const preset = UTM_CAMPAIGNS[campaignKey];
  return buildCampaignUrl(path, {
    ...preset,
    ...(content ? { utm_content: content } : {}),
  });
}
