"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { buildDeckOverlayStyle, DECK_CARD_CONFIGS } from "@/lib/deck-cards";
import { getDecksHubHref, isFreeDeck, SEO_DECK_KEYS } from "@/lib/deck-catalog";
import { deckSlugFor } from "@/lib/deck-slugs";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface DecksNavMenuProps {
  locale: Locale;
  dict: Dictionary;
  linkClassName: string;
}

export function DecksNavMenu({ locale, dict, linkClassName }: DecksNavMenuProps) {
  const [open, setOpen] = useState(false);
  const viewAllLabel = locale === "tr" ? "Tüm desteleri gör" : "View all decks";

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(linkClassName, "inline-flex items-center gap-1")}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {dict.nav.decks}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} aria-hidden />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label={dict.a11y.closeLanguageMenu}
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute left-0 z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-2xl border border-white/12 bg-[#1c1129]/98 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl lg:left-auto lg:right-0"
          >
            <ul className="max-h-[min(70vh,24rem)] overflow-y-auto">
              {SEO_DECK_KEYS.map((key) => {
                const item = dict.decks.items[key];
                const config = DECK_CARD_CONFIGS[key];
                const href = `/${locale}/decks/${deckSlugFor(locale, key)}`;
                const free = isFreeDeck(key);

                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.06]"
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg"
                        style={{ backgroundColor: config.illustrationBackgroundColor }}
                      >
                        <Image
                          src={config.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                        <div className="absolute inset-0" style={buildDeckOverlayStyle(config)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-cream">{item.name}</p>
                        <p className="truncate text-xs text-cream/55">{item.desc}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold text-lavender">
                        {free ? dict.decks.free : dict.decks.price}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-1 border-t border-white/8 pt-1">
              <Link
                href={getDecksHubHref(locale)}
                className="block rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-amber hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
              >
                {viewAllLabel}
              </Link>
              <a href={`/${locale}#decks`} className="block rounded-xl px-3 py-2 text-center text-xs text-cream/50 hover:text-cream">
                {locale === "tr" ? "Ana sayfada kaydır" : "Scroll on homepage"}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
