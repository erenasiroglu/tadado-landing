import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { buttonVariants } from "@/components/ui/button";
import { getDeckHref } from "@/lib/deck-catalog";
import { DECK_CARD_CONFIGS } from "@/lib/deck-cards";
import type { Dictionary, Locale } from "@/lib/i18n";
import { blogHref } from "@/lib/i18n-config";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

const FRIENDSGIVING_ARTICLE_SLUG = "friendsgiving-games";

interface LandingEventsProps {
  locale: Locale;
  dict: Dictionary;
}

function EventDeckThumb({ deckKey, alt }: { deckKey: "friendsgiving" | "genius"; alt: string }) {
  const config = DECK_CARD_CONFIGS[deckKey];

  return (
    <div
      className="relative size-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-cream/15 sm:size-20"
      style={{ backgroundColor: config.illustrationBackgroundColor }}
    >
      <Image
        src={config.image}
        alt={alt}
        fill
        sizes="80px"
        className="object-contain p-1.5"
      />
    </div>
  );
}

interface EventCardProps {
  id: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  visual: ReactNode;
  secondary?: { label: string; href: string };
}

function EventCard({ id, tag, title, body, cta, href, visual, secondary }: EventCardProps) {
  return (
    <article id={id} className="genius-event relative flex h-full flex-col overflow-hidden rounded-lg surface-obsidian">
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <span className="genius-event__badge inline-flex h-6 items-center rounded-md bg-lilac px-2.5 text-[0.625rem] font-bold tracking-[0.1em] text-ink uppercase">
              {tag}
            </span>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-cream">{title}</h2>
            <p className="mt-1.5 text-sm leading-snug text-cream/70">{body}</p>
          </div>
          {visual}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <Link
            href={href}
            className={buttonVariants({ variant: "cream", size: "sm", className: "gap-1.5" })}
          >
            {cta}
            <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className={buttonVariants({ variant: "ghostOnDark", size: "sm" })}
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function LandingEvents({ locale, dict }: LandingEventsProps) {
  const section = dict.landingEvents;
  const friends = dict.friendsgivingEvent;
  const genius = dict.geniusEvent;
  const guideHref = `${blogHref(locale)}/${FRIENDSGIVING_ARTICLE_SLUG}`;

  return (
    <LandingSection id="events" density="compact" reveal>
      <SectionViewTracker sectionId="friendsgiving_event">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <EventCard
            id="friendsgiving"
            tag={friends.tag}
            title={friends.title}
            body={friends.body}
            cta={friends.cta}
            href={getDeckHref(locale, "friendsgiving")}
            secondary={{ label: friends.guideCta, href: guideHref }}
            visual={<EventDeckThumb deckKey="friendsgiving" alt={friends.imageAlt} />}
          />

          <EventCard
            id="genius-only"
            tag={genius.tag}
            title={genius.title}
            body={genius.body}
            cta={genius.cta}
            href={getDeckHref(locale, "genius")}
            visual={<EventDeckThumb deckKey="genius" alt={genius.title} />}
          />
        </div>
      </SectionViewTracker>
    </LandingSection>
  );
}