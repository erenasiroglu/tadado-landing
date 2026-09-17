"use client";

import { motion, useReducedMotion } from "motion/react";

import { MotionLink } from "@/components/motion/MotionLink";
import { cardHover } from "@/lib/motion";
import type { TeamMemberId, TeamMemberMeta } from "@/lib/team";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMemberMeta;
  content: Dictionary["team"]["members"][TeamMemberId];
  funFactsLabel: string;
}

export function TeamMemberCard({ member, content, funFactsLabel }: TeamMemberCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group surface-card relative flex h-full flex-col overflow-hidden p-4 sm:p-5",
        "transition-colors hover:border-amber/25",
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={cardHover.transition}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber/80">{content.role}</p>
          <h3 className="mt-1 text-xl font-extrabold text-cream sm:text-2xl">{content.name}</h3>
        </div>
        <span className="detail-chip py-1 text-[11px]">{member.id === "eren" ? "BUILD" : "DESIGN"}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-cream/75">{content.bio}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {content.skills.map((skill) => (
          <span key={skill} className="topic-pill text-[11px]">
            {skill}
          </span>
        ))}
      </div>

      <details className="mt-5 group/details">
        <summary className="cursor-pointer text-sm font-semibold text-amber transition-colors hover:text-amber/85 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1.5">
            {funFactsLabel}
            <span className="text-cream/45 transition-transform group-open/details:rotate-90">
              →
            </span>
          </span>
        </summary>
        <ul className="mt-3 space-y-2 text-sm text-cream/65">
          {content.funFacts.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span className="text-amber" aria-hidden>
                •
              </span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </details>

      <MotionLink
        href={member.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex cursor-pointer items-center gap-2 pt-6 text-sm font-semibold text-amber transition-colors hover:text-amber/85"
      >
        {content.websiteCta}
        <span aria-hidden>↗</span>
      </MotionLink>
    </motion.article>
  );
}
