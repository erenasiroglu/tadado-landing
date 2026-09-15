"use client";

import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  getHeadsUpPauseLabel,
  getHeadsUpTimerLabel,
  HERO_HEADS_UP_SAMPLES,
  HERO_TABOO_SAMPLES,
} from "@/lib/game-preview-tokens";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { HeroTab } from "@/lib/landing-variants";
import { fadeIn } from "@/lib/motion";
import type { Dictionary, Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/tracking";

import { AnimatedPhoneShell } from "./AnimatedPhoneShell";
import { PhoneFrame } from "./PhoneFrame";
import { ForbiddenWordsPreview } from "./previews/ForbiddenWordsPreview";
import { HeadsUpPreview } from "./previews/HeadsUpPreview";
import { PreviewPhoneGallery } from "./previews/PreviewPhoneGallery";
import { StoreBadges } from "./StoreBadges";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  defaultTab?: HeroTab;
}

const TABOO_PHONE_WIDTH = 188;
const HEADS_UP_PHONE_WIDTH = 320;

export function Hero({ locale, dict, defaultTab = "taboo" }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#1a0f28] py-16 sm:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
        <Stagger initial>
          <StaggerItem>
            <Badge
              variant="outline"
              className="mb-4 border-amber/30 bg-amber/10 text-amber uppercase tracking-wider"
            >
              {dict.hero.badge}
            </Badge>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-xl text-lg text-cream/75">{dict.hero.subtitle}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm font-medium text-lavender">{dict.hero.trust}</p>
          </StaggerItem>
          <StaggerItem>
            <StoreBadges locale={locale} className="mt-8" />
          </StaggerItem>
        </Stagger>

        {reduceMotion ? (
          <div className="flex w-full flex-col items-center">
            <HeroPhones locale={locale} dict={dict} defaultTab={defaultTab} />
          </div>
        ) : (
          <motion.div
            className="flex w-full flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroPhones locale={locale} dict={dict} defaultTab={defaultTab} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function HeroPhones({
  locale,
  dict,
  defaultTab,
}: {
  locale: Locale;
  dict: Dictionary;
  defaultTab: HeroTab;
}) {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="flex w-full max-w-2xl flex-col"
      onValueChange={(tab) => {
        trackEvent({
          event: ANALYTICS_EVENTS.HERO_TAB_SELECT,
          properties: { tab, locale },
        });
      }}
    >
      <TabsList className="mb-6 grid w-full shrink-0 cursor-default grid-cols-2 select-none bg-white/5">
        <TabsTrigger
          value="taboo"
          className="cursor-pointer select-none data-[state=active]:bg-amber data-[state=active]:text-[#2a0a3b]"
        >
          {dict.modes.tabooTitle}
        </TabsTrigger>
        <TabsTrigger
          value="headsup"
          className="cursor-pointer select-none data-[state=active]:bg-amber data-[state=active]:text-[#2a0a3b]"
        >
          {dict.modes.headsUpTitle}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="taboo" className="mt-0 flex justify-center">
        <PreviewPhoneGallery>
          {HERO_TABOO_SAMPLES.map((sample, index) => (
            <AnimatedPhoneShell key={sample.word} delay={index === 0 ? "none" : "short"}>
              <PhoneFrame orientation="portrait" width={TABOO_PHONE_WIDTH}>
                <ForbiddenWordsPreview
                  shellWidth={TABOO_PHONE_WIDTH}
                  word={sample.word}
                  forbidden={sample.forbidden}
                />
              </PhoneFrame>
            </AnimatedPhoneShell>
          ))}
        </PreviewPhoneGallery>
      </TabsContent>

      <TabsContent value="headsup" className="mt-0 flex justify-center">
        <PreviewPhoneGallery layout="stack">
          {HERO_HEADS_UP_SAMPLES.map((sample, index) => (
            <AnimatedPhoneShell key={sample.word} delay={index === 0 ? "none" : "medium"}>
              <PhoneFrame orientation="landscape" width={HEADS_UP_PHONE_WIDTH}>
                <HeadsUpPreview
                  shellWidth={HEADS_UP_PHONE_WIDTH}
                  word={sample.word}
                  timer={getHeadsUpTimerLabel(locale)}
                  pauseLabel={getHeadsUpPauseLabel(locale)}
                />
              </PhoneFrame>
            </AnimatedPhoneShell>
          ))}
        </PreviewPhoneGallery>
      </TabsContent>
    </Tabs>
  );
}
