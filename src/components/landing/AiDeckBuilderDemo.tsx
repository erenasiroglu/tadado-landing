"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Sparkles } from "lucide-react";

import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { getAiDemoSample, type AiDemoDifficulty } from "@/lib/ai-demo-samples";
import { trackEvent } from "@/lib/tracking";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface AiDeckBuilderDemoProps {
  locale: Locale;
  dict: Dictionary;
}

type SimulationPhase = "idle" | "typing" | "generating" | "cards" | "ready";

const PHONE_WIDTH = 220;
const TYPING_MS = 28;
const GENERATING_MS = 1400;

const STEPS = ["typing", "generating", "cards", "ready"] as const;

export function AiDeckBuilderDemo({ locale, dict }: AiDeckBuilderDemoProps) {
  const [difficulty, setDifficulty] = useState<AiDemoDifficulty>("medium");
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [typedTopic, setTypedTopic] = useState("");
  const runIdRef = useRef(0);

  const heroCard = getAiDemoSample(locale, difficulty);

  const difficulties: { key: AiDemoDifficulty; label: string }[] = [
    { key: "easy", label: dict.ai.difficultyEasy },
    { key: "medium", label: dict.ai.difficultyMedium },
    { key: "hard", label: dict.ai.difficultyHard },
  ];

  const stepLabels = [
    dict.ai.simulationStepTopic,
    dict.ai.simulationStepGenerate,
    dict.ai.simulationStepPreview,
    dict.ai.simulationStepReady,
  ];

  const runSimulation = useCallback(
    (nextDifficulty: AiDemoDifficulty) => {
      const topic = getAiDemoSample(locale, nextDifficulty).topic;
      const runId = ++runIdRef.current;

      setDifficulty(nextDifficulty);
      setPhase("typing");
      setTypedTopic("");

      let index = 0;
      const typeInterval = window.setInterval(() => {
        if (runId !== runIdRef.current) {
          window.clearInterval(typeInterval);
          return;
        }
        index += 1;
        setTypedTopic(topic.slice(0, index));
        if (index >= topic.length) {
          window.clearInterval(typeInterval);
          window.setTimeout(() => {
            if (runId !== runIdRef.current) return;
            setPhase("generating");
            window.setTimeout(() => {
              if (runId !== runIdRef.current) return;
              setPhase("cards");
              window.setTimeout(() => {
                if (runId !== runIdRef.current) return;
                setPhase("ready");
                trackEvent({
                  event: ANALYTICS_EVENTS.AI_DEMO_GENERATED,
                  properties: { locale, difficulty: nextDifficulty, topic },
                });
                trackEvent({
                  event: ANALYTICS_EVENTS.AI_DEMO_COMPLETED,
                  properties: { locale, difficulty: nextDifficulty, topic },
                });
              }, 480);
            }, GENERATING_MS);
          }, 280);
        }
      }, TYPING_MS);
    },
    [locale],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackEvent({
        event: ANALYTICS_EVENTS.AI_DEMO_STARTED,
        properties: { locale, difficulty: "medium" },
      });
      trackEvent({
        event: ANALYTICS_EVENTS.AI_DEMO_START,
        properties: { locale, difficulty: "medium" },
      });
      runSimulation("medium");
    }, 700);
    return () => window.clearTimeout(timer);
  }, [runSimulation, locale]);

  function onDifficultyChange(next: AiDemoDifficulty) {
    if (phase === "typing" || phase === "generating") return;
    trackEvent({
      event: ANALYTICS_EVENTS.AI_DEMO_DIFFICULTY,
      properties: { locale, difficulty: next },
    });
    runSimulation(next);
  }

  function onCreate() {
    trackEvent({
      event: ANALYTICS_EVENTS.AI_DEMO_CREATE_CLICK,
      properties: { locale, difficulty },
    });
    runSimulation(difficulty);
  }

  const isBusy = phase === "typing" || phase === "generating" || phase === "cards";
  const showCard = phase === "cards" || phase === "ready";

  function stepState(stepKey: (typeof STEPS)[number]) {
    const order = STEPS.indexOf(stepKey);
    const currentKey =
      phase === "idle"
        ? null
        : phase === "typing"
          ? "typing"
          : phase === "generating"
            ? "generating"
            : phase === "cards"
              ? "cards"
              : "ready";
    if (!currentKey) return { active: false, done: false };
    const current = STEPS.indexOf(currentKey);
    return {
      active: order === current,
      done: order < current,
    };
  }

  return (
    <LandingSection id="ai-decks" analyticsSection="ai_deck_builder" tone="contrast" density="compact">
      <div className="rounded-xl border border-cream/10 bg-[#1c1129]/80 p-5 lg:p-7">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <BadgeRow label={dict.ai.simulationBadge} />
            <SectionHeading title={dict.ai.title} subtitle={dict.ai.subtitle} align="left" />

            <div className="mt-6 hidden gap-2 lg:flex">
              {stepLabels.map((label, index) => {
                const key = STEPS[index];
                const { active, done } = stepState(key);
                return (
                  <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                        done
                          ? "bg-amber text-[#2a0a3b]"
                          : active
                            ? "border border-amber/50 bg-amber/15 text-amber"
                            : "border border-white/10 bg-white/5 text-lavender/60",
                      )}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={cn(
                        "truncate text-xs",
                        active || done ? "font-semibold text-cream" : "text-lavender/65",
                      )}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 lg:hidden">
              {stepLabels.map((label, index) => {
                const key = STEPS[index];
                const { active, done } = stepState(key);
                return (
                  <SimulationStep
                    key={label}
                    step={index + 1}
                    label={label}
                    active={active}
                    done={done}
                  />
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#1C0B2E] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-lavender">
                {dict.ai.inputLabel}
              </p>
              <div className="mt-3 min-h-[52px] font-medium text-cream">
                <span>{typedTopic}</span>
                {phase === "typing" ? (
                  <span className="ai-typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-amber" />
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-cream">{dict.ai.difficulty}</p>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    disabled={isBusy}
                    onClick={() => onDifficultyChange(item.key)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                      difficulty === item.key
                        ? "border-lavender/40 bg-white/10 text-cream"
                        : "border-white/12 bg-white/5 text-lavender hover:text-cream",
                      isBusy && "cursor-not-allowed opacity-60",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={isBusy}
                onClick={onCreate}
                className={cn(
                  "mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[17px] font-bold transition sm:w-auto sm:min-w-[220px] sm:px-8",
                  isBusy
                    ? "bg-white/6 text-[#F5F0FF]/40"
                    : "bg-violet-700/70 text-white shadow-lg shadow-violet-900/30 hover:bg-violet-600/80",
                )}
              >
                <Sparkles className="h-5 w-5" />
                {isBusy ? dict.ai.generating : dict.ai.generateButton}
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center">
            <div className="preview-ambient-glow" aria-hidden />
            <AnimatePresence mode="wait">
              {phase === "generating" ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[320px] w-full max-w-[240px] flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#1C0B2E]/80 p-6"
                >
                  <div className="ai-shimmer-bar h-3 w-full rounded-full" />
                  <div className="ai-shimmer-bar mt-3 h-3 w-4/5 rounded-full" />
                  <div className="ai-shimmer-bar mt-3 h-3 w-3/5 rounded-full" />
                  <p className="mt-6 text-sm text-lavender">{dict.ai.simulationWriting}</p>
                </motion.div>
              ) : showCard ? (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full max-w-[240px]"
                >
                  <ForbiddenWordsScreen
                    width={PHONE_WIDTH}
                    word={heroCard.word}
                    forbidden={heroCard.forbidden}
                    showGlow
                    className="relative z-[1] mx-auto"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 text-center text-lavender/70"
                >
                  <Bot className="h-10 w-10 text-lavender/50" />
                  <p className="max-w-xs text-sm">{dict.ai.topicsEmpty}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}

function BadgeRow({ label }: { label: string }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
      <Bot className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

function SimulationStep({
  step,
  label,
  active,
  done,
}: {
  step: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition",
          done
            ? "bg-amber text-[#2a0a3b]"
            : active
              ? "border border-amber/50 bg-amber/15 text-amber"
              : "border border-white/10 bg-white/5 text-lavender/60",
        )}
      >
        {step}
      </div>
      <p className={cn("text-sm", active || done ? "font-semibold text-cream" : "text-lavender/65")}>
        {label}
      </p>
    </div>
  );
}
