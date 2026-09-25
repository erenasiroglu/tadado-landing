import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import type { Dictionary, Locale } from "@/lib/i18n";

export function LegalPageShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col brand-gradient-bg">
      <Header locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
