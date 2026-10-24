import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import Link from "next/link";
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
      <div className="team-page-intro">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow={dict.hero.brandLine}
            title={content.title}
            subtitle={content.subtitle}
            align="left"
          />
          <Reveal className="mt-5">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.intro}
            </p>
          </Reveal>
        </div>
        <div className="team-page-intro__signal">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {content.brandLine}
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{content.brandTagline}</span>
        </div>
      </div>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {TEAM_MEMBERS.map((member) => (
          <StaggerItem key={member.id}>
            <TeamMemberCard
              member={member}
              content={content.members[member.id]}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-5">
        <div className="relative overflow-hidden rounded-lg surface-obsidian p-7 sm:p-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-balance text-cream sm:text-3xl">
              {content.joinCta.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base sm:leading-relaxed">
              {content.joinCta.body}
            </p>
          </div>
          <Link
            href={localeHref(locale, "partnerships")}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-cream px-6 text-sm font-extrabold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98] lg:mt-0"
          >
            {content.joinCta.link}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </>
  );
}
