import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getDeckHref } from "@/lib/deck-catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";

interface GeniusEventProps {
  locale: Locale;
  dict: Dictionary;
}

/** Compact launch banner for the Genius Only deck and its App Store / Google Play in-app event. */
export function GeniusEvent({ locale, dict }: GeniusEventProps) {
  const copy = dict.geniusEvent;

  return (
    <LandingSection id="genius-only" analyticsSection="genius_event" density="compact" reveal>
      <div className="genius-event relative overflow-hidden rounded-lg surface-obsidian">
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:gap-10 lg:px-12">
          <div className="genius-event__count" aria-hidden>
            <span>150</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold tracking-[0.14em] text-[#FFD84A] uppercase">{copy.tag}</p>
            <h2 className="mt-2 text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance text-cream sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream/70 sm:text-base">{copy.body}</p>
          </div>
          <Link
            href={getDeckHref(locale, "genius")}
            className="inline-flex min-h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-cream px-6 text-sm font-extrabold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {copy.cta}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </LandingSection>
  );
}
