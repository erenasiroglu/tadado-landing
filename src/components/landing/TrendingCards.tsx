"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { primarySolidClass } from "@/lib/cta-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Dictionary } from "@/lib/i18n";
import { blogHref, type Locale } from "@/lib/i18n-config";
import { getHeadsUpPauseLabel, getHeadsUpTimerLabel } from "@/lib/game-preview-tokens";
import { getTrendingContent } from "@/lib/trending-cards";

import { AnimatedPhoneShell } from "./AnimatedPhoneShell";
import { LandingSection } from "./LandingSection";
import { PhoneFrame } from "./PhoneFrame";
import { ForbiddenWordsPreview } from "./previews/ForbiddenWordsPreview";
import { HeadsUpPreview } from "./previews/HeadsUpPreview";
import { SectionHeading } from "./SectionHeading";

interface TrendingCardsProps {
  locale: Locale;
  dict: Dictionary;
}

const TABOO_PHONE_WIDTH = 200;
const HEADS_UP_PHONE_WIDTH = 300;
const FEATURED_COUNT = 2;

function toGameWord(value: string) {
  return value.toUpperCase();
}

export function TrendingCards({ locale, dict }: TrendingCardsProps) {
  const content = getTrendingContent(locale);
  const tabooGroups = content.groups.filter((g) => g.mode === "taboo").slice(0, FEATURED_COUNT);
  const headsUpGroups = content.groups.filter((g) => g.mode === "headsup").slice(0, FEATURED_COUNT);
  const timer = getHeadsUpTimerLabel(locale);
  const pauseLabel = getHeadsUpPauseLabel(locale);

  return (
    <LandingSection id="trending" reveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <SectionHeading
            title={dict.trending.title}
            subtitle={dict.trending.subtitle}
            align="left"
          />
        </div>
        <Badge variant="outline" className="w-fit border-amber/30 bg-amber/10 text-amber">
          {dict.trending.badge}
        </Badge>
      </div>

      <Tabs defaultValue="taboo" className="mt-10">
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
            {tabooGroups.map((group, index) => {
              const [word, ...forbidden] = group.words;
              return (
                <article key={group.id} className="surface-card relative overflow-hidden p-5 sm:p-6">
                  <div className="preview-ambient-glow" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-wide text-lavender/80">
                    {group.label}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-cream">{group.deckLabel}</h3>
                  <div className="relative mt-6 flex justify-center">
                    <AnimatedPhoneShell delay={index === 0 ? "none" : "short"}>
                      <PhoneFrame orientation="portrait" width={TABOO_PHONE_WIDTH}>
                        <ForbiddenWordsPreview
                          shellWidth={TABOO_PHONE_WIDTH}
                          word={toGameWord(word)}
                          forbidden={forbidden.map(toGameWord)}
                        />
                      </PhoneFrame>
                    </AnimatedPhoneShell>
                  </div>
                </article>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="headsup" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {headsUpGroups.map((group, index) => (
              <article key={group.id} className="surface-card relative overflow-hidden p-5 sm:p-6">
                <div className="preview-ambient-glow" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-lavender/80">
                  {group.label}
                </p>
                <h3 className="mt-1 text-lg font-bold text-cream">{group.deckLabel}</h3>
                <div className="relative mt-6 flex justify-center">
                  <AnimatedPhoneShell delay={index === 0 ? "none" : "short"}>
                    <PhoneFrame orientation="landscape" width={HEADS_UP_PHONE_WIDTH}>
                      <HeadsUpPreview
                        shellWidth={HEADS_UP_PHONE_WIDTH}
                        word={group.words[0] ?? toGameWord(group.deckLabel)}
                        timer={timer}
                        pauseLabel={pauseLabel}
                      />
                    </PhoneFrame>
                  </AnimatedPhoneShell>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="#ai-deck-builder" className={primarySolidClass("h-9 px-4 text-sm")}>
          {dict.trending.allCards}
        </a>
        <Link
          href={blogHref(locale)}
          className="text-sm font-semibold text-lavender hover:text-amber"
        >
          {dict.trending.compare.guides}
        </Link>
      </div>
    </LandingSection>
  );
}
