import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/** Card linking to one game mode page, used on the modes hub and in "more ways to play". */
export function ModeLinkCard({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg surface-paper p-6 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-lilac/25 hover:shadow-[0_18px_36px_rgb(26_15_41/0.1)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-ink"
          aria-hidden
        />
      </div>
      <span className="mt-3 text-xl leading-tight font-extrabold tracking-[-0.03em] text-balance text-foreground">
        {title}
      </span>
      <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{body}</span>
    </Link>
  );
}
