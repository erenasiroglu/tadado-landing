import type { DeckKey } from "@/lib/deck-cards";
import { LOCALES, type Locale } from "@/lib/i18n-config";

/** Public SEO deck pages (excludes mix from paid carousel order but includes mix). */
export const SEO_DECK_KEYS: DeckKey[] = [
  "mix",
  "genius",
  "summer",
  "cinema",
  "travel",
  "sport",
  "heroes",
  "midnight",
];

const SLUGS: Record<Locale, Record<DeckKey, string>> = {
  en: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  tr: {
    mix: "tadado-mix",
    summer: "yaz",
    cinema: "sinema",
    travel: "seyahat",
    sport: "spor",
    heroes: "kahramanlar",
    midnight: "gece-oyunlari",
    genius: "genius-only",
  },
  es: {
    mix: "tadado-mix",
    summer: "verano",
    cinema: "cine",
    travel: "viajes",
    sport: "deporte",
    heroes: "heroes",
    midnight: "juegos-nocturnos",
    genius: "genius-only",
  },
  "pt-BR": {
    mix: "tadado-mix",
    summer: "verao",
    cinema: "cinema",
    travel: "viagem",
    sport: "esporte",
    heroes: "herois",
    midnight: "jogos-noturnos",
    genius: "genius-only",
  },
  fr: {
    mix: "tadado-mix",
    summer: "ete",
    cinema: "cinema",
    travel: "voyage",
    sport: "sport",
    heroes: "heros",
    midnight: "jeux-de-nuit",
    genius: "genius-only",
  },
  de: {
    mix: "tadado-mix",
    summer: "sommer",
    cinema: "kino",
    travel: "reisen",
    sport: "sport",
    heroes: "helden",
    midnight: "nachtspiele",
    genius: "genius-only",
  },
  zh: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  hi: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  id: {
    mix: "tadado-mix",
    summer: "musim-panas",
    cinema: "bioskop",
    travel: "perjalanan",
    sport: "olahraga",
    heroes: "pahlawan",
    midnight: "permainan-malam",
    genius: "genius-only",
  },
  vi: {
    mix: "tadado-mix",
    summer: "mua-he",
    cinema: "dien-anh",
    travel: "du-lich",
    sport: "the-thao",
    heroes: "anh-hung",
    midnight: "tro-choi-dem",
    genius: "genius-only",
  },
  ar: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  ru: {
    mix: "tadado-mix",
    summer: "leto",
    cinema: "kino",
    travel: "puteshestviya",
    sport: "sport",
    heroes: "geroi",
    midnight: "nochnye-igry",
    genius: "genius-only",
  },
  ja: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  ko: {
    mix: "tadado-mix",
    summer: "summer",
    cinema: "cinema",
    travel: "travel",
    sport: "sport",
    heroes: "heroes",
    midnight: "night-games",
    genius: "genius-only",
  },
  it: {
    mix: "tadado-mix",
    summer: "estate",
    cinema: "cinema",
    travel: "viaggio",
    sport: "sport",
    heroes: "eroi",
    midnight: "giochi-notturni",
    genius: "genius-only",
  },
  pl: {
    mix: "tadado-mix",
    summer: "lato",
    cinema: "kino",
    travel: "podroze",
    sport: "sport",
    heroes: "bohaterow",
    midnight: "gry-nocne",
    genius: "genius-only",
  },
  el: {
    mix: "tadado-mix",
    summer: "kalokairi",
    cinema: "cinema",
    travel: "taxidia",
    sport: "athlitismos",
    heroes: "iroes",
    midnight: "nychterina-paichnidia",
    genius: "genius-only",
  },
};

export function deckSlugFor(locale: Locale, key: DeckKey): string {
  return SLUGS[locale][key];
}

export function deckKeyFromSlug(locale: Locale, slug: string): DeckKey | null {
  const map = SLUGS[locale];
  for (const key of SEO_DECK_KEYS) {
    if (map[key] === slug) return key;
  }
  return null;
}

export function deckPagePath(locale: Locale, key: DeckKey): string {
  return `/${locale}/decks/${deckSlugFor(locale, key)}`;
}

export function deckHubPath(locale: Locale): string {
  return `/${locale}/decks`;
}

/** hreflang map: locale code -> full URL path segment after domain (e.g. en/decks/night-games) */
export function deckLanguageAlternates(key: DeckKey): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `en/decks/${deckSlugFor("en", key)}`,
  };
  for (const locale of LOCALES) {
    languages[locale] = `${locale}/decks/${deckSlugFor(locale, key)}`;
  }
  return languages;
}

export function allDeckSlugParams(): { lang: string; slug: string }[] {
  const params: { lang: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const key of SEO_DECK_KEYS) {
      params.push({ lang: locale, slug: deckSlugFor(locale, key) });
    }
  }
  return params;
}
