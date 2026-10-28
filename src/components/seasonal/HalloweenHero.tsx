"use client";

import { Ban, Fingerprint, Smartphone, Sparkles } from "lucide-react";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { ImposterScreen } from "@/components/landing/device/ImposterScreen";
import { MobileStoreDownloadCta } from "@/components/landing/primitives/MobileStoreDownloadCta";
import { StoreButtons } from "@/components/landing/primitives/StoreButton";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

import { HalloweenDeckCard } from "./HalloweenDeckCard";

interface HalloweenHeroProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Season hero: the app's Halloween skin on a midnight stage, with the three game modes
 * on real-looking phones (same components the rest of the page uses).
 */
export function HalloweenHero({ locale, dict }: HalloweenHeroProps) {
  const copy = dict.halloween;

  const chips = [
    { icon: Ban, label: dict.modes.tabooTitle },
    { icon: Smartphone, label: dict.modes.headsUpTitle },
    { icon: Fingerprint, label: dict.modes.imposterTitle },
    { icon: Sparkles, label: dict.nav.aiDecks },
  ];

  function track(cta: "primary" | "secondary") {
    trackEvent({ event: ANALYTICS_EVENTS.HERO_CTA_CLICK, properties: { locale, cta } });
  }

  return (
    <section className="halloween-hero relative isolate overflow-hidden">
      <SectionViewTracker sectionId="hero">
        <div className="section-shell relative z-[2] grid items-center gap-12 pb-12 pt-10 sm:pb-14 sm:pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:pb-16 lg:pt-16">
          <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-start">
            <div className="hero-rise" style={{ "--i": 0 } as React.CSSProperties}>
              <p className="halloween-hero__eyebrow">
                {copy.eyebrow}
              </p>
            </div>
            <div className="hero-rise" style={{ "--i": 1 } as React.CSSProperties}>
              <h1 className="halloween-hero__title">
                <span className="block text-cream sm:whitespace-nowrap">{copy.heroTitle}</span>
                <span className="block text-[#CAB6FE] sm:whitespace-nowrap">{copy.heroTitleAccent}</span>
              </h1>
            </div>
            <div className="hero-rise" style={{ "--i": 2 } as React.CSSProperties}>
              <ul className="grid w-fit grid-cols-2 gap-2.5 sm:gap-3" aria-label={dict.modes.title}>
                {chips.map(({ icon: Icon, label }) => (
                  <li key={label} className="halloween-chip">
                    <Icon aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-rise" style={{ "--i": 3 } as React.CSSProperties}>
              <p className="max-w-md text-base leading-relaxed text-[#CAB6FE]/90 sm:text-lg">{copy.heroSubtitle}</p>
            </div>
            <div className="hero-rise w-full max-w-md" style={{ "--i": 4 } as React.CSSProperties}>
              <div className="flex flex-col gap-3 sm:hidden">
                <MobileStoreDownloadCta
                  locale={locale}
                  source="hero_primary"
                  label={dict.hero.ctaPrimary}
                  className="halloween-store-cta min-h-12"
                  onClick={() => track("primary")}
                />
              </div>
              <div className="hidden flex-col gap-4 sm:flex lg:items-start">
                <StoreButtons
                  locale={locale}
                  source="hero_primary"
                  a11y={dict.a11y}
                  labelMode="short"
                  className="w-full flex-row items-center justify-center lg:justify-start"
                />
              </div>
              <a
                href="#halloween"
                onClick={() => track("secondary")}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-cream/80 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {copy.heroSecondary}
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <HalloweenStage dict={dict} />
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}

/** Two phones and the free deck card, laid out on a fixed 640×500 canvas that scales down on small screens. */
function HalloweenStage({ dict }: { dict: Dictionary }) {
  const card = dict.halloween.card;

  return (
    <div className="halloween-stage" aria-hidden>
      <div className="halloween-stage__canvas">
        <div className="halloween-stage__imposter">
          <ImposterScreen labels={dict.gamePreview} width={214} showGlow={false} />
        </div>
        <div className="halloween-stage__deck">
          <HalloweenDeckCard copy={card} />
        </div>
        <div className="halloween-stage__taboo">
          <ForbiddenWordsScreen
            width={224}
            labels={{ ...dict.gamePreview, roundLabel: card.round }}
            word={card.word}
            forbidden={card.forbidden}
            showGlow={false}
          />
        </div>
      </div>
    </div>
  );
}
