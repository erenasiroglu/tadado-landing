import { ArrowRight, Fingerprint, Gift, Moon, Smartphone } from "lucide-react";
import Link from "next/link";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { LandingSection } from "@/components/landing/LandingSection";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getSmartStoreUrl } from "@/lib/store-links";

import { AppTabooCard } from "./AppTabooCard";
import { HalloweenDecor } from "./HalloweenDecor";
import { HalloweenDeckCard } from "./HalloweenDeckCard";

interface HalloweenEventProps {
  locale: Locale;
  dict: Dictionary;
}

/** Halloween event: the free deck and the three modes, with cards drawn like the app's Halloween skin. */
export function HalloweenEvent({ locale, dict }: HalloweenEventProps) {
  const copy = dict.halloween;

  const features = [
    { icon: Gift, title: copy.deckTitle, body: copy.deckBody },
    { icon: Fingerprint, title: copy.imposterTitle, body: copy.imposterBody },
    { icon: Smartphone, title: copy.headsUpTitle, body: copy.headsUpBody },
  ];

  return (
    <LandingSection id="halloween" analyticsSection="halloween_event" density="compact" reveal>
      <div className="halloween-event relative isolate overflow-hidden rounded-lg">
        <HalloweenDecor tone="dark" />
        <div className="relative grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14 lg:p-14">
          <div className="min-w-0">
            <span className="halloween-tag">
              <Moon aria-hidden />
              {copy.tag}
            </span>
            <h2 className="mt-6 max-w-xl text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-cream sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg sm:leading-relaxed">{copy.body}</p>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-2.5">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="halloween-stat">
                  <dt className="order-2 mt-1 text-xs font-semibold text-cream/60">{stat.label}</dt>
                  <dd className="order-1 text-2xl leading-none font-black tracking-[-0.03em] text-cream">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 grid max-w-xl gap-3">
              {features.map(({ icon: Icon, title, body }) => (
                <li key={title} className="halloween-feature flex items-start gap-4">
                  <span className="halloween-feature__icon shrink-0">
                    <Icon aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-extrabold tracking-[-0.02em] text-cream">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/65">{body}</p>
                  </div>
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
              <Link
                href={localeHref(locale, "halloween")}
                className="inline-flex min-h-12 w-fit items-center rounded-full px-5 text-sm font-bold text-cream/80 underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {copy.guideCta}
              </Link>
            </div>
            <p className="mt-6 text-sm text-cream/55">{copy.note}</p>
          </div>

          <HalloweenCardFan copy={copy.card} />
        </div>
      </div>
    </LandingSection>
  );
}

function HalloweenCardFan({ copy }: { copy: Dictionary["halloween"]["card"] }) {
  return (
    <div className="halloween-fan" aria-hidden>
      <HalloweenDeckCard copy={copy} size="md" className="halloween-fan__deck" />
      <div className="halloween-fan__role">
        <span className="halloween-fan__agent">{copy.imposterLabel}</span>
        <span className="halloween-fan__fingerprint">
          <Fingerprint strokeWidth={1.5} />
        </span>
        <p className="mt-4 text-center text-lg leading-tight font-extrabold tracking-[-0.02em] text-cream">
          {copy.imposterRole}
        </p>
      </div>
      <AppTabooCard
        word={copy.word}
        forbidden={copy.forbidden}
        tabLabel={copy.round}
        className="halloween-fan__taboo"
      />
    </div>
  );
}
