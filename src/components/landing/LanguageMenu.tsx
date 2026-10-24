"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LOCALES, type Locale } from "@/lib/i18n-config";
import { pathnameForLocale, rememberLocale } from "@/lib/locale-switch";
import { LANGUAGE_DISPLAY } from "@/lib/languages";
import { cn } from "@/lib/utils";

interface LanguageMenuProps {
  currentLocale: Locale;
  label: string;
  closeLabel: string;
  className?: string;
}

export function LanguageMenu({ currentLocale, label, closeLabel, className }: LanguageMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = LANGUAGE_DISPLAY[currentLocale];

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function onSelect(next: Locale) {
    rememberLocale(next);
    router.push(pathnameForLocale(pathname, currentLocale, next));
    setOpen(false);
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border surface-paper px-3 text-foreground transition hover:border-white/20 hover:bg-lilac"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {currentLocale === "pt-BR" ? "PT" : currentLocale.toUpperCase()}
        </span>
        <span className="sr-only">{label}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted-foreground transition", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            aria-label={label}
            className="absolute right-0 z-50 mt-2 w-[min(calc(100vw-2rem),20rem)] rounded-[1.25rem] border border-border bg-paper p-2 shadow-[0_24px_48px_rgb(26_15_41/0.18)]"
          >
            <p className="px-3 pt-2 pb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="grid max-h-[min(28rem,60vh)] grid-cols-2 gap-1 overflow-y-auto">
              {LOCALES.map((locale) => {
                const item = LANGUAGE_DISPLAY[locale];
                const isActive = locale === currentLocale;
                return (
                  <button
                    key={locale}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => onSelect(locale)}
                    className={cn(
                      "flex min-h-10 cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition",
                      isActive
                        ? "bg-lilac text-foreground"
                        : "text-muted-foreground hover:bg-lilac hover:text-foreground",
                    )}
                  >
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-xs font-medium">{item.label}</span>
                    {isActive ? <Check className="h-3.5 w-3.5 shrink-0 text-ink" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
