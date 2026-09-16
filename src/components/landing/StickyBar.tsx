"use client";

import { motion, useReducedMotion } from "motion/react";

import { MobileStoreDownloadCta } from "@/components/landing/primitives/MobileStoreDownloadCta";
import { slideUpBar } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";

interface StickyBarProps {
  locale: Locale;
}

export function StickyBar({ locale }: StickyBarProps) {
  const reduceMotion = useReducedMotion();
  const barClass =
    "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a0f28]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur md:hidden";

  const cta = <MobileStoreDownloadCta locale={locale} source="sticky_bar" />;

  if (reduceMotion) {
    return <div className={barClass}>{cta}</div>;
  }

  return (
    <motion.div className={barClass} initial="hidden" animate="visible" variants={slideUpBar}>
      {cta}
    </motion.div>
  );
}
