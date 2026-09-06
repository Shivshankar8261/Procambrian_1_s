"use client";

import { useRef } from "react";
import type { VideoSource } from "@/lib/videoAssets";
import { Button } from "./ui/Button";
import { useReducedMotion, useSaveData } from "@/lib/useCapabilities";
import { useAutoplay } from "@/lib/useAutoplay";

export function Hero({
  sources,
}: {
  sources: VideoSource[];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const saveData = useSaveData();

  useAutoplay(videoRef, !reduced);

  return (
    <section
      id="main"
      className="relative min-h-[100svh] flex isolate overflow-hidden bg-night bg-[url(/hero-poster.jpg)] bg-cover bg-center"
      aria-labelledby="hero-heading"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover hero-drift"
        poster="/hero-poster.jpg"
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="auto"
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
      {/* Two scrims: one lifting off the bottom for the copy, one from the
          left so the headline keeps its contrast as the footage changes. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative shell flex flex-col justify-end pb-16 md:pb-24 pt-[calc(var(--nav-h)+4rem)]">
        <p className="eyebrow !text-white/75 mb-5">
          Rooted in nature · Delivered through AI
        </p>
        <h1
          id="hero-heading"
          className="font-display font-semibold text-white text-[2.35rem] leading-[1.05] sm:text-[3rem] lg:text-[3.9rem] xl:text-[4.4rem] max-w-[19ch] text-balance"
        >
          Nature and climate intelligence, built for industry.
        </h1>
        <p className="prose-body text-white/85 text-base md:text-lg mt-7 max-w-[58ch]">
          Procambrian turns complex environmental risks into audit-ready
          decisions, actionable strategies, and verifiable sustainability
          disclosures.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="#offerings" variant="solid" arrow>
            Explore products
          </Button>
          <Button href="#contact" variant="onDark">
            Request a demo
          </Button>
        </div>
      </div>

      <a
        href="#problems"
        className="absolute bottom-6 right-6 md:right-10 hidden sm:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="font-display text-[0.7rem] tracking-[0.18em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-10 w-px bg-white/40" aria-hidden="true" />
      </a>
    </section>
  );
}
