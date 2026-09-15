const APP_STORE_ID = "6753135485";
const PLAY_PACKAGE = "com.erenasiroglu.tadado";

const LOCALE_TO_APP_STORE_CC: Record<string, string> = {
  en: "us",
  tr: "tr",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  ja: "jp",
  ko: "kr",
  "pt-BR": "br",
  ru: "ru",
  zh: "cn",
  ar: "sa",
  hi: "in",
  id: "id",
  vi: "vn",
  pl: "pl",
  el: "gr",
};

const LOCALE_TO_PLAY_HL: Record<string, string> = {
  en: "en",
  tr: "tr",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  ja: "ja",
  ko: "ko",
  "pt-BR": "pt_BR",
  ru: "ru",
  zh: "zh",
  ar: "ar",
  hi: "hi",
  id: "id",
  vi: "vi",
  pl: "pl",
  el: "el",
};

export function getAppStoreUrl(locale: string): string {
  const cc = LOCALE_TO_APP_STORE_CC[locale] ?? "us";
  return `https://apps.apple.com/${cc}/app/tadado-taboo-word-game-2026/id${APP_STORE_ID}`;
}

export function getPlayStoreUrl(locale: string): string {
  const hl = LOCALE_TO_PLAY_HL[locale] ?? "en";
  return `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=${hl}`;
}

export const APP_STORE_ID_EXPORT = APP_STORE_ID;
