"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { DECK_CARD_CONFIGS, type DeckKey } from "@/lib/deck-cards";
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
      align: "start",
      containScroll: "trimSnaps",
      loop: true,
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
    <section id="decks" className="relative isolate bg-[#1c1129] py-12 md:py-14">
      <SectionViewTracker sectionId="decks">
        <div className="section-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="hero-proof-badge w-fit"
                onClick={() =>
                  document.getElementById("decks")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                <span className="font-bold text-cream">{dict.decks.countBadge}</span>
              </button>
              <SectionHeading title={dict.decks.title} subtitle={dict.decks.subtitle} align="left" />
            </div>
            <div className="hidden gap-2 sm:flex">
              <CarouselButton label="Previous deck" onClick={scrollPrev}>
                <ChevronLeft className="h-4 w-4" />
              </CarouselButton>
              <CarouselButton label="Next deck" onClick={scrollNext}>
                <ChevronRight className="h-4 w-4" />
              </CarouselButton>
            </div>
          </div>
        </div>

        <div
          className="scroll-bleed-padding mt-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={emblaRef}
            className="deck-carousel-viewport"
            style={{ "--slide-spacing": "0.625rem", "--slide-size": "min(78%, 220px)" } as React.CSSProperties}
          >
            <div className="deck-carousel-container">
              {keys.map((key, index) => {
                const item = dict.decks.items[key];
                const isActive = index === selectedIndex;

                return (
                  <div key={key} className="deck-carousel-slide">
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: isActive ? 1.01 : 0.98,
                              y: isActive ? 0 : 3,
                            }
                      }
                      transition={{ duration: 0.25 }}
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
                        className={cn("w-full", isActive && "shadow-xl shadow-violet-900/20")}
                      />
                    </motion.div>
                  </div>
                );
              })}
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
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-cream transition-colors hover:border-amber/40 hover:bg-white/[0.08] hover:text-amber"
    >
      {children}
    </button>
  );
}
