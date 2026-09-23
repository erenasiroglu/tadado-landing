import type { Locale } from "@/lib/i18n-config";
import { LOCALES } from "@/lib/i18n-config";
import { LANGUAGE_DISPLAY } from "@/lib/languages";
import { cn } from "@/lib/utils";

interface LanguageDistributionProps {
  title: string;
  caption: string;
  currentLocale: Locale;
}

export function LanguageDistribution({ title, caption, currentLocale }: LanguageDistributionProps) {
  const count = LOCALES.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent px-4 py-4 sm:px-6 sm:py-5">
      <div
        className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-violet-500/12 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-4 bottom-0 h-20 w-20 rounded-full bg-amber/8 blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-6 lg:gap-10">
        <div className="flex shrink-0 items-center gap-4 md:max-w-[min(100%,280px)]">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#2a0a3b]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-16 sm:w-16"
            aria-hidden
          >
            <span className="text-2xl font-extrabold tabular-nums tracking-tight text-cream sm:text-3xl">
              {count}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-tight text-cream sm:text-base">{title}</p>
            <p className="mt-1 text-xs leading-snug text-cream/55 sm:text-[13px]">{caption}</p>
          </div>
        </div>

        <div
          className="hidden h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-white/15 to-transparent md:block"
          aria-hidden
        />

        <ul
          className="flex min-w-0 flex-1 flex-wrap items-center gap-2 overflow-visible md:justify-end lg:gap-x-2.5 lg:gap-y-2"
          role="list"
          aria-label={title}
        >
          {LOCALES.map((locale) => {
            const isActive = locale === currentLocale;
            const language = LANGUAGE_DISPLAY[locale];

            return (
              <li key={locale}>
                <span
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[0.4375rem] text-[11px] font-semibold leading-[1.35] transition-colors sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs sm:leading-[1.3]",
                    isActive
                      ? "bg-amber/18 text-amber ring-1 ring-amber/35"
                      : "text-cream/70 hover:bg-white/[0.06] hover:text-cream/90",
                  )}
                >
                  <span
                    className="inline-flex shrink-0 items-center justify-center text-[15px] leading-none sm:text-base"
                    aria-hidden
                  >
                    {language.flag}
                  </span>
                  <span className="whitespace-nowrap">{language.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
