import { CONTENT_FALLBACK_LOCALE, isFullContentLocale } from "@/lib/i18n-fallback";
import type { Locale } from "@/lib/i18n-config";

import { getEnAlternativePage } from "./en";
import {
  alternativeIdFromSlug,
  alternativeSlugFor,
  SEO_ALTERNATIVE_IDS,
} from "./slugs";
import { getTrAlternativePage } from "./tr";
import type { AlternativeId, AlternativePageContent } from "./types";

export type { AlternativeId, AlternativePageContent } from "./types";
export {
  alternativeIdFromSlug,
  alternativeLanguageAlternates,
  alternativeSlugFor,
  allAlternativeSlugParams,
  SEO_ALTERNATIVE_IDS,
} from "./slugs";

export function getAlternativePageContent(locale: Locale, id: AlternativeId): AlternativePageContent {
  if (locale === "tr") {
    return getTrAlternativePage(id);
  }
  return getEnAlternativePage(id);
}

export function getAlternativePageBySlug(
  locale: Locale,
  slug: string,
): AlternativePageContent | null {
  const id = alternativeIdFromSlug(locale, slug);
  if (!id) return null;
  return getAlternativePageContent(locale, id);
}

export function getRelatedAlternativeIds(current: AlternativeId): AlternativeId[] {
  return SEO_ALTERNATIVE_IDS.filter((id) => id !== current);
}

export function getAlternativeHref(locale: Locale, id: AlternativeId): string {
  return `/${locale}/alternatives/${alternativeSlugFor(locale, id)}`;
}

/** Label for related links in UI. */
export function getAlternativeLinkLabel(locale: Locale, id: AlternativeId): string {
  const content = getAlternativePageContent(
    isFullContentLocale(locale) ? locale : CONTENT_FALLBACK_LOCALE,
    id,
  );
  if (locale === "tr") {
    return content.h1.split(":")[0]?.trim() ?? content.h1;
  }
  return content.h1.split(":")[0]?.trim() ?? content.h1;
}
