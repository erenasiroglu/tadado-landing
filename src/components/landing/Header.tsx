import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { TrackedOutboundLink } from "@/components/analytics/TrackedOutboundLink";
import { buttonVariants } from "@/components/ui/button";
import { ctaGradientClass } from "@/lib/cta-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";
import { cn } from "@/lib/utils";

import { LanguageMenu } from "./LanguageMenu";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navLinkClass =
  "cursor-pointer text-sm font-medium text-cream/70 transition-colors hover:text-cream";

function homeHref(locale: Locale, hash: string) {
  return `${localeHref(locale)}${hash}`;
}

export function Header({ locale, dict }: HeaderProps) {
  const downloadUrl = getAppStoreUrl(locale);

  const primaryLinks = [
    { href: homeHref(locale, "#modes"), label: dict.nav.play },
    { href: homeHref(locale, "#ai-decks"), label: dict.nav.aiDecks },
    { href: homeHref(locale, "#decks"), label: dict.nav.decks },
    { href: homeHref(locale, "#community"), label: dict.nav.community },
    { href: localeHref(locale, "team"), label: dict.nav.team, isPage: true },
    { href: homeHref(locale, "#how-it-works"), label: dict.nav.howItWorks },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#1a0f28]/85 backdrop-blur-md">
      <div className="section-shell flex h-14 items-center justify-between gap-4">
        <Link
          href={localeHref(locale)}
          className="flex shrink-0 cursor-pointer items-center gap-2.5"
        >
          <Image
            src="/images/tadado_icon.png"
            alt="Tadado"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-base font-extrabold tracking-wide text-cream">Tadado</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Main">
          {primaryLinks.map((link) =>
            "isPage" in link && link.isPage ? (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ),
          )}
          <LanguageMenu currentLocale={locale} label={dict.language.label} />
          <TrackedOutboundLink
            href={downloadUrl}
            locale={locale}
            downloadPlatform="ios"
            downloadSource="header"
            className={ctaGradientClass(
              "h-9 cursor-pointer rounded-full px-5 text-sm shadow-lg shadow-violet-900/25",
            )}
          >
            {dict.nav.getTadado}
          </TrackedOutboundLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageMenu currentLocale={locale} label={dict.language.label} />
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
            <SheetContent side="right" className="border-white/10 bg-[#1a0f28] text-cream">
              <SheetHeader>
                <SheetTitle className="text-cream">Tadado</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4" aria-label="Mobile">
                {primaryLinks.map((link) =>
                  "isPage" in link && link.isPage ? (
                    <Link key={link.href} href={link.href} className="text-base font-medium text-cream/85">
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href} className="text-base font-medium text-cream/85">
                      {link.label}
                    </a>
                  ),
                )}
                <a href={homeHref(locale, "#faq")} className="text-base font-medium text-cream/85">
                  {dict.nav.faq}
                </a>
                <Link href={blogHref(locale)} className="text-base font-medium text-cream/85">
                  {dict.nav.blog}
                </Link>
                <TrackedOutboundLink
                  href={downloadUrl}
                  locale={locale}
                  downloadPlatform="ios"
                  downloadSource="header_mobile"
                  className={ctaGradientClass("mt-2 h-11 w-full cursor-pointer rounded-full text-sm")}
                >
                  {dict.nav.getTadado}
                </TrackedOutboundLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
