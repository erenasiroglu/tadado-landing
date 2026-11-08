import { DECK_CARD_CONFIGS, type DeckKey } from "@/lib/deck-cards";
import { deckHubPath, deckPagePath, SEO_DECK_KEYS } from "@/lib/deck-slugs";
import type { Locale } from "@/lib/i18n-config";

export { SEO_DECK_KEYS };

export function isFreeDeck(key: DeckKey): boolean {
  return key === "mix";
}

export interface DeckBadgeLabels {
  newBadge: string;
  eventBadge: string;
  hardBadge: string;
}

/** Badge copy aligned with app `IllustratedGameCardConfigs` (NEW / EVENT / HARD). */
export function resolveDeckBadgeLabel(
  key: DeckKey,
  badges: DeckBadgeLabels,
): string | undefined {
  const { showBadge } = DECK_CARD_CONFIGS[key];
  if (!showBadge) return undefined;
  if (key === "halloween") return badges.eventBadge;
  if (key === "genius") return badges.hardBadge;
  return badges.newBadge;
}

export function getDeckHref(locale: Locale, key: DeckKey): string {
  return deckPagePath(locale, key);
}

export function getDecksHubHref(locale: Locale): string {
  return deckHubPath(locale);
}

/** Related decks for internal linking (2–3 per page). */
export function getRelatedDeckKeys(key: DeckKey): DeckKey[] {
  const related: Record<DeckKey, DeckKey[]> = {
    mix: ["genius", "halloween", "cinema"],
    genius: ["cinema", "travel", "heroes"],
    halloween: ["midnight", "mix", "genius"],
    summer: ["cinema", "travel", "mix"],
    cinema: ["heroes", "summer", "midnight"],
    travel: ["summer", "sport", "cinema"],
    sport: ["heroes", "travel", "cars"],
    heroes: ["cinema", "sport", "midnight"],
    midnight: ["halloween", "cinema", "heroes"],
    office: ["brands", "mix", "genius"],
    brands: ["office", "cars", "cinema"],
    friendsgiving: ["summer", "mix", "animals"],
    animals: ["friendsgiving", "travel", "halloween"],
    cars: ["sport", "brands", "heroes"],
  };
  return related[key];
}
