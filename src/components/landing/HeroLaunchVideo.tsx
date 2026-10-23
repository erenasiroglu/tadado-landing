"use client";

import { Play, Volume2 } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n";

export const HERO_BRAND_FILM_SRC = "/videos/tadado-brand-film-v5-pulse-720.mp4";
export const HERO_BRAND_FILM_SRC_MOBILE = "/videos/tadado-brand-film-v5-pulse-480.mp4";
export const HERO_BRAND_FILM_POSTER = "/videos/tadado-brand-film-poster-1280.webp";
const HERO_BRAND_FILM_POSTER_MOBILE = "/videos/tadado-brand-film-poster-640.webp";
const HERO_BRAND_FILM_CAPTIONS = "/videos/tadado-brand-film.en.vtt";

type NetworkInformationLike = { saveData?: boolean; effectiveType?: string };

/** Smaller file for phones; the 720p film only on wider screens. */
function pickFilmSource(): string {
  return window.matchMedia("(min-width: 768px)").matches
    ? HERO_BRAND_FILM_SRC
    : HERO_BRAND_FILM_SRC_MOBILE;
}

/** Skip the muted autoplay on data-saver or 2G connections; the poster stays. */
function shouldAutoplay(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return !["slow-2g", "2g"].includes(connection.effectiveType ?? "");
}

/** Runs after the page has loaded and the main thread is idle, so the film never competes with LCP. */
function whenPageIdle(callback: () => void): () => void {
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(callback, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(callback, 1200);
    }
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}

interface HeroLaunchVideoProps {
  a11y: Dictionary["a11y"];
}

export function HeroLaunchVideo({ a11y }: HeroLaunchVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

  const ensureSource = useCallback((video: HTMLVideoElement) => {
    if (!video.getAttribute("src")) {
      video.src = pickFilmSource();
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    return whenPageIdle(() => {
      if (!shouldAutoplay()) return;
      ensureSource(video);
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {
        /* Autoplay blocked — user can tap play */
      });
    });
  }, [reduceMotion, ensureSource]);

  const startWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    ensureSource(video);

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
  }, [ensureSource]);

  const startMuted = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    ensureSource(video);

    video.muted = true;
    video.loop = true;
    video.controls = true;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      /* ignore */
    }
  }, [ensureSource]);

  return (
    <div
      className="hero-launch-video relative mx-auto w-full max-w-[min(100%,520px)] sm:max-w-[560px] lg:max-w-none"
      style={{ "--hero-video-aspect": "16 / 9" } as React.CSSProperties}
    >
      <div className="hero-launch-video__glow" aria-hidden />

      <div className="hero-launch-video__frame">
        <div className="hero-launch-video__screen">
          {/* Plain image so the hero paints (and counts as LCP) before any video bytes load. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-launch-video__still"
            src={HERO_BRAND_FILM_POSTER}
            srcSet={`${HERO_BRAND_FILM_POSTER_MOBILE} 640w, ${HERO_BRAND_FILM_POSTER} 1280w`}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 560px, 100vw"
            width={1280}
            height={720}
            alt=""
            fetchPriority="high"
            decoding="async"
          />

          <video
            ref={videoRef}
            className="hero-launch-video__video"
            data-ready={hasFrame ? "true" : "false"}
            preload="none"
            muted
            playsInline
            loop={!soundOn}
            controls={soundOn}
            aria-label={a11y.launchVideo}
            onPlaying={() => setHasFrame(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              if (!soundOn) return;
              setIsPlaying(false);
            }}
          >
            <track kind="captions" src={HERO_BRAND_FILM_CAPTIONS} srcLang="en" label="English" />
          </video>

          {!soundOn ? (
            <div className="hero-launch-video__overlay">
              {!reduceMotion && isPlaying ? (
                <button
                  key="sound"
                  type="button"
                  className="hero-launch-video__sound"
                  onClick={startWithSound}
                  aria-label={a11y.launchVideo}
                >
                  <Volume2 className="h-5 w-5" aria-hidden />
                </button>
              ) : (
                <button
                  key="poster"
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
