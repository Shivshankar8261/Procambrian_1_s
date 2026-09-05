"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "main", label: "Surface" },
  { id: "what-we-do", label: "Method" },
  { id: "proof", label: "Output" },
  { id: "approach", label: "Origin" },
  { id: "faq", label: "Limits" },
];

// A running depth index, not decoration: it reflects actual scroll
// position, styled like a core-sample depth gauge.
export function DepthRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      ref={ref}
      aria-label="Page depth"
      className="depth-rail sticky top-0 h-screen py-8 flex-col items-center hidden md:flex"
    >
      <div className="flex-1 flex flex-col justify-between items-center text-lichen-dim font-display text-[0.7rem]">
        <span>0.0m</span>
        <div className="flex flex-col gap-6 items-center">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex flex-col items-center gap-1"
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-oxide-live" : "bg-lichen-dim"
                }`}
              />
              <span
                className={`text-[0.6rem] tracking-wide ${
                  i === activeIndex ? "text-oxide-live" : "text-lichen-dim"
                }`}
              >
                {s.label}
              </span>
            </a>
          ))}
        </div>
        <span>{(4.2).toFixed(1)}m</span>
      </div>
    </nav>
  );
}
