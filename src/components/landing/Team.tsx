import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { TEAM_MEMBERS } from "@/lib/team";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

interface TeamProps {
  dict: Dictionary;
  locale: Locale;
  variant?: "section" | "page";
}

export function Team({ dict, locale, variant = "page" }: TeamProps) {
  const content = dict.team;
  const isPage = variant === "page";

  return (
    <>
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        align={isPage ? "left" : "center"}
      />

      <Reveal className="mt-6">
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-cream/80",
            !isPage && "mx-auto text-center",
          )}
        >
          {content.intro}
        </p>
      </Reveal>

      <Stagger className="mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
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

      <Reveal className="mt-14">
        <div className="surface-card max-w-2xl p-6">
          <h3 className="font-bold text-cream">{content.joinCta.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/70">{content.joinCta.body}</p>
          <Link
            href={localeHref(locale, "partnerships")}
            className="mt-4 inline-block text-sm font-semibold text-amber hover:text-amber/80"
          >
            {content.joinCta.link} →
          </Link>
        </div>
      </Reveal>
    </>
  );
}
