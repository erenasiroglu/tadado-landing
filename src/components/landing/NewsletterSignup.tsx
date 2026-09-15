"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

import { MotionButton } from "@/components/motion/MotionButton";
import { ctaGradientClass } from "@/lib/cta-button";
import { Input } from "@/components/ui/input";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface NewsletterSignupProps {
  dict: Dictionary;
  locale: Locale;
}

export function NewsletterSignup({ dict, locale }: NewsletterSignupProps) {
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

      setStatus("success");
      setEmail("");
    } catch {
      setErrorKey("generic");
      setStatus("error");
    }
  }

  return (
    <LandingSection id="newsletter" reveal>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#3d1f58]/40 to-[#1a0f28]/90 p-6 sm:p-8 md:p-10">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lavender/10 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber/15 text-amber">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <SectionHeading title={content.title} subtitle={content.subtitle} align="left" />
          </div>

          <div>
            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-5 py-4">
                <p className="font-semibold text-emerald-200">{content.success}</p>
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
                    className="h-12 flex-1 rounded-full border-white/12 bg-white/[0.06] px-5 text-cream placeholder:text-cream/40"
                  />
                  <MotionButton
                    type="submit"
                    disabled={status === "loading"}
                    className={ctaGradientClass(
                      "h-12 rounded-full px-8 disabled:opacity-70",
                    )}
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      content.button
                    )}
                  </MotionButton>
                </div>
                {status === "error" && errorKey ? (
                  <p className="text-sm text-red-300">
                    {errorKey === "invalid" ? content.errorInvalid : content.errorGeneric}
                  </p>
                ) : null}
                <p className="text-xs text-cream/50">{content.privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
