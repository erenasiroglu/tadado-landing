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
  className?: string;
  onClick?: () => void;
}

export function MobileStoreDownloadCta({
  locale,
  source,
  className,
  onClick,
}: MobileStoreDownloadCtaProps) {
  const platform = useResolvedStorePlatform();
  const href = platform === "ios" ? getAppStoreUrl(locale) : getPlayStoreUrl(locale);
  const label = getMobileStoreCtaLabel(locale, platform);

  return (
    <TrackedOutboundLink
      href={href}
      locale={locale}
      downloadPlatform={platform}
      downloadSource={source}
      onClick={onClick}
      className={ctaGradientClass(
        cn("h-11 w-full gap-2.5 rounded-full px-5 text-sm font-bold", className),
      )}
      ariaLabel={label}
    >
      <StoreBrandIcon platform={platform} className="h-5 w-5" />
      <span>{label}</span>
    </TrackedOutboundLink>
  );
}
