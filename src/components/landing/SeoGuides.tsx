"use client";

import Link from "next/link";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getSeoGuides } from "@/lib/seo-guides";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface SeoGuidesProps {
  locale: Locale;
  dict: Dictionary;
  /** Richer layout with featured guide and hub CTAs (homepage). */
  landing?: boolean;
}

function guideHref(locale: Locale, slug: string) {
  return localeHref(locale, `guides/${slug}`);
}

export function SeoGuides({ locale, dict, landing = false }: SeoGuidesProps) {
  const guides = getSeoGuides(locale);
  const featuredGuide = guides[0];
  const otherGuides = guides.slice(1);

  const trackGuideClick = (slug: string, label: string) => {
    trackEvent({
      event: ANALYTICS_EVENTS.BLOG_POST_CLICK,
      properties: { locale, slug, label, source: "seo_guides" },
    });
  };

  return (
    <LandingSection id="guides" analyticsSection="seo_guides" tone="soft">
      <SectionViewTracker sectionId="seo_guides">
        <SectionHeading
          eyebrow={dict.seoGuides.eyebrow}
          title={dict.seoGuides.title}
          subtitle={dict.seoGuides.subtitle}
          align="left"
        />

        {landing ? (
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{dict.seoGuides.pitch}</p>
        ) : null}

        {featuredGuide ? (
          <Link
            href={guideHref(locale, featuredGuide.slug)}
            className={cn(
              "surface-card mt-8 block border-l-4 border-l-lilac p-6 transition hover:border-border hover:shadow-md sm:p-8",
              landing && "lg:mt-10",
            )}
            onClick={() => trackGuideClick(featuredGuide.slug, featuredGuide.label)}
          >
            <span className="inline-flex rounded-full bg-lilac/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
              {dict.seoGuides.featuredBadge}
            </span>
            <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">{featuredGuide.label}</h3>
            {landing ? (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {dict.seoGuides.featuredTeaser}
              </p>
            ) : null}
            <span className={buttonVariants({ variant: "link", className: "mt-4 px-0 text-ink" })}>
              {dict.blog.readMore}
            </span>
          </Link>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {(landing ? otherGuides : guides).map((guide) => (
            <Link
              key={guide.slug}
              href={guideHref(locale, guide.slug)}
              className="surface-card block px-5 py-4 text-sm font-semibold text-foreground transition hover:border-border hover:text-ink"
              onClick={() => trackGuideClick(guide.slug, guide.label)}
            >
              {guide.label}
            </Link>
          ))}
        </div>

        {landing ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={localeHref(locale, "guides")}
              className={buttonVariants({ variant: "secondary" })}
              onClick={() => {
                trackEvent({
                  event: ANALYTICS_EVENTS.INTERNAL_NAV_CLICK,
                  properties: { locale, target: "guides_hub", source: "seo_guides" },
                });
              }}
            >
              {dict.seoGuides.viewAll}
            </Link>
            <Link
              href={localeHref(locale, "compare")}
              className={buttonVariants({ variant: "outline" })}
              onClick={() => {
                trackEvent({
                  event: ANALYTICS_EVENTS.COMPARE_CTA_CLICK,
                  properties: { locale, source: "seo_guides" },
                });
              }}
            >
              {dict.seoGuides.compareCta}
            </Link>
          </div>
        ) : null}
      </SectionViewTracker>
    </LandingSection>
  );
}