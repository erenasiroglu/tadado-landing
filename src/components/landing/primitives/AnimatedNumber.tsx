"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  durationMs?: number;
  /** Below this viewport width, large values render as compact notation (e.g. 300K). */
  compactBelowPx?: number;
}

function formatNumber(amount: number, compact: boolean) {
  if (compact && amount >= 1000) {
    const rounded = amount >= 1_000_000
      ? `${Math.round(amount / 1_000_000)}M`
      : `${Math.round(amount / 1000)}K`;
    return rounded;
  }

  return amount.toLocaleString();
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  className,
  durationMs = 1200,
  compactBelowPx,
}: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);
  const [useCompact, setUseCompact] = useState(false);
  const startedRef = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!compactBelowPx) return;

    const media = window.matchMedia(`(max-width: ${compactBelowPx - 1}px)`);
    function onChange() {
      setUseCompact(media.matches);
    }

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [compactBelowPx]);

  useEffect(() => {
    if (reduceMotion) return;

    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs, reduceMotion]);

  const formatted = formatNumber(reduceMotion ? value : display, useCompact);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
