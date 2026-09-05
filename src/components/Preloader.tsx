"use client";

import { useEffect, useState } from "react";
import { detectWebGL, prefersReducedMotion } from "@/lib/capabilities";

type Check = { id: string; label: string; run: () => string };

const CHECKS: Check[] = [
  {
    id: "session",
    label: "Session",
    run: () =>
      typeof sessionStorage !== "undefined" ? "storage available" : "unavailable",
  },
  {
    id: "timezone",
    label: "Time zone",
    run: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  {
    id: "viewport",
    label: "Viewport",
    run: () => `${window.innerWidth}×${window.innerHeight}`,
  },
  {
    id: "motion",
    label: "Motion preference",
    run: () => (prefersReducedMotion() ? "reduced" : "full"),
  },
  {
    id: "render",
    label: "Render path",
    run: () => (detectWebGL() ? "WebGL" : "static fallback"),
  },
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [results, setResults] = useState<{ label: string; value: string }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const check of CHECKS) {
        // Small, real stagger — not a fake progress animation, just
        // giving each check its own visible moment.
        await new Promise((r) => setTimeout(r, 140));
        if (cancelled) return;
        setResults((prev) => [...prev, { label: check.label, value: check.run() }]);
      }
      await new Promise((r) => setTimeout(r, 220));
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onDone, 380);
    return () => clearTimeout(t);
  }, [done, onDone]);

  const pct = Math.round((results.length / CHECKS.length) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 bg-strata-ink flex flex-col justify-center px-6 md:px-16 transition-opacity duration-300 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <p className="font-display text-sm text-lichen mb-6">
        Running local diagnostics
      </p>
      <ul className="font-display text-lg md:text-xl space-y-2 mb-8">
        {CHECKS.map((c, i) => {
          const result = results[i];
          return (
            <li key={c.id} className="flex items-baseline gap-3">
              <span
                className={result ? "text-oxide-live" : "text-lichen-dim"}
                aria-hidden="true"
              >
                {result ? "✓" : "·"}
              </span>
              <span className={result ? "text-bone" : "text-lichen-dim"}>
                {c.label}
              </span>
              {result && (
                <span className="text-lichen text-sm">{result.value}</span>
              )}
            </li>
          );
        })}
      </ul>
      <div className="h-px w-full max-w-sm bg-lichen-dim/30 relative">
        <div
          className="h-px bg-oxide-live absolute left-0 top-0 transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-display text-xs text-lichen-dim mt-3 tabular-nums">
        {pct}%
      </p>
    </div>
  );
}
