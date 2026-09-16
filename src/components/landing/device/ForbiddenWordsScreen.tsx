"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ForbiddenWordsPreview } from "@/components/landing/previews/ForbiddenWordsPreview";
import {
  DEFAULT_HERO_PORTRAIT_WIDTH,
  DEFAULT_PORTRAIT_DEVICE_WIDTH,
  getDeviceMetrics,
} from "@/lib/device-mockup-tokens";
import { HERO_TABOO_SAMPLES } from "@/lib/game-preview-tokens";

import { PortraitGameDevice } from "./PortraitGameDevice";

interface ForbiddenWordsScreenProps {
  width?: number;
  word?: string;
  forbidden?: readonly string[];
  float?: boolean;
  animateWords?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function ForbiddenWordsScreen({
  width = DEFAULT_PORTRAIT_DEVICE_WIDTH,
  word,
  forbidden,
  float = false,
  animateWords = false,
  showGlow = true,
  className,
}: ForbiddenWordsScreenProps) {
  const reduceMotion = useReducedMotion();
  const metrics = getDeviceMetrics(width, "portrait");
  const samples = HERO_TABOO_SAMPLES;
  const [sampleIndex, setSampleIndex] = useState(0);

  useEffect(() => {
    if (!animateWords || reduceMotion || word) return;

    const timer = window.setInterval(() => {
      setSampleIndex((current) => (current + 1) % samples.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [animateWords, reduceMotion, samples.length, word]);

  const activeSample = samples[sampleIndex] ?? samples[0];
  const displayWord = word ?? activeSample.word;
  const displayForbidden = forbidden ?? activeSample.forbidden;

  return (
    <PortraitGameDevice width={width} float={float} showGlow={showGlow} className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayWord}
          className="h-full w-full"
          initial={reduceMotion || !animateWords ? false : { opacity: 0.92, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion || !animateWords ? undefined : { opacity: 0.88, y: -4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ForbiddenWordsPreview
            shellWidth={metrics.innerWidth}
            word={displayWord}
            forbidden={[...displayForbidden]}
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
