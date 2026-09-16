"use client";

import Image from "next/image";
import { Lock, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import {
  buildDeckOverlayStyle,
  type DeckCardConfig,
  type DeckKey,
} from "@/lib/deck-cards";
import { DECK_CHROME, GLASS } from "@/lib/design-tokens";
import { useDeckDownload } from "@/hooks/use-deck-download";
import type { Locale } from "@/lib/i18n";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { cardHover } from "@/lib/motion";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface DeckCatalogCardProps {
  config: DeckCardConfig;
  deckKey: DeckKey;
  locale: Locale;
  title: string;
  subtitle: string;
  playLabel: string;
  newBadgeLabel?: string;
  isFree?: boolean;
  showPlayIcon?: boolean;
  className?: string;
}

const PLAY_SIZE = 62;

export function DeckCatalogCard({
  config,
  deckKey,
  locale,
  title,
  subtitle,
  playLabel,
  newBadgeLabel = "NEW",
  isFree = false,
  showPlayIcon = false,
  className,
}: DeckCatalogCardProps) {
  const reduceMotion = useReducedMotion();
  const viewedRef = useRef(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const { openStore } = useDeckDownload({
    deckId: deckKey,
    deckName: title,
    isFree,
    locale,
    source: "deck_catalog",
  });

  useEffect(() => {
    const node = cardRef.current;
    if (!node || viewedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || viewedRef.current) return;
        viewedRef.current = true;
        trackEvent({
          event: ANALYTICS_EVENTS.DECK_CARD_VIEW,
          properties: {
            deck_id: deckKey,
            deck_name: title,
            is_free: isFree,
            locale,
          },
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [deckKey, title, isFree, locale]);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={openStore}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1129]",
        className,
      )}
      style={{
        borderRadius: GLASS.radius.card,
        border: `1px solid ${DECK_CHROME.borderColor}`,
        boxShadow: `inset 0 1px 0 ${GLASS.neumorph.highlight}`,
      }}
      aria-label={`${playLabel}: ${title}`}
      {...(reduceMotion ? {} : cardHover)}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{
          backgroundColor: config.illustrationBackgroundColor,
          borderRadius: GLASS.radius.card,
        }}
      >
        <Image
          src={config.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            objectPosition: config.objectPosition ?? "center",
            transform: `scale(${config.illustrationScale})`,
          }}
          sizes="240px"
        />
        <div className="absolute inset-0 z-[1]" style={buildDeckOverlayStyle(config)} />
        <div
          className="pointer-events-none absolute inset-x-4 top-0 z-[2] h-px opacity-55"
          style={{ backgroundColor: GLASS.neumorph.highlight }}
        />

        <div className="absolute inset-0 z-[3] flex flex-col p-4">
          {config.showBadge ? (
            <div className="flex justify-end">
              <span
                className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: DECK_CHROME.badgeTint,
                  color: DECK_CHROME.badgeTextColor,
                  border: `1px solid ${GLASS.border.color}`,
                }}
              >
                {newBadgeLabel}
              </span>
            </div>
          ) : (
            <div className="h-5" />
          )}

          <div className="flex flex-1 items-center justify-center py-1">
            <div
              className="flex items-center justify-center rounded-full p-[3px] transition-transform duration-200 group-hover:scale-105"
              style={{
                width: PLAY_SIZE + 6,
                height: PLAY_SIZE + 6,
                backgroundColor: "rgba(0, 0, 0, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-full backdrop-blur-sm"
                style={{
                  width: PLAY_SIZE,
                  height: PLAY_SIZE,
                  border: `1px solid ${GLASS.border.color}`,
                  backgroundColor: DECK_CHROME.playTint,
                }}
              >
                {showPlayIcon || isFree ? (
                  <Play
                    className="ml-0.5 h-[26px] w-[26px]"
                    style={{ color: DECK_CHROME.playIconColor, fill: DECK_CHROME.playIconColor }}
                  />
                ) : (
                  <Lock className="h-[26px] w-[26px]" style={{ color: DECK_CHROME.playIconColor }} />
                )}
              </div>
            </div>
          </div>

          <div className="min-h-[58px] text-center">
            <p
              className="text-lg font-extrabold uppercase leading-tight tracking-wide"
              style={{
                color: DECK_CHROME.titleColor,
                textShadow: "0 1px 4px rgba(0,0,0,0.45)",
              }}
            >
              {title}
            </p>
            <p
              className="mt-1 line-clamp-2 text-[11px] leading-tight opacity-90"
              style={{
                color: DECK_CHROME.subtitleColor,
                textShadow: "0 1px 3px rgba(0,0,0,0.35)",
              }}
            >
              {subtitle}
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <span
              className="inline-flex min-h-8 min-w-[80px] max-w-[92%] items-center justify-center rounded-lg px-4 text-[11px] font-bold tracking-wide transition-colors group-hover:bg-amber/20"
              style={{
                backgroundColor: "rgba(196, 181, 253, 0.14)",
                color: DECK_CHROME.subtitleColor,
                border: `1px solid ${GLASS.border.color}`,
              }}
            >
              {playLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
