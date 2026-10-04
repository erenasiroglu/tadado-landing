import { cn } from "@/lib/utils";

/** Shared pressable styles without bg-clip-padding / phantom border gaps */
export const pressableBase =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 box-border border-0 bg-clip-border text-center font-extrabold tracking-tight whitespace-nowrap antialiased outline-none select-none transition duration-200 ease-pop hover:scale-[1.03] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ring";

export function ctaGradientClass(className?: string) {
  return cn(pressableBase, "surface-obsidian rounded-full text-cream", className);
}

export function ctaAmberClass(className?: string) {
  return cn(
    pressableBase,
    "rounded-full bg-paper/80 text-ink shadow-pill",
    className,
  );
}

export function storeBadgeClass(className?: string) {
  return cn(
    pressableBase,
    "h-12 max-w-full min-w-0 rounded-full bg-paper/80 px-4 text-sm text-ink shadow-pill hover:bg-paper sm:px-5",
    className,
  );
}

export function primarySolidClass(className?: string) {
  return cn(pressableBase, "surface-obsidian rounded-full text-cream", className);
}
