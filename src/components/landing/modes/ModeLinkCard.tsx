import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Card linking to one game mode page, used on the modes hub and in "more ways to play". */
export function ModeLinkCard({
  href,
  eyebrow,
  title,
  body,
  cta,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg surface-paper p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgb(26_15_41/0.1)] sm:p-7"
    >
      <span className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
        {eyebrow}
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
