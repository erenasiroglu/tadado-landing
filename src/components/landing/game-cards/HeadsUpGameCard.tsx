import { headsUpGradientStyle } from "@/lib/game-preview-tokens";
import { cn } from "@/lib/utils";

interface HeadsUpGameCardProps {
  word: string;
  teamName?: string;
  className?: string;
  compact?: boolean;
}

export function HeadsUpGameCard({
  word,
  teamName = "TEAM A",
  className,
  compact = false,
}: HeadsUpGameCardProps) {
  const fontSize = compact
    ? word.length > 14
      ? 12
      : word.length > 10
        ? 14
        : 16
    : 18;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden",
        compact ? "min-h-[130px]" : "min-h-[160px]",
        className,
      )}
      style={{
        background: headsUpGradientStyle(),
        borderRadius: compact ? 14 : 18,
        aspectRatio: "16 / 10",
      }}
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-2">
        <div
          className="flex items-center gap-1 rounded-full border px-2 py-0.5"
          style={{
            borderColor: "rgba(255,255,255,0.13)",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span className="font-bold uppercase text-lavender" style={{ fontSize: compact ? 9 : 10 }}>
            {teamName}
          </span>
        </div>
        <div
          className="rounded-full border px-2 py-0.5 font-bold text-lavender/80"
          style={{
            fontSize: compact ? 9 : 10,
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.07)",
          }}
        >
          42s
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-3 pb-3">
        <p
          className="w-full text-center font-black uppercase leading-tight text-white"
          style={{
            fontSize,
            letterSpacing: word.length > 12 ? 0.5 : 1.5,
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
          }}
        >
          {word}
        </p>
      </div>
    </div>
  );
}
