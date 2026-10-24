import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";

import { Tag } from "@/components/brand/tag";
import {
  getAlternativeHref,
  getAlternativeLinkLabel,
  SEO_ALTERNATIVE_IDS,
} from "@/lib/alternative-pages";
import {
  gameComparisonHref,
  getGameComparisons,
  type GameComparison,
} from "@/lib/game-comparisons";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { CompareDownload, CompareLinkCard, VersusCard } from "./CompareParts";
import { ComparisonTable } from "./ComparisonTable";

interface GameComparisonContentProps {
  locale: Locale;
  dict: Dictionary;
  page: GameComparison;
}

const fill = (template: string, game: string) =>
  template.replaceAll("{game}", game);

function PickList({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[0.9375rem] leading-relaxed"
        >
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-cream text-ink" : "bg-ink/10 text-ink",
            )}
            aria-hidden
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-cream/85" : "text-foreground/80"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function GameComparisonContent({
  locale,
  dict,
  page,
}: GameComparisonContentProps) {
  const copy = dict.compareHub;
  const cellLabels = {
    yes: dict.a11y.yes,
    no: dict.a11y.no,
    partial: dict.a11y.partial,
    varies: copy.varies,
  };
  const related = getGameComparisons(locale).filter(
    (item) => item.slug !== page.slug,
  );

  return (
    <article>
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={localeHref(locale)} className="hover:text-ink">
              Tadado
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={localeHref(locale, "compare")}
              className="hover:text-ink"
            >
              {dict.footer.compare}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{page.game}</li>
        </ol>
      </nav>

      <header className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
        <div>
          <Tag>{copy.eyebrow}</Tag>
          <h1 className="mt-5 text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
            {page.hook}
          </p>
          <CompareDownload
            locale={locale}
            dict={dict}
            label={copy.ctaButton}
            className="mt-8"
          />
        </div>
        <VersusCard game={page.game} dict={dict} />
      </header>

      <section
        className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20"
        aria-label={page.h1}
      >
        <div className="rounded-lg surface-paper p-7 sm:p-8">
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-foreground">
            {fill(copy.pickThem, page.game)}
          </h2>
          <PickList items={page.pickThem} />
        </div>
        <div className="rounded-lg surface-obsidian p-7 sm:p-8">
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-cream">
            {copy.pickTadado}
          </h2>
          <PickList items={page.pickTadado} dark />
        </div>
      </section>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-3xl leading-[1.08] font-extrabold tracking-[-0.04em] text-balance text-foreground sm:text-4xl">
          {fill(copy.tableHeading, page.game)}
        </h2>
        <div className="mt-8">
          <ComparisonTable
            rows={page.rows}
            featureLabel={copy.feature}
            tadadoLabel="Tadado"
            otherLabel={page.game}
            labels={cellLabels}
          />
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
            {fill(copy.aboutTitle, page.game)}
          </h2>
          <div className="mt-5 space-y-4">
            {page.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-lg surface-paper p-7 sm:p-8">
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-foreground">
            {fill(copy.stepsTitle, page.game)}
          </h2>
          <ol className="mt-6 space-y-5">
            {page.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-cream tabular-nums"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <p className="pt-1 text-[0.9375rem] leading-relaxed text-foreground/80">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {fill(copy.faqTitle, page.game)}
        </h2>
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-lg surface-paper">
          {page.faq.map((item, index) => (
            <details key={item.q} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold text-foreground sm:px-7 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground sm:px-7">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-lg surface-obsidian lg:mt-20">
        <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-12">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-[1.05] font-extrabold tracking-[-0.04em] text-balance text-cream sm:text-4xl">
              {copy.ctaTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/75">
              {copy.ctaBody}
            </p>
          </div>
          <CompareDownload
            locale={locale}
            dict={dict}
            label={copy.ctaButton}
            dark
          />
        </div>
      </section>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {copy.relatedTitle}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <CompareLinkCard
                href={gameComparisonHref(locale, item.slug)}
                title={item.game}
                body={item.tagline}
                cta={copy.compareLink}
              />
            </li>
          ))}
          {SEO_ALTERNATIVE_IDS.slice(0, Math.max(0, 6 - related.length)).map(
            (id) => (
              <li key={id}>
                <CompareLinkCard
                  href={getAlternativeHref(locale, id)}
                  title={getAlternativeLinkLabel(locale, id)}
                  body={copy.classicTitle}
                  cta={copy.compareLink}
                />
              </li>
            ),
          )}
        </ul>
      </section>

      <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        {fill(copy.disclaimer, page.game)}
      </p>
    </article>
  );
}
