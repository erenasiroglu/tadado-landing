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

function MetricValue({ metric }: { metric: Metric }) {
  if ("animate" in metric && metric.animate) {
    return <AnimatedNumber value={BRAND.stats.gamesPlayed} suffix="+" className="tabular-nums" />;
  }

  return <span className="tabular-nums">{metric.value}</span>;
}

function ProofBadge({
  metric,
  reduceMotion,
}: {
  metric: Metric;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      className="hero-proof-badge inline-flex"
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
              opacity: { duration: 0.4 },
              y: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
              scale: { duration: 0.4 },
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
      <div className="mt-5 hidden flex-wrap justify-center gap-2 sm:flex" aria-hidden>
        {[...leftMetrics, ...rightMetrics].map((metric) => (
          <ProofBadge
            key={`${metric.value}-${metric.label}`}
            metric={metric}
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
