"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

import { MotionButton } from "@/components/motion/MotionButton";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/tracking";
import { Input } from "@/components/ui/input";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";

interface NewsletterSignupProps {
  dict: Dictionary;
  locale: Locale;
  compact?: boolean;
}

export function NewsletterSignup({ dict, locale, compact = false }: NewsletterSignupProps) {
  const content = dict.newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<"invalid" | "generic" | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorKey(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setErrorKey(data.error === "invalid" ? "invalid" : "generic");
        setStatus("error");
        return;
      }

      trackEvent({ event: ANALYTICS_EVENTS.NEWSLETTER_SIGNUP, properties: { locale } });
      setStatus("success");
      setEmail("");
    } catch {
      setErrorKey("generic");
      setStatus("error");
    }
  }

  return (
    <LandingSection
      id="newsletter"
      analyticsSection="newsletter"
      reveal
      className={compact ? "py-12" : undefined}
    >
      <div
        className={cn(
          "rounded-2xl surface-paper ring-1 ring-ink/10",
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
        )}
      >
        <div
          className={cn(
            "grid gap-6",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10",
          )}
        >
          <div className="min-w-0">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-mist text-ink ring-1 ring-ink/8">
              <Mail className="size-5" aria-hidden />
            </div>
            <h2
              className={cn(
                "font-extrabold tracking-tight text-balance text-foreground",
                compact ? "text-2xl sm:text-3xl" : "text-display",
              )}
            >
              {content.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/75 sm:text-base">
              {content.subtitle}
            </p>
          </div>

          <div className="min-w-0">
            {status === "success" ? (
              <div className="rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 dark:bg-emerald-950/20">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                  {content.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={content.placeholder}
                    required
                    autoComplete="email"
                    className="h-11 flex-1 rounded-full border-border bg-paper px-4 text-foreground placeholder:text-muted-foreground"
                  />
                  <MotionButton
                    type="submit"
                    disabled={status === "loading"}
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                      className: "h-11 px-6 disabled:opacity-70",
                    })}
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : (
                      content.button
                    )}
                  </MotionButton>
                </div>
                {status === "error" && errorKey ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errorKey === "invalid" ? content.errorInvalid : content.errorGeneric}
                  </p>
                ) : null}
                <p className="text-xs text-muted-foreground">{content.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </LandingSection>
  );
}