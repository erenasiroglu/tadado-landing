import { LOCALES, type Locale } from "@/lib/i18n-config";

import type { AlternativeId } from "./types";

/** URL segment under `/[lang]/alternatives/[slug]`. */
export const ALTERNATIVE_SLUGS: Record<AlternativeId, Partial<Record<Locale, string>>> = {
  charades: {
    en: "charades",
    tr: "charades",
  },
  taboo: {
    en: "taboo",
    tr: "tabu",
  },
  "heads-up": {
    en: "heads-up",
    tr: "alninda-tahmin",
  },
  nebuu: {
    en: "nebuu",
    tr: "nebuu",
  },
};

export const SEO_ALTERNATIVE_IDS: AlternativeId[] = ["charades", "taboo", "heads-up", "nebuu"];

export function alternativeSlugFor(locale: Locale, id: AlternativeId): string {
  return ALTERNATIVE_SLUGS[id][locale] ?? ALTERNATIVE_SLUGS[id].en ?? id;
}

export function alternativeIdFromSlug(locale: Locale, slug: string): AlternativeId | null {
  for (const id of SEO_ALTERNATIVE_IDS) {
    if (alternativeSlugFor(locale, id) === slug) {
      return id;
    }
  }
  return null;
}

export function allAlternativeSlugParams(): { lang: string; slug: string }[] {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const id of SEO_ALTERNATIVE_IDS) {
      params.push({ lang, slug: alternativeSlugFor(lang as Locale, id) });
    }
  }
  return params;
}

export function alternativeLanguageAlternates(id: AlternativeId): Record<string, string> {
  const paths: Record<string, string> = {
    "x-default": `en/alternatives/${alternativeSlugFor("en", id)}`,
  };
  for (const locale of LOCALES) {
    paths[locale] = `${locale}/alternatives/${alternativeSlugFor(locale as Locale, id)}`;
  }
  return paths;
}
