"use client";

import Link from "next/link";
import { Mail, Share2, Video } from "lucide-react";

import { MotionLink } from "@/components/motion/MotionLink";
import { BRAND } from "@/lib/brand";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/tracking";
import { ctaGradientClass } from "@/lib/cta-button";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface AffiliateProgramProps {
  dict: Dictionary;
  locale: Locale;
  variant?: "section" | "page";
}

const STEP_ICONS = [Video, Mail, Share2] as const;

export function AffiliateProgram({
  dict,
  locale,
  variant = "section",
}: AffiliateProgramProps) {
  const content = dict.affiliate;
  const applyHref = `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(content.cta.subject)}&body=${encodeURIComponent(content.cta.bodyTemplate)}`;
  const isPage = variant === "page";

  if (!isPage) {
    return (
      <LandingSection id="affiliate" analyticsSection="affiliate" tone="contrast">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-lilac via-mist to-[#1a0f28] p-6 sm:p-8 md:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lilac blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
                {dict.nav.affiliate}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                {content.subtitle}
              </p>

              <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.steps.map((step, index) => {
                  const Icon = STEP_ICONS[index] ?? Share2;
                  return (
                    <li
                      key={step.title}
                      className="rounded-2xl border border-border surface-paper p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lilac text-ink">
                        <Icon className="h-4 w-4" aria-hidden />
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MotionLink
                  href={applyHref}
                  className={ctaGradientClass("h-11 rounded-full px-8")}
                  onClick={() => {
                    trackEvent({
                      event: ANALYTICS_EVENTS.AFFILIATE_APPLY_CLICK,
                      properties: { locale, variant: "section" },
                    });
                  }}
                >
                  {content.cta.button}
                </MotionLink>
                <p className="text-sm text-muted-foreground">{content.cta.hint}</p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div
                className="w-full max-w-xs rounded-3xl border border-border bg-gradient-to-b from-lilac to-transparent p-8 text-center lg:max-w-sm"
              >
                <p className="font-heading text-7xl font-black tracking-tight text-ink sm:text-8xl">
                  {content.rate}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {content.rateNote}
                </p>
                <div className="mt-6 rounded-xl border border-border bg-black/20 px-4 py-3 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {dict.footer.support}
                  </p>
                  <a
                    href={`mailto:${BRAND.supportEmail}`}
                    className="mt-1 block text-sm font-medium text-muted-foreground hover:text-ink"
                  >
                    {BRAND.supportEmail}
                  </a>
                </div>
              </div>

              <Link
                href={localeHref(locale, "affiliate")}
                className="mt-5 text-sm font-semibold text-ink hover:text-muted-foreground"
              >
                {content.learnMore} →
              </Link>
            </div>
          </div>
        </div>
      </LandingSection>
    );
  }

  const body = (
    <>
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        align="left"
      />

      {content.pageNote ? (
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{content.pageNote}</p>
      ) : null}

      <div className="mt-10 max-w-3xl text-left">
        <p className="font-heading text-6xl font-black tracking-tight text-ink sm:text-7xl">
          {content.rate}
        </p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {content.rateNote}
        </p>
      </div>

      <ol className="mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
        {content.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Share2;
          return (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-white/[0.03] p-5 text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lilac text-ink">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 max-w-lg text-left">
        <MotionLink
          href={applyHref}
          className={ctaGradientClass("h-11 w-full rounded-full sm:w-auto sm:px-10")}
          onClick={() => {
            trackEvent({
              event: ANALYTICS_EVENTS.AFFILIATE_APPLY_CLICK,
              properties: { locale, variant: "page" },
            });
          }}
        >
          {content.cta.button}
        </MotionLink>
        <p className="mt-3 text-sm text-muted-foreground">{content.cta.hint}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-ink">
            {BRAND.supportEmail}
          </a>
        </p>
      </div>
    </>
  );

  return <div>{body}</div>;
}
