import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { CTAButton } from "@/components/landing/primitives/CTAButton";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { TEAM_MEMBERS } from "@/lib/team";

import { SectionHeading } from "./SectionHeading";

interface TeamProps {
  dict: Dictionary;
  locale: Locale;
}

export function Team({ dict, locale }: TeamProps) {
  const content = dict.team;

  return (
    <>
      <SectionHeading
        eyebrow={dict.hero.brandLine}
        title={content.title}
        subtitle={content.subtitle}
        align="left"
      />

      <Reveal className="mt-5">
        <p className="max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
          {content.intro}
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
        {TEAM_MEMBERS.map((member) => (
          <StaggerItem key={member.id}>
            <TeamMemberCard
              member={member}
              content={content.members[member.id]}
              funFactsLabel={content.funFactsLabel}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <div className="surface-card max-w-2xl p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/85">
            {content.joinCta.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{content.joinCta.body}</p>
          <div className="mt-5">
            <CTAButton href={localeHref(locale, "partnerships")} variant="ghost" className="min-h-10 px-0">
              {content.joinCta.link} →
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </>
  );
}
