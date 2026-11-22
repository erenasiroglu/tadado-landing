import { Check } from "lucide-react";

import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { MobileStoreDownloadCta } from "./primitives/MobileStoreDownloadCta";
import { StoreButtons } from "./primitives/StoreButton";
import { SectionHeading } from "./SectionHeading";

interface PricingProps {
  locale: Locale;
  dict: Dictionary;
}

export function Pricing({ locale, dict }: PricingProps) {
  const pricing = dict.pricing;
  const { free, premium, ai } = pricing;

  return (
    <LandingSection id="pricing" analyticsSection="pricing" tone="contrast" reveal>
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.subtitle} />

      <div className="mt-8 grid gap-3 lg:grid-cols-2 lg:items-stretch">
        <article className="relative overflow-hidden rounded-xl surface-obsidian p-5 sm:p-6">
          <p className="text-xs font-semibold text-cream/60">
            {free.name} · {free.price}
          </p>
          <h3 className="mt-2 text-lg font-extrabold text-cream">{premium.name}</h3>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-cream tabular-nums sm:text-5xl">
              {premium.price}
            </span>
            <span className="text-base font-semibold text-cream/65">{premium.suffix}</span>
          </p>
          <p className="mt-1 text-xs text-cream/50">{premium.trialNote}</p>
          <ul className="mt-4 space-y-2 border-t border-cream/15 pt-4">
            {premium.features.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-cream/85">
                <Check className="size-4 shrink-0 text-cream/50" strokeWidth={2.5} aria-hidden />
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="flex flex-col rounded-xl surface-paper p-5 ring-1 ring-ink/10 sm:p-6">
          <h3 className="text-sm font-extrabold text-foreground">{ai.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{ai.rule}</p>

          <div className="mt-4 grid flex-1 grid-cols-3 gap-2" role="list">
            {ai.tiers.map((tier) => (
              <div
                key={tier.credits}
                role="listitem"
                className={cn(
                  "flex min-w-0 flex-col items-center justify-center rounded-xl border border-border bg-mist/50 px-2 py-3.5 text-center shadow-sm sm:px-3",
                  tier.highlight &&
                    "surface-obsidian border-transparent text-cream shadow-md ring-1 ring-cream/10",
                )}
              >
                {tier.badge ? (
                  <span
                    className={cn(
                      "mb-1 max-w-full truncate text-[0.625rem] font-bold tracking-wide uppercase",
                      tier.highlight ? "text-cream/70" : "text-muted-foreground",
                    )}
                  >
                    {tier.badge}
                  </span>
                ) : (
                  <span className="mb-1 block h-[0.875rem]" aria-hidden />
                )}
                <p
                  className={cn(
                    "flex items-baseline justify-center gap-1 text-sm font-extrabold tabular-nums",
                    tier.highlight ? "text-cream" : "text-foreground",
                  )}
                >
                  <span>{tier.credits}</span>
                  <span
                    className={cn(
                      "text-[0.6875rem] font-semibold",
                      tier.highlight ? "text-cream/65" : "text-muted-foreground",
                    )}
                  >
                    {ai.creditsLabel}
                  </span>
                </p>
                <p
                  className={cn(
                    "mt-1 text-lg font-extrabold tabular-nums",
                    tier.highlight ? "text-cream" : "text-foreground",
                  )}
                >
                  {tier.price}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-[0.625rem] leading-tight",
                    tier.highlight ? "text-cream/55" : "text-muted-foreground",
                  )}
                >
                  {tier.perDeck}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <p className="mt-4 text-center text-[0.6875rem] leading-relaxed text-muted-foreground">
        {pricing.disclaimer}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="w-full max-w-sm sm:hidden">
          <MobileStoreDownloadCta locale={locale} source="pricing" label={dict.hero.ctaPrimary} />
        </div>
        <StoreButtons
          locale={locale}
          source="pricing"
          a11y={dict.a11y}
          labelMode="download"
          className="hidden justify-center sm:flex"
        />
      </div>
    </LandingSection>
  );
}