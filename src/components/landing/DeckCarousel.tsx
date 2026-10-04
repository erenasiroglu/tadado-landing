"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      containScroll: "keepSnaps",
      loop: true,
      dragFree: false,
    },
    reduceMotion ? [] : [autoplayPlugin],
  );

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
    if (!emblaApi || reduceMotion) return;

    if (isHovered) {
      autoplayPlugin.stop();
    } else {
      autoplayPlugin.play();
    }
  }, [autoplayPlugin, emblaApi, isHovered, reduceMotion]);

  useEffect(() => {
    if (!emblaApi) return;

    function onSelect() {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
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
              <button
                type="button"
                className="hero-proof-badge inline-flex w-fit"
                onClick={() =>
                  document.getElementById("decks")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                <span className="font-bold text-foreground">{dict.decks.countBadge}</span>
              </button>
              <SectionHeading title={dict.decks.title} subtitle={dict.decks.subtitle} align="left" />
              <Link
                href={getDecksHubHref(locale)}
                className="text-sm font-semibold text-ink hover:text-muted-foreground"
              >
                {locale === "tr" ? "Tüm desteleri keşfet" : "Explore all decks"}
              </Link>
            </div>
          </div>

          <div
            className="deck-vibe-carousel mt-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div ref={emblaRef} className="deck-vibe-carousel__viewport">
              <div className="deck-vibe-carousel__container">
                {keys.map((key, index) => {
                  const item = dict.decks.items[key];
                  const isActive = index === selectedIndex;

                  return (
                    <div key={key} className="deck-vibe-carousel__slide">
                      <div
                        className={cn(
                          "deck-vibe-carousel__card",
                          isActive && "deck-vibe-carousel__card--active",
                        )}
                      >
                        <motion.div
                          className="deck-vibe-carousel__card-inner"
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  opacity: isActive ? 1 : 0.78,
                                  scale: isActive ? 1 : 0.96,
                                }
                          }
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        >
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
                            disableHoverMotion
                            className="w-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="deck-vibe-carousel__controls">
              <CarouselButton label={dict.a11y.previousDeck} onClick={scrollPrev}>
                <ChevronLeft className="h-4 w-4" />
              </CarouselButton>

              <div className="flex items-center gap-1.5" role="tablist" aria-label={dict.decks.title}>
                {keys.map((key, index) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={index === selectedIndex}
                    aria-label={`${dict.decks.items[key].name} (${index + 1}/${keys.length})`}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === selectedIndex
                        ? "w-7 bg-ink"
                        : "w-1.5 bg-ink/20 hover:bg-ink/35",
                    )}
                  />
                ))}
              </div>

              <CarouselButton label={dict.a11y.nextDeck} onClick={scrollNext}>
                <ChevronRight className="h-4 w-4" />
              </CarouselButton>
            </div>
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
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border surface-paper text-foreground transition-colors hover:bg-lilac hover:bg-lilac hover:text-ink"
    >
      {children}
    </button>
  );
}
