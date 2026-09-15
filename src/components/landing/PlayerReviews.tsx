import { Gamepad2, Languages, Quote, Star, Users } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface PlayerReviewsProps {
  dict: Dictionary;
}

export function PlayerReviews({ dict }: PlayerReviewsProps) {
  const stats = [
    {
      icon: Users,
      value: dict.stats.gamesPlayed,
      label: dict.stats.gamesPlayedLabel,
    },
    {
      icon: Gamepad2,
      value: dict.stats.modes,
      label: dict.stats.modesLabel,
    },
    {
      icon: Languages,
      value: dict.stats.languages,
      label: dict.stats.languagesLabel,
    },
  ];

  return (
    <LandingSection id="reviews">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="surface-card flex flex-col items-center px-4 py-6 text-center"
          >
            <stat.icon className="mb-2 h-5 w-5 text-amber" aria-hidden />
            <p className="text-3xl font-extrabold tracking-tight text-cream">{stat.value}</p>
            <p className="mt-1 text-sm text-lavender">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <SectionHeading title={dict.reviews.title} subtitle={dict.reviews.subtitle} />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {dict.reviews.items.map((review) => (
          <figure key={review.author} className="surface-card relative p-6 sm:p-7">
            <Quote className="absolute right-5 top-5 h-8 w-8 text-amber/20" aria-hidden />
            <div className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed text-cream/85">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-cream/8 pt-4">
              <p className="font-semibold text-cream">{review.author}</p>
              <p className="mt-0.5 text-sm text-lavender">{review.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-cream/55">{dict.stats.developerNote}</p>
    </LandingSection>
  );
}
