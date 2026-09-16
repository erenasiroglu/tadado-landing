import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export type HeroTab = "taboo" | "headsup";

const DEFAULT_HERO_TABS: Partial<Record<Locale, HeroTab>> = {
  ja: "headsup",
  ko: "headsup",
};

export function applyLandingVariant(locale: Locale, dict: Dictionary): Dictionary {
  return dict;
}

export function getDefaultHeroTab(locale: Locale): HeroTab {
  return DEFAULT_HERO_TABS[locale] ?? "taboo";
}
