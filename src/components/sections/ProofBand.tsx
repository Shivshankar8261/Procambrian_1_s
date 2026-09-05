"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useCapabilities";
import { Reveal } from "@/components/ui/Reveal";

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
    <section id="proof" ref={ref} className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">Output</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            Illustrative model output — not measured in production yet.
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            We have no customer deployment to report on. These figures come
            from our own reference pipeline running on public and synthetic
            datasets, and none of them has been through third-party assurance.
          </p>
        </Reveal>
        <dl className="mt-14 grid gap-10 sm:grid-cols-3 border-t border-line pt-10">
          {FIGURES.map((f) => (
            <Figure key={f.label} {...f} active={active} />
          ))}
        </dl>
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
  // A number that animates is a number that is briefly wrong, so anyone
  // asking for reduced motion gets the final figure with no count-up.
  const reduced = useReducedMotion();
  const counted = useCountUp(target, active && !reduced);
  const value = reduced ? target : counted;
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <p className="font-display font-semibold text-4xl md:text-5xl text-water tabular-nums">
          {format(value)}
        </p>
        <p className="font-display text-sm text-ink mt-2 max-w-[30ch]">{label}</p>
        <p className="prose-body text-ink-faint text-xs mt-2 max-w-[34ch]">
          {detail}
        </p>
      </dd>
    </div>
  );
}
