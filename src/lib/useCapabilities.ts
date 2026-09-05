"use client";

import { useSyncExternalStore } from "react";
import { detectWebGL } from "./capabilities";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Live: flips if the visitor changes the OS setting while reading. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

// The probe allocates a canvas and a WebGL context, so it runs once per
// document and the answer is reused for every snapshot read.
let webglSupport: boolean | null = null;
function getWebGL() {
  if (webglSupport === null) webglSupport = detectWebGL();
  return webglSupport;
}
const noSubscribe = () => () => {};

/**
 * Whether the animated hero should run at all. Read through
 * useSyncExternalStore rather than an effect, so the server renders the
 * static fallback and the client upgrades in the same commit as
 * hydration — no flash, and no setState during an effect.
 */
export function useCanRender3D(): boolean {
  const reduced = useReducedMotion();
  const webgl = useSyncExternalStore(noSubscribe, getWebGL, () => false);
  return webgl && !reduced;
}

// The hero footage ships in two encodes of the same shot: a 1.9 MB
// master and a 0.37 MB one. Sending five times the bytes to someone who
// has asked their browser to save data is exactly the cost Principle 03
// says we should not impose, so that request is honoured.
//
// Only saveData is consulted. effectiveType was tried first and is the
// wrong signal: it is a round-trip-time estimate, and Chrome reports
// "3g" on an ordinary fast desktop connection (rtt 500ms), which quietly
// downgraded the hero for everyone.
type Connection = {
  saveData?: boolean;
};

let videoSource: string | null = null;
function getVideoSource() {
  if (videoSource === null) {
    const connection = (
      navigator as Navigator & { connection?: Connection }
    ).connection;
    videoSource =
      connection?.saveData === true ? "/nature-light.webm" : "/nature.webm";
  }
  return videoSource;
}

/** Full-quality master unless the visitor has asked to save data. */
export function useVideoSource(): string {
  return useSyncExternalStore(noSubscribe, getVideoSource, () => "/nature.webm");
}
