import { CircleHelp, Fingerprint } from "lucide-react";

import { ACTIVE_GAME_SCREEN } from "@/lib/design-tokens";
import { gameScreenPreviewScale, type GamePreviewLabels } from "@/lib/game-preview-tokens";

interface ImposterPreviewProps {
  shellWidth?: number;
  labels: GamePreviewLabels;
}

/** Static copy of the app's Imposter (Casus) pass-the-phone screen, in the active game skin. */
export function ImposterPreview({ shellWidth = 260, labels }: ImposterPreviewProps) {
  const s = gameScreenPreviewScale(shellWidth);
  const t = ACTIVE_GAME_SCREEN;
  const [before, after = ""] = labels.imposterPassTo.split("{name}");

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #2f1957 0%, ${t.background} 46%, #170a2a 100%)`,
        padding: `${58 * s}px ${20 * s}px ${26 * s}px`,
      }}
    >
      <div className="relative flex items-center justify-center" style={{ height: 34 * s }}>
        <p
          className="font-black uppercase"
          style={{ color: t.teamNameText, fontSize: 21 * s, letterSpacing: 1.2 * s, lineHeight: 1 }}
        >
          {labels.imposterTitle}
        </p>
        <span
          className="absolute end-0 flex items-center justify-center rounded-full border"
          style={{
            width: 34 * s,
            height: 34 * s,
            borderColor: "rgba(196, 181, 253, 0.22)",
            backgroundColor: "rgba(255, 255, 255, 0.07)",
          }}
        >
          <CircleHelp style={{ width: 17 * s, height: 17 * s, color: "#EDE9FE" }} aria-hidden />
        </span>
      </div>

      <div className="flex justify-center" style={{ gap: 5 * s, marginTop: 10 * s }} aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: (i === 0 ? 22 : 12) * s,
              height: 4 * s,
              backgroundColor: i === 0 ? "#C4B5FD" : "rgba(196, 181, 253, 0.28)",
            }}
          />
        ))}
      </div>

      <p
        className="text-center font-extrabold"
        style={{ marginTop: 22 * s, color: t.teamNameText, fontSize: 25 * s, lineHeight: 1.12, letterSpacing: -0.3 * s }}
      >
        {before}
        <span style={{ color: "#C4B5FD" }}>{labels.imposterPlayer}</span>
        {after}
      </p>
      <p
        className="text-center font-medium"
        style={{ marginTop: 8 * s, color: "rgba(237, 233, 254, 0.62)", fontSize: 14 * s }}
      >
        {labels.imposterLookAway}
      </p>

      <div
        className="relative flex flex-1 flex-col items-center justify-center"
        style={{
          marginTop: 22 * s,
          borderRadius: 26 * s,
          border: "1px solid rgba(196, 181, 253, 0.2)",
          background: "linear-gradient(160deg, rgba(118, 82, 170, 0.62) 0%, rgba(70, 40, 110, 0.55) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        }}
      >
        <span
          className="absolute font-extrabold uppercase"
          style={{
            top: 16 * s,
            insetInlineEnd: 16 * s,
            padding: `${5 * s}px ${10 * s}px`,
            borderRadius: 999,
            fontSize: 10.5 * s,
            letterSpacing: 1 * s,
            color: t.cardProgressText,
            backgroundColor: "rgba(20, 10, 37, 0.72)",
          }}
        >
          {labels.imposterAgent}
        </span>
        <span
          className="flex items-center justify-center rounded-full"
          style={{
            width: 92 * s,
            height: 92 * s,
            backgroundColor: "rgba(20, 10, 37, 0.55)",
            boxShadow: "0 0 0 1px rgba(196, 181, 253, 0.16), 0 14px 30px rgba(10, 4, 24, 0.35)",
          }}
        >
          <Fingerprint style={{ width: 46 * s, height: 46 * s, color: "#EDE9FE" }} strokeWidth={1.5} aria-hidden />
        </span>
        <p
          className="text-center font-semibold"
          style={{ marginTop: 18 * s, color: "rgba(237, 233, 254, 0.78)", fontSize: 14 * s, paddingInline: 16 * s }}
        >
          {labels.imposterHold}
        </p>
      </div>
    </div>
  );
}
