import Image from "next/image";
import Link from "next/link";

import { localeHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  locale: Locale;
  logoAlt: string;
  className?: string;
  href?: boolean;
}

export function BrandLockup({ locale, logoAlt, className, href = true }: BrandLockupProps) {
  const content = (
    <>
      <Image
        src="/images/tadado_icon.png"
        alt={logoAlt}
        width={40}
        height={40}
        className="rounded-[27%] shadow-icon"
      />
      <span className="text-2xl font-black tracking-[-0.055em] text-ink lowercase">tadado</span>
    </>
  );

  if (!href) {
    return <div className={cn("flex items-center gap-2.5", className)}>{content}</div>;
  }

  return (
    <Link
      href={localeHref(locale)}
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      {content}
    </Link>
  );
}
