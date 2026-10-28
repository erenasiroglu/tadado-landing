"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { DECK_CARD_CONFIGS, type DeckKey } from "@/lib/deck-cards";
import { getDecksHubHref } from "@/lib/deck-catalog";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

import { DeckCatalogCard } from "./DeckCatalogCard";
import { SectionHeading } from "./SectionHeading";

interface DeckCarouselProps {
  dict: Dictionary;
  locale: Locale;
}

export function DeckCarousel({ dict, locale }: DeckCarouselProps) {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Whole cards only: pages snap to the start edge, so no card is ever cut in half at the sides.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
    loop: false,
  });

  const keys = Object.keys(dict.decks.items) as DeckKey[];

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    trackEvent({
      event: ANALYTICS_EVENTS.DECK_CAROUSEL_INTERACTION,
      properties: { locale, action: "prev" },
    });
  }, [emblaApi, locale]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    trackEvent({
      event: ANALYTICS_EVENTS.DECK_CAROUSEL_INTERACTION,
      properties: { locale, action: "next" },
    });
  }, [emblaApi, locale]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      trackEvent({
        event: ANALYTICS_EVENTS.DECK_CAROUSEL_INTERACTION,
        properties: { locale, action: "dot", index },
      });
    },
    [emblaApi, locale],
  );

  useEffect(() => {
    if (!emblaApi) return;

    function sync() {
      if (!emblaApi) return;
      setSnapCount(emblaApi.scrollSnapList().length);
      setSelectedSnap(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    }

    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    sync();
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    trackEvent({
      event: ANALYTICS_EVENTS.DECK_CAROUSEL_INTERACTION,
      properties: { locale, action: "view" },
    });
  }, [emblaApi, locale]);

  return (
    <section id="decks" className="relative isolate py-12 md:py-14">
      <SectionViewTracker sectionId="decks">
        <div className="section-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <span className="hero-proof-badge w-fit">
                <span className="font-bold text-foreground">{dict.decks.countBadge}</span>
              </span>
              <SectionHeading title={dict.decks.title} subtitle={dict.decks.subtitle} align="left" />
              <Link
                href={getDecksHubHref(locale)}
                className="text-sm font-semibold text-ink hover:text-muted-foreground"
              >
                {dict.ui.exploreAllDecks}
              </Link>
            </div>

            {snapCount > 1 ? (
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <CarouselButton label={dict.a11y.previousDeck} onClick={scrollPrev} disabled={!canPrev}>
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                </CarouselButton>
                <CarouselButton label={dict.a11y.nextDeck} onClick={scrollNext} disabled={!canNext}>
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </CarouselButton>
              </div>
            ) : null}
          </div>

          <div className="deck-vibe-carousel mt-8">
            <div ref={emblaRef} className="deck-vibe-carousel__viewport">
              <div className="deck-vibe-carousel__container">
                {keys.map((key) => {
                  const item = dict.decks.items[key];

                  return (
                    <div key={key} className="deck-vibe-carousel__slide">
                      <DeckCatalogCard
                        deckKey={key}
                        locale={locale}
                        config={DECK_CARD_CONFIGS[key]}
                        title={item.name}
                        subtitle={item.desc}
                        playLabel={dict.decks.play}
                        newBadgeLabel={dict.decks.newBadge}
                        isFree={key === "mix"}
                        showPlayIcon
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {snapCount > 1 ? (
              <div className="deck-vibe-carousel__controls" role="tablist" aria-label={dict.decks.title}>
                {Array.from({ length: snapCount }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === selectedSnap}
                    aria-label={`${dict.decks.title} ${index + 1}/${snapCount}`}
                    onClick={() => scrollTo(index)}
                    className="group flex h-6 min-w-6 items-center justify-center px-[3px]"
                  >
                    {/* Small visual dot inside a 24px tap target. */}
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === selectedSnap
                          ? "w-7 bg-ink"
                          : "w-1.5 bg-ink/20 group-hover:bg-ink/35",
                      )}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-paper text-foreground transition-colors hover:bg-lilac hover:text-ink disabled:opacity-35 disabled:hover:bg-paper"
    >
      {children}
    </button>
  );
}
