"use client";

import { Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";

import type { Dictionary } from "@/lib/i18n";

const HERO_YOUTUBE_VIDEO_ID = "P16dW8JZrco";

function youtubeEmbedSrc(autoplay: boolean) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_VIDEO_ID}?${params.toString()}`;
}

interface HeroLaunchVideoProps {
  a11y: Dictionary["a11y"];
}

export function HeroLaunchVideo({ a11y }: HeroLaunchVideoProps) {
  const reduceMotion = useReducedMotion();
  const [isActivated, setIsActivated] = useState(false);
  const [isPosterReady, setIsPosterReady] = useState(false);

  const activate = useCallback(() => {
    setIsActivated(true);
  }, []);

  return (
    <div
      className="hero-launch-video relative mx-auto w-full max-w-[min(100%,340px)] sm:max-w-[380px] lg:max-w-none"
      style={{ "--hero-video-aspect": "16 / 9" } as React.CSSProperties}
    >
      <div className="hero-launch-video__glow" aria-hidden />

      <div className="hero-launch-video__frame">
        <div className="hero-launch-video__screen">
          {!isActivated ? (
            <>
              {!isPosterReady ? <div className="hero-launch-video__shimmer" aria-hidden /> : null}
              <button
                type="button"
                className="hero-launch-video__poster"
                onClick={activate}
                aria-label={a11y.launchVideo}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, loaded only once */}
                <img
                  className={isPosterReady ? "opacity-100" : "opacity-0"}
                  src={`https://i.ytimg.com/vi/${HERO_YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                  alt=""
                  width={480}
                  height={360}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setIsPosterReady(true)}
                />
                <span className="hero-launch-video__play" aria-hidden>
                  <Play className="hero-launch-video__play-icon" fill="currentColor" />
                </span>
              </button>
            </>
          ) : (
            <iframe
              className="hero-launch-video__embed"
              src={youtubeEmbedSrc(true)}
              title={a11y.launchVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {!reduceMotion ? (
            <>
              <div className="hero-launch-video__vignette" aria-hidden />
              <div className="hero-launch-video__edge-highlight" aria-hidden />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
