import Link from "next/link";
import { Check, Minus, X } from "lucide-react";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import {
  getAlternativeHref,
  getAlternativeLinkLabel,
  getRelatedAlternativeIds,
  type AlternativePageContent,
} from "@/lib/alternative-pages";
import { ctaGradientClass } from "@/lib/cta-button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n-config";
import { getAppStoreUrl } from "@/lib/store-links";

import { BackLink } from "./BackLink";

type CellValue = "yes" | "no" | "partial" | string;

function CompareCell({ value, dict }: { value: CellValue; dict: Dictionary }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
        <Check className="h-4 w-4" aria-hidden />
        <span className="sr-only">{dict.a11y.yes}</span>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-300/80">
        <X className="h-4 w-4" aria-hidden />
        <span className="sr-only">{dict.a11y.no}</span>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber/10 text-amber">
        <Minus className="h-4 w-4" aria-hidden />
        <span className="sr-only">{dict.a11y.partial}</span>
      </span>
    );
  }
  return <span className="text-sm text-cream/75">{value}</span>;
}

interface AlternativeDetailContentProps {
  locale: Locale;
  dict: Dictionary;
  content: AlternativePageContent;
}

export function AlternativeDetailContent({ locale, dict, content }: AlternativeDetailContentProps) {
  const downloadUrl = getAppStoreUrl(locale);
  const related = getRelatedAlternativeIds(content.id);
  const hubLabel = locale === "tr" ? "Alternatifler" : "Alternatives";
  const compareLabel = dict.footer.compare;

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
            <Link href={localeHref(locale, "compare")} className="hover:text-amber">
              {compareLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-cream">{content.h1.split(":")[0]?.trim() ?? content.h1}</li>
        </ol>
      </nav>

      <div className="mt-6">
        <BackLink href={localeHref(locale, "compare")}>{dict.compare.back}</BackLink>
      </div>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber/90">{hubLabel}</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
          {content.h1}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-cream/75">{content.heroSubtitle}</p>
      </header>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-bold text-cream">{content.introTitle}</h2>
        {content.introParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="leading-relaxed text-cream/75">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-cream">{content.reasonsTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-cream/75">
          {content.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-cream">{content.compareTitle}</h2>
        <p className="mt-2 text-sm text-cream/60">{content.compareSubtitle}</p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <div className="hidden md:grid md:grid-cols-[1.4fr_1fr_1fr] border-b border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-cream">
            <span>{dict.compare.columns.feature}</span>
            <span className="text-center text-amber">{content.compareColumnTadado}</span>
            <span className="text-center text-cream/60">{content.compareColumnOther}</span>
          </div>
          <ul className="divide-y divide-white/8">
            {content.compareRows.map((row) => (
              <li
                key={row.feature}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_1fr_1fr] md:items-center md:gap-6 md:px-6"
              >
                <p className="text-sm font-medium text-cream md:text-[15px]">{row.feature}</p>
                <div className="flex items-center justify-between gap-3 md:justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber md:hidden">
                    {content.compareColumnTadado}
                  </span>
                  <CompareCell value={row.tadado as CellValue} dict={dict} />
                </div>
                <div className="flex items-center justify-between gap-3 md:justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wide text-cream/50 md:hidden">
                    {content.compareColumnOther}
                  </span>
                  <CompareCell value={row.alternative as CellValue} dict={dict} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-cream/65">{content.compareNote}</p>
      </section>

      {content.faq.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-cream">{content.faqTitle}</h2>
          <dl className="mt-6 space-y-6">
            {content.faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-cream">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-12 rounded-2xl border border-amber/20 bg-amber/[0.06] px-6 py-8">
        <h2 className="text-xl font-bold text-cream">{content.ctaTitle}</h2>
        <p className="mt-3 text-cream/75">{content.ctaBody}</p>
        <TrackedOutboundLink
          href={downloadUrl}
          locale={locale}
          downloadPlatform="ios"
          downloadSource="compare"
          className={ctaGradientClass("mt-6 inline-flex min-h-12 items-center rounded-full px-8 text-sm font-bold")}
        >
          {content.ctaButton}
        </TrackedOutboundLink>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-cream">{content.relatedTitle}</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {related.map((id) => (
            <li key={id}>
              <Link
                href={getAlternativeHref(locale, id)}
                className="text-sm font-semibold text-amber hover:text-amber/80"
              >
                {getAlternativeLinkLabel(locale, id)} →
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={localeHref(locale, "compare")}
              className="text-sm font-semibold text-lavender/90 hover:text-amber"
            >
              {compareLabel} →
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-xs leading-relaxed text-cream/40">{content.disclaimer}</p>
    </article>
  );
}
