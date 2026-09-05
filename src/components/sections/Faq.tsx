"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Is this deployed anywhere yet?",
    a: "No. Procambrian is pre-product. Every figure on this site is a simulation output, labeled as such, run at a stated seed.",
  },
  {
    q: "What exactly does the growth algorithm do?",
    a: "It's a space-colonization process: a strand grows step by step toward a field of attractor points, branching where multiple attractors pull it in different directions. Past a height threshold, branches get tagged as differentiated and treated differently downstream.",
  },
  {
    q: "Why 'rooted in nature' instead of a straightforward bio-inspired-AI pitch?",
    a: "Because the method is specific, not decorative: growth-toward-targets and post-hoc differentiation are the actual mechanism, not a metaphor layered on top of an unrelated model.",
  },
  {
    q: "What hasn't been validated?",
    a: "Real network topologies at production scale, failure recovery under the grown structure, and cost compared to hand-designed routing. We're stating this rather than omitting it.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-6 md:px-16 py-20 md:py-28 max-w-3xl">
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone mb-10">
        Questions, answered plainly
      </h2>
      <ul className="divide-y divide-lichen-dim/25 border-y border-lichen-dim/25">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                className="w-full flex items-center justify-between gap-6 py-5 text-left font-display text-bone font-semibold"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`text-xylem-amber text-xl leading-none transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p
                  id={`faq-panel-${i}`}
                  className="prose-body text-lichen pb-6 max-w-[62ch]"
                >
                  {item.a}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
