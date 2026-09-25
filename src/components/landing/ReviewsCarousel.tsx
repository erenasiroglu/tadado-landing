"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ReviewItem = Dictionary["reviews"]["items"][number];

interface ReviewsCarouselProps {
  items: ReviewItem[];
  sourceLabel: string;
}

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber sm:h-4 sm:w-4" />
      ))}
    </div>
  );
}

export function ReviewsCarousel({ items, sourceLabel }: ReviewsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 6500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      containScroll: "trimSnaps",
      loop: items.length > 1,
    },
    reduceMotion || items.length <= 1 ? [] : [autoplayPlugin],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    function onSelect() {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (items.length === 0) return null;

  return (
    <div className="reviews-carousel">
      <div ref={emblaRef} className="reviews-carousel__viewport">
        <div className="reviews-carousel__container flex">
          {items.map((review) => (
            <div key={review.author} className="reviews-carousel__slide">
              <figure className="mx-auto flex h-full w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-7 sm:px-8 sm:py-8">
                <Stars />
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-cream sm:text-lg sm:leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-5">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-cream">{review.author}</p>
                    <p className="mt-0.5 text-sm text-cream/50">{review.context}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream/55">
                    {sourceLabel}
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselIconButton label="Previous review" onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </CarouselIconButton>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Reviews">
            {items.map((review, index) => (
              <button
                key={review.author}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Review ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === selectedIndex ? "w-7 bg-amber" : "w-1.5 bg-white/25 hover:bg-white/40",
                )}
              />
            ))}
          </div>

          <CarouselIconButton label="Next review" onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </CarouselIconButton>
        </div>
      ) : null}
    </div>
  );
}

function CarouselIconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-cream transition-colors hover:border-amber/40 hover:bg-white/[0.08] hover:text-amber"
    >
      {children}
    </button>
  );
}
