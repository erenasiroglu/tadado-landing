"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "tadado:ph-badge-dismissed";

interface ProductHuntBadgeProps {
  copy: Dictionary["productHunt"];
  /** `night` matches the midnight Halloween skin, `light` the default paper page. */
  tone?: "night" | "light";
  location: string;
}

/** Floating launch badge that sends visitors to the Product Hunt page to upvote. Dismissible per browser. */
export function ProductHuntBadge({ copy, tone = "light", location }: ProductHuntBadgeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // Storage can be blocked; the badge then shows on every visit.
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore: hiding still works for this page view.
    }
  }

  if (!visible) return null;

  return (
    <aside className={cn("ph-float", `ph-float--${tone}`)} aria-label={copy.label}>
      <a
        href={SOCIAL_LINKS.productHunt.launchUrl}
        target="_blank"
        rel="noopener"
        className="ph-float__link"
        onClick={() =>
          trackEvent({
            event: ANALYTICS_EVENTS.SOCIAL_CLICK,
            properties: { network: "producthunt", location },
          })
        }
      >
        <ProductHuntLogo className="ph-float__logo" />
        <span className="min-w-0 flex-1 text-start">
          <span className="ph-float__label">{copy.label}</span>
          <span className="ph-float__title">{copy.title}</span>
        </span>
        <span className="ph-float__vote">
          <svg viewBox="0 0 12 10" aria-hidden className="size-2.5">
            <path d="M6 0 12 10H0z" fill="currentColor" />
          </svg>
          {copy.cta}
        </span>
      </a>
      <button type="button" onClick={dismiss} className="ph-float__close" aria-label={copy.hide}>
        <X aria-hidden />
      </button>
    </aside>
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
