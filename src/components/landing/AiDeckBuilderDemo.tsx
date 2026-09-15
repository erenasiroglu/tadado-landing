"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Sparkles } from "lucide-react";

import { AnimatedPhoneShell } from "@/components/landing/AnimatedPhoneShell";
import { getAiDemoSample, type AiDemoDifficulty } from "@/lib/ai-demo-samples";
import { brandGradientCss } from "@/lib/design-tokens";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { PhoneFrame } from "./PhoneFrame";
import { ForbiddenWordsPreview } from "./previews/ForbiddenWordsPreview";
import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface AiDeckBuilderDemoProps {
  locale: Locale;
  dict: Dictionary;
}

type SimulationPhase = "idle" | "typing" | "generating" | "ready";

const PHONE_WIDTH = 220;
const TYPING_MS = 28;
const GENERATING_MS = 1400;

export function AiDeckBuilderDemo({ locale, dict }: AiDeckBuilderDemoProps) {
  const [difficulty, setDifficulty] = useState<AiDemoDifficulty>("medium");
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [typedTopic, setTypedTopic] = useState("");
  const [revealedCard, setRevealedCard] = useState(false);
  const runIdRef = useRef(0);

  const sample = getAiDemoSample(locale, difficulty);

  const difficulties: { key: AiDemoDifficulty; label: string }[] = [
    { key: "easy", label: dict.ai.difficultyEasy },
    { key: "medium", label: dict.ai.difficultyMedium },
    { key: "hard", label: dict.ai.difficultyHard },
  ];

  const runSimulation = useCallback(
    (nextDifficulty: AiDemoDifficulty) => {
      const topic = getAiDemoSample(locale, nextDifficulty).topic;
      const runId = ++runIdRef.current;

      setDifficulty(nextDifficulty);
      setPhase("typing");
      setTypedTopic("");
      setRevealedCard(false);

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
              setPhase("ready");
              setRevealedCard(true);
            }, GENERATING_MS);
          }, 280);
        }
      }, TYPING_MS);
    },
    [locale],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => runSimulation("medium"), 700);
    return () => window.clearTimeout(timer);
  }, [runSimulation]);

  function onDifficultyChange(next: AiDemoDifficulty) {
    if (phase === "typing" || phase === "generating") return;
    runSimulation(next);
  }

  function onCreate() {
    runSimulation(difficulty);
  }

  const isBusy = phase === "typing" || phase === "generating";

  return (
    <LandingSection id="ai-deck-builder" tone="contrast">
      <div className="relative overflow-hidden rounded-2xl border border-cream/10">
        <div className="absolute inset-0" style={{ background: brandGradientCss() }} />
        <div className="pointer-events-none absolute -right-16 top-12 h-36 w-56 rotate-[-14deg] rounded-[54px] bg-lavender/15" />
        <div className="pointer-events-none absolute -left-16 top-1/3 h-32 w-48 rotate-12 rounded-[48px] bg-purple-500/10" />

        <div className="relative grid gap-10 p-6 lg:grid-cols-2 lg:items-center lg:p-8">
          <div>
            <BadgeRow label={dict.ai.simulationBadge} />
            <SectionHeading
              title={dict.ai.demoHeadline}
              subtitle={dict.ai.simulationHint}
              align="left"
            />

            <div className="mt-8 space-y-4">
              <SimulationStep
                step={1}
                label={dict.ai.simulationStepTopic}
                active={phase === "typing" || phase === "ready"}
                done={phase === "generating" || phase === "ready"}
              />
              <SimulationStep
                step={2}
                label={dict.ai.simulationStepGenerate}
                active={phase === "generating"}
                done={phase === "ready"}
              />
              <SimulationStep
                step={3}
                label={dict.ai.simulationStepPreview}
                active={phase === "ready"}
                done={phase === "ready"}
              />
            </div>

            <div
              className="mt-6 rounded-[18px] p-[1.5px] shadow-lg shadow-purple-500/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(196,181,253,0.72), rgba(139,92,246,0.42), rgba(91,33,182,0.28))",
              }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#1C0B2E] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-lavender">
                  {dict.ai.inputLabel}
                </p>
                <div className="mt-3 min-h-[52px] font-medium text-cream">
                  <span>{typedTopic}</span>
                  {phase === "typing" ? (
                    <span className="ai-typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-amber" />
                  ) : null}
                </div>
                {phase === "generating" ? (
                  <div className="mt-4 space-y-2">
                    <div className="ai-shimmer-bar h-2 rounded-full" />
                    <div className="ai-shimmer-bar h-2 w-4/5 rounded-full" />
                    <p className="text-sm text-lavender">{dict.ai.simulationWriting}</p>
                  </div>
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
            {revealedCard && phase === "ready" ? (
              <div className="ai-card-reveal w-full">
                <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-lavender">
                  {dict.ai.demoPreviewLabel}
                </p>
                <AnimatedPhoneShell>
                  <PhoneFrame orientation="portrait" width={PHONE_WIDTH} className="mx-auto">
                    <ForbiddenWordsPreview
                      shellWidth={PHONE_WIDTH}
                      word={sample.word}
                      forbidden={sample.forbidden}
                    />
                  </PhoneFrame>
                </AnimatedPhoneShell>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center text-lavender/70">
                <Bot className="h-10 w-10 text-lavender/50" />
                <p className="max-w-xs text-sm">
                  {phase === "generating" ? dict.ai.simulationWriting : dict.ai.topicsEmpty}
                </p>
              </div>
            )}
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
