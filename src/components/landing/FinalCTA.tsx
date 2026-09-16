"use client";

import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { trackEvent } from "@/lib/tracking";

import { LandingSection } from "./LandingSection";
import { CTAButton } from "./primitives/CTAButton";
import { StoreButtons } from "./primitives/StoreButton";

interface FinalCTAProps {
  locale: Locale;
  dict: Dictionary;
}

export function FinalCTA({ locale, dict }: FinalCTAProps) {
  const copy = dict.finalCta ?? dict.cta;

  return (
    <LandingSection analyticsSection="cta" reveal>
      <div className="relative overflow-hidden rounded-3xl border border-cream/10 px-6 py-12 sm:px-10 sm:py-16">
        <div className="brand-gradient-bg absolute inset-0 opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">{copy.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              href={getAppStoreUrl(locale)}
              locale={locale}
              downloadPlatform="ios"
              downloadSource="final_cta"
              variant="primary"
              className="min-h-[44px] w-full sm:w-auto"
              onClick={() =>
                trackEvent({
                  event: ANALYTICS_EVENTS.FINAL_CTA_CLICK,
                  properties: { locale, cta: "primary" },
                })
              }
            >
              {copy.button}
            </CTAButton>
            <CTAButton
              href="#decks"
              variant="ghost"
              className="min-h-[44px] w-full sm:w-auto"
              onClick={() =>
                trackEvent({
                  event: ANALYTICS_EVENTS.FINAL_CTA_CLICK,
                  properties: { locale, cta: "secondary" },
                })
              }
            >
              {copy.secondary}
            </CTAButton>
          </div>
          <StoreButtons locale={locale} source="final_cta" className="mt-8 justify-center" />
        </div>
      </div>
    </LandingSection>
  );
}
