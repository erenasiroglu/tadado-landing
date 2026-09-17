import Link from "next/link";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} className="back-link">
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
