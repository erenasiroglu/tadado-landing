"use client";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { StoreBrandIcon } from "@/components/icons/StoreBrandIcon";
import { storeBadgeClass } from "@/lib/cta-button";
import type { DownloadSource } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getMobileStoreCtaLabel } from "@/lib/store-cta-labels";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface StoreButtonProps {
  locale: Locale;
  platform: "ios" | "android";
  source: DownloadSource;
  a11y: Dictionary["a11y"];
  className?: string;
  compact?: boolean;
  /** Full “Download on …” copy (e.g. hero on desktop). Default is short badge labels. */
  labelMode?: "short" | "download";
}

export function StoreButton({
  locale,
  platform,
  source,
  a11y,
  className,
  compact,
  labelMode = "short",
}: StoreButtonProps) {
  const href =
    platform === "ios" ? getAppStoreUrl(locale) : getPlayStoreUrl(locale);
  const label =
    labelMode === "download"
      ? getMobileStoreCtaLabel(locale, platform)
      : platform === "ios"
        ? a11y.appStore
        : a11y.googlePlay;

  return (
    <TrackedOutboundLink
      href={href}
      locale={locale}
      downloadPlatform={platform}
      downloadSource={source}
      className={cn(
        storeBadgeClass(),
        labelMode === "download" &&
          "h-auto min-h-12 justify-center whitespace-normal px-4 py-2.5 text-center leading-snug",
        compact && "h-10 px-3 text-xs",
        className,
      )}
      ariaLabel={
        platform === "ios" ? a11y.downloadOnAppStore : a11y.getOnGooglePlay
      }
    >
      <StoreBrandIcon platform={platform} className="me-2 size-[1.15rem]" />
      {label}
    </TrackedOutboundLink>
  );
}

interface StoreButtonsProps {
  locale: Locale;
  source: DownloadSource;
  a11y: Dictionary["a11y"];
  className?: string;
  compact?: boolean;
  labelMode?: "short" | "download";
  /** Extra classes for each badge, e.g. a solid cream fill on dark panels. */
  buttonClassName?: string;
}

export function StoreButtons({
  locale,
  source,
  a11y,
  className,
  compact,
  labelMode = "short",
  buttonClassName,
}: StoreButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StoreButton
        locale={locale}
        platform="ios"
        source={source}
        a11y={a11y}
        compact={compact}
        labelMode={labelMode}
        className={buttonClassName}
      />
      <StoreButton
        locale={locale}
        platform="android"
        source={source}
        a11y={a11y}
        compact={compact}
        labelMode={labelMode}
        className={buttonClassName}
      />
    </div>
  );
}

