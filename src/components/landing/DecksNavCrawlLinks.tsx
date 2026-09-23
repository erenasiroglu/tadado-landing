import Link from "next/link";

import { getDecksHubHref, SEO_DECK_KEYS } from "@/lib/deck-catalog";
import { deckSlugFor } from "@/lib/deck-slugs";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Crawlable deck links for search engines (visually hidden). */
export function DecksNavCrawlLinks({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <nav className="sr-only" aria-label={dict.nav.decks}>
      <ul>
        <li>
          <Link href={getDecksHubHref(locale)}>
            {locale === "tr" ? "Tüm desteler" : "All decks"}
          </Link>
        </li>
        {SEO_DECK_KEYS.map((key) => (
          <li key={key}>
            <Link href={`/${locale}/decks/${deckSlugFor(locale, key)}`}>
              {dict.decks.items[key].name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
