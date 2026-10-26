import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { LandingSection } from "@/components/landing/LandingSection";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getSmartStoreUrl } from "@/lib/store-links";

import { AppTabooCard } from "./AppTabooCard";
import { HalloweenDeckCard } from "./HalloweenDeckCard";

interface HalloweenEventProps {
  locale: Locale;
  dict: Dictionary;
}

/** Halloween event: the free deck and the new modes in one compact card. */
export function HalloweenEvent({ locale, dict }: HalloweenEventProps) {
  const copy = dict.halloween;
  const modes = [copy.deckTitle, copy.imposterTitle, copy.headsUpTitle];

  return (
    <LandingSection id="halloween" analyticsSection="halloween_event" density="compact" reveal>
      <div className="halloween-event relative isolate overflow-hidden rounded-lg">
        <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 lg:px-12 lg:py-11">
          <div className="min-w-0">
            <span className="halloween-tag">{copy.tag}</span>
            <h2 className="mt-5 max-w-xl text-3xl leading-[1.06] font-extrabold tracking-[-0.04em] text-balance text-cream sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">{copy.body}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {modes.map((mode) => (
                <li key={mode} className="halloween-pill">
                  {mode}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center">
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
              <Link
                href={localeHref(locale, "halloween")}
                className="inline-flex min-h-12 w-fit items-center rounded-full px-5 text-sm font-bold text-cream/75 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {copy.guideCta}
              </Link>
            </div>
          </div>

          <div className="halloween-fan hidden sm:block" aria-hidden>
            <HalloweenDeckCard copy={copy.card} className="halloween-fan__deck" />
            <AppTabooCard
              word={copy.card.word}
              forbidden={copy.card.forbidden}
              tabLabel={copy.card.round}
              className="halloween-fan__taboo"
            />
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
