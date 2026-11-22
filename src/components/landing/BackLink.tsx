import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-0.5 rounded-md px-2.5 py-1.5 -ms-2.5 text-sm font-semibold text-muted-foreground transition-[color,background-color,box-shadow] duration-200 hover:bg-lilac/40 hover:text-foreground hover:shadow-sm"
    >
      <ChevronLeft className="size-4 shrink-0 rtl:rotate-180" aria-hidden />
      <span>{children}</span>
    </Link>
  );
}
