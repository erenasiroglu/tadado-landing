import { BRAND } from "@/lib/brand";
import type { Dictionary } from "@/lib/i18n";

import { SectionHeading } from "./SectionHeading";

interface OpenMetricsProps {
  dict: Dictionary;
}

export function OpenMetrics({ dict }: OpenMetricsProps) {
  const content = dict.open;

  return (
    <div className="max-w-xl">
      <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{content.note}</p>

      <div className="mt-10">
        <iframe
          src={BRAND.trustMrr.embedSrc}
          title={content.embedTitle}
          width={520}
          height={216}
          className="w-full max-w-[520px] overflow-hidden rounded-xl border-0"
          loading="lazy"
        />
      </div>

      <a
        href={BRAND.trustMrr.profileUrl}
        className="mt-6 inline-block text-sm font-semibold text-ink hover:text-muted-foreground"
        rel="noopener noreferrer"
        target="_blank"
      >
        {content.profileCta} →
      </a>
    </div>
  );
}
