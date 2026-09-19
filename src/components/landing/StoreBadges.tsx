"use client";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { storeBadgeClass } from "@/lib/cta-button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface StoreBadgesProps {
  locale: Locale;
  a11y: Dictionary["a11y"];
  className?: string;
}

export function StoreBadges({ locale, a11y, className = "" }: StoreBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <TrackedOutboundLink
        href={getAppStoreUrl(locale)}
        locale={locale}
        downloadPlatform="ios"
        downloadSource="hero_badges"
        className={storeBadgeClass()}
        ariaLabel={a11y.downloadOnAppStore}
      >
        <span className="mr-2 text-lg" aria-hidden></span>
        {a11y.appStore}
      </TrackedOutboundLink>
      <TrackedOutboundLink
        href={getPlayStoreUrl(locale)}
        locale={locale}
        downloadPlatform="android"
        downloadSource="hero_badges"
        className={storeBadgeClass()}
        ariaLabel={a11y.getOnGooglePlay}
      >
        <span className="mr-2 text-lg" aria-hidden>▶</span>
        {a11y.googlePlay}
      </TrackedOutboundLink>
    </div>
  );
}
