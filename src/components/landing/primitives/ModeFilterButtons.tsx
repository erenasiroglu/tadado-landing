"use client";

import { buttonVariants } from "@/components/ui/button";
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
      className={cn("flex flex-wrap justify-center gap-3 lg:justify-start", className)}
    >
      {modes.map((mode) => {
        const isActive = activeMode === mode.key;
        return (
          <button
            key={mode.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(mode.key)}
            className={buttonVariants({
              variant: isActive ? "default" : "secondary",
              size: "default",
            })}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
