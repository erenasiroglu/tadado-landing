export const LOCALES = [
  "en",
  "tr",
  "es",
  "pt-BR",
  "fr",
  "de",
  "zh",
  "hi",
  "id",
  "vi",
  "ar",
  "ru",
  "ja",
  "ko",
  "it",
  "pl",
  "el",
] as const;

export type Locale = (typeof LOCALES)[number];

export const BLOG_LOCALES: Locale[] = [...LOCALES];

export const DEFAULT_LOCALE: Locale = "en";

const RTL_LOCALES: Locale[] = ["ar"];

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function hasLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export function localeHref(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${clean}`;
}

export function blogHref(locale: Locale): string {
  return localeHref(locale, "blog");
}
