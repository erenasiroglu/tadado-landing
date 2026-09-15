import { CheckCircle2, Flag } from "lucide-react";

import {
  gameScreenPreviewScale,
  TURN_SUMMARY_PREVIEW,
} from "@/lib/game-preview-tokens";

const t = TURN_SUMMARY_PREVIEW;

interface ForbiddenWordsTurnSummaryPreviewProps {
  shellWidth?: number;
}

export function ForbiddenWordsTurnSummaryPreview({
  shellWidth = 200,
}: ForbiddenWordsTurnSummaryPreviewProps) {
  const scale = gameScreenPreviewScale(shellWidth);

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden px-3 py-4"
      style={{
        background: `linear-gradient(180deg, ${t.backgroundGradient[0]} 0%, ${t.backgroundGradient[1]} 50%, ${t.backgroundGradient[2]} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: 40 * scale,
          left: "50%",
          width: 180 * scale,
          height: 180 * scale,
          marginLeft: -90 * scale,
          backgroundColor: "rgba(139, 92, 246, 0.28)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className="flex items-center gap-1 rounded-full px-2 py-1"
          style={{
            backgroundColor: "rgba(153, 126, 175, 0.22)",
            fontSize: 10 * scale,
            color: "#EDE9FE",
          }}
        >
          <Flag style={{ width: 10 * scale, height: 10 * scale }} />
          <span className="font-semibold">{t.roundLabel}</span>
        </div>

        <p
          className="mt-2 font-black uppercase"
          style={{ color: "#EDE9FE", fontSize: 18 * scale, letterSpacing: 0.5 * scale }}
        >
          {t.teamName}
        </p>
        <p className="mt-1" style={{ color: "rgba(237, 233, 254, 0.64)", fontSize: 11 * scale }}>
          {t.subtitle}
        </p>

        <div
          className="mt-4 w-full rounded-2xl border p-3"
          style={{
            borderColor: "rgba(167, 139, 250, 0.4)",
            backgroundColor: "rgba(61, 31, 88, 0.38)",
          }}
        >
          <CheckCircle2
            className="mx-auto"
            style={{ width: 24 * scale, height: 24 * scale, color: "#C4B5FD" }}
          />
          <p className="mt-2 font-black" style={{ color: "#F5F3FF", fontSize: 28 * scale }}>
            {t.pointsEarned}
          </p>
          <p style={{ color: "rgba(237, 233, 254, 0.78)", fontSize: 10 * scale }}>{t.pointsLabel}</p>
        </div>

        <p
          className="mt-4 font-semibold uppercase tracking-wider"
          style={{ color: "rgba(196, 181, 253, 0.56)", fontSize: 9 * scale }}
        >
          {t.scoresHeading}
        </p>
        <div className="mt-2 flex w-full items-center gap-2">
          <div
            className="flex-1 rounded-xl border px-2 py-2"
            style={{
              borderColor: "rgba(167, 139, 250, 0.5)",
              backgroundColor: "rgba(124, 58, 237, 0.2)",
            }}
          >
            <p style={{ color: "rgba(237, 233, 254, 0.7)", fontSize: 8 * scale }}>{t.team1Name}</p>
            <p className="font-black" style={{ color: "#EDE9FE", fontSize: 18 * scale }}>{t.team1Score}</p>
          </div>
          <span style={{ color: "rgba(196, 181, 253, 0.8)", fontSize: 9 * scale }}>{t.vs}</span>
          <div
            className="flex-1 rounded-xl border px-2 py-2"
            style={{
              borderColor: "rgba(237, 233, 254, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <p style={{ color: "rgba(237, 233, 254, 0.7)", fontSize: 8 * scale }}>{t.team2Name}</p>
            <p className="font-black" style={{ color: "#EDE9FE", fontSize: 18 * scale }}>{t.team2Score}</p>
          </div>
        </div>

        <div
          className="mt-3 w-full rounded-xl px-2 py-2 text-center"
          style={{ backgroundColor: "rgba(99, 102, 241, 0.14)" }}
        >
          <p style={{ color: "rgba(196, 181, 253, 0.56)", fontSize: 8 * scale }}>{t.nextUpLabel}</p>
          <p className="font-bold" style={{ color: "#C4B5FD", fontSize: 11 * scale }}>{t.nextTeam}</p>
        </div>

        <div
          className="mt-3 w-full rounded-xl py-2 text-center font-bold"
          style={{
            background: "linear-gradient(135deg, #A78BFA, #6D28D9)",
            color: "#FFFFFF",
            fontSize: 11 * scale,
          }}
        >
          {t.continue}
        </div>
      </div>
    </div>
  );
}
