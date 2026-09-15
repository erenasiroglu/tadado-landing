import { ArrowDown, ArrowUp, Users } from "lucide-react";

import {
  HEADS_UP_PREVIEW,
  headsUpGradientStyle,
  headsUpPreviewScale,
} from "@/lib/game-preview-tokens";

const t = HEADS_UP_PREVIEW;

interface HeadsUpForeheadPreviewProps {
  shellWidth?: number;
}

export function HeadsUpForeheadPreview({ shellWidth = 280 }: HeadsUpForeheadPreviewProps) {
  const s = headsUpPreviewScale(shellWidth);

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden px-2 py-2"
      style={{ background: headsUpGradientStyle() }}
    >
      <div className="flex items-center justify-between gap-1">
        <div className="w-8" />
        <div
          className="flex max-w-[55%] items-center gap-1 rounded-full border px-1.5 py-0.5"
          style={{
            borderColor: "rgba(255,255,255,0.13)",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          <Users style={{ width: 8 * s, height: 8 * s, color: "#DDD6FE" }} />
          <span
            className="truncate font-bold"
            style={{ fontSize: 6 * s, color: "#DDD6FE" }}
          >
            {t.yourTeam}: {t.teamName}
          </span>
        </div>
        <div
          className="rounded-full border px-1.5 py-0.5"
          style={{
            borderColor: "rgba(255,255,255,0.13)",
            backgroundColor: "rgba(255,255,255,0.08)",
            fontSize: 5 * s,
            color: "#EDE9FE",
          }}
        >
          Stop
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4">
        <span
          className="absolute font-black tabular-nums"
          style={{
            fontSize: 52 * s,
            lineHeight: 1,
            color: "rgba(237, 233, 254, 0.12)",
          }}
          aria-hidden
        >
          {t.foreheadCountdown}
        </span>
        <p
          className="relative text-center font-black uppercase leading-tight text-white"
          style={{ fontSize: 11 * s, letterSpacing: 0.4 * s }}
        >
          {t.foreheadTitle}
        </p>
      </div>

      <div className="flex items-end justify-between px-1 pb-1">
        <div className="flex max-w-[42%] flex-col items-center gap-0.5">
          <div
            className="flex items-center justify-center rounded-full border border-red-300/25 bg-red-500/15"
            style={{ width: 18 * s, height: 18 * s }}
          >
            <ArrowUp style={{ width: 9 * s, height: 9 * s, color: "#FECACA" }} />
          </div>
          <span
            className="text-center"
            style={{ fontSize: 5 * s, color: "rgba(237, 233, 254, 0.72)" }}
          >
            {t.tiltUp}
          </span>
        </div>
        <div className="flex max-w-[42%] flex-col items-center gap-0.5">
          <div
            className="flex items-center justify-center rounded-full border border-green-300/30 bg-green-500/15"
            style={{ width: 18 * s, height: 18 * s }}
          >
            <ArrowDown style={{ width: 9 * s, height: 9 * s, color: "#BBF7D0" }} />
          </div>
          <span
            className="text-center"
            style={{ fontSize: 5 * s, color: "rgba(237, 233, 254, 0.72)" }}
          >
            {t.tiltDown}
          </span>
        </div>
      </div>
    </div>
  );
}
