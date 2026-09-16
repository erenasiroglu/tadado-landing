"use client";

import { useEffect, useState } from "react";

import { detectStorePlatform, type StorePlatform } from "@/lib/smart-app-link";

export function useStorePlatform(): StorePlatform {
  const [platform, setPlatform] = useState<StorePlatform>("unknown");

  useEffect(() => {
    setPlatform(detectStorePlatform(window.navigator.userAgent));
  }, []);

  return platform;
}

export function useResolvedStorePlatform(): "ios" | "android" {
  const platform = useStorePlatform();
  return platform === "android" ? "android" : "ios";
}
