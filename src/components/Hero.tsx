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
      {/* Light scrim: dark ink on a light ground needs far less cover than
          the reverse, so this only softens the canvas behind the copy.
          On mobile the canvas sits above the copy, so the wash runs upward. */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-strata-ink via-strata-ink/70 to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-5xl">
        <p className="font-display text-sm text-lichen mb-4 tracking-wide">
          Sustainability, ESG and climate intelligence
        </p>
        <h1 className="font-display font-semibold text-[2.5rem] leading-[1.05] md:text-[4.5rem] md:leading-[1.02] text-bone max-w-4xl">
          Rooted in nature, delivered through AI.
        </h1>
        <p className="prose-body text-lichen text-lg md:text-xl mt-6 max-w-[52ch]">
          We turn an organisation&apos;s operational and environmental data
          into climate, ESG and sustainability intelligence it can act on —
          and we say which numbers are measured, modelled or estimated.
        </p>
        <div className="mt-9">
          <a
            href="#what-we-do"
            className="inline-flex items-center gap-2 bg-oxide-live text-on-accent font-display font-semibold px-6 py-3 hover:bg-oxide-live-dim transition-colors"
          >
            See what it does
          </a>
        </div>
      </div>
    </section>
  );
}
