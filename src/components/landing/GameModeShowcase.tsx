"use client";

import { ChevronRight } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ModeDeviceStage } from "@/components/landing/device/ModeDeviceStage";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { modePageHref, type ModePageId } from "@/lib/mode-pages";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { ModeFilterButtons, type GameModeFilter } from "./primitives/ModeFilterButtons";
import { SectionHeading } from "./SectionHeading";

interface GameModeShowcaseProps {
  locale: Locale;
  dict: Dictionary;
  /** Show cards from the free Halloween deck (season skin). */
  halloween?: boolean;
}

const TIER_CARD_STYLES = [
  {
    card: "bg-paper ring-1 ring-border shadow-sm",
    multiplier: "text-foreground",
    label: "text-muted-foreground",
  },
  {
    card: "bg-lilac/45 ring-1 ring-lilac/60 shadow-sm",
    multiplier: "text-ink",
    label: "text-foreground/85",
  },
  {
    card: "surface-obsidian ring-1 ring-cream/20 shadow-md",
    multiplier: "text-cream",
    label: "text-cream/70",
  },
] as const;

function ScoreMultiplierPanel({
  showcase,
}: {
  showcase: Dictionary["modes"]["showcase"];
}) {
  const tiers = showcase.scoreTiers;

  return (
    <div className="mt-5 max-w-lg overflow-hidden rounded-xl border border-border bg-linear-to-br from-mist/70 via-paper/50 to-lilac/15 p-4 sm:p-5">
      <p className="text-xs font-extrabold tracking-[0.12em] text-foreground uppercase">
        {showcase.buildScoreTitle}
      </p>
      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{showcase.buildScoreBody}</p>
      <div className="mt-4 flex items-stretch gap-0.5 sm:gap-1" aria-label={showcase.scoreMultipliersAria}>
        {tiers.map((tier, index) => {
          const visuals = TIER_CARD_STYLES[index] ?? TIER_CARD_STYLES[0];
          const isMax = index === tiers.length - 1;

          return (
            <Fragment key={tier.multiplier}>
              {index > 0 ? (
                <ChevronRight
                  className="mt-8 hidden size-4 shrink-0 self-start text-muted-foreground/40 sm:block"
                  aria-hidden
                />
              ) : null}
              <div
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col items-center rounded-xl px-2 py-3 text-center sm:px-3 sm:py-4",
                  visuals.card,
                )}
              >
                {isMax ? (
                  <span className="mb-1.5 inline-flex h-5 items-center rounded-full bg-lilac px-2 text-[0.5625rem] font-extrabold tracking-[0.14em] text-ink uppercase">
                    {showcase.maxTierBadge}
                  </span>
                ) : (
                  <span className="mb-1.5 block h-5" aria-hidden />
                )}
                <span
                  className={cn(
                    "font-heading text-[2rem] font-black leading-none tabular-nums sm:text-[2.35rem]",
                    visuals.multiplier,
                  )}
                >
                  {tier.multiplier}
                </span>
                <span
                  className={cn(
                    "mt-2 text-[0.625rem] font-bold tracking-[0.08em] uppercase",
                    visuals.label,
                  )}
                >
                  {tier.label}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function GameModeShowcase({ locale, dict, halloween = false }: GameModeShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState<GameModeFilter>("taboo");
  const startedRef = useRef(false);

  function selectMode(mode: GameModeFilter) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent({
        event: ANALYTICS_EVENTS.MODE_DEMO_STARTED,
        properties: { locale, mode },
      });
    }
    if (mode === activeMode) return;
    setActiveMode(mode);
    trackEvent({
      event: ANALYTICS_EVENTS.MODE_SWITCHED,
      properties: { locale, mode, from: activeMode },
    });
  }

  const modes: { key: GameModeFilter; title: string; body: string; badge?: string }[] = [
    {
      key: "taboo",
      title: dict.modes.tabooTitle,
      body: dict.modes.tabooBody,
    },
    {
      key: "headsup",
      title: dict.modes.headsUpTitle,
      body: dict.modes.headsUpBody,
    },
    {
      key: "imposter",
      title: dict.modes.imposterTitle,
      body: dict.modes.imposterBody,
      badge: dict.modes.newBadge,
    },
  ];
  const card = dict.halloween.card;
  const modePage: Record<GameModeFilter, ModePageId> = {
    taboo: "forbidden-words",
    headsup: "heads-up",
    imposter: "imposter",
  };

  const activeCopy = modes.find((mode) => mode.key === activeMode);

  return (
    <LandingSection id="modes" analyticsSection="modes" tone="contrast" density="compact" reveal>
      <SectionHeading title={dict.modes.title} subtitle={dict.modes.subtitle} />

      <ModeFilterButtons
        className="mt-6"
        activeMode={activeMode}
        onSelect={selectMode}
        tabooLabel={dict.modes.tabooTitle}
        headsUpLabel={dict.modes.headsUpTitle}
        imposterLabel={dict.modes.imposterTitle}
        ariaLabel={dict.modes.title}
      />

      <div className="mt-8 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <AnimatePresence mode="wait">
          <m.div
            key={activeMode}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="order-3 min-w-0 lg:order-1"
          >
            {activeCopy ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {activeMode === "taboo"
                    ? dict.modes.showcase.portraitGameplay
                    : activeMode === "headsup"
                      ? dict.modes.showcase.landscapeGameplay
                      : dict.modes.showcase.passGameplay}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-foreground">{activeCopy.title}</h3>
                  {activeCopy.badge ? (
                    <span className="rounded-full bg-lilac px-2.5 py-1 text-[10px] leading-none font-extrabold tracking-[0.08em] text-ink uppercase">
                      {activeCopy.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-md text-base text-muted-foreground">{activeCopy.body}</p>
                {activeMode === "taboo" ? <ScoreMultiplierPanel showcase={dict.modes.showcase} /> : null}
                <Link
                  href={modePageHref(locale, modePage[activeMode])}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-4",
                  )}
                >
                  {dict.modePages.explore}
                </Link>
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>

        <div className="order-2 min-w-0 overflow-hidden lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <AnimatePresence mode="wait">
            <m.div
              key={activeMode}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ModeDeviceStage
                mode={activeMode}
                locale={locale}
                previewLabels={dict.gamePreview}
                portraitWidth={248}
                landscapeWidth={400}
                tabooSample={halloween ? { word: card.word, forbidden: card.forbidden } : undefined}
                headsUpWord={halloween ? card.headsUpWord : undefined}
              />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </LandingSection>
  );
}
