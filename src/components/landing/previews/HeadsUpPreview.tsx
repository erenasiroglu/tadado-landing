import { ArrowDown, ArrowUp, PauseCircle, Users } from "lucide-react";

import {
  getHeadsUpPlayFieldMetrics,
  HEADS_UP_PREVIEW,
  type GamePreviewLabels,
  headsUpGradientStyle,
} from "@/lib/game-preview-tokens";

interface HeadsUpPreviewProps {
  /** Game screen content width (inside device bezel). */
  shellWidth?: number;
  /** Game screen content height; improves scaling in landscape mockups. */
  shellHeight?: number;
  shellPadding?: number;
  word?: string;
  timer?: string;
  teamName?: string;
  pauseLabel?: string;
  labels?: GamePreviewLabels;
}

export function HeadsUpPreview({
  shellWidth = 280,
  shellHeight,
  shellPadding = 0,
  word = HEADS_UP_PREVIEW.word,
  timer = HEADS_UP_PREVIEW.timer,
  teamName,
  pauseLabel = "Pause",
  labels,
}: HeadsUpPreviewProps) {
  const displayTeam = teamName ?? labels?.teamA ?? HEADS_UP_PREVIEW.teamName;
  const m = getHeadsUpPlayFieldMetrics(shellWidth, shellPadding, word, shellHeight);

  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden"
      style={{ background: headsUpGradientStyle() }}
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          paddingLeft: m.screenPadH,
          paddingRight: m.screenPadH,
          paddingTop: m.screenPadTop,
          paddingBottom: m.topBarGap,
        }}
      >
        <div
          className="relative z-[1] box-border flex w-full min-w-0 items-center justify-between"
          style={{ gap: m.topBarGap, minHeight: m.topBarHeight }}
        >
          <div
            className="box-border flex min-w-0 max-w-full items-center overflow-hidden rounded-full border"
            style={{
              gap: m.teamGap,
              height: m.topBarHeight,
              maxWidth: m.topSideMaxWidth,
              padding: `0 ${m.teamPadH}px`,
              borderColor: "rgba(255,255,255,0.13)",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Users
              style={{
                width: m.teamIconSize,
                height: m.teamIconSize,
                color: "#C4B5FD",
                flexShrink: 0,
              }}
            />
            <span
              className="whitespace-nowrap font-bold text-[#C4B5FD]"
              style={{ fontSize: m.teamFontSize, letterSpacing: 0.4 * (m.teamFontSize / 11) }}
            >
              {displayTeam}
            </span>
          </div>

          <div
            className="box-border flex min-w-0 max-w-full items-center justify-end overflow-hidden rounded-full border"
            style={{
              gap: m.pauseGap,
              height: m.topBarHeight,
              maxWidth: m.topSideMaxWidth,
              padding: `0 ${m.pausePadH}px`,
              borderColor: "rgba(255,255,255,0.13)",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <PauseCircle
              style={{
                width: m.pauseIconSize,
                height: m.pauseIconSize,
                color: "#EDE9FE",
                flexShrink: 0,
              }}
            />
            {m.showPauseLabel ? (
              <span
                className="whitespace-nowrap font-bold text-[#EDE9FE]"
                style={{ fontSize: m.pauseFontSize }}
              >
                {pauseLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className="pointer-events-none absolute z-0 flex items-center justify-center"
          style={{
            top: m.screenPadTop,
            bottom: m.topBarGap,
            left: m.screenPadH,
            right: m.screenPadH,
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-full border"
            style={{
              height: m.topBarHeight,
              padding: `0 ${m.timerPadH}px`,
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          >
            <span
              className="whitespace-nowrap font-bold tabular-nums text-[rgba(237,233,254,0.78)]"
              style={{ fontSize: m.timerFontSize, letterSpacing: 0.3 * (m.timerFontSize / 12) }}
            >
              {timer}
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        style={{
          paddingLeft: m.screenPadH,
          paddingRight: m.screenPadH,
          paddingBottom: m.screenPadBottom,
        }}
      >
        <div
          className="flex min-h-0 flex-1 items-center justify-center"
          style={{
            paddingLeft: m.wordPadH,
            paddingRight: m.wordPadH,
          }}
        >
          <p
            className="w-full text-center font-black uppercase text-white"
            style={{
              fontSize: m.wordFontSize,
              lineHeight: `${m.wordLineHeight}px`,
              letterSpacing: m.wordLetterSpacing,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {word}
          </p>
        </div>

        <div
          className="flex shrink-0 items-center justify-between"
          style={{
            gap: m.topBarGap,
            paddingLeft: m.gestureInset,
            paddingRight: m.gestureInset,
            paddingBottom: m.gestureBottom,
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-full border"
            style={{
              width: m.gestureSize,
              height: m.gestureSize,
              backgroundColor: "rgba(239, 68, 68, 0.14)",
              borderColor: "rgba(252, 165, 165, 0.24)",
            }}
          >
            <ArrowUp
              style={{ width: m.gestureIconSize, height: m.gestureIconSize, color: "#FECACA" }}
            />
          </div>

          <div
            className="flex shrink-0 items-center justify-center rounded-full border"
            style={{
              width: m.gestureSize,
              height: m.gestureSize,
              backgroundColor: "rgba(34, 197, 94, 0.16)",
              borderColor: "rgba(134, 239, 172, 0.28)",
            }}
          >
            <ArrowDown
              style={{ width: m.gestureIconSize, height: m.gestureIconSize, color: "#BBF7D0" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
