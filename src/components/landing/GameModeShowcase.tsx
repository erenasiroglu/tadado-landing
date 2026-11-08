"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ModeDeviceStage } from "@/components/landing/device/ModeDeviceStage";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { isNightLandingTheme } from "@/lib/landing-theme";
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

export function GameModeShowcase({ locale, dict, halloween = false }: GameModeShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const night = isNightLandingTheme();
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
            className="order-3 lg:order-1"
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
                    <span className="rounded-full bg-[#FAAA12] px-2.5 py-1 text-[10px] leading-none font-extrabold tracking-[0.08em] text-[#4B1A7A] uppercase">
                      {activeCopy.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-md text-base text-muted-foreground">{activeCopy.body}</p>
                <Link
                  href={modePageHref(locale, modePage[activeMode])}
                  className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-extrabold text-ink underline-offset-4 hover:underline"
                >
                  {dict.modePages.explore}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100"
                    aria-hidden
                  />
                </Link>
                {activeMode === "taboo" ? (
                  <div
                    className={cn(
                      "mt-5 max-w-md rounded-2xl border p-4",
                      night
                        ? "border-white/10 bg-white/[0.06]"
                        : "border-border bg-paper/80",
                    )}
                  >
                    <p className="text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-muted-foreground">
                      {dict.modes.showcase.buildScoreTitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {dict.modes.showcase.buildScoreBody}
                    </p>
                    <div
                      className="mt-4 flex flex-wrap items-center gap-2"
                      aria-label={dict.modes.showcase.scoreMultipliersAria}
                    >
                      {["×2", "×3", "×5"].map((multiplier, index) => (
                        <span key={multiplier} className="contents">
                          <span
                            className={cn(
                              "inline-flex h-10 min-w-12 items-center justify-center rounded-xl px-3 text-sm font-black leading-none tabular-nums",
                              index === 2
                                ? "bg-[#FAAA12] text-[#4B1A7A]"
                                : night
                                  ? "border border-white/15 bg-white/8 text-cream"
                                  : "border border-border bg-mist text-ink",
                            )}
                          >
                            {multiplier}
                          </span>
                          {index < 2 ? (
                            <span className="px-0.5 text-sm leading-none text-muted-foreground" aria-hidden>
                              →
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>

        <div className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
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
