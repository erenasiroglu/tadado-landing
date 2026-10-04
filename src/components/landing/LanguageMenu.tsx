"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { LOCALES, type Locale } from "@/lib/i18n-config";
import { pathnameForLocale } from "@/lib/locale-switch";
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

  function onSelect(next: Locale) {
    router.push(pathnameForLocale(pathname, currentLocale, next));
    setOpen(false);
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label={label}
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
            className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-border /98 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="grid max-h-64 grid-cols-2 gap-1 overflow-y-auto">
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
                      "flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition",
                      isActive
                        ? "bg-lilac text-foreground ring-1 ring-ink/20"
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
