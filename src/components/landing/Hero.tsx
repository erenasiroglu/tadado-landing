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
    <section className="relative overflow-hidden bg-[#1a0f28] pb-10 pt-8 sm:pb-14 sm:pt-12">
      <SectionViewTracker sectionId="hero">
        <div className="section-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-6 top-6 h-28 w-28 rounded-full bg-violet-500/12 blur-3xl sm:hidden"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-4 bottom-12 h-24 w-24 rounded-full bg-amber/10 blur-3xl sm:hidden"
              aria-hidden
            />
            <Stagger initial>
            <StaggerItem>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lavender/75">
                {dict.hero.brandLine}
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-cream sm:text-5xl lg:text-[3.35rem]">
                {dict.hero.title}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-xl text-lg text-cream/75">{dict.hero.subtitle}</p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:hidden">
                  <MobileStoreDownloadCta
                    locale={locale}
                    source="hero_primary"
                    className="min-h-[44px]"
                    onClick={handlePrimaryClick}
                  />
                  <CTAButton
                    href="#how-it-works"
                    variant="ghost"
                    className="min-h-[44px] w-full"
                    onClick={handleSecondaryClick}
                  >
                    {dict.hero.ctaSecondary}
                  </CTAButton>
                </div>
                <div className="hidden flex-col gap-3 sm:flex">
                  <StoreButtons
                    locale={locale}
                    source="hero_primary"
                    a11y={dict.a11y}
                    labelMode="download"
                  />
                  <CTAButton
                    href="#how-it-works"
                    variant="ghost"
                    className="min-h-[44px] w-fit"
                    onClick={handleSecondaryClick}
                  >
                    {dict.hero.ctaSecondary}
                  </CTAButton>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
          </div>

          <div className="relative mx-auto w-full max-w-[min(100%,460px)] lg:mx-0 lg:w-full lg:max-w-none lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-full px-0 sm:px-4 lg:px-0">
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
              <HeroProofMetrics metrics={dict.hero.metrics} />
            </div>
          </div>
        </div>
      </SectionViewTracker>
    </section>
  );
}
