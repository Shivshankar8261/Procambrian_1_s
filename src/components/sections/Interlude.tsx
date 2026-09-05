"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { VideoSource } from "@/lib/videoAssets";
import { useCanRender3D, useSaveData } from "@/lib/useCapabilities";
import { useAutoplay } from "@/lib/useAutoplay";

const TerrainCanvas = dynamic(
  () => import("@/components/growth/TerrainCanvas").then((m) => m.TerrainCanvas),
  { ssr: false, loading: () => null }
);

/**
 * The long-view band. Where the hero is filmed nature, this one is
 * generated nature: a procedural range drifting toward the viewer with
 * elevation contours drawn across it — the same landscape the footage
 * shows, rendered the way it would be surveyed.
 *
 * Without WebGL it falls back to the aerial footage rather than to a
 * flat colour.
 */
export function Interlude({
  sources,
}: {
  sources: VideoSource[];
}) {
  const use3D = useCanRender3D();
  const saveData = useSaveData();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only reached when WebGL is unavailable and the footage stands in
  // for the terrain.
  useAutoplay(videoRef, !use3D);

  return (
    <section
      aria-label="Procambrian in one line"
      className="relative isolate overflow-hidden min-h-[72svh] flex items-end bg-gradient-to-b from-night-2 to-night"
    >
      {use3D ? (
        <TerrainCanvas />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover hero-drift"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          {sources.map((source) => (
            <source
              key={source.src}
              src={saveData && source.light ? source.light : source.src}
              type={source.type}
            />
          ))}
        </video>
      )}
      {/* Lifts the copy off the ridges without flattening the horizon. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent"
        aria-hidden="true"
      />
      <div className="relative shell py-16 md:py-24">
        <p className="eyebrow !text-white/70 mb-5">The long view</p>
        <p className="font-display font-semibold text-white text-xl md:text-3xl max-w-[30ch] text-balance leading-[1.15]">
          Sustainability work is long accumulation before visible change. We
          build for that timescale.
        </p>
      </div>
    </section>
  );
}
