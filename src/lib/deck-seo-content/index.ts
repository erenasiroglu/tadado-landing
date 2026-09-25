import type { DeckKey } from "@/lib/deck-cards";
import type { DeckPageContent } from "@/lib/deck-page-types";
import { isFullContentLocale } from "@/lib/i18n-fallback";
import type { Locale } from "@/lib/i18n-config";

import { EN_DECK_PAGES } from "./en";
import { LOCALE_DECK_STUBS } from "./locale-stubs";
import { LOCALE_DECK_STUBS_BUILT } from "./locale-stubs-build";
import { TR_DECK_PAGES } from "./tr";

function mergeStub(base: DeckPageContent, stub: Partial<DeckPageContent>): DeckPageContent {
  return { ...base, ...stub };
}

export function getDeckPageContent(locale: Locale, key: DeckKey): DeckPageContent {
  if (locale === "tr") {
    return TR_DECK_PAGES[key];
  }

  const en = EN_DECK_PAGES[key];

  if (locale === "en") {
    return en;
  }

  const built = LOCALE_DECK_STUBS_BUILT[locale]?.[key];
  const manual = LOCALE_DECK_STUBS[locale]?.[key];
  const mergedStub = manual ? { ...built, ...manual } : built;

  if (mergedStub) {
    return mergeStub(en, mergedStub);
  }

  return en;
}

const DECK_HUB_COPY: Partial<Record<Locale, { title: string; description: string }>> = {
  tr: {
    title: "Tadado oyun desteleri",
    description:
      "Tadado Mix ücretsiz başlangıç destesi ve temalı paketler: Sinema, Seyahat, Spor, Kahramanlar, Yaz ve Gece Oyunları. Tabu ve Heads Up için tek telefon.",
  },
  es: {
    title: "Mazos de juego Tadado",
    description:
      "Tadado Mix gratis y mazos temáticos: Cine, Viajes, Deporte, Héroes, Verano y Juegos nocturnos. Tabú y Heads Up en un móvil.",
  },
  de: {
    title: "Tadado Spieldecks",
    description:
      "Tadado Mix kostenlos plus Themen-Decks: Kino, Reisen, Sport, Helden, Sommer und Nachtspiele. Tabu und Heads Up auf einem Handy.",
  },
  fr: {
    title: "Paquets de jeu Tadado",
    description:
      "Tadado Mix gratuit et paquets thématiques : Cinéma, Voyage, Sport, Héros, Été et Jeux de nuit. Tabou et Heads Up sur un téléphone.",
  },
};

const EN_DECK_HUB_COPY = {
  title: "Tadado game decks",
  description:
    "Free Tadado Mix starter deck plus themed packs: Cinema, Travel, Sport, Heroes, Summer, and Night Games. Taboo and Heads Up on one phone.",
} as const;

export function getDeckHubCopy(locale: Locale): { title: string; description: string } {
  if (isFullContentLocale(locale)) {
    return DECK_HUB_COPY[locale] ?? (locale === "en" ? EN_DECK_HUB_COPY : DECK_HUB_COPY.tr!);
  }

  return DECK_HUB_COPY[locale] ?? EN_DECK_HUB_COPY;
}
