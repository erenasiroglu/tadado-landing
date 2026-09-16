import { cn } from "@/lib/utils";

interface GameHUDProps {
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
}

/** Anchored HUD region for timer, score, or landscape controls. */
export function GameHUD({ children, className, position = "bottom" }: GameHUDProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
