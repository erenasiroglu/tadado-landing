import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { DownloadSource } from "@/lib/analytics-events";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { MobileStoreDownloadCta } from "../primitives/MobileStoreDownloadCta";
import { StoreButtons } from "../primitives/StoreButton";

/** Store CTA used across compare pages: one smart button on phones, both badges on larger screens. */
export function CompareDownload({
  locale,
  dict,
  label,
  className,
  dark,
  source = "compare",
}: {
  locale: Locale;
  dict: Dictionary;
  label: string;
  className?: string;
  dark?: boolean;
  source?: DownloadSource;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="w-full max-w-sm sm:hidden">
        <MobileStoreDownloadCta
          locale={locale}
          source={source}
          label={label}
          className={
            dark ? "text-ink shadow-none ![background:var(--cream)]" : undefined
          }
        />
      </div>
      <StoreButtons
        locale={locale}
        source={source}
        a11y={dict.a11y}
        labelMode="download"
        className="hidden sm:flex"
        buttonClassName={
          dark ? "bg-cream shadow-none hover:bg-white" : undefined
        }
      />
      <p
        className={cn(
          "text-xs font-semibold",
          dark ? "text-cream/60" : "text-muted-foreground",
        )}
      >
        {dict.compareHub.freeNote}
      </p>
    </div>
  );
}

/** First letter of a game name, so every rival gets a neutral typographic tile instead of a logo. */
function monogram(name: string): string {
  const [first] = Array.from(
    name.replace(/^(the|el|la|le|il|o|a)\s+/i, "").trim(),
  );
  return (first ?? "?").toLocaleUpperCase();
}

/** Tadado app tile against a typographic tile for the other game. */
export function VersusCard({ game, dict }: { game: string; dict: Dictionary }) {
  return (
    <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
      <div className="flex aspect-[5/6] flex-col sm:aspect-[4/5] justify-between rounded-lg surface-obsidian p-5 sm:p-6">
        <Image
          src="/images/tadado_icon.png"
          alt=""
          width={72}
          height={72}
          priority
          className="size-14 rounded-[1rem] ring-1 ring-cream/15 sm:size-[4.5rem] sm:rounded-[1.25rem]"
        />
        <div>
          <p className="text-2xl font-extrabold tracking-[-0.03em] text-cream sm:text-3xl">
            Tadado
          </p>
          <p className="mt-2 text-xs leading-relaxed font-semibold text-cream/65">
            {dict.modes.tabooTitle} · {dict.modes.headsUpTitle}
          </p>
        </div>
      </div>
      <div className="flex aspect-[5/6] flex-col sm:aspect-[4/5] justify-between rounded-lg surface-paper p-5 sm:p-6">
        <span
          className="flex size-14 items-center justify-center rounded-[1rem] bg-mist text-2xl font-black text-ink/70 ring-1 ring-ink/10 ring-inset sm:size-[4.5rem] sm:rounded-[1.25rem] sm:text-3xl"
          aria-hidden
        >
          {monogram(game)}
        </span>
        <p className="text-xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-foreground sm:text-2xl">
          {game}
        </p>
      </div>
      <span
        className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-sm font-black tracking-[-0.02em] text-ink shadow-[0_10px_24px_rgb(26_15_41/0.22)] ring-4 ring-background sm:size-14 sm:text-base"
        aria-hidden
      >
        {dict.compareHub.vs}
      </span>
    </div>
  );
}

/** Card linking to one comparison page, used on the hub and in "compare more" grids. */
export function CompareLinkCard({
  href,
  title,
  body,
  cta,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg surface-paper p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(26_15_41/0.1)] sm:p-7"
    >
      <span className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
        Tadado
        <span className="rounded-full bg-ink px-1.5 py-0.5 text-[0.625rem] text-cream">
          VS
        </span>
      </span>
      <span className="mt-3 text-xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-foreground">
        {title}
      </span>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink">
        {cta}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
