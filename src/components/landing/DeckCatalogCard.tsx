"use client";

import Image from "next/image";
import { Lock, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  buildDeckOverlayStyle,
  type DeckCardConfig,
} from "@/lib/deck-cards";
import { DECK_CHROME, GLASS } from "@/lib/design-tokens";
import { cardHover } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface DeckCatalogCardProps {
  config: DeckCardConfig;
  title: string;
  subtitle: string;
  playLabel: string;
  newBadgeLabel?: string;
  isFree?: boolean;
  className?: string;
}

const PLAY_SIZE = 62;

export function DeckCatalogCard({
  config,
  title,
  subtitle,
  playLabel,
  newBadgeLabel = "NEW",
  isFree = false,
  className,
}: DeckCatalogCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("group relative w-full overflow-hidden", className)}
      style={{
        borderRadius: GLASS.radius.card,
        border: `1px solid ${DECK_CHROME.borderColor}`,
        boxShadow: `inset 0 1px 0 ${GLASS.neumorph.highlight}`,
      }}
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
              className="flex items-center justify-center rounded-full p-[3px]"
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
                {isFree ? (
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
              className="inline-flex min-h-8 min-w-[80px] max-w-[92%] items-center justify-center rounded-lg px-4 text-[11px] font-bold tracking-wide"
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
    </motion.div>
  );
}
