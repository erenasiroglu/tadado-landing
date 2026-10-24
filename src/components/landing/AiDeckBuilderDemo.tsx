"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";

import { Tag } from "@/components/brand/tag";
import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { HeadsUpScreen } from "@/components/landing/device/HeadsUpScreen";
import { MotionButton } from "@/components/motion/MotionButton";
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

const TYPING_MS = 28;
const GENERATING_MS = 1400;

const STEPS = ["typing", "generating", "cards", "ready"] as const;

/** The two-device stage is laid out at this size and scaled down to fit narrow columns. */
const STAGE_WIDTH = 460;
const STAGE_HEIGHT = 470;

function useStageScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / STAGE_WIDTH));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, scale };
}

export function AiDeckBuilderDemo({ locale, dict }: AiDeckBuilderDemoProps) {
  const reduceMotion = useReducedMotion();
  const [difficulty, setDifficulty] = useState<AiDemoDifficulty>("medium");
  /** The deck on the devices only changes once a run finishes, so they never show an empty state. */
  const [shownDifficulty, setShownDifficulty] =
    useState<AiDemoDifficulty>("medium");
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [typedTopic, setTypedTopic] = useState("");
  const runIdRef = useRef(0);
  const { ref: stageRef, scale: stageScale } = useStageScale();

  const card = getAiDemoSample(locale, shownDifficulty);

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
              setShownDifficulty(nextDifficulty);
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

  const isBusy =
    phase === "typing" || phase === "generating" || phase === "cards";
  const isWriting = phase === "generating";
  const currentStep = phase === "idle" ? -1 : STEPS.indexOf(phase);

  return (
    <LandingSection
      id="ai-decks"
      analyticsSection="ai_deck_builder"
      tone="contrast"
      density="compact"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            title={dict.ai.title}
            subtitle={dict.ai.subtitle}
            align="left"
          />

          <div className="mt-8 rounded-lg surface-paper p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow text-[0.6875rem]">{dict.ai.inputLabel}</p>
              <Tag icon={<Sparkles aria-hidden />}>AI</Tag>
            </div>
            <div className="mt-3 flex min-h-14 items-center rounded-sm bg-mist/80 px-4 text-lg font-bold text-ink ring-1 ring-ink/10 ring-inset">
              <span className="truncate">{typedTopic || " "}</span>
              {phase === "typing" ? (
                <span
                  className="ai-typing-cursor ms-0.5 inline-block h-5 w-0.5 shrink-0 bg-ink"
                  aria-hidden
                />
              ) : null}
            </div>

            <ol
              className="mt-4 grid grid-cols-4 gap-1.5"
              aria-label={dict.ai.simulationBadge}
            >
              {stepLabels.map((label, index) => (
                <li key={label} className="min-w-0">
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-colors duration-300",
                      index <= currentStep ? "bg-ink" : "bg-ink/12",
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "mt-2 hidden truncate text-[0.6875rem] font-bold transition-colors duration-300 sm:block",
                      index === currentStep
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                    aria-current={index === currentStep ? "step" : undefined}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <p
              className="mt-2 text-xs font-bold text-foreground sm:hidden"
              aria-hidden
            >
              {stepLabels[Math.max(0, currentStep)]}
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold text-muted-foreground">
                  {dict.ai.difficulty}
                </p>
                <div className="inline-flex rounded-full bg-mist/80 p-1 ring-1 ring-ink/10 ring-inset">
                  {difficulties.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      disabled={isBusy}
                      aria-pressed={difficulty === item.key}
                      onClick={() => onDifficultyChange(item.key)}
                      className={cn(
                        "h-9 cursor-pointer rounded-full px-4 text-sm font-extrabold tracking-tight transition-colors",
                        difficulty === item.key
                          ? "surface-obsidian text-cream"
                          : "text-ink hover:bg-paper",
                        isBusy && "cursor-not-allowed",
                        isBusy && difficulty !== item.key && "opacity-50",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <MotionButton
                disabled={isBusy}
                onClick={onCreate}
                className={cn(
                  "flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-base font-extrabold transition sm:w-auto",
                  isBusy
                    ? "cursor-not-allowed bg-mist text-muted-foreground"
                    : "surface-obsidian text-cream",
                )}
              >
                <Sparkles className="size-5" aria-hidden />
                {isBusy ? dict.ai.generating : dict.ai.generateButton}
              </MotionButton>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-4 rounded-lg surface-obsidian p-5 sm:p-6">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-cream text-sm font-black text-ink"
              aria-hidden
            >
              2×
            </span>
            <div>
              <p className="text-base font-extrabold tracking-[-0.01em] text-cream">
                {dict.ai.bothModesTitle}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-cream/75">
                {dict.ai.bothModesBody}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={stageRef}
          className="relative w-full"
          style={{ height: STAGE_HEIGHT * stageScale }}
        >
          <div
            className="absolute top-0 left-1/2 origin-top"
            style={{
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `translateX(-50%) scale(${stageScale})`,
            }}
          >
            <div className="preview-ambient-glow" aria-hidden />

            <div
              className={cn(
                "absolute top-9 left-2 transition-opacity duration-300",
                isWriting && "opacity-60",
              )}
            >
              <ForbiddenWordsScreen
                width={196}
                word={card.word}
                forbidden={card.forbidden}
                showGlow={false}
                className="relative z-[1]"
              />
            </div>
            <div className="absolute top-0 left-2 z-[2]">
              <Tag tone="solid">{dict.modes.tabooTitle}</Tag>
            </div>

            <div
              className={cn(
                "absolute right-0 bottom-9 z-[3] transition-opacity duration-300",
                isWriting && "opacity-60",
              )}
            >
              <HeadsUpScreen
                locale={locale}
                width={290}
                word={card.word}
                showGlow={false}
              />
            </div>
            <div className="absolute right-0 bottom-0 z-[3]">
              <Tag tone="solid">{dict.modes.headsUpTitle}</Tag>
            </div>

            <div className="absolute top-[15.5rem] left-[13.5rem] z-[4] flex items-center gap-2 rounded-full surface-paper py-1.5 ps-1.5 pe-3.5">
              <span
                className="flex size-7 items-center justify-center rounded-full bg-ink text-cream"
                aria-hidden
              >
                <Sparkles className="size-3.5" />
              </span>
              <span className="text-xs font-extrabold text-foreground">
                {dict.ai.sameDeck}
              </span>
            </div>

            <AnimatePresence>
              {isWriting ? (
                <m.div
                  key="writing"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-1/2 left-1/2 z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full surface-obsidian py-2.5 ps-3 pe-5"
                  role="status"
                >
                  <Sparkles className="ai-writing-spark size-4" aria-hidden />
                  <span className="text-sm font-extrabold whitespace-nowrap">
                    {dict.ai.simulationWriting}
                  </span>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
