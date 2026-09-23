import { Ban, CheckCircle2, LogOut, SkipForward } from "lucide-react";

import {
  ACTION_VARIANTS,
  FORBIDDEN_WORDS_PREVIEW,
  FORBIDDEN_WORDS_STYLE,
  type GamePreviewLabels,
  GLASS_TEXT_PRIMARY,
  gameScreenPreviewScale,
  getGameScreenPreviewMetrics,
} from "@/lib/game-preview-tokens";

const defaultLabels: GamePreviewLabels = {
  timeLeft: FORBIDDEN_WORDS_PREVIEW.timeLeft,
  passStatus: FORBIDDEN_WORDS_PREVIEW.passStatus,
  roundLabel: FORBIDDEN_WORDS_PREVIEW.roundLabel,
  tabooLabel: FORBIDDEN_WORDS_PREVIEW.tabooLabel,
  passLabel: FORBIDDEN_WORDS_PREVIEW.passLabel,
  correctLabel: FORBIDDEN_WORDS_PREVIEW.correctLabel,
  foreheadTitle: "",
  tiltUp: "",
  tiltDown: "",
  yourTeam: "",
  turnComplete: "",
  pointsEarned: "",
  scoresHeading: "",
  nextUpLabel: "",
  continue: "",
  pauseGame: "",
  teamA: FORBIDDEN_WORDS_PREVIEW.teamName,
  teamB: "TEAM B",
};
const FORBIDDEN_WORD_COUNT = 4;

function normalizeForbiddenWords(words: readonly string[]): string[] {
  const list = [...words];
  while (list.length < FORBIDDEN_WORD_COUNT) {
    list.push("—");
  }
  return list.slice(0, FORBIDDEN_WORD_COUNT);
}

interface ForbiddenWordsPreviewProps {
  shellWidth?: number;
  word?: string;
  forbidden?: readonly string[];
  labels?: GamePreviewLabels;
}

function PreviewActionButton({
  variant,
  icon,
  label,
  pointsMultiplier,
  metrics,
}: {
  variant: keyof typeof ACTION_VARIANTS;
  icon: React.ReactNode;
  label: string;
  pointsMultiplier?: number;
  metrics: ReturnType<typeof getGameScreenPreviewMetrics>;
}) {
  const preset = ACTION_VARIANTS[variant];

  return (
    <div
      className="flex min-w-0 flex-1 overflow-hidden"
      style={{
        height: metrics.actionHeight,
        borderRadius: 15 * (metrics.actionHeight / 86),
        border: `1px solid ${preset.border}`,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{
          backgroundColor: preset.tint,
          gap: 6 * (metrics.actionHeight / 86),
          padding: `${10 * (metrics.actionHeight / 86)}px 4px`,
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ width: metrics.actionOrb, height: metrics.actionOrb * 0.9 }}
        >
          <div
            className="flex items-center justify-center rounded-full border border-white/20"
            style={{
              width: metrics.actionOrb,
              height: metrics.actionOrb,
              backgroundColor: preset.iconBg,
            }}
          >
            <span style={{ color: preset.accent }}>{icon}</span>
          </div>
          {pointsMultiplier ? (
            <span
              className="absolute flex items-center justify-center rounded-full border font-semibold"
              style={{
                top: -4 * (metrics.actionHeight / 86),
                right: -8 * (metrics.actionHeight / 86),
                minWidth: metrics.actionBadge,
                height: metrics.actionBadge,
                fontSize: metrics.actionBadgeFont,
                color: preset.accent,
                borderColor: `${preset.accent}66`,
                backgroundColor: `${preset.accent}24`,
              }}
            >
              ×{pointsMultiplier}
            </span>
          ) : null}
        </div>
        <span
          className="truncate font-semibold"
          style={{
            color: GLASS_TEXT_PRIMARY,
            fontSize: metrics.actionLabel,
            lineHeight: 1.2,
            letterSpacing: 0.15,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function ForbiddenWordsPreview({
  shellWidth = 260,
  word = FORBIDDEN_WORDS_PREVIEW.word,
  forbidden = FORBIDDEN_WORDS_PREVIEW.forbidden,
  labels,
}: ForbiddenWordsPreviewProps) {
  const t = {
    ...FORBIDDEN_WORDS_STYLE,
    ...defaultLabels,
    ...labels,
    pointsMultiplier: FORBIDDEN_WORDS_PREVIEW.pointsMultiplier,
  };
  const scale = gameScreenPreviewScale(shellWidth);
  const m = getGameScreenPreviewMetrics(scale);
  const forbiddenWords = normalizeForbiddenWords(forbidden);
  const forbiddenRowMinHeight = m.forbiddenPadV * 2 + m.forbiddenFontSize * 1.05;

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{ backgroundColor: t.screenBg }}
    >
      <div
        className="pointer-events-none absolute rounded-[60px]"
        style={{
          top: 88 * scale,
          right: m.accentTopRight,
          width: m.accentTopW,
          height: m.accentTopH,
          backgroundColor: "rgba(196, 181, 253, 0.15)",
          transform: "rotate(-18deg)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute rounded-[54px]"
        style={{
          top: "42%",
          left: m.accentMidLeft,
          width: m.accentMidW,
          height: m.accentMidH,
          backgroundColor: "rgba(124, 58, 237, 0.14)",
          transform: "rotate(12deg)",
        }}
        aria-hidden
      />

      <div
        className="flex min-h-0 flex-1 flex-col"
        style={{
          paddingLeft: m.screenPadH,
          paddingRight: m.screenPadH,
          paddingTop: m.screenPadTop,
          paddingBottom: m.actionHeight + m.dockGap * 3 + m.dockPadBottom + 20 * scale,
        }}
      >
        <div style={{ marginBottom: m.headerMarginBottom }}>
          <div className="relative flex items-center justify-between">
            <div
              className="z-10 flex items-center justify-center border"
              style={{
                width: m.exitSize,
                height: m.exitSize,
                borderRadius: m.exitRadius,
                borderColor: "rgba(196, 181, 253, 0.22)",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
              }}
            >
              <LogOut
                style={{
                  width: m.exitIcon,
                  height: m.exitIcon,
                  color: "rgba(237, 233, 254, 0.95)",
                }}
              />
            </div>
            <p
              className="absolute inset-x-0 text-center font-black uppercase"
              style={{
                color: t.teamColor,
                fontSize: m.teamFontSize,
                letterSpacing: 1 * scale,
                lineHeight: 1.05,
              }}
            >
              {t.teamA}
            </p>
            <div
              className="z-10 flex items-center justify-center overflow-hidden rounded-full border"
              style={{
                minWidth: m.scoreMinWidth,
                padding: `${m.scorePadV}px ${m.scorePadH}px`,
                borderColor: "rgba(196, 181, 253, 0.3)",
                background: "linear-gradient(135deg, rgba(237,233,254,0.18), rgba(167,139,250,0.16))",
              }}
            >
              <span
                className="font-black tabular-nums"
                style={{ color: "#EDE9FE", fontSize: m.scoreFontSize, letterSpacing: 0.4 * scale }}
              >
                3
              </span>
            </div>
          </div>

          <div
            className="flex flex-col items-center"
            style={{ marginTop: m.teamProgressGap, marginBottom: m.progressMarginBottom }}
          >
            <div
              className="overflow-hidden"
              style={{
                width: "85%",
                height: m.progressHeight,
                marginBottom: m.progressGap,
                borderRadius: m.progressHeight / 2,
                border: `${m.progressBorder}px solid rgba(196, 181, 253, 0.38)`,
                backgroundColor: "rgba(237, 233, 254, 0.1)",
              }}
            >
              <div
                className="h-full rounded-lg"
                style={{
                  width: "54%",
                  background: `linear-gradient(90deg, ${t.timerGradient[0]}, ${t.timerGradient[1]})`,
                }}
              />
            </div>
            <p style={{ color: t.timerText, fontSize: m.timeFontSize }}>{t.timeLeft}</p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="relative w-[90%]">
            <div
              className="absolute inset-x-0 flex justify-center"
              style={{ top: m.metaTop, zIndex: 2 }}
            >
              <div
                className="flex items-center"
                style={{
                  gap: m.metaGap,
                  padding: `${m.metaPadV}px ${m.metaPadH}px`,
                  borderTopLeftRadius: m.metaRadius,
                  borderTopRightRadius: m.metaRadius,
                  backgroundColor: t.cardBg,
                }}
              >
                <span
                  className="font-semibold"
                  style={{ color: t.cardProgressText, fontSize: m.metaRoundFont }}
                >
                  {t.roundLabel}
                </span>
                <span
                  style={{
                    width: 1,
                    height: m.metaSeparatorH,
                    borderRadius: 1,
                    backgroundColor: "rgba(196, 181, 253, 0.32)",
                  }}
                />
                <span
                  className="flex items-center justify-center rounded-full border font-black"
                  style={{
                    minWidth: m.metaChipMinWidth,
                    height: m.metaChipHeight,
                    padding: `0 ${m.metaChipPadH}px`,
                    fontSize: m.metaPointsFont,
                    color: t.pointsChip.accent,
                    backgroundColor: t.pointsChip.background,
                    borderColor: t.pointsChip.border,
                  }}
                >
                  {t.pointsMultiplier}
                </span>
              </div>
            </div>

            <div
              style={{
                borderRadius: m.cardRadius,
                backgroundColor: t.cardBg,
                padding: `${m.cardPadTop}px ${m.cardPadH}px ${m.cardPadBottom}px`,
              }}
            >
              <div
                className="mx-auto text-center"
                style={{
                  width: "85%",
                  marginBottom: m.wordMarginBottom,
                  padding: `${m.wordPadV}px ${m.wordPadH}px`,
                  borderRadius: m.wordRadius,
                  backgroundColor: t.wordBg,
                }}
              >
                <p
                  className="font-black uppercase"
                  style={{
                    color: t.wordText,
                    fontSize: m.wordFontSize,
                    lineHeight: 1.05,
                    letterSpacing: 0.2 * scale,
                  }}
                >
                  {word}
                </p>
              </div>

              <div className="flex w-full flex-col" style={{ gap: m.forbiddenGap }}>
                {forbiddenWords.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex w-full items-center justify-center text-center"
                    style={{
                      padding: `${m.forbiddenPadV}px ${m.forbiddenPadH}px`,
                      borderRadius: m.forbiddenRadius,
                      backgroundColor: t.forbiddenWordBg,
                      minHeight: forbiddenRowMinHeight,
                    }}
                  >
                    <span
                      className="w-full font-bold uppercase"
                      style={{
                        color: t.forbiddenWordText,
                        fontSize: m.forbiddenFontSize,
                        lineHeight: 1.05,
                        letterSpacing: 0.15 * scale,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-20"
        style={{
          padding: `0 ${m.dockPadH}px ${m.dockPadBottom}px`,
          gap: m.dockGap,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="mx-auto flex w-fit items-center border"
          style={{
            gap: 5 * scale,
            padding: `${m.passPillPadV}px ${m.passPillPadH}px`,
            borderRadius: 12 * scale,
            borderColor: "rgba(255, 255, 255, 0.16)",
            backgroundColor: "rgba(196, 181, 253, 0.08)",
          }}
        >
          <SkipForward
            style={{
              width: m.passIcon,
              height: m.passIcon,
              color: "rgba(226, 232, 240, 0.82)",
            }}
          />
          <span style={{ fontSize: m.passPillFont, color: "rgba(233, 213, 255, 0.78)" }}>
            {t.passStatus}
          </span>
        </div>

        <div className="flex" style={{ gap: m.actionGap }}>
          <PreviewActionButton
            variant="taboo"
            icon={<Ban style={{ width: m.actionIcon, height: m.actionIcon }} />}
            label={t.tabooLabel}
            metrics={m}
          />
          <PreviewActionButton
            variant="pass"
            icon={<SkipForward style={{ width: m.actionIcon, height: m.actionIcon }} />}
            label={t.passLabel}
            metrics={m}
          />
          <PreviewActionButton
            variant="correct"
            icon={<CheckCircle2 style={{ width: m.actionIcon, height: m.actionIcon }} />}
            label={t.correctLabel}
            pointsMultiplier={2}
            metrics={m}
          />
        </div>
      </div>
    </div>
  );
}
