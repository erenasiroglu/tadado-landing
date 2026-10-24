import { Star } from "lucide-react";

import { StoreBrandIcon } from "@/components/icons/StoreBrandIcon";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getAppStoreUrl, getPlayStoreUrl } from "@/lib/store-links";
import { getStoreReviewData } from "@/lib/store-reviews";

import { LandingSection } from "./LandingSection";
import { ReviewsCarousel, type ReviewSlide } from "./ReviewsCarousel";
import { SectionHeading } from "./SectionHeading";

interface TestimonialsProps {
  locale: Locale;
  dict: Dictionary;
}

/** Below this many live reviews, the curated store quotes from the dictionary fill the carousel. */
const MIN_LIVE_REVIEWS = 4;

function formatRating(locale: Locale, rating: number) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

function StorePill({
  href,
  platform,
  value,
  label,
  ariaLabel,
}: {
  href: string;
  platform: "ios" | "android";
  value?: string;
  label: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={ariaLabel}
      className="flex min-h-14 items-center gap-3 rounded-2xl surface-paper px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ink text-cream"
        aria-hidden
      >
        <StoreBrandIcon platform={platform} className="size-[1.125rem]" />
      </span>
      <span className="flex flex-col">
        {value ? (
          <span className="flex items-center gap-1.5">
            <span className="text-lg leading-none font-extrabold text-foreground tabular-nums">
              {value}
            </span>
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-ink text-ink" />
              ))}
            </span>
          </span>
        ) : null}
        <span className="mt-0.5 text-xs leading-snug font-semibold text-muted-foreground">
          {label}
        </span>
      </span>
    </a>
  );
}

export async function Testimonials({ locale, dict }: TestimonialsProps) {
  const copy = dict.reviews;
  const { appStore, googlePlay, reviews } = await getStoreReviewData(locale);

  const monthYear = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  });
  const live: ReviewSlide[] = reviews.map((review) => ({
    id: review.id,
    quote: review.quote,
    author: review.author,
    context: `${review.date ? monthYear.format(new Date(review.date)) : ""} · ${review.storefront.toUpperCase()}`,
    source:
      review.store === "appStore" ? copy.sourceLabel : copy.playSourceLabel,
    rating: review.rating,
  }));
  const liveAuthors = new Set(
    live.map((review) => review.author.toLowerCase()),
  );
  const curated: ReviewSlide[] = copy.items
    .filter((item) => !liveAuthors.has(item.author.toLowerCase()))
    .map((item) => ({
      id: `curated-${item.author}`,
      quote: item.quote,
      author: item.author,
      context: item.context,
      source: copy.sourceLabel,
      rating: 5,
    }));
  const slides = live.length >= MIN_LIVE_REVIEWS ? live : [...live, ...curated];

  const formatCount = (count: number) =>
    copy.appStoreCount.replace(
      "{count}",
      new Intl.NumberFormat(locale).format(count),
    );
  const appStoreValue = formatRating(locale, appStore?.rating ?? 5);
  const playValue = googlePlay
    ? formatRating(locale, googlePlay.rating)
    : undefined;

  return (
    <LandingSection id="reviews" analyticsSection="reviews" reveal>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionHeading
            title={copy.title}
            subtitle={copy.subtitle}
            align="left"
          />
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <StorePill
            href={getAppStoreUrl(locale)}
            platform="ios"
            value={appStoreValue}
            label={
              appStore
                ? `App Store · ${formatCount(appStore.count)}`
                : "App Store"
            }
            ariaLabel={copy.appStoreRating.replace("{rating}", appStoreValue)}
          />
          <StorePill
            href={getPlayStoreUrl(locale)}
            platform="android"
            value={playValue}
            label={
              googlePlay
                ? `Google Play · ${formatCount(googlePlay.count)}`
                : copy.playAvailable
            }
            ariaLabel={
              playValue
                ? copy.playRating.replace("{rating}", playValue)
                : undefined
            }
          />
        </div>
      </div>

      <div className="mt-10">
        <ReviewsCarousel items={slides} />
      </div>

      <p className="mt-8 text-center text-xs font-medium tracking-wide text-muted-foreground">
        {dict.stats.developerNote}
      </p>
    </LandingSection>
  );
}
