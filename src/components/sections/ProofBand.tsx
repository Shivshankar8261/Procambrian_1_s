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
    target: 14,
    format: (v: number) => Math.round(v).toString(),
    label: "data sources reconciled in the reference pipeline",
    detail: "public energy, fuel and procurement datasets — no customer data",
  },
  {
    target: 73,
    format: (v: number) => `${Math.round(v)}%`,
    label: "of the sample inventory traced to measured records",
    detail: "the remaining 27% is modelled or estimated, and marked as such",
  },
  {
    target: 2.1,
    format: (v: number) => `${v.toFixed(1)}×`,
    label: "faster than the manual reconciliation baseline",
    detail: "one internal test on a synthetic dataset — not a customer result",
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
        We have no customer deployment to report on. These figures come from
        our own reference pipeline running on public and synthetic datasets,
        and none of them has been through third-party assurance.
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
