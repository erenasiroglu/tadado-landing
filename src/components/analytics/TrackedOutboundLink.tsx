"use client";

import { MotionLink } from "@/components/motion/MotionLink";
import { useTrackedHref } from "@/hooks/use-tracked-href";
import type { AnalyticsEventName, DownloadSource } from "@/lib/analytics-events";
import { trackDownloadClick, trackEvent } from "@/lib/tracking";
import type { DownloadPlatform } from "@/lib/tracking";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TrackedOutboundLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  locale?: Locale;
  downloadPlatform?: DownloadPlatform;
  downloadSource?: DownloadSource;
  eventName?: AnalyticsEventName;
  eventProperties?: Record<string, string | number | boolean | undefined>;
  onClick?: () => void;
}

export function TrackedOutboundLink({
  href,
  children,
  className,
  ariaLabel,
  locale,
  downloadPlatform,
  downloadSource,
  eventName,
  eventProperties,
  onClick,
}: TrackedOutboundLinkProps) {
  const trackedHref = useTrackedHref(href);

  function handleClick() {
    onClick?.();

    if (downloadPlatform && locale && downloadSource) {
      trackDownloadClick(downloadPlatform, locale, downloadSource);
      return;
    }

    if (eventName) {
      trackEvent({ event: eventName, properties: eventProperties });
    }
  }

  return (
    <MotionLink
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </MotionLink>
  );
}
