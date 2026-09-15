"use client";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
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
      <TrackedOutboundLink
        href={getAppStoreUrl(locale)}
        locale={locale}
        downloadPlatform="ios"
        downloadSource="hero_badges"
        className={storeBadgeClass()}
        ariaLabel="Download on the App Store"
      >
        <span className="mr-2 text-lg" aria-hidden></span>
        App Store
      </TrackedOutboundLink>
      <TrackedOutboundLink
        href={getPlayStoreUrl(locale)}
        locale={locale}
        downloadPlatform="android"
        downloadSource="hero_badges"
        className={storeBadgeClass()}
        ariaLabel="Get it on Google Play"
      >
        <span className="mr-2 text-lg" aria-hidden>▶</span>
        Google Play
      </TrackedOutboundLink>
    </div>
  );
}
