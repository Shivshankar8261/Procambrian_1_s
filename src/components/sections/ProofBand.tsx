"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const FIGURES = [
  {
    target: 1204,
    format: (v: number) => Math.round(v).toLocaleString(),
    label: "nodes in simulated graph",
    detail: "seed #1117, 420 attractors, kill radius 0.16",
  },
  {
    target: 73,
    format: (v: number) => `${Math.round(v)}%`,
    label: "modeled routing efficiency",
    detail: "± 6% band across 40 re-runs at this seed",
  },
  {
    target: 2.1,
    format: (v: number) => `${v.toFixed(1)}×`,
    label: "projected vs. fixed-topology baseline",
    detail: "simulation only — not measured against a deployed system",
  },
];

export function ProofBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="proof"
      ref={ref}
      className="px-6 md:px-16 py-20 md:py-28 bg-cambium-panel border-y border-lichen-dim/25"
    >
      <p className="font-display font-semibold text-lg text-bone max-w-xl mb-1">
        Illustrative model output — not measured in production yet.
      </p>
      <p className="prose-body text-lichen text-sm mb-12 max-w-xl">
        We have no deployed customer to report on. These figures come from
        the growth simulation itself, run at the seed and parameters shown.
      </p>
      <div className="grid sm:grid-cols-3 gap-10">
        {FIGURES.map((f) => (
          <Figure key={f.label} {...f} active={active} />
        ))}
      </div>
    </section>
  );
}

function Figure({
  target,
  format,
  label,
  detail,
  active,
}: {
  target: number;
  format: (v: number) => string;
  label: string;
  detail: string;
  active: boolean;
}) {
  const value = useCountUp(target, active);
  return (
    <div className="group relative">
      <p className="font-display font-semibold text-4xl md:text-5xl text-oxide-live tabular-nums">
        {format(value)}
      </p>
      <p className="font-display text-sm text-bone mt-2">{label}</p>
      <p className="prose-body text-lichen-dim text-xs mt-2">{detail}</p>
    </div>
  );
}
