import Link from "next/link";
import { Check, Minus, X } from "lucide-react";

import { MotionLink } from "@/components/motion/MotionLink";
import { ctaGradientClass } from "@/lib/cta-button";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

interface CompareTableProps {
  dict: Dictionary;
  locale: Locale;
  showHeading?: boolean;
  showFullPageLink?: boolean;
}

type CellValue = "yes" | "no" | "partial" | string;

function CompareCell({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
        <Check className="h-4 w-4" aria-hidden />
        <span className="sr-only">Yes</span>
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-300/80">
        <X className="h-4 w-4" aria-hidden />
        <span className="sr-only">No</span>
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber/10 text-amber">
        <Minus className="h-4 w-4" aria-hidden />
        <span className="sr-only">Partial</span>
      </span>
    );
  }

  return <span className="text-sm text-cream/75">{value}</span>;
}

export function CompareTable({
  dict,
  locale,
  showHeading = true,
  showFullPageLink = false,
}: CompareTableProps) {
  const content = dict.compare;
  const downloadUrl = getAppStoreUrl(locale);

  return (
    <div>
      {showHeading ? (
        <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
      ) : null}

      <div className={cn("overflow-hidden rounded-3xl border border-white/10", showHeading ? "mt-10" : "")}>
        <div className="hidden md:grid md:grid-cols-[1.4fr_1fr_1fr] border-b border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-cream">
          <span>{content.columns.feature}</span>
          <span className="text-center text-amber">{content.columns.tadado}</span>
          <span className="text-center text-cream/60">{content.columns.others}</span>
        </div>

        <ul className="divide-y divide-white/8">
          {content.rows.map((row) => (
            <li
              key={row.feature}
              className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_1fr_1fr] md:items-center md:gap-6 md:px-6"
            >
              <p className="text-sm font-medium text-cream md:text-[15px]">{row.feature}</p>
              <div className="flex items-center justify-between gap-3 md:justify-center">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber md:hidden">
                  {content.columns.tadado}
                </span>
                <CompareCell value={row.tadado as CellValue} />
              </div>
              <div className="flex items-center justify-between gap-3 md:justify-center">
                <span className="text-xs font-semibold uppercase tracking-wide text-cream/50 md:hidden">
                  {content.columns.others}
                </span>
                <CompareCell value={row.others as CellValue} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/65">{content.note}</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <MotionLink
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaGradientClass("h-11 rounded-full px-8")}
        >
          {content.cta}
        </MotionLink>
        {showFullPageLink ? (
          <Link
            href={localeHref(locale, "compare")}
            className="text-sm font-semibold text-amber hover:text-amber/80"
          >
            {content.viewFull} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
