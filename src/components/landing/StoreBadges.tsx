"use client";

import { MotionLink } from "@/components/motion/MotionLink";
import { storeBadgeClass } from "@/lib/cta-button";
import type { Locale } from "@/lib/i18n";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface StoreBadgesProps {
  locale: Locale;
  className?: string;
}

export function StoreBadges({ locale, className = "" }: StoreBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <MotionLink
        href={getAppStoreUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className={storeBadgeClass()}
        aria-label="Download on the App Store"
      >
        <span className="mr-2 text-lg" aria-hidden></span>
        App Store
      </MotionLink>
      <MotionLink
        href={getPlayStoreUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className={storeBadgeClass()}
        aria-label="Get it on Google Play"
      >
        <span className="mr-2 text-lg" aria-hidden>▶</span>
        Google Play
      </MotionLink>
    </div>
  );
}
