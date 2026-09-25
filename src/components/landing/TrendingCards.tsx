"use client";

import Link from "next/link";

import { primarySolidClass } from "@/lib/cta-button";
import type { Dictionary } from "@/lib/i18n";
import { blogHref, localeHref, type Locale } from "@/lib/i18n-config";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";
import { TrendingCardsGrid } from "./TrendingCardsGrid";

interface TrendingCardsProps {
  locale: Locale;
  dict: Dictionary;
}

const FEATURED_PER_MODE = 2;

export function TrendingCards({ locale, dict }: TrendingCardsProps) {
  return (
    <LandingSection id="trending" reveal>
      <SectionViewTracker sectionId="trending">
        <SectionHeading
          title={dict.trending.title}
          subtitle={dict.trending.subtitle}
          align="left"
        />

        <div className="mt-10">
          <TrendingCardsGrid locale={locale} dict={dict} maxPerMode={FEATURED_PER_MODE} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href={localeHref(locale, "trending")} className={primarySolidClass("h-9 px-4 text-sm")}>
            {dict.trending.allCards}
          </Link>
          <Link
            href={blogHref(locale)}
            className="text-sm font-semibold text-lavender hover:text-amber"
          >
            {dict.trending.compare.guides}
          </Link>
        </div>
      </SectionViewTracker>
    </LandingSection>
  );
}
