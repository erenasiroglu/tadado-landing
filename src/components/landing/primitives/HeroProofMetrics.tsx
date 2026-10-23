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

function BadgeContent({ metric }: { metric: Metric }) {
  return (
    <>
      <span className="font-bold text-foreground">
        <MetricValue metric={metric} />
      </span>
      <span className="hero-proof-badge__label">{metric.label}</span>
    </>
  );
}

export function HeroProofMetrics({ metrics, className }: HeroProofMetricsProps) {
  const leftMetrics = metrics.filter((_, index) => index % 2 === 0);
  const rightMetrics = metrics.filter((_, index) => index % 2 === 1);

  return (
    <div className={cn(className)}>
      <div className="mt-5 hidden max-w-full flex-wrap justify-center gap-2 sm:flex lg:justify-start">
        {[...leftMetrics, ...rightMetrics].map((metric) => (
          <span
            key={`${metric.value}-${metric.label}`}
            className="hero-proof-badge hero-proof-badge--float inline-flex"
          >
            <BadgeContent metric={metric} />
          </span>
        ))}
      </div>

      <div className="mt-5 flex max-w-full flex-wrap justify-center gap-1.5 sm:hidden">
        {metrics.map((metric, index) => (
          <span
            key={`mobile-${metric.value}-${metric.label}`}
            className="hero-proof-badge hero-proof-badge--in inline-flex"
            style={{ "--i": index } as React.CSSProperties}
          >
            <BadgeContent metric={metric} />
          </span>
        ))}
      </div>
    </div>
  );
}
