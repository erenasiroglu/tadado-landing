"use client";

import { motion, useReducedMotion } from "motion/react";

import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";
import { getTrendingContent } from "@/lib/trending-cards";
import { trackEvent } from "@/lib/tracking";

import { LandingSection } from "./LandingSection";
import { CommunityMetrics } from "./primitives/CommunityMetrics";
import { LanguageDistribution } from "./primitives/LanguageDistribution";
import { ProductCard } from "./primitives/ProductCard";
import { SectionHeading } from "./SectionHeading";

interface CommunitySectionProps {
  dict: Dictionary;
  locale: Locale;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.24 8.24 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1-.39z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ProductHuntIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.604 8.4h-3.107V12h3.107c.855 0 1.548-.693 1.548-1.548V9.948c0-.855-.693-1.548-1.548-1.548zm-5.21 0H2.4V16.8h6.4V8.4zm11.2 0h-6.4v8.4h6.4c1.767 0 3.2-1.433 3.2-3.2V11.6c0-1.767-1.433-3.2-3.2-3.2zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
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
      icon: <ProductHuntIcon className="h-6 w-6" />,
      network: "producthunt",
    },
  ];

  return (
    <LandingSection id="community" analyticsSection="community" tone="contrast" density="compact" reveal>
      <SectionHeading title={dict.community.title} subtitle={dict.community.subtitle} />

      <div className="mt-8">
        <CommunityMetrics metrics={dict.community.metrics} />
      </div>

      <div className="mt-6">
        <LanguageDistribution
          title={dict.community.languagesTitle}
          caption={dict.community.languagesCaption}
          currentLocale={locale}
        />
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">
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
              className="surface-card p-4 transition hover:border-amber/25"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lavender/75">
                {group.label}
              </p>
              <p className="mt-1 font-bold text-cream">{group.deckLabel}</p>
              <div className="mt-3">
                <ProductCard
                  word={group.words[0]}
                  forbidden={group.words.slice(1, 5)}
                  compact
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">
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
              <h3 className="font-bold text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-center text-sm font-semibold text-cream">{dict.community.socialCta}</p>
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
              <div className="surface-card h-full p-5 transition hover:border-amber/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15 text-amber">
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-bold text-cream group-hover:text-amber">{card.title}</p>
                    <p className="text-sm text-lavender">{card.handle}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-cream/70">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </LandingSection>
  );
}
