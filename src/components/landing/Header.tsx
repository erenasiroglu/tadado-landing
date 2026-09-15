import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { MotionLink } from "@/components/motion/MotionLink";
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
  "text-sm font-medium text-cream/70 transition-colors hover:text-cream";

export function Header({ locale, dict }: HeaderProps) {
  const downloadUrl = getAppStoreUrl(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#1a0f28]/85 backdrop-blur-md">
      <div className="section-shell flex h-14 items-center justify-between gap-4">
        <Link href={localeHref(locale)} className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/tadado_icon.png"
            alt="Tadado"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-base font-extrabold tracking-wide text-cream">Tadado</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          <a href="#pricing" className={navLinkClass}>{dict.nav.pricing}</a>
          <Link href={blogHref(locale)} className={navLinkClass}>{dict.nav.blog}</Link>
          <Link href={localeHref(locale, "affiliate")} className={navLinkClass}>
            {dict.nav.affiliate}
          </Link>
          <Link href={localeHref(locale, "team")} className={navLinkClass}>
            {dict.nav.team}
          </Link>
          <LanguageMenu currentLocale={locale} label={dict.language.label} />
          <MotionLink
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaGradientClass(
              "h-9 rounded-full px-5 text-sm shadow-lg shadow-violet-900/25",
            )}
          >
            {dict.nav.download}
          </MotionLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageMenu currentLocale={locale} label={dict.language.label} />
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "h-9 w-9 border-white/12 bg-white/[0.04] text-cream",
              )}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="border-white/12 bg-[#1a0f28] text-cream">
              <SheetHeader>
                <SheetTitle className="text-cream">Tadado</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                <a href="#pricing" className="rounded-lg px-3 py-2.5 text-sm font-medium text-cream/80 hover:bg-white/5 hover:text-cream">
                  {dict.nav.pricing}
                </a>
                <Link href={blogHref(locale)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-cream/80 hover:bg-white/5 hover:text-cream">
                  {dict.nav.blog}
                </Link>
                <Link href={localeHref(locale, "affiliate")} className="rounded-lg px-3 py-2.5 text-sm font-medium text-cream/80 hover:bg-white/5 hover:text-cream">
                  {dict.nav.affiliate}
                </Link>
                <Link href={localeHref(locale, "team")} className="rounded-lg px-3 py-2.5 text-sm font-medium text-cream/80 hover:bg-white/5 hover:text-cream">
                  {dict.nav.team}
                </Link>
                <MotionLink
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaGradientClass("mt-4 h-11 w-full rounded-full")}
                >
                  {dict.nav.download}
                </MotionLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
