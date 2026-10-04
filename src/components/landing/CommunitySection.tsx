"use client";

import { motion, useReducedMotion } from "motion/react";

import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";
import { getTrendingContent } from "@/lib/trending-cards";
import { trackEvent } from "@/lib/tracking";

import {
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/icons/SocialBrandIcons";

import { ForbiddenWordsScreen } from "./device/ForbiddenWordsScreen";
import { LandingSection } from "./LandingSection";
import { CommunityMetrics } from "./primitives/CommunityMetrics";
import { LanguageDistribution } from "./primitives/LanguageDistribution";
import { SectionHeading } from "./SectionHeading";

interface CommunitySectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function CommunitySection({ dict, locale }: CommunitySectionProps) {
  const reduceMotion = useReducedMotion();
  const trending = getTrendingContent(locale).groups.filter(
    (group) => group.mode === "taboo" && ["cinema", "streaming", "odyssey"].includes(group.id),
  );

  const socialCards = [
    {
      href: SOCIAL_LINKS.instagram.href,
      handle: SOCIAL_LINKS.instagram.handle,
      title: dict.community.instagramCta,
      desc: dict.community.instagramDesc,
      icon: <InstagramIcon className="h-6 w-6" />,
      network: "instagram",
    },
    {
      href: SOCIAL_LINKS.tiktok.href,
      handle: SOCIAL_LINKS.tiktok.handle,
      title: dict.community.tiktokCta,
      desc: dict.community.tiktokDesc,
      icon: <TikTokIcon className="h-6 w-6" />,
      network: "tiktok",
    },
    {
      href: SOCIAL_LINKS.linkedin.href,
      handle: SOCIAL_LINKS.linkedin.handle,
      title: dict.community.linkedinCta,
      desc: dict.community.linkedinDesc,
      icon: <LinkedInIcon className="h-6 w-6" />,
      network: "linkedin",
    },
    {
      href: SOCIAL_LINKS.productHunt.href,
      handle: SOCIAL_LINKS.productHunt.handle,
      title: dict.community.productHuntCta,
      desc: dict.community.productHuntDesc,
      icon: null,
      network: "producthunt",
    },
  ];

  return (
    <LandingSection id="community" analyticsSection="community" tone="contrast" density="compact" reveal>
      <SectionHeading title={dict.community.title} subtitle={dict.community.subtitle} />

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <div className="surface-paper">
          <CommunityMetrics metrics={dict.community.metrics} />
        </div>
        <LanguageDistribution
          title={dict.community.languagesTitle}
          caption={dict.community.languagesCaption}
          currentLocale={locale}
        />
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {dict.community.trendingLabel}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {trending.map((group, index) => (
            <motion.div
              key={group.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="surface-card p-4 transition hover:border-border"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {group.label}
              </p>
              <p className="mt-1 font-bold text-foreground">{group.deckLabel}</p>
              <div className="mt-3">
                <ForbiddenWordsScreen
                  width={208}
                  word={group.words[0]}
                  forbidden={group.words.slice(1, 5)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {dict.community.editorialLabel}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {dict.community.editorialItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: 0.12 + index * 0.06 }}
              className="surface-card p-5"
            >
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-center text-sm font-semibold text-foreground">{dict.community.socialCta}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {socialCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              onClick={() =>
                trackEvent({
                  event: ANALYTICS_EVENTS.SOCIAL_CLICK,
                  properties: { network: card.network },
                })
              }
            >
              <div className="surface-card h-full p-5 transition hover:border-border">
                <div className="flex items-center gap-3">
                  {card.icon ? (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lilac text-ink">
                      {card.icon}
                    </div>
                  ) : null}
                  <div>
                    <p className="font-bold text-foreground group-hover:text-ink">{card.title}</p>
                    <p className="text-sm text-muted-foreground">{card.handle}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
