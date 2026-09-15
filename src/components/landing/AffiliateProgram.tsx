import Link from "next/link";
import { Mail, Share2, Video } from "lucide-react";

import { MotionLink } from "@/components/motion/MotionLink";
import { BRAND } from "@/lib/brand";
import { ctaGradientClass } from "@/lib/cta-button";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
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
      <LandingSection id="affiliate" tone="contrast">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#3d1f58]/50 via-[#2a0a3b]/80 to-[#1a0f28] p-6 sm:p-8 md:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
                {dict.nav.affiliate}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-cream sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-cream/70">
                {content.subtitle}
              </p>

              <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.steps.map((step, index) => {
                  const Icon = STEP_ICONS[index] ?? Share2;
                  return (
                    <li
                      key={step.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/15 text-amber">
                        <Icon className="h-4 w-4" aria-hidden />
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-cream">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-cream/65">{step.body}</p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MotionLink
                  href={applyHref}
                  className={ctaGradientClass("h-11 rounded-full px-8")}
                >
                  {content.cta.button}
                </MotionLink>
                <p className="text-sm text-lavender/80">{content.cta.hint}</p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div
                className="w-full max-w-xs rounded-3xl border border-amber/25 bg-gradient-to-b from-amber/10 to-transparent p-8 text-center lg:max-w-sm"
              >
                <p className="font-heading text-7xl font-black tracking-tight text-amber sm:text-8xl">
                  {content.rate}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-lavender">
                  {content.rateNote}
                </p>
                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                    {dict.footer.support}
                  </p>
                  <a
                    href={`mailto:${BRAND.supportEmail}`}
                    className="mt-1 block text-sm font-medium text-lavender hover:text-amber"
                  >
                    {BRAND.supportEmail}
                  </a>
                </div>
              </div>

              <Link
                href={localeHref(locale, "affiliate")}
                className="mt-5 text-sm font-semibold text-amber hover:text-amber/80"
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
        <p className="mt-6 max-w-2xl leading-relaxed text-cream/75">{content.pageNote}</p>
      ) : null}

      <div className="mt-10 max-w-3xl text-left">
        <p className="font-heading text-6xl font-black tracking-tight text-amber sm:text-7xl">
          {content.rate}
        </p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-lavender">
          {content.rateNote}
        </p>
      </div>

      <ol className="mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
        {content.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Share2;
          return (
            <li
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/15 text-amber">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-bold text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{step.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 max-w-lg text-left">
        <MotionLink
          href={applyHref}
          className={ctaGradientClass("h-11 w-full rounded-full sm:w-auto sm:px-10")}
        >
          {content.cta.button}
        </MotionLink>
        <p className="mt-3 text-sm text-lavender/80">{content.cta.hint}</p>
        <p className="mt-2 text-sm text-lavender">
          <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-amber">
            {BRAND.supportEmail}
          </a>
        </p>
      </div>
    </>
  );

  return <div>{body}</div>;
}
