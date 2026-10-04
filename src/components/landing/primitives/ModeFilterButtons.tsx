"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type GameModeFilter = "taboo" | "headsup";

interface ModeFilterButtonsProps {
  activeMode: GameModeFilter;
  onSelect: (mode: GameModeFilter) => void;
  tabooLabel: string;
  headsUpLabel: string;
  ariaLabel: string;
  className?: string;
}

export function ModeFilterButtons({
  activeMode,
  onSelect,
  tabooLabel,
  headsUpLabel,
  ariaLabel,
  className,
}: ModeFilterButtonsProps) {
  const modes: { key: GameModeFilter; label: string }[] = [
    { key: "taboo", label: tabooLabel },
    { key: "headsup", label: headsUpLabel },
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
