"use client";

import { motion, useReducedMotion } from "motion/react";

import { MotionLink } from "@/components/motion/MotionLink";
import { Badge } from "@/components/ui/badge";
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
        "group relative flex flex-col overflow-hidden rounded-3xl border border-cream/10",
        "bg-white/5 backdrop-blur-sm transition-colors hover:border-amber/25 hover:bg-white/8",
      )}
      style={{ rotate: member.tiltDeg }}
      whileHover={
        reduceMotion ? undefined : { rotate: 0, y: -4, scale: 1.02 }
      }
      transition={cardHover.transition}
    >
      <div className="flex justify-center bg-[#2E004B]/40 px-6 pb-2 pt-8">
        <TadadoMascotSvg variant={member.mascotVariant} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-extrabold text-cream">{content.name}</h3>
          <Badge
            variant="secondary"
            className="border-amber/30 bg-amber/15 text-amber hover:bg-amber/20"
          >
            {content.role}
          </Badge>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-cream/75">{content.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {content.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-lavender/20 bg-lavender/10 px-2.5 py-0.5 text-xs font-medium text-lavender"
            >
              {skill}
            </span>
          ))}
        </div>

        <details className="mt-5 group/details">
          <summary
            className="cursor-pointer text-sm font-semibold text-amber marker:content-none hover:text-amber/80 [&::-webkit-details-marker]:hidden"
          >
            <span className="inline-flex items-center gap-1">
              {funFactsLabel}
              <span className="text-cream/50 transition-transform group-open/details:rotate-90">
                →
              </span>
            </span>
          </summary>
          <ul className="mt-3 space-y-2 text-sm text-cream/65">
            {content.funFacts.map((fact) => (
              <li key={fact} className="flex gap-2">
                <span className="text-amber" aria-hidden>•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </details>

        <MotionLink
          href={member.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center text-sm font-semibold text-amber hover:text-amber/80"
        >
          {content.websiteCta} →
        </MotionLink>
      </div>
    </motion.article>
  );
}
