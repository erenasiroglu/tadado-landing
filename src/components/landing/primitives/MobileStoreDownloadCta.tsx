"use client";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { StoreBrandIcon } from "@/components/icons/StoreBrandIcon";
import { useResolvedStorePlatform } from "@/hooks/use-store-platform";
import type { DownloadSource } from "@/lib/analytics-events";
import { ctaGradientClass } from "@/lib/cta-button";
import type { Locale } from "@/lib/i18n";
import { getMobileStoreCtaLabel } from "@/lib/store-cta-labels";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface MobileStoreDownloadCtaProps {
  locale: Locale;
  source: DownloadSource;
  /** Short hero label; falls back to platform download copy. */
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function MobileStoreDownloadCta({
  locale,
  source,
  label,
  className,
  onClick,
}: MobileStoreDownloadCtaProps) {
  const platform = useResolvedStorePlatform();
  const href = platform === "ios" ? getAppStoreUrl(locale) : getPlayStoreUrl(locale);
  const ariaLabel = getMobileStoreCtaLabel(locale, platform);
  const buttonLabel = label ?? ariaLabel;

  return (
    <TrackedOutboundLink
      href={href}
      locale={locale}
      downloadPlatform={platform}
      downloadSource={source}
      onClick={onClick}
      className={ctaGradientClass(
        cn(
          "min-h-12 w-full max-w-full gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold leading-tight whitespace-normal",
          className,
        ),
      )}
      ariaLabel={ariaLabel}
    >
      <StoreBrandIcon platform={platform} className="h-5 w-5 shrink-0" />
      <span className="min-w-0 text-center">{buttonLabel}</span>
    </TrackedOutboundLink>
  );
}
