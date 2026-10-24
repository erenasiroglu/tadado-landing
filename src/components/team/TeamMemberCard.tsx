"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { Tag } from "@/components/brand/tag";
import { TadadoMascotSvg } from "@/components/team/TadadoMascotSvg";
import { cardHover } from "@/lib/motion";
import type { TeamMemberId, TeamMemberMeta } from "@/lib/team";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMemberMeta;
  content: Dictionary["team"]["members"][TeamMemberId];
}

export function TeamMemberCard({ member, content }: TeamMemberCardProps) {
  const reduceMotion = useReducedMotion();
  const dark = member.id === "eren";

  return (
    <m.article
      className="group flex h-full flex-col overflow-hidden rounded-lg surface-paper"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={cardHover.transition}
    >
      <div
        className={cn(
          "team-member-stage relative flex h-60 items-end justify-center overflow-hidden sm:h-64",
          dark ? "team-member-stage--dark" : "team-member-stage--light",
        )}
      >
        <Tag tone={dark ? "onDark" : "solid"} className="absolute top-5 left-5">
          {member.id === "eren" ? "Build" : "Design"}
        </Tag>
        <TadadoMascotSvg
          variant={member.mascotVariant}
          className="relative -mb-2 max-w-[10.5rem] drop-shadow-[0_18px_24px_rgb(26_15_41/0.28)]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow text-[0.6875rem]">{content.role}</p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
          {content.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
          {content.bio}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {content.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink/80 ring-1 ring-ink/10 ring-inset"
            >
              {skill}
            </li>
          ))}
        </ul>

        <a
          href={member.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-7 text-sm font-bold text-ink transition-colors hover:text-plum"
        >
          <span className="underline decoration-ink/20 underline-offset-4 transition-colors group-hover:decoration-ink">
            {content.websiteCta}
          </span>
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
    </m.article>
  );
}
