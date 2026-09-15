import { getCampaignUrl } from "@/lib/utm-campaigns";

export const SOCIAL_LINKS = {
  instagram: {
    href: "https://www.instagram.com/tadado.game/",
    handle: "@tadado.game",
    landingUrl: getCampaignUrl("instagramBio", "/en"),
  },
  tiktok: {
    href: "https://www.tiktok.com/@tadado.app",
    handle: "@tadado.app",
    landingUrl: getCampaignUrl("tiktokBio", "/en"),
  },
} as const;
