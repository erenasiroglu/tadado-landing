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
  return (
    <div className="surface-card overflow-hidden p-5 sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">{title}</p>
          <p className="mt-1 text-sm text-cream/70">{caption}</p>
        </div>
        <p className="text-sm font-bold text-cream">{LOCALES.length}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {LOCALES.map((locale) => {
          const isActive = locale === currentLocale;
          const language = LANGUAGE_DISPLAY[locale];

          return (
            <span
              key={locale}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-xl border px-2.5 py-2.5 transition-colors",
                isActive
                  ? "border-amber/40 bg-amber/12 text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  : "border-white/10 bg-white/[0.04] text-cream/75",
              )}
            >
              <span className="text-base leading-none" aria-hidden>
                {language.flag}
              </span>
              <span className="min-w-0 truncate text-xs font-semibold">{language.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
