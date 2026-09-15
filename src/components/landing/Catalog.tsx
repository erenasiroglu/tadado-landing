import type { Dictionary, Locale } from "@/lib/i18n";
import { DECK_CARD_CONFIGS, type DeckKey } from "@/lib/deck-cards";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";

import { DeckCatalogCard } from "./DeckCatalogCard";
import { SectionHeading } from "./SectionHeading";

interface CatalogProps {
  dict: Dictionary;
  locale: Locale;
}

export function Catalog({ dict, locale }: CatalogProps) {
  const keys = Object.keys(dict.decks.items) as DeckKey[];

  return (
    <section id="decks" className="relative isolate bg-[#1c1129] py-20">
      <SectionViewTracker sectionId="decks">
        <div className="section-shell">
          <SectionHeading title={dict.decks.title} subtitle={dict.decks.subtitle} align="left" />
        </div>

        <div className="scroll-bleed-padding mt-10">
          <div className="horizontal-scroll gap-5 pb-4" aria-label={dict.decks.title}>
            {keys.map((key) => {
              const item = dict.decks.items[key];
              const isFree = key === "mix";
              return (
                <DeckCatalogCard
                  key={key}
                  deckKey={key}
                  locale={locale}
                  config={DECK_CARD_CONFIGS[key]}
                  title={item.name}
                  subtitle={item.desc}
                  playLabel={dict.decks.play}
                  newBadgeLabel={dict.decks.newBadge}
                  isFree={isFree}
                  className="w-[232px] sm:w-[256px] md:w-[280px]"
                />
              );
            })}
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}
