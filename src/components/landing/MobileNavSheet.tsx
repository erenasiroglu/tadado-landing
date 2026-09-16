"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ctaGradientClass } from "@/lib/cta-button";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface MobileNavSheetProps {
  locale: Locale;
  dict: Dictionary;
  downloadUrl: string;
}

interface NavItem {
  href: string;
  label: string;
  isPage?: boolean;
}

const navItemClass =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3.5 text-[15px] font-medium text-cream/90 transition-colors hover:bg-white/[0.06] active:bg-white/[0.1]";

function homeHref(locale: Locale, hash: string) {
  return `${localeHref(locale)}${hash}`;
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 first:mt-0">
      <p className="px-3.5 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-amber/80">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </section>
  );
}

function MobileNavLink({ href, label, isPage }: NavItem) {
  const content = (
    <>
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-cream/25" aria-hidden />
    </>
  );

  if (isPage) {
    return (
      <SheetClose render={<Link href={href} className={navItemClass} />}>
        {content}
      </SheetClose>
    );
  }

  return (
    <SheetClose render={<a href={href} className={navItemClass} />}>
      {content}
    </SheetClose>
  );
}

export function MobileNavSheet({ locale, dict, downloadUrl }: MobileNavSheetProps) {
  const playLinks: NavItem[] = [
    { href: homeHref(locale, "#modes"), label: dict.nav.play },
    { href: homeHref(locale, "#ai-decks"), label: dict.nav.aiDecks },
    { href: homeHref(locale, "#decks"), label: dict.nav.decks },
    { href: homeHref(locale, "#community"), label: dict.nav.community },
    { href: homeHref(locale, "#how-it-works"), label: dict.nav.howItWorks },
  ];

  const discoverLinks: NavItem[] = [
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
          "h-9 w-9 cursor-pointer border-white/12 bg-white/[0.04] text-cream",
        )}
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent
        side="right"
        overlayClassName="bg-black/60 supports-backdrop-filter:backdrop-blur-sm"
        className="flex w-[min(100vw,20rem)] max-w-none flex-col gap-0 border-white/10 bg-[#1a0f28] p-0 text-cream sm:max-w-xs"
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-white/8 px-5 py-4 pr-14">
          <Image
            src="/images/tadado_icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="min-w-0">
            <p className="text-base font-extrabold tracking-wide text-cream">Tadado</p>
            <p className="truncate text-xs text-cream/50">{dict.footer.tagline}</p>
          </div>
        </div>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-4"
          aria-label="Mobile"
        >
          <NavSection title={dict.footer.playTitle}>
            {playLinks.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </NavSection>

          <NavSection title={dict.footer.discoverTitle}>
            {discoverLinks.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </NavSection>
        </nav>

        <div
          className="shrink-0 border-t border-white/8 bg-[#1a0f28] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
        >
          <TrackedOutboundLink
            href={downloadUrl}
            locale={locale}
            downloadPlatform="ios"
            downloadSource="header_mobile"
            className={ctaGradientClass(
              "h-12 w-full cursor-pointer rounded-full text-sm shadow-lg shadow-violet-900/30",
            )}
          >
            {dict.nav.getTadado}
          </TrackedOutboundLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
