import Link from "next/link";
import { Megaphone, Newspaper, Users } from "lucide-react";

import { BRAND } from "@/lib/brand";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n-config";

import { SectionHeading } from "./SectionHeading";

const PILLAR_ICONS = {
  affiliate: Users,
  partnerships: Megaphone,
  press: Newspaper,
} as const;

interface MarketingPageContentProps {
  dict: Dictionary;
  locale: Locale;
}

function pillarHref(
  locale: Locale,
  kind: Dictionary["marketing"]["pillars"][number]["kind"],
  pressSubject: string,
): string {
  switch (kind) {
    case "affiliate":
      return localeHref(locale, "affiliate");
    case "partnerships":
      return localeHref(locale, "partnerships");
    case "press":
      return `mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(pressSubject)}`;
    default:
      return localeHref(locale);
  }
}

export function MarketingPageContent({ dict, locale }: MarketingPageContentProps) {
  const content = dict.marketing;

  return (
    <div className="max-w-4xl">
      <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
      <p className="mt-6 max-w-2xl leading-relaxed text-cream/75">{content.intro}</p>

      <div className="mt-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">
          {content.statsLabel}
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
          {content.stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center sm:px-4"
            >
              <p className="text-xl font-extrabold tabular-nums text-cream sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-medium leading-snug text-cream/60 sm:text-xs">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {content.pillars.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.kind as keyof typeof PILLAR_ICONS] ?? Megaphone;
          const href = pillarHref(locale, pillar.kind, content.pressSubject);
          const isMail = href.startsWith("mailto:");

          return (
            <article key={pillar.kind} className="surface-card flex h-full flex-col p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-lavender">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-bold text-cream">{pillar.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{pillar.body}</p>
              {isMail ? (
                <a
                  href={href}
                  className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80"
                >
                  {pillar.cta} →
                </a>
              ) : (
                <Link
                  href={href}
                  className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80"
                >
                  {pillar.cta} →
                </Link>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <Link
          href={localeHref(locale, "compare")}
          className="text-sm font-semibold text-lavender hover:text-amber"
        >
          {content.compareCta} →
        </Link>
        <Link
          href={localeHref(locale, "trending")}
          className="text-sm font-semibold text-lavender hover:text-amber"
        >
          {content.trendingCta} →
        </Link>
      </div>
    </div>
  );
}
