"use client";

import { motion, useReducedMotion } from "motion/react";

import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { AnimatedNumber } from "./AnimatedNumber";

interface HeroProofMetricsProps {
  metrics: Dictionary["hero"]["metrics"];
  className?: string;
}

type Metric = Dictionary["hero"]["metrics"][number];

const LEFT_OFFSETS = ["top-[2%]", "top-[32%]", "top-[62%]", "top-[86%]"] as const;
const RIGHT_OFFSETS = ["top-[8%]", "top-[38%]", "top-[68%]"] as const;

function MetricValue({ metric }: { metric: Metric }) {
  if ("animate" in metric && metric.animate) {
    return <AnimatedNumber value={BRAND.stats.gamesPlayed} suffix="+" className="tabular-nums" />;
  }

  return <span className="tabular-nums">{metric.value}</span>;
}

function ProofBadge({
  metric,
  index,
  side,
  reduceMotion,
}: {
  metric: Metric;
  index: number;
  side: "left" | "right";
  reduceMotion: boolean | null;
}) {
  const offset = side === "left" ? LEFT_OFFSETS[index] : RIGHT_OFFSETS[index];

  return (
    <motion.span
      className={cn(
        "hero-proof-badge absolute hidden sm:inline-flex",
        side === "left" ? "right-full mr-2 lg:mr-3" : "left-full ml-2 lg:ml-3",
        offset,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.94 }}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: [0, -2.5, 0],
              scale: 1,
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              opacity: { duration: 0.4, delay: 0.32 + index * 0.07 + (side === "right" ? 0.03 : 0) },
              y: {
                duration: 4.2 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8 + index * 0.15,
              },
              scale: { duration: 0.4, delay: 0.32 + index * 0.07 },
            }
      }
    >
      <span className="font-bold text-cream">
        <MetricValue metric={metric} />
      </span>
      <span className="hero-proof-badge__label">{metric.label}</span>
    </motion.span>
  );
}

function InlineBadge({
  metric,
  index,
  reduceMotion,
}: {
  metric: Metric;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      className="hero-proof-badge inline-flex sm:hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 0.35, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <span className="font-bold text-cream">
        <MetricValue metric={metric} />
      </span>
      <span className="hero-proof-badge__label">{metric.label}</span>
    </motion.span>
  );
}

export function HeroProofMetrics({ metrics, className }: HeroProofMetricsProps) {
  const reduceMotion = useReducedMotion();
  const leftMetrics = metrics.filter((_, index) => index % 2 === 0);
  const rightMetrics = metrics.filter((_, index) => index % 2 === 1);

  return (
    <div className={cn(className)} aria-label="Tadado product proof">
      <div className="hidden sm:contents" aria-hidden>
        {leftMetrics.map((metric, index) => (
          <ProofBadge
            key={`${metric.value}-${metric.label}`}
            metric={metric}
            index={index}
            side="left"
            reduceMotion={reduceMotion}
          />
        ))}

        {rightMetrics.map((metric, index) => (
          <ProofBadge
            key={`${metric.value}-${metric.label}`}
            metric={metric}
            index={index}
            side="right"
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2 sm:hidden">
        {metrics.map((metric, index) => (
          <InlineBadge
            key={`mobile-${metric.value}-${metric.label}`}
            metric={metric}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
