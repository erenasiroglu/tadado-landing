import { ArrowRight, Ban, Fingerprint, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { StoreButtons } from "@/components/landing/primitives/StoreButton";
import { AppTabooCard } from "@/components/seasonal/AppTabooCard";
import { HalloweenDeckCard } from "@/components/seasonal/HalloweenDeckCard";
import { getArticleSlug } from "@/lib/article-registry";
import { BRAND } from "@/lib/brand";
import { gameComparisonHref, getGameComparisons } from "@/lib/game-comparisons";
import { getHalloweenSamples } from "@/lib/halloween-samples";
import { blogHref, hasLocale, localeHref, LOCALES, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/i18n-server";
import { isHalloweenSeason } from "@/lib/season";
import { buildHalloweenPageJsonLd, buildLanguageAlternates } from "@/lib/seo";
import { getSmartStoreUrl } from "@/lib/store-links";

const MODE_ICONS = { taboo: Ban, headsup: Smartphone, imposter: Fingerprint } as const;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/halloween">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const page = dict.halloweenPage;
  const canonical = `${BRAND.domain}/${lang}/halloween`;

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical, languages: buildLanguageAlternates("halloween") },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      siteName: BRAND.name,
      locale: lang,
      type: "website",
      images: [{ url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

/** Evergreen Halloween landing page; the in-app event note only shows while the season runs. */
export default async function HalloweenPage({ params }: PageProps<"/[lang]/halloween">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const page = dict.halloweenPage;
  const card = dict.halloween.card;
  const samples = getHalloweenSamples(locale);
  const inSeason = isHalloweenSeason();
  const guideSlug = getArticleSlug("halloween-party-games", locale);
  const imposterCompare = getGameComparisons(locale).find((item) => item.id === "impostor");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHalloweenPageJsonLd(locale, dict)) }}
      />
      <Header locale={locale} dict={dict} dark />
      <main className="flex-1">
        <section className="halloween-hero relative isolate overflow-hidden">
          <div className="section-shell relative z-[2] grid items-center gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-24">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb" className="text-sm font-semibold text-cream/60">
                <Link href={localeHref(locale)} className="hover:text-cream">
                  {BRAND.name}
                </Link>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <span className="text-cream/85">{page.breadcrumb}</span>
              </nav>
              <p className="halloween-hero__eyebrow mt-8">{page.eyebrow}</p>
              <h1 className="halloween-hero__title mt-5 max-w-[14ch] text-cream">{page.h1}</h1>
              <p id="halloween-answer" className="mt-6 max-w-xl text-lg leading-relaxed text-[#E4DAFF]">
                {page.answer}
              </p>
              <StoreButtons
                locale={locale}
                source="halloween_event"
                a11y={dict.a11y}
                labelMode="short"
                className="mt-8 flex-row"
              />
              {inSeason ? <p className="mt-5 text-sm text-cream/55">{page.seasonNote}</p> : null}
            </div>
            <div className="halloween-page-fan" aria-hidden>
              <HalloweenDeckCard copy={card} size="md" className="halloween-page-fan__deck" />
              <AppTabooCard
                word={samples[0]?.word ?? card.word}
                forbidden={samples[0]?.forbidden ?? card.forbidden}
                tabLabel={card.round}
                className="halloween-page-fan__card"
              />
            </div>
          </div>
        </section>

        <section className="section-shell -mt-8 relative z-[3]">
          <h2 className="sr-only">{page.factsTitle}</h2>
          <dl className="halloween-facts">
            {page.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section-shell section-gap">
          <h2 className="halloween-h2">{page.modesTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{page.modesSubtitle}</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {page.modes.map((mode) => {
              const Icon = MODE_ICONS[mode.id as keyof typeof MODE_ICONS] ?? Ban;
              return (
                <li key={mode.id} className="halloween-mode-card">
                  <span className="halloween-mode-card__icon">
                    <Icon aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.02em]">{mode.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{mode.body}</p>
                  <p className="mt-5 text-sm font-bold text-[#7E5FE0]">{mode.best}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="halloween-samples-band section-gap">
          <div className="section-shell">
            <h2 className="halloween-h2 text-cream">{page.samplesTitle}</h2>
            <p className="mt-3 max-w-2xl text-lg text-cream/70">{page.samplesSubtitle}</p>
            <ul className="halloween-samples mt-10">
              {samples.map((sample) => (
                <li key={sample.word}>
                  <AppTabooCard word={sample.word} forbidden={sample.forbidden} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell section-gap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="halloween-h2">{page.hostTitle}</h2>
            <ol className="mt-8 grid gap-3">
              {page.hostSteps.map((step, index) => (
                <li key={step.title} className="halloween-step">
                  <span className="halloween-step__num">{index + 1}</span>
                  <div>
                    <h3 className="text-base font-extrabold">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="halloween-h2">{page.ideasTitle}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.ideas.map((idea) => (
                <li key={idea.title} className="halloween-idea">
                  <h3 className="text-base font-extrabold">{idea.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{idea.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="landing-section-band landing-section-band--mist section-gap">
          <div className="section-shell grid gap-10 lg:grid-cols-5">
            <h2 className="halloween-h2 lg:col-span-2">{page.faqTitle}</h2>
            <div className="grid gap-3 lg:col-span-3">
              {page.faq.map((item) => (
                <details key={item.q} className="halloween-faq group">
                  <summary>
                    {item.q}
                    <span aria-hidden className="halloween-faq__plus" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-gap">
          <div className="halloween-event relative isolate overflow-hidden rounded-lg p-8 text-center sm:p-14">
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-balance text-cream sm:text-5xl">
                {page.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">{page.ctaBody}</p>
              <TrackedOutboundLink
                href={getSmartStoreUrl(locale)}
                locale={locale}
                downloadPlatform="ios"
                downloadSource="halloween_event"
                className="halloween-cta mx-auto mt-8"
              >
                {page.ctaButton}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </TrackedOutboundLink>
            </div>
          </div>

          <nav aria-label={page.related} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold">
            <span className="text-muted-foreground">{page.related}:</span>
            {guideSlug ? (
              <Link href={`${blogHref(locale)}/${guideSlug}`} className="underline-offset-4 hover:underline">
                {dict.halloween.guideCta}
              </Link>
            ) : null}
            {imposterCompare ? (
              <Link href={gameComparisonHref(locale, imposterCompare.slug)} className="underline-offset-4 hover:underline">
                {imposterCompare.h1}
              </Link>
            ) : null}
            <Link href={localeHref(locale, "decks")} className="underline-offset-4 hover:underline">
              {dict.ui.exploreAllDecks}
            </Link>
          </nav>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
