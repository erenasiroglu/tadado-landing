import { cn } from "@/lib/utils";

type TagTone = "soft" | "solid" | "onDark";

const TONES: Record<TagTone, string> = {
  soft: "bg-lilac/70 text-ink ring-ink/10",
  solid: "bg-ink text-cream ring-ink",
  onDark: "bg-cream text-ink ring-cream",
};

/** Small uppercase label used for plan badges, review sources and deck status. */
export function Tag({
  children,
  icon,
  tone = "soft",
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone?: TagTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[0.6875rem] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase ring-1 ring-inset [&>svg]:size-3 [&>svg]:shrink-0",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
