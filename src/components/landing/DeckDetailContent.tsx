import Image from "next/image";
import Link from "next/link";

import { BackLink } from "@/components/landing/BackLink";
import { DeckStoreCta } from "@/components/landing/DeckStoreCta";
import {
  buildDeckOverlayStyle,
  DECK_CARD_CONFIGS,
  type DeckKey,
} from "@/lib/deck-cards";
import { getDecksHubHref, getRelatedDeckKeys, isFreeDeck } from "@/lib/deck-catalog";
import { getDeckPageContent } from "@/lib/deck-seo-content";
import { deckSlugFor } from "@/lib/deck-slugs";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n-config";

interface DeckDetailContentProps {
  locale: Locale;
  deckKey: DeckKey;
  dict: Dictionary;
}

function relatedLinkLabel(locale: Locale, deckName: string): string {
  if (locale === "tr") return `${deckName} destesini keşfet`;
  if (locale === "es") return `Explorar mazo ${deckName}`;
  if (locale === "de") return `${deckName} Deck entdecken`;
  if (locale === "fr") return `Découvrir le paquet ${deckName}`;
  return `Explore ${deckName} party cards`;
}

export function DeckDetailContent({ locale, deckKey, dict }: DeckDetailContentProps) {
  const content = getDeckPageContent(locale, deckKey);
  const config = DECK_CARD_CONFIGS[deckKey];
  const item = dict.decks.items[deckKey];
  const free = isFreeDeck(deckKey);
  const related = getRelatedDeckKeys(deckKey);

  const hubLabel =
    locale === "tr" ? "Desteler" : locale === "de" ? "Decks" : locale === "fr" ? "Paquets" : "Decks";

  return (
    <article className="max-w-3xl">
      <nav className="text-sm text-lavender/80" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={localeHref(locale)} className="hover:text-amber">
              Tadado
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={getDecksHubHref(locale)} className="hover:text-amber">
              {hubLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-cream">{item.name}</li>
        </ol>
      </nav>

      <div className="mt-6">
        <BackLink href={getDecksHubHref(locale)}>
          {locale === "tr" ? "Tüm desteler" : "All decks"}
        </BackLink>
      </div>

      <header className="mt-8">
        <div
          className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden"
          style={{ borderRadius: 20, backgroundColor: config.illustrationBackgroundColor }}
        >
          <Image
            src={config.image}
            alt={content.imageAlt}
            fill
            className="object-cover"
            style={{
              objectPosition: config.objectPosition ?? "center",
              transform: `scale(${config.illustrationScale})`,
            }}
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <div className="absolute inset-0" style={buildDeckOverlayStyle(config)} />
        </div>
        <h1 className="mt-8 text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
          {content.h1}
        </h1>
        <p className="mt-4 text-lg text-cream/75">{content.heroSubtitle}</p>
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-bold text-cream">{content.whatIsTitle}</h2>
        <p className="leading-relaxed text-cream/75">{content.whatIsBody}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-cream">{content.insideTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-cream/75">
          {content.insideBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-cream">{content.samplesTitle}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {content.sampleWords.map((word) => (
            <li
              key={word}
              className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-lavender"
            >
              {word}
            </li>
          ))}
        </ul>
      </section>

      {content.faq?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-cream">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {content.faq.map((item) => (
              <div key={item.q} className="surface-card p-4">
                <dt className="font-semibold text-cream">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-12 surface-card p-6 sm:p-8">
        <h2 className="text-xl font-bold text-cream">{content.playTitle}</h2>
        <p className="mt-2 text-cream/75">{content.playBody}</p>
        <div className="mt-6">
          <DeckStoreCta
            deckKey={deckKey}
            deckName={item.name}
            isFree={free}
            locale={locale}
            primaryLabel={dict.decks.play}
            appStoreLabel={dict.a11y.downloadOnAppStore}
            playStoreLabel={dict.a11y.getOnGooglePlay}
          />
        </div>
        {!free ? (
          <p className="mt-4 text-sm text-cream/50">
            {dict.decks.price} · {dict.pricing.disclaimer}
          </p>
        ) : (
          <p className="mt-4 text-sm font-semibold text-amber">{dict.decks.free}</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-cream">{content.relatedSectionTitle}</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {related.map((key) => {
            const relatedItem = dict.decks.items[key];
            const href = `/${locale}/decks/${deckSlugFor(locale, key)}`;
            return (
              <li key={key}>
                <Link href={href} className="font-semibold text-amber hover:text-amber/80">
                  {relatedLinkLabel(locale, relatedItem.name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
