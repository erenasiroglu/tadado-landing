import { BRAND } from "@/lib/brand";
import { LOCALES, type Locale } from "@/lib/i18n-config";

import ar from "./content/ar.json";
import de from "./content/de.json";
import el from "./content/el.json";
import en from "./content/en.json";
import es from "./content/es.json";
import fr from "./content/fr.json";
import hi from "./content/hi.json";
import id from "./content/id.json";
import it from "./content/it.json";
import ja from "./content/ja.json";
import ko from "./content/ko.json";
import pl from "./content/pl.json";
import ptBR from "./content/pt-BR.json";
import ru from "./content/ru.json";
import tr from "./content/tr.json";
import vi from "./content/vi.json";
import zh from "./content/zh.json";

/** Game families; the same id links the local name of one format across locales (hreflang). */
export type GameComparisonId =
  | "impostor"
  | "codenames"
  | "stop"
  | "drawing"
  | "fishbowl"
  | "werewolf"
  | "alias"
  | "activity"
  | "picture";

/** "yes" | "no" | "partial" | "varies" render as icons or labels; anything else is shown as text. */
export type ComparisonCell = string;

export interface GameComparison {
  id: GameComparisonId;
  slug: string;
  game: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hook: string;
  about: string[];
  pickThem: string[];
  pickTadado: string[];
  rows: { feature: string; tadado: ComparisonCell; other: ComparisonCell }[];
  steps: string[];
  faq: { q: string; a: string }[];
}

const CONTENT = {
  en,
  tr,
  es,
  "pt-BR": ptBR,
  fr,
  de,
  zh,
  hi,
  id,
  vi,
  ar,
  ru,
  ja,
  ko,
  it,
  pl,
  el,
} as Record<Locale, GameComparison[]>;

export function getGameComparisons(locale: Locale): GameComparison[] {
  return CONTENT[locale] ?? [];
}

export function getGameComparison(
  locale: Locale,
  slug: string,
): GameComparison | null {
  return getGameComparisons(locale).find((page) => page.slug === slug) ?? null;
}

export function gameComparisonHref(locale: Locale, slug: string): string {
  return `/${locale}/compare/${slug}`;
}

export function allGameComparisonParams(): { lang: string; slug: string }[] {
  return LOCALES.flatMap((lang) =>
    getGameComparisons(lang).map((page) => ({ lang, slug: page.slug })),
  );
}

/** hreflang map limited to the locales that have a page for this game family. */
export function gameComparisonLanguageAlternates(
  id: GameComparisonId,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const page = getGameComparisons(locale).find((item) => item.id === id);
    if (page)
      languages[locale] =
        `${BRAND.domain}${gameComparisonHref(locale, page.slug)}`;
  }
  if (languages.en) languages["x-default"] = languages.en;
  return languages;
}
