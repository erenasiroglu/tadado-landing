import type { CSSProperties } from "react";

export type DeckKey =
  | "mix"
  | "summer"
  | "cinema"
  | "travel"
  | "sport"
  | "heroes"
  | "midnight";

export interface DeckCardConfig {
  key: DeckKey;
  image: string;
  overlayColors: readonly string[];
  overlayLocations: readonly number[];
  illustrationBackgroundColor: string;
  illustrationScale: number;
  objectPosition?: string;
  showBadge?: boolean;
}

/** Ported from components/home/IllustratedGameCardConfigs.ts */
export const DECK_CARD_CONFIGS: Record<DeckKey, DeckCardConfig> = {
  mix: {
    key: "mix",
    image: "/images/deck-cards/classic-mix-deck-illustration.png",
    overlayColors: [
      "rgba(251, 170, 18, 0.12)",
      "rgba(56, 20, 93, 0.02)",
      "rgba(56, 20, 93, 0.55)",
      "rgba(24, 10, 40, 0.94)",
    ],
    overlayLocations: [0, 0.22, 0.62, 1],
    illustrationBackgroundColor: "#2a1238",
    illustrationScale: 1.12,
    objectPosition: "center 35%",
  },
  summer: {
    key: "summer",
    image: "/images/deck-cards/summer-deck-illustration.png",
    overlayColors: [
      "rgba(255, 107, 74, 0.22)",
      "rgba(0, 0, 0, 0.02)",
      "rgba(56, 20, 93, 0.55)",
      "rgba(30, 12, 48, 0.92)",
    ],
    overlayLocations: [0, 0.38, 0.72, 1],
    illustrationBackgroundColor: "#2a1238",
    illustrationScale: 1.16,
    showBadge: true,
  },
  cinema: {
    key: "cinema",
    image: "/images/deck-cards/cinema-deck-illustration.png",
    overlayColors: [
      "rgba(87, 134, 111, 0.18)",
      "rgba(56, 20, 93, 0.06)",
      "rgba(56, 20, 93, 0.54)",
      "rgba(20, 12, 36, 0.93)",
    ],
    overlayLocations: [0, 0.28, 0.68, 1],
    illustrationBackgroundColor: "#141024",
    illustrationScale: 1.06,
  },
  travel: {
    key: "travel",
    image: "/images/deck-cards/travel-deck-illustration.png",
    overlayColors: [
      "rgba(117, 42, 195, 0.16)",
      "rgba(56, 20, 93, 0.06)",
      "rgba(56, 20, 93, 0.52)",
      "rgba(24, 10, 40, 0.92)",
    ],
    overlayLocations: [0, 0.3, 0.7, 1],
    illustrationBackgroundColor: "#1a0a2e",
    illustrationScale: 1.08,
  },
  sport: {
    key: "sport",
    image: "/images/deck-cards/sport-deck-illustration.png",
    overlayColors: [
      "rgba(251, 170, 18, 0.2)",
      "rgba(56, 20, 93, 0.05)",
      "rgba(56, 20, 93, 0.48)",
      "rgba(24, 14, 8, 0.92)",
    ],
    overlayLocations: [0, 0.26, 0.68, 1],
    illustrationBackgroundColor: "#1a0a2e",
    illustrationScale: 1.07,
  },
  heroes: {
    key: "heroes",
    image: "/images/deck-cards/heroes-deck-illustration.png",
    overlayColors: [
      "rgba(215, 26, 39, 0.15)",
      "rgba(37, 99, 235, 0.1)",
      "rgba(56, 20, 93, 0.52)",
      "rgba(10, 6, 24, 0.93)",
    ],
    overlayLocations: [0, 0.24, 0.66, 1],
    illustrationBackgroundColor: "#0a0618",
    illustrationScale: 1.04,
  },
  midnight: {
    key: "midnight",
    image: "/images/deck-cards/midnight-deck-illustration.png",
    overlayColors: [
      "rgba(195, 4, 93, 0.14)",
      "rgba(56, 20, 93, 0.08)",
      "rgba(46, 6, 20, 0.62)",
      "rgba(18, 4, 12, 0.94)",
    ],
    overlayLocations: [0, 0.26, 0.68, 1],
    illustrationBackgroundColor: "#120408",
    illustrationScale: 1.06,
  },
};

export function buildDeckOverlayStyle(config: DeckCardConfig): CSSProperties {
  const stops = config.overlayColors
    .map((color, i) => `${color} ${(config.overlayLocations[i] ?? 0) * 100}%`)
    .join(", ");
  return { background: `linear-gradient(to bottom, ${stops})` };
}
