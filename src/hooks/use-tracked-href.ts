"use client";

import { useEffect, useState } from "react";

import { getActiveAttribution } from "@/lib/attribution-storage";
import { appendAttributionToUrl } from "@/lib/utm";

export function useTrackedHref(baseUrl: string): string {
  const [href, setHref] = useState(baseUrl);

  useEffect(() => {
    setHref(appendAttributionToUrl(baseUrl, getActiveAttribution()));
  }, [baseUrl]);

  return href;
}
