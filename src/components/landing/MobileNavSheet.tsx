"use client";

import Image from "next/image";
import Link from "next/link";
import { Ban, ChevronRight, Fingerprint, Menu, Smartphone, Sparkles, type LucideIcon } from "lucide-react";

import { MobileStoreDownloadCta } from "@/components/landing/primitives/MobileStoreDownloadCta";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getDecksHubHref, SEO_DECK_KEYS } from "@/lib/deck-catalog";
import { deckSlugFor } from "@/lib/deck-slugs";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { modePageHref } from "@/lib/mode-pages";
import { isHalloweenSeason } from "@/lib/season";
import { cn } from "@/lib/utils";

interface MobileNavSheetProps {
  locale: Locale;
  dict: Dictionary;
}

interface NavItem {
  href: string;
  label: string;
  isPage?: boolean;
}

interface ModeItem extends NavItem {
  icon: LucideIcon;
}

function homeHref(locale: Locale, hash: string) {
  return `${localeHref(locale)}${hash}`;
}

/** Closes the sheet on tap; pages use next/link, in-page anchors a plain link. */
function NavLink({ href, isPage, className, children }: Omit<NavItem, "label"> & {
  className: string;
  children: React.ReactNode;
}) {
  const render = isPage ? <Link href={href} className={className} /> : <a href={href} className={className} />;

  return (
    <SheetClose nativeButton={false} render={render}>
      {children}
    </SheetClose>
  );
}

function NavGroup({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border px-5 py-5 first:border-t-0 [div+&]:border-t-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
        {action}
      </div>
      {children}
    </section>
  );
}

export function MobileNavSheet({ locale, dict }: MobileNavSheetProps) {
  const halloween = isHalloweenSeason();

  const modeLinks: ModeItem[] = [
    { href: modePageHref(locale, "forbidden-words"), label: dict.modes.tabooTitle, icon: Ban, isPage: true },
    { href: modePageHref(locale, "heads-up"), label: dict.modes.headsUpTitle, icon: Smartphone, isPage: true },
    { href: modePageHref(locale, "imposter"), label: dict.modes.imposterTitle, icon: Fingerprint, isPage: true },
    { href: modePageHref(locale, "ai-decks"), label: dict.nav.aiDecks, icon: Sparkles, isPage: true },
  ];

  const deckLinks: NavItem[] = SEO_DECK_KEYS.map((key) => ({
    href: `/${locale}/decks/${deckSlugFor(locale, key)}`,
    label: dict.decks.items[key].name,
    isPage: true,
  }));

  const discoverLinks: NavItem[] = [
    { href: homeHref(locale, "#how-it-works"), label: dict.nav.howItWorks },
    { href: homeHref(locale, "#community"), label: dict.nav.community },
    { href: blogHref(locale), label: dict.nav.blog, isPage: true },
    { href: localeHref(locale, "guides"), label: dict.nav.guides, isPage: true },
    { href: localeHref(locale, "team"), label: dict.nav.team, isPage: true },
    { href: homeHref(locale, "#faq"), label: dict.nav.faq },
  ];

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-9 w-9 cursor-pointer border-border surface-paper text-foreground",
        )}
        aria-label={dict.a11y.openMenu}
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent
        side="right"
        overlayClassName="bg-black/60 supports-backdrop-filter:backdrop-blur-sm"
        className="flex w-[min(100vw,20rem)] max-w-none flex-col gap-0 border-border p-0 text-foreground sm:max-w-xs"
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-4 pr-14">
          <Image
            src="/images/tadado_icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="min-w-0">
            <p className="text-base font-extrabold tracking-wide text-foreground">Tadado</p>
            <p className="truncate text-xs text-muted-foreground">{dict.footer.tagline}</p>
          </div>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          aria-label={dict.a11y.mobileNav}
        >
          {halloween ? (
            <div className="px-5 pt-5">
              <NavLink
                href={localeHref(locale, "halloween")}
                isPage
                className="flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-[var(--night)] px-4 text-[15px] font-bold text-cream"
              >
                <span className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-[var(--pumpkin)]" aria-hidden />
                  {dict.nav.halloween}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-cream/60 rtl:rotate-180" aria-hidden />
              </NavLink>
            </div>
          ) : null}

          <NavGroup title={dict.footer.playTitle}>
            <div className="flex flex-col gap-1">
              {modeLinks.map(({ href, label, icon: Icon, isPage }) => (
                <NavLink
                  key={label}
                  href={href}
                  isPage={isPage}
                  className="-mx-2 flex min-h-12 items-center gap-3 rounded-xl px-2 text-[15px] font-semibold text-foreground transition-colors hover:bg-mist active:bg-lilac"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mist text-ink">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  {label}
                </NavLink>
              ))}
            </div>
          </NavGroup>

          <NavGroup
            title={dict.nav.decks}
            action={
              <NavLink
                href={getDecksHubHref(locale)}
                isPage
                className="flex items-center gap-0.5 text-xs font-semibold text-ink"
              >
                {dict.ui.allDecks}
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
              </NavLink>
            }
          >
            <div className="flex flex-wrap gap-2">
              {deckLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isPage
                  className="inline-flex min-h-9 items-center rounded-full border border-border px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-mist active:bg-lilac"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </NavGroup>

          <NavGroup title={dict.footer.discoverTitle}>
            <div className="grid grid-cols-2 gap-x-4">
              {discoverLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isPage={link.isPage}
                  className="flex min-h-11 items-center text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </NavGroup>
        </nav>

        <div
          className="shrink-0 border-t border-border px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
        >
          <MobileStoreDownloadCta
            locale={locale}
            source="header_mobile"
            label={dict.nav.getTadado}
            className="h-12 shadow-lg shadow-violet-900/30"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
