import { Star } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { SectionHeading } from "./SectionHeading";

interface TestimonialsProps {
  dict: Dictionary;
}

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <LandingSection id="reviews" analyticsSection="reviews" reveal>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionHeading
            title={dict.reviews.title}
            subtitle={dict.reviews.subtitle}
            align="left"
          />
        </div>

        <div
          className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
          aria-label={dict.reviews.appStoreRating}
        >
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tabular-nums leading-none text-cream">
                5.0
              </span>
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
            </div>
            <p className="text-xs font-medium leading-snug text-cream/55">
              {dict.reviews.appStoreRating}
              <span className="text-cream/35"> · </span>
              {dict.reviews.appStoreCount}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ReviewsCarousel items={dict.reviews.items} sourceLabel={dict.reviews.sourceLabel} />
      </div>

      <p className="mt-8 text-center text-xs font-medium tracking-wide text-cream/40">
        {dict.stats.developerNote}
      </p>
    </LandingSection>
  );
}
