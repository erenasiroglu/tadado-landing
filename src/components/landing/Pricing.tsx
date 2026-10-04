import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { AccentPill } from "@/components/brand/accent-pill";
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

type PricingTier = {
  name: string;
  price: string;
  desc: string;
  highlight?: boolean;
};

type PriceCardProps = {
  tier: PricingTier;
  badge?: string;
  className?: string;
  size?: "default" | "featured";
};

function PriceCard({ tier, badge, className, size = "default" }: PriceCardProps) {
  const featured = size === "featured" || tier.highlight;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl surface-paper p-6 sm:p-8",
        featured && "ring-2 ring-ink/20 md:-translate-y-1",
        className,
      )}
    >
      {badge ? (
        <div className="mb-4 flex justify-start">
          <AccentPill className="text-[0.6875rem]">{badge}</AccentPill>
        </div>
      ) : null}

      <p className="text-sm font-extrabold uppercase tracking-tight text-muted-foreground">
        {tier.name}
      </p>
      <p
        className={cn(
          "mt-3 font-extrabold tracking-tight text-foreground tabular-nums",
          featured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {tier.price}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{tier.desc}</p>
    </div>
  );
}

function PricingGroup({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-14", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-[0.6875rem]">{title}</p>
        <div className="mx-auto mt-3 h-px max-w-xs bg-border" aria-hidden />
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Pricing({ locale, dict }: PricingProps) {
  const { pricing } = dict;
  const { badges } = pricing;

  return (
    <LandingSection id="pricing" analyticsSection="pricing" tone="contrast" reveal>
      <SectionHeading title={pricing.title} subtitle={pricing.subtitle} />

      <div className="mt-12 flex justify-center">
        <PriceCard
          tier={pricing.free}
          badge={badges.free}
          size="featured"
          className="w-full max-w-lg"
        />
      </div>

      <PricingGroup title={pricing.aiSectionTitle}>
        <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
          {pricing.aiTiers.map((tier) => (
            <PriceCard
              key={tier.name}
              tier={tier}
              badge={tier.highlight ? badges.popular : undefined}
              size={tier.highlight ? "featured" : "default"}
            />
          ))}
        </div>
      </PricingGroup>

      <PricingGroup title={pricing.decksSectionTitle}>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2 md:items-stretch">
          <PriceCard tier={pricing.singleDeck} />
          <PriceCard
            tier={pricing.fullAccess}
            badge={badges.bestValue}
            size="featured"
          />
        </div>
      </PricingGroup>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border/80 bg-paper/60 px-6 py-8 text-center sm:mt-14 sm:px-10">
        <TrackedOutboundLink
          href={getAppStoreUrl(locale)}
          locale={locale}
          downloadPlatform="ios"
          downloadSource="pricing"
          className={primarySolidClass("h-12 min-w-[240px] px-8 text-sm sm:text-base")}
        >
          {dict.hero.ctaPrimary}
        </TrackedOutboundLink>
        <p className="text-sm font-semibold text-ink">{pricing.trust}</p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {pricing.disclaimer}
        </p>
      </div>
    </LandingSection>
  );
}
