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

/** One SEO landing page per game mode; the id doubles as the URL slug in every locale. */
export const MODE_PAGE_IDS = [
  "forbidden-words",
  "heads-up",
  "imposter",
  "ai-decks",
] as const;

export type ModePageId = (typeof MODE_PAGE_IDS)[number];

export interface ModePage {
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hook: string;
  facts: { label: string; value: string }[];
  steps: { title: string; body: string }[];
  features: { title: string; body: string }[];
  knownAs: string;
  aliases: string[];
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
} as Record<Locale, Record<ModePageId, ModePage>>;

export function isModePageId(value: string): value is ModePageId {
  return (MODE_PAGE_IDS as readonly string[]).includes(value);
}

export function getModePage(locale: Locale, id: ModePageId): ModePage {
  return CONTENT[locale]?.[id] ?? CONTENT.en[id];
}

export function modePageHref(locale: Locale, id: ModePageId): string {
  return `/${locale}/modes/${id}`;
}

export function modesHubHref(locale: Locale): string {
  return `/${locale}/modes`;
}

export function allModePageParams(): { lang: string; slug: string }[] {
  return LOCALES.flatMap((lang) =>
    MODE_PAGE_IDS.map((slug) => ({ lang, slug })),
  );
}

export function modePageLanguageAlternates(
  id?: ModePageId,
): Record<string, string> {
  const path = id ? `modes/${id}` : "modes";
  const languages: Record<string, string> = {
    "x-default": `${BRAND.domain}/en/${path}`,
  };
  for (const locale of LOCALES) {
    languages[locale] = `${BRAND.domain}/${locale}/${path}`;
  }
  return languages;
}
