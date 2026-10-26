"use client";

import { LayoutGroup, m, useReducedMotion } from "motion/react";

import type { Locale } from "@/lib/i18n";
import type { GamePreviewLabels } from "@/lib/game-preview-tokens";
import { cn } from "@/lib/utils";

import { ForbiddenWordsScreen } from "./ForbiddenWordsScreen";
import { HeadsUpScreen } from "./HeadsUpScreen";
import { ImposterScreen } from "./ImposterScreen";

type GameplayMode = "taboo" | "headsup" | "imposter";

interface ModeDeviceStageProps {
  mode: GameplayMode;
  locale: Locale;
  previewLabels: GamePreviewLabels;
  className?: string;
  portraitWidth?: number;
  landscapeWidth?: number;
  animateWords?: boolean;
  /** Fixed sample card (e.g. a localized Halloween word); otherwise the device cycles samples. */
  tabooSample?: { word: string; forbidden: readonly string[] };
  headsUpWord?: string;
}

export function ModeDeviceStage({
  mode,
  locale,
  previewLabels,
  className,
  portraitWidth = 240,
  landscapeWidth = 360,
  animateWords = true,
  tabooSample,
  headsUpWord,
}: ModeDeviceStageProps) {
  const reduceMotion = useReducedMotion();
  const isPortrait = mode !== "headsup";

  return (
    <LayoutGroup id="tadado-mode-device">
      <div
        className={cn(
          "relative flex w-full items-center justify-center",
          isPortrait ? "min-h-[380px] sm:min-h-[420px]" : "min-h-[210px] sm:min-h-[230px]",
          className,
        )}
      >
        <div className="preview-ambient-glow" aria-hidden />

        <m.div
          layout={!reduceMotion}
          className="relative z-[1] w-full max-w-full"
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        >
          <m.div
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, rotate: isPortrait ? -1.5 : 1.5, scale: 0.97 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mx-auto w-fit",
              isPortrait ? "max-w-[min(100%,260px)]" : "max-w-[min(100%,420px)]",
            )}
          >
            {mode === "imposter" ? (
              <ImposterScreen width={portraitWidth} labels={previewLabels} float />
            ) : isPortrait ? (
              <ForbiddenWordsScreen
                width={portraitWidth}
                labels={previewLabels}
                word={tabooSample?.word}
                forbidden={tabooSample?.forbidden}
                float
                animateWords={animateWords}
              />
            ) : (
              <HeadsUpScreen
                locale={locale}
                previewLabels={previewLabels}
                width={Math.min(landscapeWidth, 420)}
                word={headsUpWord}
                float
                animateWords={animateWords}
              />
            )}
          </m.div>
        </m.div>
      </div>
    </LayoutGroup>
  );
}
