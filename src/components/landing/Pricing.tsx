import {
  Check,
  Gift,
  Infinity as InfinityIcon,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserSearch,
  WifiOff,
  Ban,
  CalendarCheck,
  RefreshCw,
} from "lucide-react";

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
    <ul className="space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-[#FAAA12] text-[#2a0a3b]" : "bg-ink text-cream",
            )}
            aria-hidden
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-cream/85" : "text-foreground/80"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const TRIAL_ICONS = [Gift, CalendarCheck, RefreshCw];
const TRUST_ICONS = [Ban, RefreshCw, ShieldCheck];

export function Pricing({ locale, dict }: PricingProps) {
  const { pricing, modes } = dict;
  const { badges, free, premium, ai } = pricing;

  const modeChips = [
    { label: modes.tabooTitle, icon: Ban },
    { label: modes.headsUpTitle, icon: Smartphone },
    { label: modes.imposterTitle, icon: UserSearch },
  ];

  return (
    <LandingSection id="pricing" analyticsSection="pricing" tone="contrast" reveal>
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.subtitle} />

      <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-stretch">
        {/* Free: Tadado Mix, open to everyone in every mode. */}
        <article className="flex flex-col rounded-lg surface-paper p-6 sm:p-8">
          <Tag icon={<InfinityIcon aria-hidden />}>{badges.free}</Tag>

          <div className="mt-6">
            <h3 className="text-lg font-extrabold tracking-tight text-foreground">
              {free.name}
            </h3>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="text-5xl font-extrabold tracking-[-0.04em] text-foreground tabular-nums sm:text-6xl">
                {free.price}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{free.priceNote}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{free.desc}</p>
          </div>

          <div className="mt-6 rounded-md bg-mist/80 p-4">
            <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
              {free.modesLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {modeChips.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-bold text-foreground ring-1 ring-ink/10"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <Checklist items={free.features} />
          </div>
        </article>

        {/* Premium: the one plan. 3-day free trial, then weekly. */}
        <article className="relative flex flex-col overflow-hidden rounded-lg surface-obsidian p-6 ring-2 ring-[#C8BAFB]/40 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[#7E5FE0]/30 blur-3xl"
          />
          <div className="relative flex flex-wrap items-center gap-2">
            <Tag tone="onDark" icon={<Sparkles aria-hidden />}>
              {badges.premium}
            </Tag>
            <Tag tone="onDark" className="bg-[#FAAA12] text-[#2a0a3b] ring-[#FAAA12]">
              {badges.trial}
            </Tag>
          </div>

          <div className="relative mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight text-cream">
                {premium.name}
              </h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="text-5xl font-extrabold tracking-[-0.04em] text-cream tabular-nums sm:text-6xl">
                  {premium.price}
                </span>
                <span className="text-base font-semibold text-cream/60">{premium.suffix}</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-[#FAAA12]">{premium.trialNote}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">{premium.desc}</p>
            </div>
            <div className="sm:pt-1">
              <Checklist items={premium.features} dark />
            </div>
          </div>

          {/* Trial timeline: what happens and when. */}
          <div className="relative mt-8 border-t border-cream/15 pt-6">
            <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-cream/60 uppercase">
              {premium.timelineLabel}
            </p>
            <ol className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-3">
              {premium.timeline.map((step, index) => {
                const Icon = TRIAL_ICONS[index] ?? Gift;
                return (
                  <li key={step.when} className="relative flex gap-3 sm:flex-col sm:gap-3">
                    {index < premium.timeline.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute top-4 left-[calc(2rem+0.5rem)] hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-cream/35 to-cream/10 sm:block"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative flex size-8 shrink-0 items-center justify-center rounded-full",
                        index === 0 ? "bg-[#FAAA12] text-[#2a0a3b]" : "bg-cream/10 text-cream ring-1 ring-cream/20",
                      )}
                      aria-hidden
                    >
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-cream">{step.when}</p>
                      <p className="mt-1 text-xs leading-relaxed text-cream/65">{step.what}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </article>
      </div>

      {/* AI credits: three one-time packs side by side. */}
      <article className="mt-5 grid gap-6 rounded-lg surface-paper p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center lg:gap-10">
        <div>
          <Tag icon={<Sparkles aria-hidden />}>{badges.ai}</Tag>
          <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-foreground text-balance sm:text-3xl">
            {ai.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ai.desc}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-xs font-bold text-foreground">
            <Layers className="size-3.5" aria-hidden />
            {ai.rule}
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-3">
          {ai.tiers.map((tier) => (
            <li
              key={tier.credits}
              className={cn(
                "relative flex flex-col rounded-md p-5",
                tier.highlight ? "bg-ink text-cream shadow-lg ring-1 ring-ink" : "bg-mist/80 ring-1 ring-ink/5",
              )}
            >
              {tier.badge ? (
                <span
                  className={cn(
                    "absolute -top-2.5 left-5 rounded-full px-2.5 py-1 text-[0.625rem] leading-none font-bold tracking-[0.08em] uppercase",
                    tier.highlight ? "bg-[#FAAA12] text-[#2a0a3b]" : "bg-lilac text-ink ring-1 ring-ink/10",
                  )}
                >
                  {tier.badge}
                </span>
              ) : null}
              <p className="flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "text-4xl font-extrabold tracking-[-0.04em] tabular-nums",
                    tier.highlight ? "text-cream" : "text-foreground",
                  )}
                >
                  {tier.credits}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    tier.highlight ? "text-cream/70" : "text-muted-foreground",
                  )}
                >
                  {ai.creditsLabel}
                </span>
              </p>
              <p
                className={cn(
                  "mt-4 border-t pt-4 text-2xl font-extrabold tracking-tight tabular-nums",
                  tier.highlight ? "border-cream/15 text-cream" : "border-border text-foreground",
                )}
              >
                {tier.price}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs font-semibold",
                  tier.highlight ? "text-cream/60" : "text-muted-foreground",
                )}
              >
                {tier.perDeck}
              </p>
            </li>
          ))}
        </ul>
      </article>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-foreground/75">
        {pricing.trust.map((item, index) => {
          const Icon = TRUST_ICONS[index] ?? WifiOff;
          return (
            <li key={item} className="inline-flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" aria-hidden />
              {item}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
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
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">{pricing.disclaimer}</p>
      </div>
    </LandingSection>
  );
}
