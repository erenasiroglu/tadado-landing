import Image from "next/image";
import Link from "next/link";

import { StoreButtons } from "@/components/landing/primitives/StoreButton";
import { BRAND } from "@/lib/brand";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";

import { SocialIconLink } from "./SocialIconLink";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber/80">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-lavender transition-colors hover:text-amber">
        {children}
      </Link>
    </li>
  );
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/8 bg-[#1c1129] py-12">
      <div className="section-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Image
                src="/images/tadado_icon.png"
                alt="Tadado"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-extrabold text-cream">TADADO</span>
            </div>
            <p className="mt-3 text-sm text-cream/65">{dict.footer.tagline}</p>
            <p className="mt-1 text-xs text-lavender/80">{dict.footer.developer}</p>
            <StoreButtons locale={locale} source="hero_badges" a11y={dict.a11y} className="mt-6" />
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <FooterColumn title={dict.footer.playTitle}>
              <FooterLink href="#modes">{dict.nav.play}</FooterLink>
              <FooterLink href="#ai-decks">{dict.nav.aiDecks}</FooterLink>
              <FooterLink href="#decks">{dict.nav.decks}</FooterLink>
              <FooterLink href="#community">{dict.nav.community}</FooterLink>
              <FooterLink href="#how-it-works">{dict.nav.howItWorks}</FooterLink>
            </FooterColumn>

            <FooterColumn title={dict.footer.discoverTitle}>
              <FooterLink href={blogHref(locale)}>{dict.nav.blog}</FooterLink>
              <FooterLink href={localeHref(locale, "guides")}>{dict.nav.guides}</FooterLink>
              <FooterLink href={localeHref(locale, "team")}>{dict.nav.team}</FooterLink>
              <FooterLink href={localeHref(locale, "compare")}>{dict.nav.compare}</FooterLink>
            </FooterColumn>

            <FooterColumn title={dict.footer.growTitle}>
              <FooterLink href={localeHref(locale, "affiliate")}>{dict.nav.affiliate}</FooterLink>
              <FooterLink href={localeHref(locale, "partnerships")}>
                {dict.footer.partnerships}
              </FooterLink>
            </FooterColumn>

            <FooterColumn title={dict.footer.supportTitle}>
              <FooterLink href="#faq">{dict.nav.faq}</FooterLink>
              <li>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="text-lavender transition-colors hover:text-amber"
                >
                  {dict.footer.help}
                </a>
              </li>
              <FooterLink href={localeHref(locale, "privacy-policy")}>{dict.footer.privacy}</FooterLink>
              <FooterLink href={localeHref(locale, "terms-of-use")}>{dict.footer.terms}</FooterLink>
            </FooterColumn>

            <FooterColumn title={dict.footer.socialTitle}>
              <li>
                <SocialIconLink
                  href={SOCIAL_LINKS.instagram.href}
                  label={dict.community.instagramCta}
                  network="instagram"
                  showLabel
                  className="h-auto justify-start px-0 hover:bg-transparent"
                />
              </li>
              <li>
                <SocialIconLink
                  href={SOCIAL_LINKS.tiktok.href}
                  label={dict.community.tiktokCta}
                  network="tiktok"
                  showLabel
                  className="h-auto justify-start px-0 hover:bg-transparent"
                />
              </li>
              <li>
                <SocialIconLink
                  href={SOCIAL_LINKS.linkedin.href}
                  label={dict.community.linkedinCta}
                  network="linkedin"
                  showLabel
                  className="h-auto justify-start px-0 hover:bg-transparent"
                />
              </li>
              <li>
                <SocialIconLink
                  href={SOCIAL_LINKS.productHunt.href}
                  label={dict.community.productHuntCta}
                  network="productHunt"
                  showLabel
                  className="h-auto justify-start px-0 hover:bg-transparent"
                />
              </li>
            </FooterColumn>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-cream/45">
          {dict.footer.copyright.replace("{{year}}", String(year))}
        </p>
      </div>
    </footer>
  );
}
