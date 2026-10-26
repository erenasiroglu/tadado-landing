import Image from "next/image";
import { Play } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HalloweenDeckCardProps {
  copy: Dictionary["halloween"]["card"];
  className?: string;
  /** Larger type for standalone use; the hero uses the compact phone-scale card. */
  size?: "sm" | "md";
}

/** Copy of the app's home carousel card for the free Halloween deck. */
export function HalloweenDeckCard({ copy, className, size = "sm" }: HalloweenDeckCardProps) {
  const md = size === "md";

  return (
    <div className={cn("halloween-deck-card", md && "halloween-deck-card--md", className)}>
      <Image
        src="/images/deck-cards/halloween-deck-illustration.webp"
        alt=""
        fill
        sizes={md ? "260px" : "170px"}
        className="object-cover"
      />
      <div className="halloween-deck-card__shade" aria-hidden />
      <span className="halloween-deck-card__badge">{copy.newBadge}</span>
      <div className="relative mt-auto flex flex-col items-center text-center">
        <span className="halloween-deck-card__play" aria-hidden>
          <Play className="size-[42%] translate-x-[6%] fill-current" />
        </span>
        <p className="halloween-deck-card__title">{copy.deck}</p>
        <p className="halloween-deck-card__desc">{copy.deckDesc}</p>
        <span className="halloween-deck-card__cta">{copy.play}</span>
      </div>
    </div>
  );
}
