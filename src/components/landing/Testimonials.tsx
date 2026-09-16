import { Quote } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface TestimonialsProps {
  dict: Dictionary;
}

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <LandingSection id="reviews" analyticsSection="reviews" reveal>
      <SectionHeading title={dict.reviews.title} subtitle={dict.reviews.subtitle} />
      <p className="mx-auto mt-4 max-w-md text-center text-sm text-lavender">
        {dict.reviews.appStoreRating} · {dict.reviews.appStoreCount}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {dict.reviews.items.map((review) => (
          <figure key={review.author} className="surface-card relative p-6 sm:p-7">
            <Quote className="absolute right-5 top-5 h-8 w-8 text-amber/20" aria-hidden />
            <blockquote className="text-base leading-relaxed text-cream/85">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-cream/8 pt-4">
              <p className="font-semibold text-cream">{review.author}</p>
              <p className="mt-0.5 text-sm text-lavender">
                {review.context} · {dict.reviews.sourceLabel}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-cream/55">{dict.stats.developerNote}</p>
    </LandingSection>
  );
}
