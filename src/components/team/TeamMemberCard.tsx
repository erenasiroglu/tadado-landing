"use client";

import { motion, useReducedMotion } from "motion/react";

import { MotionLink } from "@/components/motion/MotionLink";
import { cardHover } from "@/lib/motion";
import type { TeamMemberId, TeamMemberMeta } from "@/lib/team";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { TadadoMascotSvg } from "./TadadoMascotSvg";

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
        "group surface-card relative flex h-full flex-col overflow-hidden",
        "transition-colors hover:border-amber/25",
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={cardHover.transition}
    >
      <div className="flex justify-center border-b border-white/8 bg-[#2E004B]/35 px-5 pb-1 pt-6">
        <TadadoMascotSvg variant={member.mascotVariant} className="h-28 w-auto sm:h-32" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-extrabold text-cream sm:text-xl">{content.name}</h3>
          <span className="detail-chip py-1 text-[11px]">{content.role}</span>
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
          className="mt-auto inline-flex cursor-pointer items-center pt-6 text-sm font-semibold text-amber transition-colors hover:text-amber/85"
        >
          {content.websiteCta} →
        </MotionLink>
      </div>
    </motion.article>
  );
}
