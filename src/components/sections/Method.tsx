"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { GrowthFallback } from "@/components/growth/GrowthFallback";
import { Reveal } from "@/components/ui/Reveal";
import { useCanRender3D } from "@/lib/useCapabilities";

const GrowthCanvas = dynamic(
  () => import("@/components/growth/GrowthCanvas").then((m) => m.GrowthCanvas),
  { ssr: false, loading: () => <GrowthFallback /> }
);

const STEPS = [
  {
    n: "01",
    caption: "Scattered records",
    title: "It arrives with no shape",
    body: "Energy, fuel, travel, procurement and supplier records land in different formats, units and levels of detail. Most tools force them into a template and lose the detail that mattered.",
  },
  {
    n: "02",
    caption: "One inventory",
    title: "We grow the structure from the data",
    body: "This is where the AI earns its place: matching supplier line items to emission factors, resolving duplicate and partial records, and flagging figures inconsistent with prior periods. The pipeline runs where your records already live.",
  },
  {
    n: "03",
    caption: "Levers ranked",
    title: "Only a few branches move the number",
    body: "Rather than scoring every activity, the model isolates the operational changes that actually shift the footprint — so effort goes to the handful that matter, not the hundred that don't.",
  },
  {
    n: "04",
    caption: "Traced to source",
    title: "Every figure walks back to its record",
    body: "The emissions arithmetic itself is inspectable code, not model output. Each reported number carries its provenance — measured, modelled or estimated — and links to the records and assumptions behind it.",
  },
];

export function Method() {
  const [step, setStep] = useState(0);
  const use3D = useCanRender3D();
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isNaN(index)) setStep(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="method"
      className="bg-panel border-y border-line py-20 md:py-28"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            AI for the reconciliation. Plain arithmetic for the number.
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            The parts of this work that break are almost never the sums. They
            are the thousands of small judgements about what a record means.
            Scroll to watch one inventory assemble.
          </p>
        </Reveal>
      </div>

      <div className="shell mt-12 md:mt-16 grid gap-8 lg:gap-20 lg:grid-cols-[1fr_1fr]">
        {/* Sticky visual. It holds still while the steps scroll past it,
            and changes state on each one. */}
        <div className="sticky top-[var(--nav-h)] z-10 self-start -mx-6 md:-mx-10 lg:mx-0 bg-panel lg:bg-transparent">
          <div className="relative h-[34svh] min-h-[240px] lg:h-[min(70svh,34rem)]">
            {use3D ? <GrowthCanvas stage={step} /> : <GrowthFallback />}
          </div>
          <div className="flex items-center gap-4 px-6 md:px-10 lg:px-0 pb-4 lg:pb-0">
            <span className="font-display text-xs tabular-nums text-ink-faint">
              {STEPS[step].n} / {STEPS[STEPS.length - 1].n}
            </span>
            <span className="h-px flex-1 bg-line relative overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-water transition-[width] duration-500"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </span>
            <span className="font-display text-xs text-water">
              {STEPS[step].caption}
            </span>
          </div>
        </div>

        <ol className="relative">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              data-step={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="min-h-[62svh] flex flex-col justify-center py-10"
            >
              <span className="font-display text-sm font-semibold text-water tabular-nums">
                {s.n}
              </span>
              <span
                className={`block h-px my-4 transition-all duration-500 ${
                  i === step ? "w-full bg-leaf/70" : "w-12 bg-line"
                }`}
                aria-hidden="true"
              />
              <h3
                className={`font-display font-semibold text-2xl md:text-3xl transition-colors duration-500 ${
                  i === step ? "text-ink" : "text-ink-faint"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`prose-body mt-4 max-w-[48ch] transition-colors duration-500 ${
                  i === step ? "text-ink-muted" : "text-ink-faint"
                }`}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
