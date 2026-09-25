"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { getTrendingContent } from "@/lib/trending-cards";
import { trackEvent } from "@/lib/tracking";

import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { HeadsUpScreen } from "@/components/landing/device/HeadsUpScreen";
import { TrendingDeckPlayButton } from "./TrendingDeckPlayButton";

const TABOO_DEVICE_WIDTH = 208;
const HEADS_UP_DEVICE_WIDTH = 372;

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
  const content = getTrendingContent(locale);
  const tabooAll = content.groups.filter((g) => g.mode === "taboo");
  const headsUpAll = content.groups.filter((g) => g.mode === "headsup");
  const tabooGroups = maxPerMode ? tabooAll.slice(0, maxPerMode) : tabooAll;
  const headsUpGroups = maxPerMode ? headsUpAll.slice(0, maxPerMode) : headsUpAll;

  return (
    <Tabs
      defaultValue="taboo"
      onValueChange={(tab) => {
        trackEvent({
          event: ANALYTICS_EVENTS.TRENDING_TAB_SELECT,
          properties: { tab, locale },
        });
      }}
    >
      <TabsList className="mb-8 grid w-full max-w-md grid-cols-2 bg-white/5">
        <TabsTrigger
          value="taboo"
          className="data-[state=active]:bg-amber data-[state=active]:text-[#2a0a3b]"
        >
          {dict.modes.tabooTitle}
        </TabsTrigger>
        <TabsTrigger
          value="headsup"
          className="data-[state=active]:bg-amber data-[state=active]:text-[#2a0a3b]"
        >
          {dict.modes.headsUpTitle}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="taboo" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {tabooGroups.map((group) => {
            const [word, ...forbidden] = group.words;
            return (
              <article key={group.id} className="surface-card relative overflow-hidden p-5 sm:p-6">
                <div className="preview-ambient-glow" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-lavender/80">
                  {group.label}
                </p>
                <h3 className="mt-1 text-lg font-bold text-cream">{group.deckLabel}</h3>
                <div className="relative mt-6 flex justify-center">
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
      </TabsContent>

      <TabsContent value="headsup" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {headsUpGroups.map((group) => (
            <article key={group.id} className="surface-card relative overflow-hidden p-5 sm:p-6">
              <div className="preview-ambient-glow" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide text-lavender/80">
                {group.label}
              </p>
              <h3 className="mt-1 text-lg font-bold text-cream">{group.deckLabel}</h3>
              <div className="relative mt-6 flex justify-center">
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
      </TabsContent>
    </Tabs>
  );
}
