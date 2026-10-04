"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { LandingSection } from "@/components/landing/LandingSection";
import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

interface PersonalizationSectionProps {
  dict: Dictionary;
}

/** Taboo-style forbidden rows per personalization chip (index-aligned with dict items). */
const FORBIDDEN_SETS: readonly (readonly string[])[] = [
  ["PARTY", "NIGHT", "SQUAD", "CHAOS"],
  ["HOME", "DINNER", "TABLE", "MOM"],
  ["CAKE", "GIFT", "SONG", "WISH"],
  ["FILM", "OSCAR", "SCENE", "CAST"],
  ["GOAL", "TEAM", "MATCH", "WIN"],
  ["TRIP", "MAP", "ROAD", "PACK"],
  ["DESK", "MEET", "COFFEE", "EMAIL"],
  ["CAMPUS", "EXAM", "CLASS", "DORM"],
  ["JOKE", "SAY", "MEME", "QUOTE"],
];

export function PersonalizationSection({ dict }: PersonalizationSectionProps) {
  const items = dict.personalization.items;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex] ?? items[0];
  const forbidden = FORBIDDEN_SETS[selectedIndex] ?? FORBIDDEN_SETS[0];

  return (
    <LandingSection id="personalization" analyticsSection="personalization" density="compact" reveal>
      <SectionHeading title={dict.personalization.title} subtitle={dict.personalization.subtitle} />

      <div
        role="tablist"
        aria-label={dict.personalization.title}
        className="mx-auto mt-6 flex w-full max-w-lg flex-wrap justify-center gap-2 py-1.5"
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-lg px-3",
                "border text-xs font-semibold leading-none transition-colors",
                isSelected
                  ? "border-border bg-lilac text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "border-border surface-paper text-muted-foreground hover:border-white/22 hover:bg-lilac hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="surface-card mx-auto max-w-lg p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {selected.label}
              </p>
              <div className="mt-4 flex justify-center">
                <ForbiddenWordsScreen
                  width={220}
                  word={selected.topic.toUpperCase()}
                  forbidden={[...forbidden]}
                  showGlow
                />
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">{selected.topic}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LandingSection>
  );
}
