"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { buildDeckOverlayStyle, DECK_CARD_CONFIGS } from "@/lib/deck-cards";
import { getDecksHubHref, SEO_DECK_KEYS } from "@/lib/deck-catalog";
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
          <div className="absolute left-0 z-50 mt-2 w-[min(100vw-2rem,16rem)] rounded-xl border border-white/10 bg-[#1c1129]/98 p-1.5 shadow-xl shadow-black/40 backdrop-blur-xl lg:left-auto lg:right-0">
            <ul>
              {SEO_DECK_KEYS.map((key) => {
                const item = dict.decks.items[key];
                const config = DECK_CARD_CONFIGS[key];
                const href = `/${locale}/decks/${deckSlugFor(locale, key)}`;

                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.06]"
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10"
                        style={{ backgroundColor: config.illustrationBackgroundColor }}
                      >
                        <Image
                          src={config.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                        <div className="absolute inset-0" style={buildDeckOverlayStyle(config)} />
                      </div>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-cream">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-1 border-t border-white/8 pt-1">
              <Link
                href={getDecksHubHref(locale)}
                className="block rounded-lg px-2 py-2 text-center text-xs font-semibold text-amber/90 hover:bg-white/[0.06] hover:text-amber"
                onClick={() => setOpen(false)}
              >
                {viewAllLabel}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
