import { cn } from "@/lib/utils";

export function AccentPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("accent-pill", className)}>{children}</span>;
}
