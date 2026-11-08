"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { getTrendingContent } from "@/lib/trending-cards";
import { trackEvent } from "@/lib/tracking";

import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { HeadsUpScreen } from "@/components/landing/device/HeadsUpScreen";
import { ModeFilterButtons, type GameModeFilter } from "./primitives/ModeFilterButtons";
import { TrendingDeckPlayButton } from "./TrendingDeckPlayButton";

const TABOO_DEVICE_WIDTH = 200;
const HEADS_UP_DEVICE_WIDTH = 260;

function toGameWord(value: string) {
  return value.toUpperCase();
}

interface TrendingCardsGridProps {
  locale: Locale;
  dict: Dictionary;
  /** When set, shows only the first N cards per game mode (homepage teaser). */
  maxPerMode?: number;
}

export function TrendingCardsGrid({ locale, dict, maxPerMode }: TrendingCardsGridProps) {
  const [activeMode, setActiveMode] = useState<GameModeFilter>("taboo");
  const content = getTrendingContent(locale);
  const tabooAll = content.groups.filter((g) => g.mode === "taboo");
  const headsUpAll = content.groups.filter((g) => g.mode === "headsup");
  const tabooGroups = maxPerMode ? tabooAll.slice(0, maxPerMode) : tabooAll;
  const headsUpGroups = maxPerMode ? headsUpAll.slice(0, maxPerMode) : headsUpAll;

  function onModeSelect(mode: GameModeFilter) {
    setActiveMode(mode);
    trackEvent({
      event: ANALYTICS_EVENTS.TRENDING_TAB_SELECT,
      properties: { tab: mode, locale },
    });
  }

  return (
    <div>
      <ModeFilterButtons
        className="mb-8"
        activeMode={activeMode}
        onSelect={onModeSelect}
        tabooLabel={dict.modes.tabooTitle}
        headsUpLabel={dict.modes.headsUpTitle}
        ariaLabel={dict.modes.title}
      />

      {activeMode === "taboo" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {tabooGroups.map((group) => {
            const [word, ...forbidden] = group.words;
            return (
              <article key={group.id} className="trending-preview-card surface-card relative flex flex-col p-6">
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
                  <div className="preview-ambient-glow" />
                </div>
                <p className="relative z-[1] text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-muted-foreground">
                  {group.label}
                </p>
                <h3 className="relative z-[1] mt-2 min-h-12 text-xl font-extrabold leading-[1.2] tracking-[-0.03em] text-balance text-foreground">
                  {group.deckLabel}
                </h3>
                <div className="relative z-[1] mt-6 flex flex-1 justify-center">
                  <ForbiddenWordsScreen
                    width={TABOO_DEVICE_WIDTH}
                    word={toGameWord(word)}
                    forbidden={forbidden.map(toGameWord)}
                  />
                </div>
                <TrendingDeckPlayButton
                  deckId={group.id}
                  deckName={group.deckLabel}
                  playLabel={dict.decks.play}
                  locale={locale}
                />
              </article>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {headsUpGroups.map((group) => (
            <article key={group.id} className="trending-preview-card surface-card relative flex flex-col p-6">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
                <div className="preview-ambient-glow" />
              </div>
              <p className="relative z-[1] text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-muted-foreground">
                {group.label}
              </p>
              <h3 className="relative z-[1] mt-2 min-h-12 text-xl font-extrabold leading-[1.2] tracking-[-0.03em] text-balance text-foreground">
                {group.deckLabel}
              </h3>
              <div className="relative z-[1] mt-6 flex w-full flex-1 justify-center overflow-hidden">
                <HeadsUpScreen
                  locale={locale}
                  width={HEADS_UP_DEVICE_WIDTH}
                  word={group.words[0] ?? toGameWord(group.deckLabel)}
                />
              </div>
              <TrendingDeckPlayButton
                deckId={group.id}
                deckName={group.deckLabel}
                playLabel={dict.decks.play}
                locale={locale}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
