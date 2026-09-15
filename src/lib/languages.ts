import type { Locale } from "@/lib/i18n-config";

export const LANGUAGE_DISPLAY: Record<Locale, { flag: string; label: string }> = {
  ar: { flag: "🇸🇦", label: "العربية" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  el: { flag: "🇬🇷", label: "Ελληνικά" },
  en: { flag: "🇬🇧", label: "English" },
  es: { flag: "🇪🇸", label: "Español" },
  fr: { flag: "🇫🇷", label: "Français" },
  hi: { flag: "🇮🇳", label: "हिन्दी" },
  id: { flag: "🇮🇩", label: "Bahasa Indonesia" },
  it: { flag: "🇮🇹", label: "Italiano" },
  ja: { flag: "🇯🇵", label: "日本語" },
  ko: { flag: "🇰🇷", label: "한국어" },
  pl: { flag: "🇵🇱", label: "Polski" },
  "pt-BR": { flag: "🇧🇷", label: "Português (Brasil)" },
  ru: { flag: "🇷🇺", label: "Русский" },
  tr: { flag: "🇹🇷", label: "Türkçe" },
  vi: { flag: "🇻🇳", label: "Tiếng Việt" },
  zh: { flag: "🇨🇳", label: "中文" },
};
