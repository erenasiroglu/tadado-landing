import "server-only";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/i18n-types";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  "pt-BR": () => import("@/dictionaries/pt-BR.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  zh: () => import("@/dictionaries/zh.json").then((m) => m.default),
  hi: () => import("@/dictionaries/hi.json").then((m) => m.default),
  id: () => import("@/dictionaries/id.json").then((m) => m.default),
  vi: () => import("@/dictionaries/vi.json").then((m) => m.default),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  ja: () => import("@/dictionaries/ja.json").then((m) => m.default),
  ko: () => import("@/dictionaries/ko.json").then((m) => m.default),
  it: () => import("@/dictionaries/it.json").then((m) => m.default),
  pl: () => import("@/dictionaries/pl.json").then((m) => m.default),
  el: () => import("@/dictionaries/el.json").then((m) => m.default),
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const languages = new Negotiator({
    headers: { "accept-language": header },
  }).languages();

  const normalized = LOCALES.map((l) => l.replace("pt-BR", "pt"));
  const matched = match(languages, normalized, DEFAULT_LOCALE);

  if (matched === "pt") return "pt-BR";
  if (hasLocale(matched)) return matched;
  return DEFAULT_LOCALE;
}
