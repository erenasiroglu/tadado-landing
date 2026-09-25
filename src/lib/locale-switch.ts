import { alternativeIdFromSlug, alternativeSlugFor } from "@/lib/alternative-pages/slugs";
import { deckKeyFromSlug, deckHubPath, deckSlugFor } from "@/lib/deck-slugs";
import { localeHref, type Locale } from "@/lib/i18n-config";

/**
 * Builds the equivalent path when switching locale (localized deck slugs, etc.).
 */
export function pathnameForLocale(pathname: string, fromLocale: Locale, toLocale: Locale): string {
  if (fromLocale === toLocale) {
    return pathname || localeHref(toLocale);
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length >= 3 && segments[1] === "decks") {
    const slug = segments[2];
    const deckKey = deckKeyFromSlug(fromLocale, slug);
    if (deckKey) {
      return `/${toLocale}/decks/${deckSlugFor(toLocale, deckKey)}`;
    }
    return deckHubPath(toLocale);
  }

  if (segments.length === 2 && segments[1] === "decks") {
    return deckHubPath(toLocale);
  }

  if (segments.length >= 3 && segments[1] === "alternatives") {
    const slug = segments[2];
    const altId = alternativeIdFromSlug(fromLocale, slug);
    if (altId) {
      return `/${toLocale}/alternatives/${alternativeSlugFor(toLocale, altId)}`;
    }
    return `/${toLocale}/compare`;
  }

  if (segments.length === 0) {
    return localeHref(toLocale);
  }

  segments[0] = toLocale;
  return `/${segments.join("/")}`;
}
