const APP_STORE_ID = "6753135485";
const PLAY_PACKAGE = "com.erenasiroglu.tadado";

/** Localized App Store paths from iTunes lookup (country + slug vary per storefront). */
const LOCALE_TO_APP_STORE_PATH: Record<string, string> = {
  en: `us/app/tadado-taboo-word-game-2026/id${APP_STORE_ID}`,
  tr: `tr/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  de: `de/app/tadado-tabu-wortspiel-2026/id${APP_STORE_ID}`,
  es: `es/app/tadado-tabu-juego-de-fiesta/id${APP_STORE_ID}`,
  fr: `fr/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  it: `it/app/tadado-tabu-gioco-di-parole/id${APP_STORE_ID}`,
  ja: `jp/app/tadado-taboo-word-game-2026/id${APP_STORE_ID}`,
  ko: `kr/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  "pt-BR": `br/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  ru: `ru/app/tadado-%D1%82%D0%B0%D0%B1%D1%83-%D0%B8-%D0%BA%D1%80%D0%BE%D0%BA%D0%BE%D0%B4%D0%B8%D0%BB/id${APP_STORE_ID}`,
  zh: `hk/app/tadado-%E5%A1%94%E5%B8%83%E7%8C%9C%E5%AD%97%E6%B4%BE%E5%B0%8D%E9%81%8A%E6%88%B2/id${APP_STORE_ID}`,
  ar: `sa/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  hi: `in/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  id: `id/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  vi: `vn/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  pl: `pl/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
  el: `gr/app/tadado-ai-word-guessing-game/id${APP_STORE_ID}`,
};

const LOCALE_TO_PLAY: Record<string, { hl: string; gl: string }> = {
  en: { hl: "en", gl: "us" },
  tr: { hl: "tr", gl: "tr" },
  de: { hl: "de", gl: "de" },
  es: { hl: "es", gl: "es" },
  fr: { hl: "fr", gl: "fr" },
  it: { hl: "it", gl: "it" },
  ja: { hl: "ja", gl: "jp" },
  ko: { hl: "ko", gl: "kr" },
  "pt-BR": { hl: "pt_BR", gl: "br" },
  ru: { hl: "ru", gl: "ru" },
  zh: { hl: "zh", gl: "hk" },
  ar: { hl: "ar", gl: "sa" },
  hi: { hl: "hi", gl: "in" },
  id: { hl: "id", gl: "id" },
  vi: { hl: "vi", gl: "vn" },
  pl: { hl: "pl", gl: "pl" },
  el: { hl: "el", gl: "gr" },
};

export function getAppStoreUrl(locale: string): string {
  const path = LOCALE_TO_APP_STORE_PATH[locale] ?? LOCALE_TO_APP_STORE_PATH.en;
  return `https://apps.apple.com/${path}`;
}

export function getPlayStoreUrl(locale: string): string {
  const { hl, gl } = LOCALE_TO_PLAY[locale] ?? LOCALE_TO_PLAY.en;
  return `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=${hl}&gl=${gl}`;
}

export const APP_STORE_ID_EXPORT = APP_STORE_ID;
