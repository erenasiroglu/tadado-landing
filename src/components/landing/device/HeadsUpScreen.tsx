"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { HeadsUpPreview } from "@/components/landing/previews/HeadsUpPreview";
import { DEFAULT_LANDSCAPE_DEVICE_WIDTH, getDeviceMetrics } from "@/lib/device-mockup-tokens";
import {
  getHeadsUpPauseShortLabel,
  getHeadsUpTimerLabel,
  HERO_HEADS_UP_SAMPLES,
  type GamePreviewLabels,
} from "@/lib/game-preview-tokens";
import type { Locale } from "@/lib/i18n";

import { LandscapeGameDevice } from "./LandscapeGameDevice";

interface HeadsUpScreenProps {
  locale: Locale;
  previewLabels?: GamePreviewLabels;
  width?: number;
  word?: string;
  float?: boolean;
  animateWords?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function HeadsUpScreen({
  locale,
  previewLabels,
  width = DEFAULT_LANDSCAPE_DEVICE_WIDTH,
  word,
  float = false,
  animateWords = false,
  showGlow = true,
  className,
}: HeadsUpScreenProps) {
  const reduceMotion = useReducedMotion();
  const metrics = getDeviceMetrics(width, "landscape");
  const samples = HERO_HEADS_UP_SAMPLES;
  const [sampleIndex, setSampleIndex] = useState(0);

  useEffect(() => {
    if (!animateWords || reduceMotion || word) return;

    const timer = window.setInterval(() => {
      setSampleIndex((current) => (current + 1) % samples.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [animateWords, reduceMotion, samples.length, word]);

  const displayWord = word ?? samples[sampleIndex]?.word ?? samples[0].word;

  return (
    <LandscapeGameDevice width={width} float={float} showGlow={showGlow} className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayWord}
          className="h-full w-full"
          initial={reduceMotion || !animateWords ? false : { opacity: 0.92, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion || !animateWords ? undefined : { opacity: 0.88, scale: 1.01 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeadsUpPreview
            shellWidth={metrics.innerWidth}
            shellHeight={metrics.innerHeight}
            word={displayWord}
            timer={getHeadsUpTimerLabel(locale)}
            pauseLabel={getHeadsUpPauseShortLabel(locale)}
            labels={previewLabels}
          />
        </motion.div>
      </AnimatePresence>
    </LandscapeGameDevice>
  );
}
