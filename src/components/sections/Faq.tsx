"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Is this deployed with any organisation yet?",
    a: "No. Procambrian is pre-product. Every figure on this site comes from our own reference pipeline on public or synthetic data, and is labelled as such.",
  },
  {
    q: "Which frameworks are you building against?",
    a: "GHG Protocol scopes 1, 2 and 3 for emissions accounting, with disclosure output structured for CSRD/ESRS and TCFD-style physical risk reporting. None of it has been through third-party assurance yet.",
  },
  {
    q: "Where does the data come from?",
    a: "An organisation's own operational records — energy, fuel, travel, procurement, supplier declarations — combined with public environmental and climate hazard datasets. Every output figure carries whether it was measured, modelled or estimated.",
  },
  {
    q: "How does the AI actually get used?",
    a: "Mainly for the unglamorous part: reconciling messy records into a consistent inventory, matching supplier line items to emissions factors, and flagging figures that look inconsistent with prior periods. The emissions arithmetic itself is deterministic and inspectable, not model output.",
  },
  {
    q: "What hasn't been validated?",
    a: "Scope 3 supplier data at production scale, third-party assurance of our outputs, sector coverage beyond the reference datasets we've tested, and physical risk modelling below regional resolution. We would rather state this than omit it.",
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
