import type { DeckKey } from "@/lib/deck-cards";
import { deckHubPath, deckPagePath, SEO_DECK_KEYS } from "@/lib/deck-slugs";
import type { Locale } from "@/lib/i18n-config";

export { SEO_DECK_KEYS };

export function isFreeDeck(key: DeckKey): boolean {
  return key === "mix";
}

export function deckHasNewBadge(key: DeckKey): boolean {
  return key === "summer";
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
    mix: ["cinema", "sport", "summer"],
    summer: ["cinema", "travel", "mix"],
    cinema: ["heroes", "summer", "midnight"],
    travel: ["summer", "sport", "cinema"],
    sport: ["heroes", "travel", "mix"],
    heroes: ["cinema", "sport", "midnight"],
    midnight: ["cinema", "summer", "heroes"],
  };
  return related[key];
}
