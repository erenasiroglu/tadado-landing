import { CLASSIC_GAME_SCREEN } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface TabooGameCardProps {
  word: string;
  forbidden: string[];
  className?: string;
  compact?: boolean;
}

export function TabooGameCard({ word, forbidden, className, compact = false }: TabooGameCardProps) {
  const t = CLASSIC_GAME_SCREEN;

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ backgroundColor: t.background, borderRadius: compact ? 16 : 20, padding: compact ? 10 : 14 }}
    >
      <div
        className="relative mx-auto w-full"
        style={{
          borderRadius: compact ? 14 : 18,
          backgroundColor: t.cardBg,
          padding: compact ? "18px 10px 12px" : "24px 14px 16px",
        }}
      >
        <div
          className="mx-auto text-center"
          style={{
            width: "85%",
            marginBottom: compact ? 8 : 12,
            padding: compact ? "10px 12px" : "14px 16px",
            borderRadius: compact ? 10 : 14,
            backgroundColor: t.wordBg,
          }}
        >
          <p
            className="font-black uppercase"
            style={{
              color: t.wordText,
              fontSize: compact ? 14 : 18,
              lineHeight: 1.05,
              letterSpacing: 0.3,
            }}
          >
            {word}
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: compact ? 6 : 8 }}>
          {forbidden.map((item) => (
            <div
              key={item}
              className="text-center"
              style={{
                padding: compact ? "8px 10px" : "10px 12px",
                borderRadius: compact ? 8 : 10,
                backgroundColor: t.forbiddenWordBg,
              }}
            >
              <span
                className="font-bold uppercase"
                style={{
                  color: t.forbiddenWordText,
                  fontSize: compact ? 10 : 12,
                  lineHeight: 1.1,
                  letterSpacing: 0.2,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
