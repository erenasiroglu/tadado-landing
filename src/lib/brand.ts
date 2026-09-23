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

export const PRICING = {
  mixFree: true,
  themeDeckUsd: 0.99,
  aiDeckUsd: 2.99,
} as const;
