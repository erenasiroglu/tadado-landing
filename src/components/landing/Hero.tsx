"use client";

import { motion, useReducedMotion } from "motion/react";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { fadeIn } from "@/lib/motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

import { HeroProduct } from "./HeroProduct";
import { CTAButton } from "./primitives/CTAButton";
import { HeroProofMetrics } from "./primitives/HeroProofMetrics";
import { MobileStoreDownloadCta } from "./primitives/MobileStoreDownloadCta";
import { StoreButtons } from "./primitives/StoreButton";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const reduceMotion = useReducedMotion();

  function handlePrimaryClick() {
    trackEvent({
      event: ANALYTICS_EVENTS.HERO_CTA_CLICK,
      properties: { locale, cta: "primary" },
    });
  }

  function handleSecondaryClick() {
    trackEvent({
      event: ANALYTICS_EVENTS.HERO_CTA_CLICK,
      properties: { locale, cta: "secondary" },
    });
  }

  return (
    <section className="stage relative overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-b from-transparent to-paper sm:h-28"
        aria-hidden
      />
      <SectionViewTracker sectionId="hero">
        <div className="section-shell relative z-[2] grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
          <div className="flex min-w-0 flex-col gap-6 text-center lg:max-w-xl lg:text-start xl:max-w-2xl">
            <Stagger
              initial
              className="flex w-full min-w-0 flex-col items-center gap-5 lg:items-start lg:gap-6"
            >
              <StaggerItem>
                <p className="eyebrow text-balance">{dict.hero.brandLine}</p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="max-w-[16ch] text-balance text-[clamp(2rem,5.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.035em] sm:max-w-[20ch] lg:max-w-none lg:text-[clamp(2.25rem,3.2vw,3.5rem)]">
                  {dict.hero.title}
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.hero.subtitle}
                </p>
              </StaggerItem>
              <StaggerItem className="w-full min-w-0 max-w-md lg:max-w-sm xl:max-w-md">
                <div className="flex w-full min-w-0 flex-col gap-3">
                  <div className="flex flex-col gap-3 sm:hidden">
                    <MobileStoreDownloadCta
                      locale={locale}
                      source="hero_primary"
                      label={dict.hero.ctaPrimary}
                      className="min-h-12"
                      onClick={handlePrimaryClick}
                    />
                    <CTAButton
                      href="#how-it-works"
                      variant="ghost"
                      className="min-h-12 w-full"
                      onClick={handleSecondaryClick}
                    >
                      {dict.hero.ctaSecondary}
                    </CTAButton>
                  </div>
                  <div className="hidden min-w-0 flex-col gap-3 sm:flex">
                    <StoreButtons
                      locale={locale}
                      source="hero_primary"
                      a11y={dict.a11y}
                      labelMode="short"
                      className="w-full flex-col items-stretch sm:flex-row sm:items-center"
                    />
                    <CTAButton
                      href="#how-it-works"
                      variant="ghost"
                      className="min-h-12 w-full sm:w-fit"
                      onClick={handleSecondaryClick}
                    >
                      {dict.hero.ctaSecondary}
                    </CTAButton>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[min(100%,420px)] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="relative mx-auto w-full">
              {reduceMotion ? (
                <HeroProduct a11y={dict.a11y} />
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <HeroProduct a11y={dict.a11y} />
                </motion.div>
              )}
              <HeroProofMetrics metrics={dict.hero.metrics} className="max-w-full" />
            </div>
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}
