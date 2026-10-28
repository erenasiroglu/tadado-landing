import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { Tag } from "@/components/brand/tag";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import {
  getModePage,
  MODE_PAGE_IDS,
  modePageHref,
  modesHubHref,
  type ModePage,
  type ModePageId,
} from "@/lib/mode-pages";

import { CompareDownload } from "../compare/CompareParts";
import { ModeLinkCard } from "./ModeLinkCard";
import { ModePageVisual } from "./ModePageVisual";

interface ModePageContentProps {
  locale: Locale;
  dict: Dictionary;
  id: ModePageId;
  page: ModePage;
}

const fill = (template: string, mode: string) =>
  template.replaceAll("{mode}", mode);

export function ModePageContent({
  locale,
  dict,
  id,
  page,
}: ModePageContentProps) {
  const copy = dict.modePages;
  const others = MODE_PAGE_IDS.filter((other) => other !== id);

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
            <Link href={modesHubHref(locale)} className="hover:text-ink">
              {copy.breadcrumb}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{page.name}</li>
        </ol>
      </nav>

      <header className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
        <div className="min-w-0">
          <Tag>{copy.eyebrow}</Tag>
          <h1 className="mt-5 text-4xl leading-[1.04] font-extrabold tracking-[-0.045em] text-balance text-foreground sm:text-5xl lg:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
            {page.hook}
          </p>
          <dl className="mt-7 grid max-w-xl grid-cols-3 gap-3">
            {page.facts.map((fact) => (
              <div key={fact.label} className="rounded-lg surface-paper p-4">
                <dt className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug font-extrabold text-foreground sm:text-base">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <CompareDownload
            locale={locale}
            dict={dict}
            label={copy.ctaButton}
            source="mode_page"
            className="mt-8"
          />
        </div>
        <div className="min-w-0">
          <ModePageVisual id={id} locale={locale} dict={dict} />
        </div>
      </header>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-3xl leading-[1.08] font-extrabold tracking-[-0.04em] text-balance text-foreground sm:text-4xl">
          {fill(copy.stepsTitle, page.name)}
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {page.steps.map((step, index) => (
            <li key={step.title} className="rounded-lg surface-paper p-7">
              <span
                className="flex size-8 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-cream tabular-nums"
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-[-0.02em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-lg surface-obsidian p-7 sm:p-10 lg:mt-20 lg:p-12">
        <h2 className="text-3xl leading-[1.08] font-extrabold tracking-[-0.04em] text-balance text-cream sm:text-4xl">
          {fill(copy.featuresTitle, page.name)}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {page.features.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-lg font-extrabold tracking-[-0.02em] text-cream">
                {feature.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/75">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
            {copy.knownAsTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {page.knownAs}
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-2.5 lg:pt-14">
          {page.aliases.map((alias) => (
            <li
              key={alias}
              className="rounded-full bg-mist px-4 py-2 text-sm font-bold text-ink ring-1 ring-ink/10 ring-inset"
            >
              {alias}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {fill(copy.faqTitle, page.name)}
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
            source="mode_page"
            dark
          />
        </div>
      </section>

      <section className="mt-16 lg:mt-20">
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {copy.otherTitle}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((other) => {
            const otherPage = getModePage(locale, other);
            return (
              <li key={other}>
                <ModeLinkCard
                  href={modePageHref(locale, other)}
                  eyebrow={copy.eyebrow}
                  title={otherPage.name}
                  body={otherPage.tagline}
                  cta={copy.explore}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        {copy.disclaimer}
      </p>
    </article>
  );
}
