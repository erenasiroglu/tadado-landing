import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";

import { DecksNavCrawlLinks } from "./DecksNavCrawlLinks";
import { DecksNavMenu } from "./DecksNavMenu";
import { LanguageMenu } from "./LanguageMenu";
import { MobileNavSheet } from "./MobileNavSheet";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navLinkClass =
  "cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-ink";

function homeHref(locale: Locale, hash: string) {
  return `${localeHref(locale)}${hash}`;
}

export function Header({ locale, dict }: HeaderProps) {
  const appStoreUrl = getAppStoreUrl(locale);

  const primaryLinks = [
    { href: homeHref(locale, "#modes"), label: dict.nav.play },
    { href: homeHref(locale, "#ai-decks"), label: dict.nav.aiDecks },
    { href: homeHref(locale, "#community"), label: dict.nav.community },
    { href: blogHref(locale), label: dict.nav.blog, isPage: true },
    { href: localeHref(locale, "team"), label: dict.nav.team, isPage: true },
    { href: homeHref(locale, "#how-it-works"), label: dict.nav.howItWorks },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-paper/72 backdrop-blur-md">
      <div className="section-shell flex h-14 items-center justify-between gap-4 md:h-16">
        <BrandLockup locale={locale} logoAlt={dict.a11y.tadadoLogo} />

        <DecksNavCrawlLinks locale={locale} dict={dict} />
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label={dict.a11y.mainNav}>
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
          <DecksNavMenu locale={locale} dict={dict} linkClassName={navLinkClass} />
          <LanguageMenu
            currentLocale={locale}
            label={dict.language.label}
            closeLabel={dict.a11y.closeLanguageMenu}
          />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageMenu
            currentLocale={locale}
            label={dict.language.label}
            closeLabel={dict.a11y.closeLanguageMenu}
          />
          <MobileNavSheet locale={locale} dict={dict} downloadUrl={appStoreUrl} />
        </div>
      </div>
    </header>
  );
}
