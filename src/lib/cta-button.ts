import { cn } from "@/lib/utils";

/** Shared pressable styles without bg-clip-padding / phantom border gaps */
export const pressableBase =
  "inline-flex shrink-0 items-center justify-center gap-1.5 box-border border-0 bg-clip-border text-center font-bold whitespace-nowrap antialiased outline-none select-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-3 focus-visible:ring-ring/50";

export function ctaGradientClass(className?: string) {
  return cn(pressableBase, "cta-gradient text-white", className);
}

export function ctaAmberClass(className?: string) {
  return cn(
    pressableBase,
    "bg-amber text-[#2a0a3b] transition-colors hover:bg-amber/90",
    className,
  );
}

export function storeBadgeClass(className?: string) {
  return cn(
    pressableBase,
    "h-11 rounded-lg border border-white/15 bg-black/30 px-4 text-sm font-medium text-cream transition-colors hover:border-amber/50 hover:bg-black/50",
    className,
  );
}

export function primarySolidClass(className?: string) {
  return cn(
    pressableBase,
    "rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
    className,
  );
}
