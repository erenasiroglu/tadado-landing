import Image from "next/image";
import Link from "next/link";

import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { getAppStoreUrl } from "@/lib/store-links";

import { LanguageMenu } from "./LanguageMenu";
import { MobileNavSheet } from "./MobileNavSheet";

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
  const appStoreUrl = getAppStoreUrl(locale);

  const primaryLinks = [
    { href: homeHref(locale, "#modes"), label: dict.nav.play },
    { href: homeHref(locale, "#ai-decks"), label: dict.nav.aiDecks },
    { href: homeHref(locale, "#decks"), label: dict.nav.decks },
    { href: homeHref(locale, "#community"), label: dict.nav.community },
    { href: blogHref(locale), label: dict.nav.blog, isPage: true },
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
            alt={dict.a11y.tadadoLogo}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-base font-extrabold tracking-wide text-cream">Tadado</span>
        </Link>

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
