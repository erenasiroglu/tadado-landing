"use client";

import { LayoutGroup, motion, useReducedMotion } from "motion/react";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { ForbiddenWordsScreen } from "./ForbiddenWordsScreen";
import { HeadsUpScreen } from "./HeadsUpScreen";

type GameplayMode = "taboo" | "headsup";

interface ModeDeviceStageProps {
  mode: GameplayMode;
  locale: Locale;
  className?: string;
  portraitWidth?: number;
  landscapeWidth?: number;
  animateWords?: boolean;
}

export function ModeDeviceStage({
  mode,
  locale,
  className,
  portraitWidth = 240,
  landscapeWidth = 360,
  animateWords = true,
}: ModeDeviceStageProps) {
  const reduceMotion = useReducedMotion();
  const isPortrait = mode === "taboo";

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

        <motion.div
          layout={!reduceMotion}
          className="relative z-[1] w-full max-w-full"
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        >
          <motion.div
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
            {isPortrait ? (
              <ForbiddenWordsScreen
                width={portraitWidth}
                float
                animateWords={animateWords}
              />
            ) : (
              <HeadsUpScreen
                locale={locale}
                width={Math.min(landscapeWidth, 420)}
                float
                animateWords={animateWords}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
