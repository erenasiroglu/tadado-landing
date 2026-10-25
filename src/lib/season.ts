/**
 * Seasonal theme switch for the landing site.
 *
 * To turn a season off early, set `SEASON_ENABLED` to false. Each season also
 * hides itself after `endsAt` (the home page regenerates every few hours via ISR).
 */
export const SEASON_ENABLED = true;

export type SeasonId = "halloween";

interface Season {
  id: SeasonId;
  /** First moment the season is over (exclusive end). */
  endsAt: string;
}

const SEASONS: readonly Season[] = [
  // App event ends on Nov 3; keep the site in sync (end of day, Istanbul time).
  { id: "halloween", endsAt: "2026-11-04T00:00:00+03:00" },
];

export function getActiveSeason(now: Date = new Date()): SeasonId | null {
  if (!SEASON_ENABLED) return null;
  const season = SEASONS.find((s) => now < new Date(s.endsAt));
  return season?.id ?? null;
}

export function isHalloweenSeason(now?: Date): boolean {
  return getActiveSeason(now) === "halloween";
}
