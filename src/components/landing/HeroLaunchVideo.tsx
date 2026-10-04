"use client";

import { Play, Volume2 } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const HERO_BRAND_FILM_SRC = "/videos/tadado-brand-film-v5-pulse.mp4";

interface HeroLaunchVideoProps {
  a11y: Dictionary["a11y"];
}

export function HeroLaunchVideo({ a11y }: HeroLaunchVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        /* Autoplay blocked — user can tap play */
      });
    }
  }, [reduceMotion]);

  const startWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setSoundOn(true);
    video.loop = false;
    video.muted = false;
    video.controls = true;
    video.currentTime = 0;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      video.muted = true;
      await video.play();
      setIsPlaying(true);
    }
  }, []);

  const startMuted = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.controls = true;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div
      className="hero-launch-video relative mx-auto w-full max-w-[min(100%,520px)] sm:max-w-[560px] lg:max-w-none"
      style={{ "--hero-video-aspect": "16 / 9" } as React.CSSProperties}
    >
      <div className="hero-launch-video__glow" aria-hidden />

      <div className="hero-launch-video__frame">
        <div className="hero-launch-video__screen">
          {!isReady ? <div className="hero-launch-video__shimmer" aria-hidden /> : null}

          <video
            ref={videoRef}
            className={cn(
              "hero-launch-video__video",
              isReady ? "opacity-100" : "opacity-0",
            )}
            src={HERO_BRAND_FILM_SRC}
            preload={reduceMotion ? "metadata" : "auto"}
            muted
            playsInline
            loop={!soundOn}
            controls={soundOn}
            aria-label={a11y.launchVideo}
            onLoadedData={() => setIsReady(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              if (!soundOn) return;
              setIsPlaying(false);
            }}
          />

          {!soundOn ? (
            <div className="hero-launch-video__overlay">
              {!reduceMotion && isPlaying ? (
                <button
                  type="button"
                  className="hero-launch-video__sound"
                  onClick={startWithSound}
                  aria-label={a11y.launchVideo}
                >
                  <Volume2 className="h-5 w-5" aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  className="hero-launch-video__poster"
                  onClick={reduceMotion ? startMuted : startWithSound}
                  aria-label={a11y.launchVideo}
                >
                  <span className="hero-launch-video__play" aria-hidden>
                    <Play className="hero-launch-video__play-icon" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          ) : null}

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
