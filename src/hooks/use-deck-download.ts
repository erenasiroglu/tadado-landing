"use client";

import { useCallback } from "react";

import { useTrackedHref } from "@/hooks/use-tracked-href";
import type { DeckKey } from "@/lib/deck-cards";
import type { Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { trackDeckPlayClick, trackDownloadClick } from "@/lib/tracking";

interface UseDeckDownloadOptions {
  deckId: DeckKey;
  deckName: string;
  isFree: boolean;
  locale: Locale;
  source: "deck_catalog" | "trending_deck";
}

export function useDeckDownload({
  deckId,
  deckName,
  isFree,
  locale,
  source,
}: UseDeckDownloadOptions) {
  const storeUrl = useTrackedHref(getAppStoreUrl(locale));

  const openStore = useCallback(() => {
    trackDeckPlayClick({
      deck_id: deckId,
      deck_name: deckName,
      is_free: isFree,
      locale,
    });
    trackDownloadClick("ios", locale, source, { id: deckId, name: deckName });
    window.open(storeUrl, "_blank", "noopener,noreferrer");
  }, [deckId, deckName, isFree, locale, source, storeUrl]);

  return { openStore, storeUrl };
}
