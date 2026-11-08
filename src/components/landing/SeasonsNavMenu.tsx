"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SeasonsNavMenuProps {
  locale: Locale;
  dict: Dictionary;
  linkClassName: string;
  night?: boolean;
}

export function SeasonsNavMenu({ locale, dict, linkClassName, night = false }: SeasonsNavMenuProps) {
  const [open, setOpen] = useState(false);
  const { nav } = dict;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const halloweenHref = localeHref(locale, "halloween");

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          linkClassName,
          "inline-flex items-center gap-1",
          night && "halloween-nav-link",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {nav.seasons}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} aria-hidden />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label={nav.seasonsClose}
            onClick={() => setOpen(false)}
          />
          <div className="site-popover absolute left-0 z-50 mt-2 w-[min(calc(100vw-2rem),15.5rem)] rounded-[1.25rem] border border-border bg-paper p-2 shadow-[0_24px_48px_rgb(26_15_41/0.18)] lg:left-auto lg:right-0">
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {nav.seasonsPick}
            </p>
            <ul>
              <li>
                <Link
                  href={halloweenHref}
                  className="flex items-center gap-3 rounded-sm px-2 py-2 transition hover:bg-lilac"
                  onClick={() => setOpen(false)}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                    <Image
                      src="/images/deck-cards/halloween-deck-illustration.webp"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2B1145]/90 to-transparent" />
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-foreground">{nav.halloween}</span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      {nav.seasonsHalloweenDesc}
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
