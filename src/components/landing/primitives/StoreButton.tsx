"use client";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { storeBadgeClass } from "@/lib/cta-button";
import type { DownloadSource } from "@/lib/analytics-events";
import type { Locale } from "@/lib/i18n";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface StoreButtonProps {
  locale: Locale;
  platform: "ios" | "android";
  source: DownloadSource;
  className?: string;
  compact?: boolean;
}

export function StoreButton({ locale, platform, source, className, compact }: StoreButtonProps) {
  const href = platform === "ios" ? getAppStoreUrl(locale) : getPlayStoreUrl(locale);
  const label = platform === "ios" ? "App Store" : "Google Play";
  const icon = platform === "ios" ? "" : "▶";

  return (
    <TrackedOutboundLink
      href={href}
      locale={locale}
      downloadPlatform={platform}
      downloadSource={source}
      className={cn(storeBadgeClass(), compact && "h-10 px-3 text-xs", className)}
      ariaLabel={platform === "ios" ? "Download on the App Store" : "Get it on Google Play"}
    >
      <span className="mr-2 text-lg" aria-hidden>
        {icon}
      </span>
      {label}
    </TrackedOutboundLink>
  );
}

interface StoreButtonsProps {
  locale: Locale;
  source: DownloadSource;
  className?: string;
  compact?: boolean;
}

export function StoreButtons({ locale, source, className, compact }: StoreButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StoreButton locale={locale} platform="ios" source={source} compact={compact} />
      <StoreButton locale={locale} platform="android" source={source} compact={compact} />
    </div>
  );
}
