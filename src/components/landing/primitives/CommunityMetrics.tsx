"use client";

import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";

import { AnimatedNumber } from "./AnimatedNumber";

interface CommunityMetricsProps {
  metrics: Dictionary["community"]["metrics"];
}

export function CommunityMetrics({ metrics }: CommunityMetricsProps) {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/10">
      {metrics.map((metric) => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="flex min-w-0 flex-col items-center justify-center px-2 py-5 text-center sm:px-4 sm:py-6"
        >
          <p className="w-full text-xl font-extrabold tabular-nums leading-none tracking-tight text-cream sm:text-3xl">
            {"animate" in metric && metric.animate ? (
              <AnimatedNumber
                value={BRAND.stats.gamesPlayed}
                suffix="+"
                className="tabular-nums"
                compactBelowPx={480}
              />
            ) : (
              metric.value
            )}
          </p>
          <p className="mt-2 max-w-[9rem] text-[11px] font-medium leading-snug text-cream/65 sm:mt-2.5 sm:max-w-none sm:text-sm">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
