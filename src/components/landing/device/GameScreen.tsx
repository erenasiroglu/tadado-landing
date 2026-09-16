import { cn } from "@/lib/utils";

interface GameScreenProps {
  children: React.ReactNode;
  className?: string;
}

/** Full-bleed gameplay canvas inside the device screen mask. */
export function GameScreen({ children, className }: GameScreenProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>{children}</div>
  );
}
