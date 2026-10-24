import { Check, Minus, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface ComparisonCellProps {
  value: string;
  labels: { yes: string; no: string; partial: string; varies: string };
  /** Tadado's column sits on a tinted band, so its icons use the solid tone. */
  emphasis?: boolean;
}

/** One comparison cell: yes / no / partial as icons, "varies" and free text as a label. */
export function ComparisonCell({
  value,
  labels,
  emphasis,
}: ComparisonCellProps) {
  if (value === "yes") {
    return (
      <span
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-full",
          emphasis ? "bg-ink text-cream" : "bg-ink/80 text-cream",
        )}
      >
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
        <span className="sr-only">{labels.yes}</span>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-mist text-muted-foreground ring-1 ring-ink/10 ring-inset">
        <X className="size-3.5" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">{labels.no}</span>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-lilac text-ink ring-1 ring-ink/10 ring-inset">
        <Minus className="size-3.5" strokeWidth={3} aria-hidden />
        <span className="sr-only">{labels.partial}</span>
      </span>
    );
  }
  const text = value === "varies" ? labels.varies : value;
  return (
    <span
      className={cn(
        "text-sm leading-snug font-semibold",
        emphasis ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {text}
    </span>
  );
}
