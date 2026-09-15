import Link from "next/link";

import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getSeoGuides } from "@/lib/seo-guides";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface SeoGuidesProps {
  locale: Locale;
  dict: Dictionary;
}

export function SeoGuides({ locale, dict }: SeoGuidesProps) {
  const guides = getSeoGuides(locale);

  return (
    <LandingSection id="guides">
      <SectionHeading title={dict.seoGuides.title} subtitle={dict.seoGuides.subtitle} align="left" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={localeHref(locale, `blog/${guide.slug}`)}
            className="surface-card block px-5 py-4 text-sm font-semibold text-cream transition hover:border-amber/30 hover:text-amber"
          >
            {guide.label}
          </Link>
        ))}
      </div>
    </LandingSection>
  );
}
