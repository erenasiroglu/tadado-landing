"use client";

import { useState } from "react";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { ctaGradientClass, storeBadgeClass } from "@/lib/cta-button";
import type { Locale } from "@/lib/i18n";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

interface ShareLinkActionsProps {
  locale: Locale;
  appLink: string;
  openInAppLabel: string;
  appStoreLabel: string;
  googlePlayLabel: string;
  hint: string;
  code?: string | null;
  codeLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * Actions under a shared deck or invite: open the app directly, or install it. The invite code
 * stays visible because the store install drops the link, so it can be typed in the app.
 */
export function ShareLinkActions({
  locale,
  appLink,
  openInAppLabel,
  appStoreLabel,
  googlePlayLabel,
  hint,
  code,
  codeLabel,
  copyLabel,
  copiedLabel,
  className,
}: ShareLinkActionsProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the code is still visible to type by hand.
    }
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <a href={appLink} className={ctaGradientClass("h-14 w-full px-6 text-base")}>
        {openInAppLabel}
      </a>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <TrackedOutboundLink
          href={getAppStoreUrl(locale)}
          locale={locale}
          downloadPlatform="ios"
          downloadSource="share_link"
          className={storeBadgeClass()}
          ariaLabel={appStoreLabel}
        >
          <span className="mr-2 text-lg" aria-hidden></span>
          {appStoreLabel}
        </TrackedOutboundLink>
        <TrackedOutboundLink
          href={getPlayStoreUrl(locale)}
          locale={locale}
          downloadPlatform="android"
          downloadSource="share_link"
          className={storeBadgeClass()}
          ariaLabel={googlePlayLabel}
        >
          <span className="mr-2 text-lg" aria-hidden>▶</span>
          {googlePlayLabel}
        </TrackedOutboundLink>
      </div>

      {code ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-mist px-4 py-3">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wide text-ink/60">{codeLabel}</div>
            <div className="font-mono text-xl font-extrabold tracking-[0.2em] text-ink">{code}</div>
          </div>
          <button
            type="button"
            onClick={() => void copyCode()}
            className="shrink-0 cursor-pointer rounded-full bg-paper px-4 py-2 text-sm font-extrabold text-ink shadow-pill transition hover:scale-[1.03] active:scale-[0.98]"
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>
      ) : null}

      <p className="text-center text-sm text-ink/65">{hint}</p>
    </div>
  );
}
