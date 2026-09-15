import { MotionLink } from "@/components/motion/MotionLink";
import { ctaGradientClass } from "@/lib/cta-button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";

import { LandingSection } from "./LandingSection";
import { StoreBadges } from "./StoreBadges";

interface CtaProps {
  locale: Locale;
  dict: Dictionary;
}

export function Cta({ locale, dict }: CtaProps) {
  return (
    <LandingSection reveal>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
          {dict.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">{dict.cta.subtitle}</p>
        <MotionLink
          href={getAppStoreUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaGradientClass("mt-8 h-11 rounded-lg px-6 text-sm")}
        >
          {dict.cta.button}
        </MotionLink>
        <StoreBadges locale={locale} className="mt-8 justify-center" />
      </div>
    </LandingSection>
  );
}
