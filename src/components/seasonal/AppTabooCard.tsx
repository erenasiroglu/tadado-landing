import { ACTIVE_GAME_SCREEN } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface AppTabooCardProps {
  word: string;
  forbidden: readonly string[];
  /** Small tab on the top edge, e.g. "Round 1/4". */
  tabLabel?: string;
  className?: string;
}

/**
 * Web copy of the app's Forbidden Words card (components/game/TabooCardPreview) in the active skin:
 * pumpkin word plate and purple rows on the Halloween skin. Sizes follow the card width via `em`.
 */
export function AppTabooCard({ word, forbidden, tabLabel, className }: AppTabooCardProps) {
  const t = ACTIVE_GAME_SCREEN;

  return (
    <div className={cn("app-taboo-card", className)}>
      {tabLabel ? (
        <span className="app-taboo-card__tab" style={{ backgroundColor: t.cardBg, color: t.cardProgressText }}>
          {tabLabel}
        </span>
      ) : null}
      <div
        className="app-taboo-card__body"
        style={{
          borderColor: t.cardBorder,
          background: `linear-gradient(180deg, #2b1145 0%, ${t.cardBg} 100%)`,
        }}
      >
        <p className="app-taboo-card__word" style={{ backgroundColor: t.wordBg, color: t.wordText }}>
          {word}
        </p>
        <ul className="app-taboo-card__rows">
          {forbidden.slice(0, 4).map((item) => (
            <li
              key={item}
              style={{
                backgroundColor: t.forbiddenWordBg,
                borderColor: t.forbiddenWordBorder,
                color: t.forbiddenWordText,
              }}
              className={cn(t.forbiddenUppercase && "uppercase")}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
