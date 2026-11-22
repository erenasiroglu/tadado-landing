"use client";

import { cn } from "@/lib/utils";

export type GameModeFilter = "taboo" | "headsup" | "imposter";

interface ModeFilterButtonsProps {
  activeMode: GameModeFilter;
  onSelect: (mode: GameModeFilter) => void;
  tabooLabel: string;
  headsUpLabel: string;
  /** Shown only where the content has an Imposter version. */
  imposterLabel?: string;
  ariaLabel: string;
  className?: string;
}

export function ModeFilterButtons({
  activeMode,
  onSelect,
  tabooLabel,
  headsUpLabel,
  imposterLabel,
  ariaLabel,
  className,
}: ModeFilterButtonsProps) {
  const modes: { key: GameModeFilter; label: string }[] = [
    { key: "taboo", label: tabooLabel },
    { key: "headsup", label: headsUpLabel },
    ...(imposterLabel ? [{ key: "imposter" as const, label: imposterLabel }] : []),
  ];

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex justify-center lg:justify-start", className)}
    >
      <div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl bg-mist/80 p-1 ring-1 ring-border">
        {modes.map((mode) => {
          const isActive = activeMode === mode.key;
          return (
            <button
              key={mode.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(mode.key)}
              className={cn(
                "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-extrabold tracking-tight transition-[color,background-color,box-shadow] duration-200",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive
                  ? "bg-ink text-cream shadow-md ring-1 ring-ink/15"
                  : "bg-transparent text-muted-foreground hover:bg-paper/80 hover:text-foreground",
              )}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}