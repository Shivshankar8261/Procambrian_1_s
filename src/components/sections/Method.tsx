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
  const use3D = useCanRender3D();
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stageRef = useRef(0);
  const barRef = useRef<HTMLSpanElement>(null);
  // Only the caption and the highlighted step live in React state, so a
  // scroll produces at most four renders instead of one per frame.
  const [step, setStep] = useState(0);

  // Progress runs from the centre of the first step to the centre of the
  // last, so the structure is scattered exactly at point 01 and fully
  // traced exactly at point 04.
  //
  // The two centres are measured once and cached as document positions.
  // Reading getBoundingClientRect every frame and writing the bar width
  // straight after forced a synchronous layout on each scroll frame and
  // locked the main thread; window.scrollY costs nothing.
  useEffect(() => {
    let raf = 0;
    let startY = 0;
    let span = 0;
    let painted = -1;
    let shown = -1;

    const centreOf = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2;

    const remeasure = () => {
      const first = stepRefs.current[0];
      const last = stepRefs.current[STEPS.length - 1];
      if (!first || !last) return;
      startY = centreOf(first);
      span = centreOf(last) - startY;
    };

    const read = () => {
      if (span <= 0) return;
      const reading = window.scrollY + window.innerHeight * 0.55;
      const value = Math.min(1, Math.max(0, (reading - startY) / span));

      stageRef.current = value * (STEPS.length - 1);

      const percent = Math.round(value * 100);
      if (percent !== painted) {
        painted = percent;
        if (barRef.current) barRef.current.style.width = `${percent}%`;
      }
      // Tracked outside React: calling setStep on every frame, even with
      // a bail-out updater, kept the reconciler busy for the whole scroll.
      const next = Math.round(stageRef.current);
      if (next !== shown) {
        shown = next;
        setStep(next);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };

    const onResize = () => {
      remeasure();
      schedule();
    };

    remeasure();
    schedule();

    // Fonts and the sticky visual settle after mount and move the steps,
    // so the cached centres are re-taken whenever the list changes size
    // rather than trusted from the first frame.
    const resizeObserver = new ResizeObserver(onResize);
    stepRefs.current.forEach((el) => el && resizeObserver.observe(el));

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
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

      <div className="shell mt-10 md:mt-16 grid gap-4 lg:gap-20 lg:grid-cols-[1fr_1fr]">
        {/* Sticky visual. It holds still while the steps scroll past it,
            and changes state on each one. */}
        <div className="sticky top-[var(--nav-h)] z-10 self-start -mx-6 md:-mx-10 lg:mx-0 bg-panel lg:bg-transparent">
          <div className="relative h-[30svh] min-h-[200px] lg:h-[min(70svh,34rem)]">
            {use3D ? <GrowthCanvas stageRef={stageRef} /> : <GrowthFallback />}
          </div>
          <div className="flex items-center gap-4 px-6 md:px-10 lg:px-0 pb-3 lg:pb-0">
            <span className="font-display text-xs tabular-nums text-ink-faint">
              {STEPS[step].n} / {STEPS[STEPS.length - 1].n}
            </span>
            <span className="h-px flex-1 bg-line relative overflow-hidden">
              <span
                ref={barRef}
                className="absolute inset-y-0 left-0 w-0 bg-water"
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
              className="min-h-[42svh] lg:min-h-[62svh] flex flex-col justify-start lg:justify-center py-6 lg:py-10"
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
