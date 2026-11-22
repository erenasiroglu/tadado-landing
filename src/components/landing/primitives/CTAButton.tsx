"use client";

import Link from "next/link";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { buttonVariants } from "@/components/ui/button";
import type { AnalyticsEventName, DownloadSource } from "@/lib/analytics-events";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CTAButtonVariant = "primary" | "secondary" | "ghost" | "cream" | "ghostOnDark";

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

const VARIANT_MAP: Record<
  CTAButtonVariant,
  "default" | "secondary" | "ghost" | "cream" | "ghostOnDark"
> = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  cream: "cream",
  ghostOnDark: "ghostOnDark",
};

function variantClass(variant: CTAButtonVariant, className?: string) {
  return buttonVariants({
    variant: VARIANT_MAP[variant],
    size: "default",
    className: cn("min-h-12 w-full sm:w-auto", className),
  });
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
        onClick={onClick}
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
        onClick={onClick}
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