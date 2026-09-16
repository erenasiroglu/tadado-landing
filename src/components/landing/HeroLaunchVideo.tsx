"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const HERO_LAUNCH_VIDEO_SRC = "/videos/hero-launch.mp4";

export function HeroLaunchVideo() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(9 / 16);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    void video.play().catch(() => {});
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    playVideo();
  }, [playVideo, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (!isMuted) playVideo();
  }, [isMuted, playVideo]);

  function handleLoadedMetadata(event: React.SyntheticEvent<HTMLVideoElement>) {
    const video = event.currentTarget;
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      setAspectRatio(video.videoWidth / video.videoHeight);
    }
  }

  return (
    <div
      className="hero-launch-video relative mx-auto w-full max-w-[min(100%,340px)] sm:max-w-[380px] lg:max-w-none"
      style={{ "--hero-video-aspect": aspectRatio } as React.CSSProperties}
    >
      <div className="hero-launch-video__glow" aria-hidden />

      <div className="hero-launch-video__frame">
        <div className="hero-launch-video__screen">
          {!isReady ? <div className="hero-launch-video__shimmer" aria-hidden /> : null}

          <div className="hero-launch-video__backdrop" aria-hidden>
            <video
              className="hero-launch-video__backdrop-media"
              src={HERO_LAUNCH_VIDEO_SRC}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
            />
          </div>

          <video
            ref={videoRef}
            className={cn(
              "hero-launch-video__media",
              isReady ? "opacity-100" : "opacity-0",
            )}
            src={HERO_LAUNCH_VIDEO_SRC}
            autoPlay={!reduceMotion}
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsReady(true)}
            onLoadedMetadata={handleLoadedMetadata}
            aria-label="Tadado product launch video"
          />

          <div className="hero-launch-video__vignette" aria-hidden />
          <div className="hero-launch-video__edge-highlight" aria-hidden />
        </div>

        <button
          type="button"
          className="hero-launch-video__sound"
          aria-label={isMuted ? "Unmute launch video" : "Mute launch video"}
          aria-pressed={!isMuted}
          onClick={() => setIsMuted((current) => !current)}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
