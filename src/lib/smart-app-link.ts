import type { NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n-config";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";

export type StorePlatform = "ios" | "android" | "unknown";

export function detectStorePlatform(userAgent: string): StorePlatform {
  const ua = userAgent.toLowerCase();

  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";

  return "unknown";
}

export function detectLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const candidates = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    const normalized = candidate === "pt-br" ? "pt-BR" : candidate.split("-")[0];
    if (hasLocale(normalized)) return normalized as Locale;
    const fullMatch = LOCALES.find(
      (locale) => locale.toLowerCase() === candidate || locale.toLowerCase() === normalized,
    );
    if (fullMatch) return fullMatch;
  }

  return DEFAULT_LOCALE;
}

export function resolveStoreUrl(platform: StorePlatform, locale: Locale): string {
  if (platform === "android") return getPlayStoreUrl(locale);
  return getAppStoreUrl(locale);
}

export function resolveSmartAppLinkUrl(request: NextRequest): string {
  const userAgent = request.headers.get("user-agent") ?? "";
  const platform = detectStorePlatform(userAgent);

  const langParam = request.nextUrl.searchParams.get("lang");
  const locale =
    langParam && hasLocale(langParam)
      ? (langParam as Locale)
      : detectLocaleFromAcceptLanguage(request.headers.get("accept-language"));

  const target = new URL(resolveStoreUrl(platform, locale));

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    if (key === "lang") continue;
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  }

  return target.toString();
}
