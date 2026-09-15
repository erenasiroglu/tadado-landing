"use client";

import { motion, useReducedMotion } from "motion/react";

import { MotionLink } from "@/components/motion/MotionLink";
import { ctaAmberClass } from "@/lib/cta-button";
import { slideUpBar } from "@/lib/motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";

interface StickyBarProps {
  locale: Locale;
  dict: Dictionary;
}

export function StickyBar({ locale, dict }: StickyBarProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a0f28]/95 p-3 backdrop-blur md:hidden">
        <MotionLink
          href={getAppStoreUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaAmberClass("h-11 w-full rounded-lg")}
        >
          {dict.sticky.download}
        </MotionLink>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1a0f28]/95 p-3 backdrop-blur md:hidden"
      initial="hidden"
      animate="visible"
      variants={slideUpBar}
    >
      <MotionLink
        href={getAppStoreUrl(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className={ctaAmberClass("h-11 w-full rounded-lg")}
      >
        {dict.sticky.download}
      </MotionLink>
    </motion.div>
  );
}
