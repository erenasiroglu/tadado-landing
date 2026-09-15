"use client";

import { Play } from "lucide-react";

import { ctaGradientClass } from "@/lib/cta-button";
import { useTrackedHref } from "@/hooks/use-tracked-href";
import type { Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { trackDeckPlayClick, trackDownloadClick } from "@/lib/tracking";

interface TrendingDeckPlayButtonProps {
  deckId: string;
  deckName: string;
  playLabel: string;
  locale: Locale;
}

export function TrendingDeckPlayButton({
  deckId,
  deckName,
  playLabel,
  locale,
}: TrendingDeckPlayButtonProps) {
  const storeUrl = useTrackedHref(getAppStoreUrl(locale));

  function handleClick() {
    trackDeckPlayClick({
      deck_id: deckId,
      deck_name: deckName,
      is_free: false,
      locale,
    });
    trackDownloadClick("ios", locale, "trending_deck", { id: deckId, name: deckName });
    window.open(storeUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={ctaGradientClass("mt-5 h-9 w-full rounded-lg text-xs font-bold")}
    >
      <span className="inline-flex items-center justify-center gap-1.5">
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
        {playLabel}
      </span>
    </button>
  );
}
