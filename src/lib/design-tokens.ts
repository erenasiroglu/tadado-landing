/**
 * Single source of truth for Tadado brand design — ported from mobile app constants.
 * @see constants/homeGradient.ts, constants/glassDesign.ts, constants/gameThemes.ts
 */

export const BRAND_BG_DEEP = "#1A0F28";
export const BRAND_BG = "#2A0A3B";
export const BRAND_BG_LIFT = "#3D1F58";
export const BRAND_AMBER = "#FBAA12";
export const BRAND_CREAM = "#FFF0CF";
export const BRAND_LAVENDER = "#C4B5FD";

export const homeScreenGradient = {
  colors: [BRAND_BG_DEEP, BRAND_BG, BRAND_BG_LIFT] as const,
  locations: [0, 0.4, 1] as const,
} as const;

export function brandGradientCss(): string {
  const stops = homeScreenGradient.colors
    .map((color, i) => `${color} ${(homeScreenGradient.locations[i] ?? 0) * 100}%`)
    .join(", ");
  return `linear-gradient(165deg, ${stops})`;
}

export const GLASS = {
  tint: {
    default: "rgba(196, 181, 253, 0.14)",
    accent: "rgba(139, 92, 246, 0.18)",
    subtle: "rgba(255, 255, 255, 0.06)",
  },
  border: {
    color: "rgba(255, 255, 255, 0.16)",
    colorStrong: "rgba(255, 255, 255, 0.22)",
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 22,
    xl: 24,
    card: 24,
  },
  text: {
    primary: "#F5F0FF",
    secondary: "#E9D5FF",
    onDark: "#FFF0CF",
    muted: "rgba(245, 240, 255, 0.88)",
  },
  neumorph: {
    highlight: "rgba(255, 255, 255, 0.14)",
  },
} as const;

export const CLASSIC_GAME_SCREEN = {
  background: "#290939",
  cardBg: "#4b1a7a",
  wordBg: "#faaa12",
  wordText: "#4b1a7a",
  forbiddenWordBg: "#faaa12",
  forbiddenWordText: "#4b1a7a",
  teamNameText: "#faaa12",
  timerGradient: ["#ffe8bd", "#fcb022"] as const,
  timerText: "#957d84",
  cardProgressText: "#fff0cf",
} as const;

export const ACTION_VARIANTS = {
  taboo: {
    tint: "rgba(251, 113, 133, 0.26)",
    accent: "#FB7185",
    iconBg: "rgba(251, 113, 133, 0.32)",
    border: "rgba(251, 113, 133, 0.42)",
  },
  pass: {
    tint: "rgba(196, 181, 253, 0.24)",
    accent: "#E9D5FF",
    iconBg: "rgba(139, 92, 246, 0.3)",
    border: "rgba(196, 181, 253, 0.38)",
  },
  correct: {
    tint: "rgba(167, 139, 250, 0.26)",
    accent: "#C4B5FD",
    iconBg: "rgba(124, 58, 237, 0.32)",
    border: "rgba(167, 139, 250, 0.42)",
  },
} as const;

export const DECK_CHROME = {
  borderColor: GLASS.border.colorStrong,
  titleColor: GLASS.text.primary,
  subtitleColor: GLASS.text.secondary,
  playIconColor: GLASS.text.primary,
  badgeTextColor: GLASS.text.secondary,
  playTint: GLASS.tint.default,
  badgeTint: GLASS.tint.subtle,
} as const;

export const CTA_GRADIENT = {
  from: "#A78BFA",
  to: "#6D28D9",
  text: "#FFFFFF",
} as const;

export const PHONE_SHELL = {
  bg: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.12)",
  screenBg: "#1A0F28",
  island: "rgba(0, 0, 0, 0.65)",
} as const;

export const PHONE_PORTRAIT_RATIO = 2.05;
export const PHONE_LANDSCAPE_RATIO = 0.46;
export const PHONE_REFERENCE_WIDTH = 236;
