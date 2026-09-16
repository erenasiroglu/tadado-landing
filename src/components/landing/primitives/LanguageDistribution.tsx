import { LOCALES } from "@/lib/i18n-config";

const LOCALE_LABELS: Record<(typeof LOCALES)[number], string> = {
  en: "EN",
  tr: "TR",
  es: "ES",
  "pt-BR": "PT",
  fr: "FR",
  de: "DE",
  zh: "ZH",
  hi: "HI",
  id: "ID",
  vi: "VI",
  ar: "AR",
  ru: "RU",
  ja: "JA",
  ko: "KO",
  it: "IT",
  pl: "PL",
  el: "EL",
};

interface LanguageDistributionProps {
  title: string;
  caption: string;
}

export function LanguageDistribution({ title, caption }: LanguageDistributionProps) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">{title}</p>
          <p className="mt-1 text-sm text-cream/70">{caption}</p>
        </div>
        <p className="text-sm font-bold text-cream">{LOCALES.length}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {LOCALES.map((locale) => (
          <span
            key={locale}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-cream/75"
          >
            {LOCALE_LABELS[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}
