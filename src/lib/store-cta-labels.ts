import type { Locale } from "@/lib/i18n-config";

const STORE_CTA_LABELS: Partial<Record<Locale, { ios: string; android: string }>> = {
  en: {
    ios: "Download on App Store",
    android: "Download on Google Play",
  },
  tr: {
    ios: "App Store'dan İndir",
    android: "Google Play'den İndir",
  },
  es: {
    ios: "Descargar en App Store",
    android: "Descargar en Google Play",
  },
  "pt-BR": {
    ios: "Baixar na App Store",
    android: "Baixar no Google Play",
  },
  fr: {
    ios: "Télécharger sur l'App Store",
    android: "Télécharger sur Google Play",
  },
  de: {
    ios: "Im App Store laden",
    android: "Bei Google Play laden",
  },
  it: {
    ios: "Scarica su App Store",
    android: "Scarica su Google Play",
  },
  ja: {
    ios: "App Storeでダウンロード",
    android: "Google Playでダウンロード",
  },
  ko: {
    ios: "App Store에서 다운로드",
    android: "Google Play에서 다운로드",
  },
  ru: {
    ios: "Скачать в App Store",
    android: "Скачать в Google Play",
  },
  zh: {
    ios: "在 App Store 下载",
    android: "在 Google Play 下载",
  },
  ar: {
    ios: "التنزيل من App Store",
    android: "التنزيل من Google Play",
  },
  hi: {
    ios: "App Store पर डाउनलोड करें",
    android: "Google Play पर डाउनलोड करें",
  },
  id: {
    ios: "Unduh di App Store",
    android: "Unduh di Google Play",
  },
  vi: {
    ios: "Tải trên App Store",
    android: "Tải trên Google Play",
  },
  pl: {
    ios: "Pobierz z App Store",
    android: "Pobierz z Google Play",
  },
  el: {
    ios: "Λήψη από App Store",
    android: "Λήψη από Google Play",
  },
};

export function getMobileStoreCtaLabel(locale: Locale, platform: "ios" | "android"): string {
  const labels = STORE_CTA_LABELS[locale] ?? STORE_CTA_LABELS.en!;
  return platform === "ios" ? labels.ios : labels.android;
}
