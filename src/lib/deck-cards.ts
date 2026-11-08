import type { CSSProperties } from "react";

export type DeckKey =
  | "mix"
  | "summer"
  | "cinema"
  | "travel"
  | "sport"
  | "heroes"
  | "midnight"
  | "genius"
  | "halloween"
  | "office"
  | "brands"
  | "friendsgiving"
  | "animals"
  | "cars";

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

/** Keep in sync with `components/home/IllustratedGameCardConfigs.ts`. */
export const DECK_CARD_CONFIGS: Record<DeckKey, DeckCardConfig> = {
  mix: {
    key: "mix",
    image: "/images/deck-cards/classic-mix-deck-illustration.webp",
    overlayColors: [
      "rgba(251, 170, 18, 0.08)",
      "rgba(42, 18, 56, 0.05)",
      "rgba(56, 20, 93, 0.48)",
      "rgba(24, 10, 40, 0.91)",
    ],
    overlayLocations: [0, 0.28, 0.68, 1],
    illustrationBackgroundColor: "#2a1238",
    illustrationScale: 1.08,
    showBadge: false,
  },
  summer: {
    key: "summer",
    image: "/images/deck-cards/summer-deck-illustration.webp",
    overlayColors: [
      "rgba(255, 107, 74, 0.22)",
      "rgba(0, 0, 0, 0.02)",
      "rgba(56, 20, 93, 0.55)",
      "rgba(30, 12, 48, 0.92)",
    ],
    overlayLocations: [0, 0.38, 0.72, 1],
    illustrationBackgroundColor: "#2a1238",
    illustrationScale: 1.16,
    showBadge: false,
  },
  cinema: {
    key: "cinema",
    image: "/images/deck-cards/cinema-deck-illustration.webp",
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
    image: "/images/deck-cards/travel-deck-illustration.webp",
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
    image: "/images/deck-cards/sport-deck-illustration.webp",
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
    image: "/images/deck-cards/heroes-deck-illustration.webp",
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
    image: "/images/deck-cards/midnight-deck-illustration.webp",
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
  genius: {
    key: "genius",
    image: "/images/deck-cards/genius-deck-illustration.webp",
    overlayColors: [
      "rgba(139, 92, 246, 0.14)",
      "rgba(30, 27, 75, 0.12)",
      "rgba(46, 16, 84, 0.55)",
      "rgba(8, 6, 20, 0.94)",
    ],
    overlayLocations: [0, 0.26, 0.66, 1],
    illustrationBackgroundColor: "#0c0a1a",
    illustrationScale: 1.1,
    showBadge: true,
  },
  halloween: {
    key: "halloween",
    image: "/images/deck-cards/halloween-deck-illustration.webp",
    overlayColors: [
      "rgba(43, 17, 69, 0.02)",
      "rgba(16, 6, 32, 0.12)",
      "rgba(16, 6, 32, 0.52)",
      "rgba(16, 6, 32, 0.94)",
    ],
    overlayLocations: [0, 0.35, 0.72, 1],
    illustrationBackgroundColor: "#2B1145",
    illustrationScale: 1,
    showBadge: true,
  },
  office: {
    key: "office",
    image: "/images/deck-cards/office-deck-illustration.webp",
    overlayColors: [
      "rgba(255, 183, 77, 0.08)",
      "rgba(88, 28, 135, 0.04)",
      "rgba(56, 20, 93, 0.5)",
      "rgba(24, 10, 40, 0.92)",
    ],
    overlayLocations: [0, 0.28, 0.68, 1],
    illustrationBackgroundColor: "#2a1848",
    illustrationScale: 1.06,
    showBadge: true,
  },
  brands: {
    key: "brands",
    image: "/images/deck-cards/brands-deck-illustration.webp",
    overlayColors: [
      "rgba(200, 186, 251, 0.06)",
      "rgba(42, 14, 71, 0.03)",
      "rgba(46, 16, 84, 0.52)",
      "rgba(10, 5, 20, 0.94)",
    ],
    overlayLocations: [0, 0.42, 0.7, 1],
    illustrationBackgroundColor: "#140825",
    illustrationScale: 1.04,
    showBadge: true,
  },
  friendsgiving: {
    key: "friendsgiving",
    image: "/images/deck-cards/friendsgiving-deck-illustration.webp",
    overlayColors: [
      "rgba(250, 170, 18, 0.05)",
      "rgba(42, 14, 71, 0.03)",
      "rgba(46, 16, 84, 0.52)",
      "rgba(10, 5, 20, 0.94)",
    ],
    overlayLocations: [0, 0.44, 0.7, 1],
    illustrationBackgroundColor: "#170822",
    illustrationScale: 1.04,
    showBadge: true,
  },
  animals: {
    key: "animals",
    image: "/images/deck-cards/animals-deck-illustration.webp",
    overlayColors: [
      "rgba(250, 170, 18, 0.05)",
      "rgba(42, 14, 71, 0.03)",
      "rgba(46, 16, 84, 0.52)",
      "rgba(10, 5, 20, 0.94)",
    ],
    overlayLocations: [0, 0.44, 0.7, 1],
    illustrationBackgroundColor: "#1E0A36",
    illustrationScale: 1.04,
    showBadge: true,
  },
  cars: {
    key: "cars",
    image: "/images/deck-cards/cars-deck-illustration.webp",
    overlayColors: [
      "rgba(250, 170, 18, 0.04)",
      "rgba(42, 14, 71, 0.03)",
      "rgba(46, 16, 84, 0.52)",
      "rgba(10, 5, 20, 0.94)",
    ],
    overlayLocations: [0, 0.42, 0.7, 1],
    illustrationBackgroundColor: "#120722",
    illustrationScale: 1.04,
    showBadge: true,
  },
};

export function buildDeckOverlayStyle(config: DeckCardConfig): CSSProperties {
  const stops = config.overlayColors
    .map((color, i) => `${color} ${(config.overlayLocations[i] ?? 0) * 100}%`)
    .join(", ");
  return { background: `linear-gradient(to bottom, ${stops})` };
}
