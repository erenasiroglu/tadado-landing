import { Check, Crown, Download, Sparkles, Zap } from "lucide-react";

import { Tag } from "@/components/brand/tag";
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
}: {
  value: string;
  suffix?: string;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span
        className={cn(
          "font-extrabold tracking-[-0.04em] tabular-nums",
          compact ? "text-3xl" : "text-5xl",
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

      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {/* Free: the entry point, so it keeps the lightest treatment. */}
        <article className="flex flex-col rounded-lg surface-paper p-7 sm:p-8">
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
        <article className="relative flex flex-col rounded-lg surface-obsidian p-7 sm:p-8 lg:-my-4 lg:py-12">
          <Tag tone="onDark" icon={<Zap aria-hidden />}>
            {badges.popular}
          </Tag>
          <div className="mt-6">
            <PlanName dark>{weekly.name}</PlanName>
            <Price
              value={weekly.price}
              suffix={weekly.suffix}
              dark
              compact={weekly.price.length > 8}
            />
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
        <article className="flex flex-col rounded-lg surface-paper p-7 sm:p-8">
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
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-sm font-extrabold tracking-tight text-foreground uppercase">
                      {tier.name}
                    </span>
                    {tier.highlight ? (
                      <Tag tone="solid" className="h-5 px-2 text-[0.625rem]">
                        {badges.popular}
                      </Tag>
                    ) : null}
                  </div>
                  <span className="text-lg font-extrabold tracking-tight text-foreground tabular-nums">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {tier.desc}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="flex flex-col rounded-lg surface-paper p-7 sm:p-8">
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

        <article className="flex flex-col justify-between rounded-lg surface-paper px-7 py-6 sm:px-8">
          <div className="min-w-0">
            <Tag className="mb-4">{badges.oneTimeForever}</Tag>
            <PlanName>{pricing.singleDeck.name}</PlanName>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pricing.singleDeck.desc}
            </p>
          </div>
          <p className="mt-6 flex shrink-0 items-baseline gap-2 border-t border-border pt-6">
            <span className="text-3xl font-extrabold tracking-[-0.04em] text-foreground tabular-nums">
              {pricing.singleDeck.price}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              {pricing.oneTime}
            </span>
          </p>
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
