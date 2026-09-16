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
                  {activeMode === "taboo" ? "Portrait gameplay" : "Landscape gameplay"}
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
                portraitWidth={248}
                landscapeWidth={380}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LandingSection>
  );
}
