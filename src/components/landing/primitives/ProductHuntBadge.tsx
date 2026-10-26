"use client";

import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface ProductHuntBadgeProps {
  copy: Dictionary["productHunt"];
  /** `night` sits on the midnight Halloween hero, `light` on the default paper hero. */
  tone?: "night" | "light";
  location: string;
  className?: string;
}

/** Launch card that sends visitors to the Product Hunt page to upvote. */
export function ProductHuntBadge({ copy, tone = "light", location, className }: ProductHuntBadgeProps) {
  return (
    <a
      href={SOCIAL_LINKS.productHunt.launchUrl}
      target="_blank"
      rel="noopener"
      className={cn("ph-badge", `ph-badge--${tone}`, className)}
      onClick={() =>
        trackEvent({
          event: ANALYTICS_EVENTS.SOCIAL_CLICK,
          properties: { network: "producthunt", location },
        })
      }
    >
      <ProductHuntLogo className="ph-badge__logo" />
      <span className="min-w-0 flex-1 text-start">
        <span className="ph-badge__label">{copy.label}</span>
        <span className="ph-badge__title">{copy.title}</span>
      </span>
      <span className="ph-badge__cta">
        <svg viewBox="0 0 12 10" aria-hidden className="size-2.5">
          <path d="M6 0 12 10H0z" fill="currentColor" />
        </svg>
        {copy.cta}
      </span>
    </a>
  );
}

function ProductHuntLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#FF6154" />
      <path d="M22.7 20H17v-6h5.7a3 3 0 1 1 0 6Zm0-10H13v20h4v-6h5.7a7 7 0 1 0 0-14Z" fill="#fff" />
    </svg>
  );
}
