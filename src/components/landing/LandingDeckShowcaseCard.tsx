import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface LandingDeckShowcaseCardProps {
  image: string;
  title: string;
  description: string;
  ctaLabel: string;
  badge?: string;
  className?: string;
  size?: "sm" | "md";
}

/** Hero fan deck tile — same chrome as the app illustrated cards (shared `.halloween-deck-card` styles). */
export function LandingDeckShowcaseCard({
  image,
  title,
  description,
  ctaLabel,
  badge,
  className,
  size = "sm",
}: LandingDeckShowcaseCardProps) {
  const md = size === "md";

  return (
    <div className={cn("halloween-deck-card", md && "halloween-deck-card--md", className)}>
      <Image src={image} alt="" fill sizes={md ? "260px" : "170px"} className="object-cover" />
      <div className="halloween-deck-card__shade" aria-hidden />
      {badge ? <span className="halloween-deck-card__badge">{badge}</span> : null}
      <div className="relative mt-auto flex flex-col items-center text-center">
        <span className="halloween-deck-card__play" aria-hidden>
          <Play className="size-[42%] translate-x-[6%] fill-current" />
        </span>
        <p className="halloween-deck-card__title">{title}</p>
        <p className="halloween-deck-card__desc">{description}</p>
        <span className="halloween-deck-card__cta">{ctaLabel}</span>
      </div>
    </div>
  );
}
