import type { Locale } from "@/lib/i18n-config";

/** Locales that must ship full copy (no English fill-in for UI strings). */
export const FULL_CONTENT_LOCALES = ["en", "tr"] as const satisfies readonly Locale[];

export const CONTENT_FALLBACK_LOCALE: Locale = "en";

export function isFullContentLocale(locale: Locale): boolean {
  return locale === "en" || locale === "tr";
}

/** Temporary: secondary locales may show English body copy while URLs stay localized. */
export function mayUseEnglishContentFallback(locale: Locale): boolean {
  return !isFullContentLocale(locale);
}
