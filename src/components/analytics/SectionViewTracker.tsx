"use client";

import { useEffect, useRef } from "react";

import type { SectionId } from "@/lib/analytics-events";
import { trackSectionView } from "@/lib/tracking";

const SEEN_KEY = "tadado_sections_seen";

function hasSeenSection(sectionId: SectionId): boolean {
  try {
    const raw = sessionStorage.getItem(SEEN_KEY);
    const seen = raw ? (JSON.parse(raw) as string[]) : [];
    return seen.includes(sectionId);
  } catch {
    return false;
  }
}

function markSectionSeen(sectionId: SectionId) {
  try {
    const raw = sessionStorage.getItem(SEEN_KEY);
    const seen = raw ? (JSON.parse(raw) as string[]) : [];
    if (!seen.includes(sectionId)) {
      seen.push(sectionId);
      sessionStorage.setItem(SEEN_KEY, JSON.stringify(seen));
    }
  } catch {
    // ignore storage errors
  }
}

interface SectionViewTrackerProps {
  sectionId: SectionId;
  children: React.ReactNode;
  className?: string;
}

export function SectionViewTracker({
  sectionId,
  children,
  className,
}: SectionViewTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasSeenSection(sectionId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || entry.intersectionRatio < 0.35) return;

        markSectionSeen(sectionId);
        trackSectionView(sectionId);
        observer.disconnect();
      },
      { threshold: [0.35] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
