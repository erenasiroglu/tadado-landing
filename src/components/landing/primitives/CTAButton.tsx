"use client";

import Link from "next/link";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { ctaAmberClass, ctaGradientClass, pressableBase } from "@/lib/cta-button";
import type { AnalyticsEventName, DownloadSource } from "@/lib/analytics-events";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CTAButtonVariant = "primary" | "secondary" | "ghost";

interface CTAButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: CTAButtonVariant;
}

interface CTAButtonLinkProps extends CTAButtonBaseProps {
  href: string;
  onClick?: () => void;
  downloadPlatform?: never;
  downloadSource?: never;
  locale?: never;
  eventName?: AnalyticsEventName;
  eventProperties?: Record<string, string | number | boolean | undefined>;
}

interface CTAButtonStoreProps extends CTAButtonBaseProps {
  href: string;
  locale: Locale;
  downloadPlatform: "ios" | "android";
  downloadSource: DownloadSource;
  eventName?: AnalyticsEventName;
  eventProperties?: Record<string, string | number | boolean | undefined>;
  onClick?: () => void;
}

export type CTAButtonProps = CTAButtonLinkProps | CTAButtonStoreProps;

function variantClass(variant: CTAButtonVariant, className?: string) {
  if (variant === "primary") {
    return ctaGradientClass(cn("min-h-11 rounded-full px-6 text-sm shadow-lg shadow-violet-900/25", className));
  }
  if (variant === "secondary") {
    return ctaAmberClass(cn("min-h-11 rounded-full px-6 text-sm", className));
  }
  return cn(
    pressableBase,
    "min-h-11 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm text-cream transition-colors hover:border-amber/40 hover:bg-white/[0.08]",
    className,
  );
}

export function CTAButton(props: CTAButtonProps) {
  const { children, className, variant = "primary", href, onClick } = props;
  const classes = variantClass(variant, className);

  if ("downloadPlatform" in props && props.downloadPlatform) {
    return (
      <TrackedOutboundLink
        href={href}
        locale={props.locale}
        downloadPlatform={props.downloadPlatform}
        downloadSource={props.downloadSource}
        eventName={props.eventName}
        eventProperties={props.eventProperties}
        className={classes}
      >
        {children}
      </TrackedOutboundLink>
    );
  }

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <TrackedOutboundLink
        href={href}
        className={classes}
        eventName={props.eventName}
        eventProperties={props.eventProperties}
      >
        {children}
      </TrackedOutboundLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
