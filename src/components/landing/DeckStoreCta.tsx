"use client";

import { useDeckDownload } from "@/hooks/use-deck-download";
import type { DeckKey } from "@/lib/deck-cards";
import type { Locale } from "@/lib/i18n";
import { ctaGradientClass } from "@/lib/cta-button";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { useTrackedHref } from "@/hooks/use-tracked-href";

interface DeckStoreCtaProps {
  deckKey: DeckKey;
  deckName: string;
  isFree: boolean;
  locale: Locale;
  primaryLabel: string;
  appStoreLabel: string;
  playStoreLabel: string;
}

export function DeckStoreCta({
  deckKey,
  deckName,
  isFree,
  locale,
  primaryLabel,
  appStoreLabel,
  playStoreLabel,
}: DeckStoreCtaProps) {
  const { openStore } = useDeckDownload({
    deckId: deckKey,
    deckName,
    isFree,
    locale,
    source: "deck_catalog",
  });
  const playUrl = useTrackedHref(getPlayStoreUrl(locale));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button type="button" onClick={openStore} className={ctaGradientClass("min-h-12 px-8 text-sm font-bold")}>
        {primaryLabel}
      </button>
      <a
        href={getAppStoreUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-6 text-sm font-semibold text-cream transition hover:border-amber/35"
      >
        {appStoreLabel}
      </a>
      <a
        href={playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-6 text-sm font-semibold text-cream transition hover:border-amber/35"
      >
        {playStoreLabel}
      </a>
    </div>
  );
}
