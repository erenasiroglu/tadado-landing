import Link from "next/link";

import { BRAND } from "@/lib/brand";

export function LegalPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen brand-gradient-bg">
      <header className="border-b border-white/10 py-4">
        <div className="section-shell">
          <Link href="/en" className="font-extrabold text-cream">TADADO</Link>
        </div>
      </header>
      {children}
      <footer className="section-shell py-8 text-center text-xs text-cream/45">
        <a href={`mailto:${BRAND.supportEmail}`} className="text-lavender hover:text-amber">
          {BRAND.supportEmail}
        </a>
      </footer>
    </div>
  );
}
