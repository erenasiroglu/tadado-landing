export {
  BLOG_LOCALES,
  blogHref,
  DEFAULT_LOCALE,
  hasLocale,
  isRtlLocale,
  LOCALES,
  localeHref,
  type Locale,
} from "@/lib/i18n-config";

export { pathnameForLocale } from "@/lib/locale-switch";

export {
  CONTENT_FALLBACK_LOCALE,
  FULL_CONTENT_LOCALES,
  isFullContentLocale,
  mayUseEnglishContentFallback,
} from "@/lib/i18n-fallback";

export type { Dictionary } from "@/lib/i18n-types";
