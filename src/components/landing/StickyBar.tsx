"use client";

import { motion, useReducedMotion } from "motion/react";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { ctaGradientClass } from "@/lib/cta-button";
import { slideUpBar } from "@/lib/motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";

interface StickyBarProps {
  locale: Locale;
  dict: Dictionary;
}

export function StickyBar({ locale, dict }: StickyBarProps) {
  const reduceMotion = useReducedMotion();
  const barClass =
    "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a0f28]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur md:hidden";

  const cta = (
    <TrackedOutboundLink
      href={getAppStoreUrl(locale)}
      locale={locale}
      downloadPlatform="ios"
      downloadSource="sticky_bar"
      className={ctaGradientClass("h-11 w-full rounded-full text-sm font-bold")}
    >
      {dict.sticky.download}
    </TrackedOutboundLink>
  );

  if (reduceMotion) {
    return <div className={barClass}>{cta}</div>;
  }

  return (
    <motion.div className={barClass} initial="hidden" animate="visible" variants={slideUpBar}>
      {cta}
    </motion.div>
  );
}
