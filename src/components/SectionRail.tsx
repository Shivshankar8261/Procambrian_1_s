"use client";

import { useEffect, useState } from "react";

export const RAIL_SECTIONS = [
  { id: "main", label: "Start" },
  { id: "problems", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "offerings", label: "Products" },
  { id: "principles", label: "Principles" },
  { id: "about", label: "About" },
  { id: "mission", label: "Mission" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
];

/**
 * Fixed in the left gutter rather than holding a column of its own, so
 * the film hero and the dark bands can run edge to edge. It stays out of
 * the way over the hero and fades in once the page is under way.
 */
export function SectionRail() {
  const [activeId, setActiveId] = useState(RAIL_SECTIONS[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    RAIL_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const onHero = activeId === "main";

  return (
    <nav
      aria-label="Page sections"
      className={`fixed left-3 xl:left-5 top-1/2 -translate-y-1/2 z-30 hidden xl:block transition-opacity duration-500 ${
        onHero ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <ul className="flex flex-col gap-4">
        {RAIL_SECTIONS.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id} className="relative group">
              <a
                href={`#${s.id}`}
                aria-current={active ? "true" : undefined}
                className="flex items-center py-1"
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all ${
                    active
                      ? "w-6 bg-water"
                      : "w-3 bg-line group-hover:w-5 group-hover:bg-ink-faint"
                  }`}
                />
                <span
                  className={`ml-2 font-display text-[0.66rem] tracking-wide whitespace-nowrap transition-opacity ${
                    active
                      ? "text-water opacity-100"
                      : "text-ink-faint opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
