import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@/lib/brand";
import { blogHref, localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";

import { SocialIconLink } from "./SocialIconLink";
import { StoreBadges } from "./StoreBadges";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/8 bg-[#1c1129] py-12">
      <div className="section-shell grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Image src="/images/tadado_icon.png" alt="Tadado" width={32} height={32} className="rounded-lg" />
            <span className="font-extrabold text-cream">TADADO</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-cream/65">{dict.footer.tagline}</p>
          <p className="mt-1 text-xs text-lavender/80">{dict.footer.developer}</p>
          <StoreBadges locale={locale} className="mt-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">{dict.footer.support}</p>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="mt-2 block text-sm text-lavender hover:text-amber"
          >
            {BRAND.supportEmail}
          </a>
          <div className="mt-4 flex gap-2">
            <SocialIconLink
              href={SOCIAL_LINKS.instagram.href}
              label={dict.community.instagramCta}
              network="instagram"
            />
            <SocialIconLink
              href={SOCIAL_LINKS.tiktok.href}
              label={dict.community.tiktokCta}
              network="tiktok"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">{dict.footer.legal}</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/terms-of-use" className="text-lavender hover:text-amber">
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-lavender hover:text-amber">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={blogHref(locale)} className="text-lavender hover:text-amber">
                {dict.nav.blog}
              </Link>
            </li>
            <li>
              <Link href={localeHref(locale, "compare")} className="text-lavender hover:text-amber">
                {dict.footer.compare}
              </Link>
            </li>
            <li>
              <Link href={`${localeHref(locale)}#pricing`} className="text-lavender hover:text-amber">
                {dict.nav.pricing}
              </Link>
            </li>
            <li>
              <Link href={localeHref(locale, "partnerships")} className="text-lavender hover:text-amber">
                {dict.footer.partnerships}
              </Link>
            </li>
            <li>
              <Link href={localeHref(locale, "affiliate")} className="text-lavender hover:text-amber">
                {dict.footer.affiliate}
              </Link>
            </li>
            <li>
              <Link href={localeHref(locale, "team")} className="text-lavender hover:text-amber">
                {dict.footer.team}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="section-shell mt-10 text-center text-xs text-cream/45">
        {dict.footer.copyright.replace("{{year}}", String(year))}
      </p>
    </footer>
  );
}
