"use client";

import { useEffect, type RefObject } from "react";

const RETRY_EVENTS = ["loadeddata", "canplay", "playing", "stalled"] as const;
// A real gesture grants user activation, after which no browser refuses
// to play a muted video. This is the backstop for every policy we cannot
// see from here.
const GESTURE_EVENTS = [
  "pointerdown",
  "touchstart",
  "keydown",
  "wheel",
  "scroll",
] as const;

/**
 * Keeps a decorative background video actually playing.
 *
 * The autoPlay attribute starts it, but several things stop it staying
 * started, and they are not all visible from the machine you develop on:
 *
 *  - play() called before the element has data rejects, and a swallowed
 *    rejection leaves the video parked on frame one;
 *  - a browser that declines the first attempt often accepts a later one;
 *  - a hidden tab has its decoder released, so a video that was playing
 *    can come back paused;
 *  - iOS Low Power Mode, some enterprise policies and some extensions
 *    refuse autoplay outright, and only a user gesture lifts it.
 */
export function useAutoplay(
  ref: RefObject<HTMLVideoElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!enabled) {
      video.pause();
      return;
    }

    const start = () => {
      if (!video.paused) return;
      video.play().catch(() => {
        /* Declined; a later event or the first gesture will try again. */
      });
    };

    start();

    RETRY_EVENTS.forEach((event) => video.addEventListener(event, start));
    document.addEventListener("visibilitychange", start);
    GESTURE_EVENTS.forEach((event) =>
      window.addEventListener(event, start, { passive: true })
    );

    return () => {
      RETRY_EVENTS.forEach((event) => video.removeEventListener(event, start));
      document.removeEventListener("visibilitychange", start);
      GESTURE_EVENTS.forEach((event) =>
        window.removeEventListener(event, start)
      );
    };
  }, [ref, enabled]);
}
