import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/brand/tag";
import { getDeckHref } from "@/lib/deck-catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";

interface GeniusEventProps {
  locale: Locale;
  dict: Dictionary;
}

/** Launch banner for the Genius Only deck and its App Store / Google Play in-app event. */
export function GeniusEvent({ locale, dict }: GeniusEventProps) {
  const copy = dict.geniusEvent;
  const deck = dict.decks.items.genius;

  return (
    <LandingSection id="genius-only" analyticsSection="genius_event" density="compact" reveal>
      <div className="genius-event relative overflow-hidden rounded-lg surface-obsidian">
        <div className="relative grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:p-14">
          <div className="max-w-xl">
            <Tag tone="onDark" icon={<Sparkles aria-hidden />}>
              {copy.tag}
            </Tag>
            <h2 className="mt-6 text-4xl leading-[1.02] font-extrabold tracking-[-0.045em] text-balance text-cream sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg sm:leading-relaxed">
              {copy.body}
            </p>
            <div className="mt-8">
              <Link
                href={getDeckHref(locale, "genius")}
                className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-cream px-6 text-sm font-extrabold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {copy.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-6 text-sm text-cream/55">{copy.note}</p>
          </div>

          <div className="relative mx-auto w-full max-w-[14rem] sm:max-w-[17rem] lg:max-w-none">
            <div className="genius-event__glow" aria-hidden />
            <div className="relative aspect-[2/3] rotate-3 overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_rgb(0_0_0/0.45)] ring-1 ring-cream/15">
              <Image
                src="/images/deck-cards/genius-only-deck-illustration.webp"
                alt={deck.name}
                fill
                sizes="(max-width: 1024px) 17rem, 20rem"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c0624] via-[#0c0624]/80 to-transparent p-5 pt-16">
                <p className="text-2xl font-black tracking-[-0.03em] text-cream uppercase">{deck.name}</p>
                <p className="mt-1 text-xs font-semibold text-cream/70">{deck.desc}</p>
              </div>
            </div>
            <div
              className="absolute -top-4 -left-3 flex size-20 -rotate-6 items-center justify-center rounded-full bg-cream text-ink shadow-[0_14px_28px_rgb(0_0_0/0.35)] sm:size-24"
              aria-hidden
            >
              <span className="text-3xl leading-none font-black tracking-[-0.04em] sm:text-4xl">150</span>
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
