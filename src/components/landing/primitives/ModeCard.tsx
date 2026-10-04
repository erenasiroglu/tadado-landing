"use client";

import { cn } from "@/lib/utils";

interface ModeCardProps {
  title: string;
  body: string;
  isActive?: boolean;
  badge?: string;
  onSelect?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModeCard({
  title,
  body,
  isActive = false,
  badge,
  onSelect,
  children,
  className,
}: ModeCardProps) {
  return (
    <div
      className={cn(
        "surface-card flex flex-col overflow-hidden transition-shadow duration-300",
        isActive && "ring-2 ring-ink/20 shadow-lg shadow-paper",
        className,
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="relative flex flex-col p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
      >
        {badge ? (
          <span className="absolute right-4 top-4 rounded-md border border-border bg-lilac px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
            {badge}
          </span>
        ) : null}
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{body}</p>
      </button>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6">{children}</div>
    </div>
  );
}
