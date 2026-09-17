import { LandingSection } from "@/components/landing/LandingSection";
import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import type { Dictionary } from "@/lib/i18n";

import { SectionHeading } from "./SectionHeading";

interface PersonalizationSectionProps {
  dict: Dictionary;
}

export function PersonalizationSection({ dict }: PersonalizationSectionProps) {
  const items = dict.personalization.items;
  const primary = items[0];
  const secondary = items[4] ?? items[1];

  return (
    <LandingSection id="personalization" analyticsSection="personalization" density="compact" reveal>
      <SectionHeading title={dict.personalization.title} subtitle={dict.personalization.subtitle} />

      <div className="horizontal-scroll mt-6 pb-1">
        {items.map((item) => (
          <span key={item.label} className="topic-pill shrink-0 snap-start">
            {item.label}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="surface-card p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/90">
            {primary.label}
          </p>
          <div className="mt-3">
            <ForbiddenWordsScreen
              width={208}
              word={primary.topic.toUpperCase()}
              forbidden={["FUN", "PLAY", "GUESS", "TEAM"]}
            />
          </div>
          <p className="mt-3 text-sm text-lavender">{primary.topic}</p>
        </div>

        <div className="surface-card flex flex-col justify-between p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/90">
            {secondary.label}
          </p>
          <div className="mt-3">
            <ForbiddenWordsScreen
              width={188}
              word={secondary.topic.toUpperCase()}
              forbidden={["GOAL", "WIN", "PLAY", "TEAM"]}
            />
          </div>
          <p className="mt-3 text-xs text-lavender">{secondary.topic}</p>
        </div>
      </div>
    </LandingSection>
  );
}
