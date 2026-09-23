import {
  ACTION_VARIANTS,
  CLASSIC_GAME_SCREEN,
  GLASS,
  homeScreenGradient,
  PHONE_LANDSCAPE_RATIO,
  PHONE_PORTRAIT_RATIO,
  PHONE_REFERENCE_WIDTH,
} from "@/lib/design-tokens";
import type { Dictionary } from "@/lib/i18n-types";
import type { Locale } from "@/lib/i18n-config";

export type GamePreviewLabels = Dictionary["gamePreview"];

export {
  ACTION_VARIANTS,
  PHONE_LANDSCAPE_RATIO,
  PHONE_PORTRAIT_RATIO,
  PHONE_REFERENCE_WIDTH,
};

/** iPhone logical width used to scale GameScreen preview proportions */
export const GAME_SCREEN_REFERENCE_WIDTH = 390;

export const FORBIDDEN_WORDS_STYLE = {
  screenBg: CLASSIC_GAME_SCREEN.background,
  cardBg: CLASSIC_GAME_SCREEN.cardBg,
  wordBg: CLASSIC_GAME_SCREEN.wordBg,
  wordText: CLASSIC_GAME_SCREEN.wordText,
  forbiddenWordBg: CLASSIC_GAME_SCREEN.forbiddenWordBg,
  forbiddenWordText: CLASSIC_GAME_SCREEN.forbiddenWordText,
  teamColor: CLASSIC_GAME_SCREEN.teamNameText,
  timerGradient: CLASSIC_GAME_SCREEN.timerGradient,
  timerText: CLASSIC_GAME_SCREEN.timerText,
  cardProgressText: CLASSIC_GAME_SCREEN.cardProgressText,
  pointsChip: {
    accent: "#C4B5FD",
    background: "rgba(196, 181, 253, 0.12)",
    border: "rgba(196, 181, 253, 0.28)",
  },
} as const;

/** @deprecated Use FORBIDDEN_WORDS_STYLE + getGamePreviewLabels(dict) */
export const FORBIDDEN_WORDS_PREVIEW = {
  ...FORBIDDEN_WORDS_STYLE,
  word: "SPIDER MAN",
  forbidden: ["MARVEL", "IRON MAN", "HERO", "SPIDER"] as const,
  teamName: "TEAM A",
  timeLeft: "42 seconds left",
  passStatus: "2 / 3 passes left",
  roundLabel: "Round 1/3",
  pointsMultiplier: "×2",
  tabooLabel: "Forbidden!",
  passLabel: "Pass",
  correctLabel: "Correct",
};

export const HEADS_UP_STYLE = {
  gradientColors: homeScreenGradient.colors,
  gradientLocations: homeScreenGradient.locations,
} as const;

/** @deprecated Use HEADS_UP_STYLE + getGamePreviewLabels(dict) */
export const HEADS_UP_PREVIEW = {
  ...HEADS_UP_STYLE,
  word: "SPIDER MAN",
  teamName: "TEAM A",
  timer: "42s",
  foreheadTitle: "Place the phone on your forehead",
  foreheadCountdown: "3",
  tiltUp: "Lift up to skip",
  tiltDown: "Lower if correct",
  yourTeam: "Your team",
};

export function getGamePreviewLabels(dict: Dictionary): GamePreviewLabels {
  return dict.gamePreview;
}

export interface TabooPreviewSample {
  word: string;
  forbidden: readonly string[];
}

export interface HeadsUpPreviewSample {
  word: string;
}

export const HERO_TABOO_SAMPLES: readonly TabooPreviewSample[] = [
  { word: "SPIDER MAN", forbidden: ["MARVEL", "IRON MAN", "HERO", "SPIDER"] },
  { word: "OBSESSION", forbidden: ["NETFLIX", "DRAMA", "SERIES", "STREAMING"] },
];

export const HERO_HEADS_UP_SAMPLES: readonly HeadsUpPreviewSample[] = [
  { word: "BARCELONA" },
  { word: "THE ODYSSEY" },
];

export const TURN_SUMMARY_STYLE = {
  backgroundGradient: ["#3D1F58", "#2A0A3B", "#1A0F28"] as const,
} as const;

/** @deprecated Use TURN_SUMMARY_STYLE + getGamePreviewLabels(dict) */
export const TURN_SUMMARY_PREVIEW = {
  ...TURN_SUMMARY_STYLE,
  roundLabel: "Round 1/3",
  teamName: "TEAM A",
  subtitle: "Turn complete",
  pointsEarned: "5",
  pointsLabel: "Points earned",
  scoresHeading: "Scores",
  team1Name: "TEAM A",
  team2Name: "TEAM B",
  team1Score: "5",
  team2Score: "3",
  vs: "VS",
  nextUpLabel: "Next up",
  nextTeam: "TEAM B",
  continue: "Continue",
};

/** Heads Up play field reference (landscape logical points from HeadsUpPlayField.tsx) */
export const HEADS_UP_LANDSCAPE_REF_WIDTH = 844;
export const HEADS_UP_LANDSCAPE_REF_HEIGHT = 390;

export function headsUpPreviewScale(shellWidth: number, shellPadding = 5): number {
  const innerWidth = shellWidth - shellPadding * 2;
  const innerHeight = innerWidth * PHONE_LANDSCAPE_RATIO - shellPadding * 2;
  return Math.min(
    innerWidth / HEADS_UP_LANDSCAPE_REF_WIDTH,
    innerHeight / HEADS_UP_LANDSCAPE_REF_HEIGHT,
  );
}

export interface HeadsUpPlayFieldMetrics {
  screenPadH: number;
  screenPadTop: number;
  screenPadBottom: number;
  topBarGap: number;
  topBarHeight: number;
  teamMaxWidth: number;
  teamPadH: number;
  teamPadV: number;
  teamFontSize: number;
  teamIconSize: number;
  teamGap: number;
  timerPadH: number;
  timerPadV: number;
  timerFontSize: number;
  pausePadH: number;
  pausePadV: number;
  pauseIconSize: number;
  pauseFontSize: number;
  pauseMaxWidth: number;
  pauseGap: number;
  showPauseLabel: boolean;
  topSideMaxWidth: number;
  wordFontSize: number;
  wordLineHeight: number;
  wordLetterSpacing: number;
  wordPadH: number;
  gestureSize: number;
  gestureIconSize: number;
  gestureInset: number;
  gestureBottom: number;
}

export function getHeadsUpPlayFieldMetrics(
  shellWidth: number,
  shellPadding = 0,
  word: string = HEADS_UP_PREVIEW.word,
  shellHeight?: number,
): HeadsUpPlayFieldMetrics {
  const innerWidth = shellWidth - shellPadding * 2;
  const innerHeight =
    shellHeight !== undefined
      ? shellHeight - shellPadding * 2
      : innerWidth * PHONE_LANDSCAPE_RATIO - shellPadding * 2;
  const scale = Math.min(
    innerWidth / HEADS_UP_LANDSCAPE_REF_WIDTH,
    innerHeight / HEADS_UP_LANDSCAPE_REF_HEIGHT,
  );

  const compact = innerWidth < 300 || innerHeight < 150;
  const wordBase = 76 * scale;
  const wordLengthScale = word.length > 14 ? 0.72 : word.length > 10 ? 0.85 : 1;
  const screenPadH = Math.max(12, 20 * scale);
  const timerBlockWidth = Math.max(40, 52 * scale);
  const topSideMaxWidth = Math.max(
    62,
    (innerWidth - screenPadH * 2 - timerBlockWidth - Math.max(12, 16 * scale)) / 2,
  );

  return {
    screenPadH,
    screenPadTop: Math.max(4, 7 * scale),
    screenPadBottom: Math.max(4, 8 * scale),
    topBarGap: Math.max(4, 5 * scale),
    topBarHeight: compact ? Math.max(20, 24 * scale) : Math.max(22, 28 * scale),
    teamMaxWidth: topSideMaxWidth,
    teamPadH: Math.max(5, 7 * scale),
    teamPadV: 5 * scale,
    teamFontSize: compact ? Math.max(6.5, 8.5 * scale) : Math.max(7, 9.5 * scale),
    teamIconSize: Math.max(8, 11 * scale),
    teamGap: Math.max(2, 4 * scale),
    timerPadH: Math.max(5, 8 * scale),
    timerPadV: 4 * scale,
    timerFontSize: Math.max(7, 10 * scale),
    pausePadH: Math.max(4, 6 * scale),
    pausePadV: 5 * scale,
    pauseIconSize: Math.max(8, 14 * scale),
    pauseFontSize: compact ? Math.max(6, 7.5 * scale) : Math.max(6.5, 8.5 * scale),
    pauseMaxWidth: topSideMaxWidth,
    pauseGap: Math.max(2, 3 * scale),
    showPauseLabel: true,
    topSideMaxWidth,
    wordFontSize: Math.max(13, wordBase * wordLengthScale),
    wordLineHeight: Math.max(14, 72 * scale * wordLengthScale),
    wordLetterSpacing: Math.max(0.4, 1 * scale),
    wordPadH: Math.min(120 * scale, innerWidth * 0.16),
    gestureSize: compact ? Math.max(18, 28 * scale) : Math.max(20, 32 * scale),
    gestureIconSize: Math.max(9, 16 * scale),
    gestureInset: Math.max(12, 18 * scale),
    gestureBottom: Math.max(6, 8 * scale),
  };
}

export function getHeadsUpPauseLabel(locale: Locale, dict?: Dictionary): string {
  if (dict) return dict.gamePreview.pauseGame;
  if (locale === "tr") return "Oyunu Durdur";
  if (locale === "de") return "Spiel pausieren";
  if (locale === "es") return "Pausar juego";
  if (locale === "fr") return "Mettre en pause";
  if (locale === "pt-BR") return "Pausar jogo";
  return "Pause game";
}

/** Short label for landscape mockups so top chips fit without truncation. */
export function getHeadsUpPauseShortLabel(locale: Locale): string {
  if (locale === "tr") return "Duraklat";
  if (locale === "de") return "Pause";
  if (locale === "es" || locale === "pt-BR" || locale === "it") return "Pausa";
  if (locale === "fr") return "Pause";
  if (locale === "pl") return "Pauza";
  if (locale === "el") return "Παύση";
  if (locale === "ru") return "Пауза";
  if (locale === "ja") return "停止";
  if (locale === "ko") return "일시정지";
  if (locale === "zh") return "暂停";
  if (locale === "ar") return "إيقاف";
  if (locale === "hi") return "रोकें";
  if (locale === "id") return "Jeda";
  if (locale === "vi") return "Dừng";
  return "Pause";
}

export function getHeadsUpTimerLabel(locale: Locale, seconds = 42): string {
  if (locale === "tr") return `${seconds} sn`;
  if (locale === "de") return `${seconds} Sek.`;
  if (locale === "fr" || locale === "es" || locale === "pt-BR" || locale === "pl" || locale === "it") {
    return `${seconds} s`;
  }
  if (locale === "ja" || locale === "ko" || locale === "zh") return `${seconds}秒`;
  return `${seconds}s`;
}

const GAME_WORD_FONT_SIZE = 28;
const PREVIEW_WORD_FONT_SIZE = 10;
export const PREVIEW_SCALE = PREVIEW_WORD_FONT_SIZE / GAME_WORD_FONT_SIZE;

export function gameScreenPreviewScale(shellWidth: number, shellPadding = 4): number {
  const innerWidth = shellWidth - shellPadding * 2;
  return innerWidth / GAME_SCREEN_REFERENCE_WIDTH;
}

/** @deprecated Use gameScreenPreviewScale */
export function forbiddenPreviewScale(shellWidth: number, shellPadding = 4): number {
  return gameScreenPreviewScale(shellWidth, shellPadding);
}

export interface GameScreenPreviewMetrics {
  screenPadH: number;
  screenPadTop: number;
  teamProgressGap: number;
  headerMarginBottom: number;
  exitSize: number;
  exitRadius: number;
  exitIcon: number;
  teamFontSize: number;
  scoreMinWidth: number;
  scorePadH: number;
  scorePadV: number;
  scoreFontSize: number;
  progressMarginBottom: number;
  progressHeight: number;
  progressBorder: number;
  progressGap: number;
  timeFontSize: number;
  cardRadius: number;
  cardPadH: number;
  cardPadTop: number;
  cardPadBottom: number;
  metaTop: number;
  metaPadH: number;
  metaPadV: number;
  metaRadius: number;
  metaRoundFont: number;
  metaPointsFont: number;
  metaChipHeight: number;
  metaChipMinWidth: number;
  metaChipPadH: number;
  metaSeparatorH: number;
  metaGap: number;
  wordRadius: number;
  wordPadV: number;
  wordPadH: number;
  wordMarginBottom: number;
  wordFontSize: number;
  forbiddenGap: number;
  forbiddenRadius: number;
  forbiddenPadV: number;
  forbiddenPadH: number;
  forbiddenFontSize: number;
  dockGap: number;
  dockPadH: number;
  dockPadBottom: number;
  actionHeight: number;
  actionGap: number;
  actionIcon: number;
  actionOrb: number;
  actionLabel: number;
  actionBadge: number;
  actionBadgeFont: number;
  passPillPadH: number;
  passPillPadV: number;
  passPillFont: number;
  passIcon: number;
  accentTopW: number;
  accentTopH: number;
  accentTopRight: number;
  accentMidW: number;
  accentMidH: number;
  accentMidLeft: number;
}

export function getGameScreenPreviewMetrics(scale: number): GameScreenPreviewMetrics {
  return {
    screenPadH: 20 * scale,
    screenPadTop: 16 * scale,
    teamProgressGap: 10 * scale,
    headerMarginBottom: 16 * scale,
    exitSize: 44 * scale,
    exitRadius: 14 * scale,
    exitIcon: 23 * scale,
    teamFontSize: 32 * scale,
    scoreMinWidth: 56 * scale,
    scorePadH: 14 * scale,
    scorePadV: 9 * scale,
    scoreFontSize: 22 * scale,
    progressMarginBottom: 16 * scale,
    progressHeight: 20 * scale,
    progressBorder: 2 * scale,
    progressGap: 10 * scale,
    timeFontSize: 14 * scale,
    cardRadius: 24 * scale,
    cardPadH: 20 * scale,
    cardPadTop: 32 * scale,
    cardPadBottom: 22 * scale,
    metaTop: -28 * scale,
    metaPadH: 20 * scale,
    metaPadV: 12 * scale,
    metaRadius: 20 * scale,
    metaRoundFont: 16 * scale,
    metaPointsFont: 17 * scale,
    metaChipHeight: 32 * scale,
    metaChipMinWidth: 44 * scale,
    metaChipPadH: 12 * scale,
    metaSeparatorH: 14 * scale,
    metaGap: 8 * scale,
    wordRadius: 16 * scale,
    wordPadV: 16 * scale,
    wordPadH: 16 * scale,
    wordMarginBottom: 16 * scale,
    wordFontSize: 28 * scale,
    forbiddenGap: 12 * scale,
    forbiddenRadius: 14 * scale,
    forbiddenPadV: 14 * scale,
    forbiddenPadH: 16 * scale,
    forbiddenFontSize: 18 * scale,
    dockGap: 8 * scale,
    dockPadH: 10 * scale,
    dockPadBottom: 12 * scale,
    actionHeight: 86 * scale,
    actionGap: 8 * scale,
    actionIcon: 22 * scale,
    actionOrb: 36 * scale,
    actionLabel: 11 * scale,
    actionBadge: 20 * scale,
    actionBadgeFont: 10 * scale,
    passPillPadH: 10 * scale,
    passPillPadV: 4 * scale,
    passPillFont: 11 * scale,
    passIcon: 12 * scale,
    accentTopW: 276 * scale,
    accentTopH: 164 * scale,
    accentTopRight: -86 * scale,
    accentMidW: 230 * scale,
    accentMidH: 138 * scale,
    accentMidLeft: -72 * scale,
  };
}

export function previewScale(innerWidth: number): number {
  return (innerWidth / PHONE_REFERENCE_WIDTH) * PREVIEW_SCALE;
}

export function headsUpGradientStyle(): string {
  const stops = HEADS_UP_PREVIEW.gradientColors
    .map((color, i) => `${color} ${(HEADS_UP_PREVIEW.gradientLocations[i] ?? 0) * 100}%`)
    .join(", ");
  return `linear-gradient(165deg, ${stops})`;
}

export const GLASS_TEXT_PRIMARY = GLASS.text.primary;
