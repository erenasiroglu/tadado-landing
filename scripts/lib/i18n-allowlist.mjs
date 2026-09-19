/** Keys or patterns where matching English is expected (brands, enums, numbers). */
const ALLOW_PATTERNS = [
  /^stats\.(gamesPlayed|modes|languages)$/,
  /^howToPlay\.difficulty\.(easy|hard|legendary)Multiplier$/,
  /^decks\.price$/,
  /^pricing\.(theme|ai)\.price$/,
  /^pricing\.mix\.name$/,
  /^decks\.items\.mix\.name$/,
  /^a11y\.(appStore|googlePlay|tadadoLogo)$/,
  /^community\.(instagram|tiktok|linkedin|productHunt)Cta$/,
  /^compare\.rows\.\d+\.(tadado|others)$/,
  /^nav\.blog$/,
  /^nav\.affiliate$/,
  /^hero\.metrics\.\d+\.value$/,
  /^community\.metrics\.\d+\.value$/,
  /^gamePreview\.team[AB]$/,
  /^reviews\.items\.\d+\.author$/,
  /^team\.members\.(eren|nur)\.name$/,
  /^modes\.headsUpTitle$/,
  /^a11y\.no$/,
];

export function isAllowedIdentical(path) {
  return ALLOW_PATTERNS.some((pattern) => pattern.test(path));
}
