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

const LAWS = [
  {
    n: "01",
    caption: "Sovereign",
    title: "Data sovereignty",
    body: "AI should not require you to give up control of your data. We believe in local, on-device, and sovereign AI, where you own what you generate.",
  },
  {
    n: "02",
    caption: "Open to all",
    title: "AI democratisation",
    body: "AI is still a playground for the few. Billions of people remain completely outside it, and are often the ones most affected by its consequences. We build for them too.",
  },
  {
    n: "03",
    caption: "Within bounds",
    title: "AI for nature. Not against it.",
    body: "AI has a footprint — energy, water, hardware. We want solutions that operate within planetary bounds. Even if it is a losing battle, we want to go down bravely.",
  },
];

export function Principles() {
  const use3D = useCanRender3D();
  const lawRefs = useRef<(HTMLLIElement | null)[]>([]);
  const stageRef = useRef(0);
  const barRef = useRef<HTMLSpanElement>(null);
  // Only the caption and the highlighted law live in React state, so a
  // scroll produces at most one render per law instead of one per frame.
  const [law, setLaw] = useState(0);

  // Progress runs from the centre of the first law to the centre of the
  // last, so the structure is scattered exactly at law 01 and the growth
  // is complete exactly at law 03.
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
      const first = lawRefs.current[0];
      const last = lawRefs.current[LAWS.length - 1];
      if (!first || !last) return;
      startY = centreOf(first);
      span = centreOf(last) - startY;
    };

    const read = () => {
      if (span <= 0) return;
      const reading = window.scrollY + window.innerHeight * 0.55;
      const value = Math.min(1, Math.max(0, (reading - startY) / span));

      stageRef.current = value * (LAWS.length - 1);

      const percent = Math.round(value * 100);
      if (percent !== painted) {
        painted = percent;
        if (barRef.current) barRef.current.style.width = `${percent}%`;
      }
      // Tracked outside React: calling setLaw on every frame, even with
      // a bail-out updater, kept the reconciler busy for the whole scroll.
      const next = Math.round(stageRef.current);
      if (next !== shown) {
        shown = next;
        setLaw(next);
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

    // Fonts and the sticky visual settle after mount and move the laws,
    // so the cached centres are re-taken whenever the list changes size
    // rather than trusted from the first frame.
    const resizeObserver = new ResizeObserver(onResize);
    lawRefs.current.forEach((el) => el && resizeObserver.observe(el));

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
      id="principles"
      className="bg-panel border-y border-line py-20 md:py-28"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">Principles</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            The AI Laws of Procambrian
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            These constrain what we build, including when they cost us
            capability. Where we fall short of them, we would rather say so
            than quietly drop one.
          </p>
        </Reveal>
      </div>

      <div className="shell mt-10 md:mt-16 grid gap-4 lg:gap-20 lg:grid-cols-[1fr_1fr]">
        {/* Sticky visual. It holds still while the laws scroll past it,
            and grows a step further on each one. */}
        <div className="sticky top-[var(--nav-h)] z-10 self-start -mx-6 md:-mx-10 lg:mx-0 bg-panel lg:bg-transparent">
          <div className="relative h-[30svh] min-h-[200px] lg:h-[min(70svh,34rem)]">
            {use3D ? <GrowthCanvas stageRef={stageRef} /> : <GrowthFallback />}
          </div>
          <div className="flex items-center gap-4 px-6 md:px-10 lg:px-0 pb-3 lg:pb-0">
            <span className="font-display text-xs tabular-nums text-ink-faint">
              {LAWS[law].n} / {LAWS[LAWS.length - 1].n}
            </span>
            <span className="h-px flex-1 bg-line relative overflow-hidden">
              <span
                ref={barRef}
                className="absolute inset-y-0 left-0 w-0 bg-water"
              />
            </span>
            <span className="font-display text-xs text-water">
              {LAWS[law].caption}
            </span>
          </div>
        </div>

        <ol className="relative">
          {LAWS.map((l, i) => (
            <li
              key={l.n}
              data-law={i}
              ref={(el) => {
                lawRefs.current[i] = el;
              }}
              className="min-h-[42svh] lg:min-h-[62svh] flex flex-col justify-start lg:justify-center py-6 lg:py-10"
            >
              <span className="font-display text-sm font-semibold text-water tabular-nums">
                Law {l.n}
              </span>
              <span
                className={`block h-px my-4 transition-all duration-500 ${
                  i === law ? "w-full bg-leaf/70" : "w-12 bg-line"
                }`}
                aria-hidden="true"
              />
              <h3
                className={`font-display font-semibold text-2xl md:text-3xl transition-colors duration-500 ${
                  i === law ? "text-ink" : "text-ink-faint"
                }`}
              >
                {l.title}
              </h3>
              <p
                className={`prose-body mt-4 max-w-[48ch] transition-colors duration-500 ${
                  i === law ? "text-ink-muted" : "text-ink-faint"
                }`}
              >
                {l.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
