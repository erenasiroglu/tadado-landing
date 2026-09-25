"use client";

import { useReducedMotion } from "motion/react";

import type { Locale } from "@/lib/i18n-config";
import { LOCALES } from "@/lib/i18n-config";
import { LANGUAGE_DISPLAY } from "@/lib/languages";
import { cn } from "@/lib/utils";

interface LanguageDistributionProps {
  title: string;
  caption: string;
  currentLocale: Locale;
}

function LanguagePill({ locale, isActive }: { locale: Locale; isActive: boolean }) {
  const language = LANGUAGE_DISPLAY[locale];

  return (
    <span
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium leading-none",
        isActive
          ? "border-amber/45 bg-amber/12 text-cream"
          : "border-white/10 bg-white/[0.04] text-cream/85",
      )}
    >
      <span className="text-base leading-none" aria-hidden>
        {language.flag}
      </span>
      <span className="whitespace-nowrap">{language.label}</span>
    </span>
  );
}

function MarqueeGroup({
  currentLocale,
  ariaLabel,
  ariaHidden,
}: {
  currentLocale: Locale;
  ariaLabel?: string;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="language-marquee__group flex shrink-0 items-center gap-2 pr-2"
      role="list"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden || undefined}
    >
      {LOCALES.map((locale) => (
        <li key={locale}>
          <LanguagePill locale={locale} isActive={locale === currentLocale} />
        </li>
      ))}
    </ul>
  );
}

export function LanguageDistribution({ title, caption, currentLocale }: LanguageDistributionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-white/10">
      <div className="px-4 pb-3 pt-4 sm:px-6">
        <h3 className="text-sm font-bold tracking-tight text-cream sm:text-base">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-cream/60 sm:line-clamp-1">{caption}</p>
      </div>

      <div
        className={cn("language-marquee pb-4", reduceMotion && "language-marquee--static")}
        aria-hidden={reduceMotion ? undefined : true}
      >
        <div className="language-marquee__viewport overflow-hidden">
          {reduceMotion ? (
            <ul
              className="flex flex-wrap justify-center gap-2 px-4 sm:px-6"
              role="list"
              aria-label={title}
            >
              {LOCALES.map((locale) => (
                <li key={locale}>
                  <LanguagePill locale={locale} isActive={locale === currentLocale} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="language-marquee__track flex w-max">
              <MarqueeGroup currentLocale={currentLocale} ariaLabel={title} />
              <MarqueeGroup currentLocale={currentLocale} ariaHidden />
            </div>
          )}
        </div>
      </div>

      {reduceMotion ? null : (
        <p className="sr-only" id="supported-languages-list">
          {LOCALES.map((locale) => LANGUAGE_DISPLAY[locale].label).join(", ")}
        </p>
      )}
    </div>
  );
}
