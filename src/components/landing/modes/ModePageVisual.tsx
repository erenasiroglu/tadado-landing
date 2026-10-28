"use client";

import { Sparkles } from "lucide-react";

import { ForbiddenWordsScreen } from "@/components/landing/device/ForbiddenWordsScreen";
import { ModeDeviceStage } from "@/components/landing/device/ModeDeviceStage";
import { getAiDemoSample } from "@/lib/ai-demo-samples";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { ModePageId } from "@/lib/mode-pages";

const STAGE_MODE = {
  "forbidden-words": "taboo",
  "heads-up": "headsup",
  imposter: "imposter",
} as const;

/** Hero device for a mode page: the real gameplay screen, or an AI-made card under its topic for AI Decks. */
export function ModePageVisual({
  id,
  locale,
  dict,
}: {
  id: ModePageId;
  locale: Locale;
  dict: Dictionary;
}) {
  if (id !== "ai-decks") {
    return (
      <ModeDeviceStage
        mode={STAGE_MODE[id]}
        locale={locale}
        previewLabels={dict.gamePreview}
        portraitWidth={248}
        landscapeWidth={336}
      />
    );
  }

  const sample = getAiDemoSample(locale, "medium");
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="inline-flex items-center gap-2 rounded-full surface-paper px-4 py-2 text-sm font-bold text-ink">
        <Sparkles className="size-4" aria-hidden />
        {sample.topic}
      </p>
      <ForbiddenWordsScreen
        width={248}
        labels={dict.gamePreview}
        word={sample.word}
        forbidden={sample.forbidden}
        float
      />
    </div>
  );
}
