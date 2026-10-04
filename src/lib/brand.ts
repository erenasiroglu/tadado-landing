export const BRAND = {
  name: "Tadado",
  developer: "Tadado Game Development",
  domain: "https://tadado.app",
  supportEmail:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SUPPORT_EMAIL) ||
    "tadado.ai@gmail.com",
  stats: {
    gamesPlayed: 300000,
  },
  colors: {
    deepPurple: "#1A0F28",
    purple: "#2A0A3B",
    liftPurple: "#3D1F58",
    amber: "#FBAA12",
    cream: "#FFF0CF",
    lavender: "#C4B5FD",
    ctaFrom: "#A78BFA",
    ctaTo: "#6D28D9",
  },
} as const;

/** USD list prices for SEO / llms; store may show local currency (e.g. TRY in Turkey). */
export const PRICING = {
  mixFree: true,
  singleDeckUsd: 0.99,
  singleDeckTry: 49.99,
  aiStarterUsd: 2.99,
  aiStarterTry: 99.99,
  aiPlusUsd: 5.99,
  aiPlusTry: 199,
  aiProUsd: 9.99,
  aiProTry: 349.99,
  fullAccessUsd: 14.99,
  fullAccessTry: 499,
} as const;
