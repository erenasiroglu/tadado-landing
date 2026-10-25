import { ArrowRight, Drama, Gift, Moon } from "lucide-react";
import Link from "next/link";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { LandingSection } from "@/components/landing/LandingSection";
import { getArticleSlug } from "@/lib/article-registry";
import { blogHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getSmartStoreUrl } from "@/lib/store-links";

import { Bat, HalloweenDecor } from "./HalloweenDecor";

interface HalloweenEventProps {
  locale: Locale;
  dict: Dictionary;
}

/** Halloween season banner: free Halloween deck + the new Imposter mode, in the app's pumpkin-on-midnight skin. */
export function HalloweenEvent({ locale, dict }: HalloweenEventProps) {
  const copy = dict.halloween;
  const guideSlug = getArticleSlug("halloween-party-games", locale);

  const features = [
    { icon: Gift, title: copy.deckTitle, body: copy.deckBody },
    { icon: Drama, title: copy.imposterTitle, body: copy.imposterBody },
  ];

  return (
    <LandingSection id="halloween" analyticsSection="halloween_event" density="compact" reveal>
      <div className="halloween-event relative isolate overflow-hidden rounded-lg">
        <HalloweenDecor tone="dark" />
        <div className="relative grid items-center gap-12 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:p-14">
          <div className="max-w-xl">
            <span className="halloween-tag">
              <Moon aria-hidden />
              {copy.tag}
            </span>
            <h2 className="mt-6 text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-cream sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg sm:leading-relaxed">{copy.body}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, body }) => (
                <li key={title} className="halloween-feature">
                  <span className="halloween-feature__icon">
                    <Icon aria-hidden />
                  </span>
                  <p className="mt-4 text-base font-extrabold tracking-[-0.02em] text-cream">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/65">{body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedOutboundLink
                href={getSmartStoreUrl(locale)}
                locale={locale}
                downloadPlatform="ios"
                downloadSource="halloween_event"
                className="halloween-cta"
              >
                {copy.cta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </TrackedOutboundLink>
              {guideSlug ? (
                <Link
                  href={`${blogHref(locale)}/${guideSlug}`}
                  className="inline-flex min-h-12 w-fit items-center rounded-full px-5 text-sm font-bold text-cream/80 underline-offset-4 transition-colors hover:text-cream hover:underline"
                >
                  {copy.guideCta}
                </Link>
              ) : null}
            </div>
            <p className="mt-6 text-sm text-cream/55">{copy.note}</p>
          </div>

          <HalloweenCards copy={copy.card} />
        </div>
      </div>
    </LandingSection>
  );
}

function HalloweenCards({ copy }: { copy: Dictionary["halloween"]["card"] }) {
  return (
    <div className="relative mx-auto h-[24rem] w-full max-w-[19rem] sm:h-[26rem] sm:max-w-[21rem] lg:max-w-none" aria-hidden>
      {/* Back card: the Imposter role reveal. */}
      <div className="halloween-card halloween-card--back">
        <p className="halloween-card__label text-end">{copy.imposterLabel}</p>
        <div className="mt-5 flex flex-col items-end text-end">
          <span className="text-6xl leading-none font-black text-[#F2711C]">?</span>
          <p className="mt-3 max-w-[52%] text-lg leading-tight font-extrabold tracking-[-0.02em] text-cream">
            {copy.imposterRole}
          </p>
          <p className="mt-1.5 max-w-[48%] text-xs font-semibold text-cream/60">{copy.imposterHint}</p>
        </div>
      </div>

      {/* Front card: a word from the free Halloween deck, styled like the in-game card. */}
      <div className="halloween-card halloween-card--front">
        <div className="flex items-center justify-between gap-2">
          <p className="halloween-card__label">{copy.deck}</p>
          <span className="rounded-full bg-[#F2711C] px-2.5 py-1 text-[0.625rem] leading-none font-extrabold tracking-[0.08em] text-ink uppercase">
            {copy.free}
          </span>
        </div>
        <div className="mt-6 flex flex-1 flex-col">
          <p className="text-[2rem] leading-none font-black tracking-[-0.04em] text-cream uppercase">{copy.word}</p>
          <div className="my-5 h-px w-full bg-cream/12" />
          <ul className="flex flex-col gap-2.5">
            {copy.forbidden.map((word) => (
              <li key={word} className="text-base font-bold text-cream/70">
                {word}
              </li>
            ))}
          </ul>
        </div>
        <Bat className="absolute right-5 bottom-5 w-9 text-[#F2711C]/70" />
      </div>
    </div>
  );
}
