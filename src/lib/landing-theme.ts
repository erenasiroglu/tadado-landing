import { isHalloweenSeason } from "@/lib/season";

/**
 * Default landing look: midnight hero layout (chips, phone fan). No seasonal Halloween copy on home.
 * Home meta title/description follows `isHalloweenSeason()` only during the event window.
 */
export const LANDING_NIGHT_THEME = true;

export function isNightLandingTheme(): boolean {
  return LANDING_NIGHT_THEME;
}

export function isHalloweenSeasonalContent(now?: Date): boolean {
  return isHalloweenSeason(now);
}

/** November store promo badge. Prices stay in the dictionary year-round. */
export function isNovemberPricingPromo(now: Date = new Date()): boolean {
  return now.getMonth() === 10;
}
