"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { detectWebGL, prefersReducedMotion } from "@/lib/capabilities";
import { HeroFallback } from "./hero3d/HeroFallback";

const HeroCanvas = dynamic(
  () => import("./hero3d/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const [use3D, setUse3D] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUse3D(detectWebGL() && !prefersReducedMotion());
    setChecked(true);
  }, []);

  return (
    <section
      id="main"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden border-b border-lichen-dim/30"
    >
      <div className="absolute inset-0 bg-cambium-panel">
        {checked && (use3D ? <HeroCanvas /> : <HeroFallback />)}
      </div>
      {/* Scrim for text contrast over the canvas — heavier on the left,
          where the copy sits, so the growth field stays visible on the right. */}
      <div className="absolute inset-0 bg-gradient-to-t from-strata-ink via-strata-ink/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-strata-ink via-strata-ink/55 to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-5xl">
        <p className="font-display text-sm text-lichen mb-4 tracking-wide">
          Procambrian
        </p>
        <h1 className="font-display font-semibold text-[2.5rem] leading-[1.05] md:text-[4.5rem] md:leading-[1.02] text-bone max-w-4xl">
          Rooted in nature, delivered through AI.
        </h1>
        <p className="prose-body text-lichen text-lg md:text-xl mt-6 max-w-[46ch]">
          We grow routing structure from biological first principles, then
          differentiate it into working systems.
        </p>
        <div className="mt-9">
          <a
            href="#what-we-do"
            className="inline-flex items-center gap-2 bg-oxide-live text-bone font-display font-semibold px-6 py-3 hover:bg-oxide-live-dim transition-colors"
          >
            See how it grows
          </a>
        </div>
      </div>
    </section>
  );
}
