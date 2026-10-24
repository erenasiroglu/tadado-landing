import Link from "next/link";

import { Tag } from "@/components/brand/tag";
import {
  getAlternativeHref,
  getAlternativeLinkLabel,
  getRelatedAlternativeIds,
  type AlternativePageContent,
} from "@/lib/alternative-pages";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n-config";

import { BackLink } from "./BackLink";
import { CompareDownload, VersusCard } from "./compare/CompareParts";
import { ComparisonTable } from "./compare/ComparisonTable";

interface AlternativeDetailContentProps {
  locale: Locale;
  dict: Dictionary;
  content: AlternativePageContent;
}

export function AlternativeDetailContent({
  locale,
  dict,
  content,
}: AlternativeDetailContentProps) {
  const related = getRelatedAlternativeIds(content.id);
  const hubLabel = dict.ui.alternativesHub;
  const compareLabel = dict.footer.compare;

  return (
    <article className="max-w-5xl">
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
              {compareLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">
            {content.h1.split(":")[0]?.trim() ?? content.h1}
          </li>
        </ol>
      </nav>

      <div className="mt-6">
        <BackLink href={localeHref(locale, "compare")}>
          {dict.compare.back}
        </BackLink>
      </div>

      <header className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
        <div>
          <Tag>{hubLabel}</Tag>
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-[-0.045em] text-balance text-foreground sm:text-5xl">
            {content.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {content.heroSubtitle}
          </p>
          <CompareDownload
            locale={locale}
            dict={dict}
            label={content.ctaButton}
            className="mt-8"
          />
        </div>
        <VersusCard game={content.compareColumnOther} dict={dict} />
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          {content.introTitle}
        </h2>
        {content.introParagraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground">
          {content.reasonsTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {content.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground">
          {content.compareTitle}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.compareSubtitle}
        </p>

        <div className="mt-6">
          <ComparisonTable
            rows={content.compareRows.map((row) => ({
              feature: row.feature,
              tadado: row.tadado,
              other: row.alternative,
            }))}
            featureLabel={dict.compare.columns.feature}
            tadadoLabel={content.compareColumnTadado}
            otherLabel={content.compareColumnOther}
            labels={{
              yes: dict.a11y.yes,
              no: dict.a11y.no,
              partial: dict.a11y.partial,
              varies: dict.compareHub.varies,
            }}
          />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {content.compareNote}
        </p>
      </section>

      {content.faq.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">
            {content.faqTitle}
          </h2>
          <dl className="mt-6 space-y-6">
            {content.faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-foreground">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-12 overflow-hidden rounded-lg surface-obsidian p-7 sm:p-10">
        <h2 className="text-2xl leading-tight font-extrabold tracking-[-0.03em] text-cream sm:text-3xl">
          {content.ctaTitle}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-cream/75">
          {content.ctaBody}
        </p>
        <CompareDownload
          locale={locale}
          dict={dict}
          label={content.ctaButton}
          className="mt-7"
          dark
        />
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">
          {content.relatedTitle}
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {related.map((id) => (
            <li key={id}>
              <Link
                href={getAlternativeHref(locale, id)}
                className="text-sm font-semibold text-ink hover:text-muted-foreground"
              >
                {getAlternativeLinkLabel(locale, id)} →
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={localeHref(locale, "compare")}
              className="text-sm font-semibold text-muted-foreground hover:text-ink"
            >
              {compareLabel} →
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
        {content.disclaimer}
      </p>
    </article>
  );
}
