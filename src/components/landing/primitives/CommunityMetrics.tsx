"use client";

import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";

import { AnimatedNumber } from "./AnimatedNumber";

interface CommunityMetricsProps {
  metrics: Dictionary["community"]["metrics"];
}

export function CommunityMetrics({ metrics }: CommunityMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {metrics.map((metric) => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="surface-card flex min-w-0 flex-col items-center px-2 py-3 text-center sm:px-4 sm:py-4"
        >
          <p className="w-full text-sm font-extrabold leading-none tracking-tight text-cream sm:text-2xl md:text-3xl">
            {"animate" in metric && metric.animate ? (
              <AnimatedNumber
                value={BRAND.stats.gamesPlayed}
                suffix="+"
                className="tabular-nums"
                compactBelowPx={640}
              />
            ) : (
              <span className="tabular-nums">{metric.value}</span>
            )}
          </p>
          <p className="mt-1.5 max-w-full text-[9px] font-semibold leading-tight text-lavender/80 sm:text-[11px] sm:uppercase sm:tracking-[0.08em]">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
