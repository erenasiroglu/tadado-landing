import { getCampaignUrl } from "@/lib/utm-campaigns";

export const SOCIAL_LINKS = {
  instagram: {
    href: "https://www.instagram.com/playtadado/",
    handle: "@playtadado",
    landingUrl: getCampaignUrl("instagramBio", "/en"),
  },
  tiktok: {
    href: "https://www.tiktok.com/@tadado.app",
    handle: "@tadado.app",
    landingUrl: getCampaignUrl("tiktokBio", "/en"),
  },
  linkedin: {
    href: "https://www.linkedin.com/company/tadado",
    handle: "Tadado",
    landingUrl: getCampaignUrl("linkedinBio", "/en"),
  },
  productHunt: {
    href: "https://www.producthunt.com/products/tadado-ai-word-guessing-game",
    handle: "Product Hunt",
    /** Halloween launch (Oct 26 2026): the embed link Product Hunt gave us, so the visits count as embed traffic. */
    launchUrl:
      "https://www.producthunt.com/products/tadado-ai-word-guessing-game?embed=true&utm_source=embed&utm_medium=post_embed",
    landingUrl: getCampaignUrl("productHuntBio", "/en"),
  },
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;
