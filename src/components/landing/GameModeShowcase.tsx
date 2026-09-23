"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ModeDeviceStage } from "@/components/landing/device/ModeDeviceStage";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface GameModeShowcaseProps {
  locale: Locale;
  dict: Dictionary;
}

type ActiveMode = "taboo" | "headsup";

export function GameModeShowcase({ locale, dict }: GameModeShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState<ActiveMode>("taboo");
  const startedRef = useRef(false);

  function selectMode(mode: ActiveMode) {
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

  const modes: { key: ActiveMode; title: string; body: string; badge?: string }[] = [
    {
      key: "taboo",
      title: dict.modes.tabooTitle,
      body: dict.modes.tabooBody,
    },
    {
      key: "headsup",
      title: dict.modes.headsUpTitle,
      body: dict.modes.headsUpBody,
      badge: dict.modes.newBadge,
    },
  ];

  const activeCopy = modes.find((mode) => mode.key === activeMode);

  return (
    <LandingSection id="modes" analyticsSection="modes" tone="contrast" density="compact" reveal>
      <SectionHeading title={dict.modes.title} subtitle={dict.modes.subtitle} />

      <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
        {modes.map((mode) => (
          <button
            key={mode.key}
            type="button"
            onClick={() => selectMode(mode.key)}
            className={cn(
              "min-h-[44px] rounded-full px-5 text-sm font-bold transition-colors",
              activeMode === mode.key
                ? "bg-amber text-[#2a0a3b]"
                : "border border-white/12 bg-white/[0.04] text-cream/75 hover:text-cream",
            )}
          >
            {mode.title}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="order-3 lg:order-1"
          >
            {activeCopy ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber/80">
                  {activeMode === "taboo"
                    ? dict.modes.showcase.portraitGameplay
                    : dict.modes.showcase.landscapeGameplay}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-cream">{activeCopy.title}</h3>
                  {activeCopy.badge ? (
                    <span className="rounded-md border border-amber/30 bg-amber/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber">
                      {activeCopy.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-md text-base text-cream/75">{activeCopy.body}</p>
                {activeMode === "taboo" ? (
                  <div className="mt-5 max-w-md rounded-xl border border-amber/20 bg-amber/[0.06] p-3.5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/90">
                      {dict.modes.showcase.buildScoreTitle}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/70">
                      {dict.modes.showcase.buildScoreBody}
                    </p>
                    <div
                      className="mt-3 flex items-center gap-2"
                      aria-label={dict.modes.showcase.scoreMultipliersAria}
                    >
                      {["×2", "×3", "×5"].map((multiplier, index) => (
                        <span key={multiplier} className="flex items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex h-8 min-w-10 items-center justify-center rounded-lg border px-2 text-sm font-black",
                              index === 2
                                ? "border-amber bg-amber text-[#2a0a3b]"
                                : "border-amber/25 bg-white/[0.05] text-amber",
                            )}
                          >
                            {multiplier}
                          </span>
                          {index < 2 ? <span className="text-cream/35" aria-hidden>→</span> : null}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <AnimatePresence mode="wait">
            <motion.div
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
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LandingSection>
  );
}
