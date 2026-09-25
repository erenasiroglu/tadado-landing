"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ForbiddenWordsPreview } from "@/components/landing/previews/ForbiddenWordsPreview";
import {
  DEFAULT_HERO_PORTRAIT_WIDTH,
  DEFAULT_PORTRAIT_DEVICE_WIDTH,
  getDeviceMetrics,
} from "@/lib/device-mockup-tokens";
import { HERO_TABOO_SAMPLES, type GamePreviewLabels } from "@/lib/game-preview-tokens";

import { PortraitGameDevice } from "./PortraitGameDevice";

interface ForbiddenWordsScreenProps {
  width?: number;
  word?: string;
  forbidden?: readonly string[];
  labels?: GamePreviewLabels;
  float?: boolean;
  animateWords?: boolean;
  showGlow?: boolean;
  loading?: boolean;
  className?: string;
}

export function ForbiddenWordsScreen({
  width = DEFAULT_PORTRAIT_DEVICE_WIDTH,
  word,
  forbidden,
  labels,
  float = false,
  animateWords = false,
  showGlow = true,
  loading = false,
  className,
}: ForbiddenWordsScreenProps) {
  const reduceMotion = useReducedMotion();
  const metrics = getDeviceMetrics(width, "portrait");
  const samples = HERO_TABOO_SAMPLES;
  const [sampleIndex, setSampleIndex] = useState(0);

  useEffect(() => {
    if (loading || !animateWords || reduceMotion || word) return;

    const timer = window.setInterval(() => {
      setSampleIndex((current) => (current + 1) % samples.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [loading, animateWords, reduceMotion, samples.length, word]);

  const activeSample = samples[sampleIndex] ?? samples[0];
  const displayWord = word ?? activeSample.word;
  const displayForbidden = forbidden ?? activeSample.forbidden;
  const motionKey = loading ? "loading" : displayWord;

  return (
    <PortraitGameDevice width={width} float={float} showGlow={showGlow} className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={motionKey}
          className="h-full w-full"
          initial={reduceMotion || !animateWords || loading ? false : { opacity: 0.92, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion || !animateWords || loading ? undefined : { opacity: 0.88, y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ForbiddenWordsPreview
            shellWidth={metrics.innerWidth}
            word={displayWord}
            forbidden={[...displayForbidden]}
            labels={labels}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>
    </PortraitGameDevice>
  );
}

export function HeroForbiddenWordsScreen() {
  return (
    <ForbiddenWordsScreen
      width={DEFAULT_HERO_PORTRAIT_WIDTH}
      float
      animateWords
      className="relative z-[1]"
    />
  );
}
