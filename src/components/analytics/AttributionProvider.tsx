"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import {
  captureAttributionFromLocation,
  getActiveAttribution,
} from "@/lib/attribution-storage";
import { LOCALES } from "@/lib/i18n-config";
import { registerAttribution, registerSessionContext, trackPageView } from "@/lib/tracking";

function extractLocale(pathname: string): string | undefined {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && (LOCALES as readonly string[]).includes(segment)) return segment;
  return undefined;
}

function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = extractLocale(pathname);

  useEffect(() => {
    captureAttributionFromLocation();
    registerAttribution(getActiveAttribution());
  }, [searchParams]);

  useEffect(() => {
    registerAttribution(getActiveAttribution());
    if (locale) registerSessionContext(locale, pathname);
    trackPageView(pathname, locale);
  }, [pathname, locale]);

  return null;
}

export function AttributionProvider() {
  return (
    <Suspense fallback={null}>
      <AttributionTracker />
    </Suspense>
  );
}
