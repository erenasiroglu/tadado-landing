import { Check, Crown, Download, Sparkles, Zap } from "lucide-react";

import { Tag } from "@/components/brand/tag";
import type { Dictionary, Locale } from "@/lib/i18n";
import { isNovemberPricingPromo } from "@/lib/landing-theme";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { MobileStoreDownloadCta } from "./primitives/MobileStoreDownloadCta";
import { StoreButtons } from "./primitives/StoreButton";
import { SectionHeading } from "./SectionHeading";

interface PricingProps {
  locale: Locale;
  dict: Dictionary;
}

function Checklist({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul
      className={cn(
        "mt-6 space-y-3 border-t pt-6 text-sm",
        dark ? "border-cream/15" : "border-border",
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-cream text-ink" : "bg-ink text-cream",
            )}
            aria-hidden
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-cream/85" : "text-foreground/80"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlanName({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-sm font-extrabold tracking-tight uppercase",
        dark ? "text-cream/70" : "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

function Price({
  value,
  suffix,
  dark,
  compact,
  stacked,
}: {
  value: string;
  suffix?: string;
  dark?: boolean;
  compact?: boolean;
  stacked?: boolean;
}) {
  return (
    <p
      className={cn(
        "mt-3 min-h-14 items-baseline gap-x-2 gap-y-1",
        stacked ? "flex flex-col sm:flex-row sm:flex-wrap" : "flex flex-wrap",
      )}
    >
      <span
        className={cn(
          "font-extrabold tracking-[-0.04em] tabular-nums",
          compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl",
          dark ? "text-cream" : "text-foreground",
        )}
      >
        {value}
      </span>
      {suffix ? (
        <span
          className={cn(
            "text-sm font-semibold",
            dark ? "text-cream/60" : "text-muted-foreground",
          )}
        >
          {suffix}
        </span>
      ) : null}
    </p>
  );
}

export function Pricing({ locale, dict }: PricingProps) {
  const { pricing, proof } = dict;
  const { badges } = pricing;
  const showNovember = isNovemberPricingPromo();
  const cardSurface = "surface-paper";
  const trustItems = pricing.trust
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

  const weekly = pricing.weekly;

  return (
    <LandingSection
      id="pricing"
      analyticsSection="pricing"
      tone="contrast"
      reveal
    >
      <SectionHeading title={pricing.title} subtitle={pricing.subtitle} />
      {showNovember ? (
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {pricing.novemberPromo.note}
        </p>
      ) : null}

      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {/* Free: the entry point, so it keeps the lightest treatment. */}
        <article className={cn("flex flex-col rounded-lg p-6 sm:p-8", cardSurface)}>
          <Tag icon={<Download aria-hidden />}>{badges.free}</Tag>
          <div className="mt-6">
            <PlanName>{pricing.free.name}</PlanName>
            <Price value={pricing.free.price} />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {pricing.free.desc}
            </p>
          </div>
          <Checklist
            items={[proof.modes, proof.languages, proof.offline, proof.noAds]}
          />
        </article>

        {/* Weekly: featured pass for all premium decks. */}
        <article className="relative flex flex-col rounded-lg surface-obsidian p-6 ring-2 ring-[#C8BAFB]/40 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="onDark" icon={<Zap aria-hidden />}>
              {badges.popular}
            </Tag>
            {showNovember ? (
              <Tag tone="onDark" className="bg-[#FAAA12] text-[#4B1A7A] ring-[#FAAA12]">
                {pricing.novemberPromo.badge}
              </Tag>
            ) : null}
          </div>
          <div className="mt-6">
            <PlanName dark>{weekly.name}</PlanName>
            <p className="mt-3 text-sm font-semibold text-cream/70">{weekly.price}</p>
            <Price value={weekly.priceAfter} suffix={weekly.suffix} dark stacked />
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {weekly.desc}
            </p>
          </div>
          <Checklist
            items={[weekly.decksLine, weekly.cancelLine, ...trustItems]}
            dark
          />
        </article>

        {/* AI packs: three sizes in one card so the comparison is instant. */}
        <article className={cn("flex flex-col rounded-lg p-6 sm:p-8", cardSurface)}>
          <Tag icon={<Sparkles aria-hidden />}>{pricing.aiSectionTitle}</Tag>
          <ul className="mt-6 flex flex-1 flex-col gap-2">
            {pricing.aiTiers.map((tier) => (
              <li
                key={tier.name}
                className={cn(
                  "rounded-sm px-4 py-3.5",
                  tier.highlight
                    ? "bg-lilac/70 ring-1 ring-ink/10 ring-inset"
                    : "bg-mist/80",
                )}
              >
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold tracking-tight text-foreground uppercase">
                      {tier.name}
                    </span>
                    {tier.highlight ? (
                      <Tag tone="solid" className="h-5 px-2 text-[0.625rem] whitespace-normal">
                        {badges.popular}
                      </Tag>
                    ) : null}
                  </div>
                  <span className="text-lg font-extrabold tracking-tight text-foreground tabular-nums sm:text-end">
                    {tier.price}
                  </span>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">
                    {tier.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className={cn("flex flex-col rounded-lg p-6 sm:p-8", cardSurface)}>
          <Tag icon={<Crown aria-hidden />}>{badges.bestValue}</Tag>
          <div className="mt-6 flex flex-1 flex-col">
            <PlanName>{pricing.fullAccess.name}</PlanName>
            <Price
              value={pricing.fullAccess.price}
              suffix={pricing.oneTime}
              compact
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {pricing.fullAccess.desc}
            </p>
            <Checklist
              items={[
                pricing.fullAccess.aiCredits,
                badges.oneTimeForever,
                proof.noAds,
              ]}
            />
          </div>
        </article>

        <article className={cn("flex flex-col rounded-lg p-6 sm:p-8", cardSurface)}>
          <Tag>{badges.oneTimeForever}</Tag>
          <div className="mt-6 flex flex-1 flex-col">
            <PlanName>{pricing.singleDeck.name}</PlanName>
            <Price value={pricing.singleDeck.price} suffix={pricing.oneTime} compact stacked />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {pricing.singleDeck.desc}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <div className="w-full max-w-sm sm:hidden">
          <MobileStoreDownloadCta
            locale={locale}
            source="pricing"
            label={dict.hero.ctaPrimary}
          />
        </div>
        <StoreButtons
          locale={locale}
          source="pricing"
          a11y={dict.a11y}
          labelMode="download"
          className="hidden justify-center sm:flex"
        />
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {pricing.disclaimer}
        </p>
      </div>
    </LandingSection>
  );
}
