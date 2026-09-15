import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { primarySolidClass } from "@/lib/cta-button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface PricingProps {
  locale: Locale;
  dict: Dictionary;
}

export function Pricing({ locale, dict }: PricingProps) {
  const tiers = [
    { ...dict.pricing.mix, highlight: false },
    { ...dict.pricing.theme, highlight: true },
    { ...dict.pricing.ai, highlight: false },
  ];

  return (
    <LandingSection id="pricing" analyticsSection="pricing" tone="contrast" reveal>
      <SectionHeading title={dict.pricing.title} subtitle={dict.pricing.subtitle} />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col rounded-2xl border p-6 sm:p-8",
              tier.highlight ? "border-amber/35" : "border-cream/10",
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-lavender">
              {tier.name}
            </p>
            <p className="mt-4 text-4xl font-extrabold tracking-tight text-cream sm:text-5xl">
              {tier.price}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">{tier.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <TrackedOutboundLink
          href={getAppStoreUrl(locale)}
          locale={locale}
          downloadPlatform="ios"
          downloadSource="pricing"
          className={primarySolidClass("h-11 min-w-[220px] px-6")}
        >
          {dict.hero.ctaPrimary}
        </TrackedOutboundLink>
        <p className="text-sm font-medium text-amber">{dict.pricing.trust}</p>
        <p className="max-w-2xl text-sm text-cream/55">{dict.pricing.disclaimer}</p>
      </div>
    </LandingSection>
  );
}
