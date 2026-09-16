"use client";

import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";

import { AnimatedNumber } from "./AnimatedNumber";

interface CommunityMetricsProps {
  metrics: Dictionary["community"]["metrics"];
}

export function CommunityMetrics({ metrics }: CommunityMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {metrics.map((metric) => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="surface-card flex flex-col items-center px-3 py-4 text-center sm:px-4"
        >
          <p className="text-2xl font-extrabold tracking-tight text-cream sm:text-3xl">
            {"animate" in metric && metric.animate ? (
              <AnimatedNumber value={BRAND.stats.gamesPlayed} suffix="+" />
            ) : (
              metric.value
            )}
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-lavender/80">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
