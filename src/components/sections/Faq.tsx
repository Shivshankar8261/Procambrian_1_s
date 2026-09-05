"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Which organisations is this for?",
    a: "Organisations carrying a real reporting obligation and messy underlying data — multi-site operations, fleets, manufacturers, and the funds and asset owners that have to aggregate across them. If your emissions inventory currently lives in a spreadsheet nobody wants to open, that is the case we are built for.",
  },
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
    q: "Does our data have to leave our infrastructure?",
    a: "That is the point of our first principle. The pipeline is built to run where your data already lives — on your own infrastructure, and on-device for the parts that fit there. Anything that would require handing over custody of your records is a design failure on our side, not a condition of use.",
  },
  {
    q: "What is the energy cost of running this?",
    a: "Real, and we account for it. We size models to the job rather than defaulting to the largest one available, and we would rather lose some accuracy than run a workload whose footprint outweighs the reductions it identifies. We publish our own compute footprint alongside the results it produced.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28 border-t border-line">
      <div className="shell">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink mb-10 text-balance">
          Questions, answered plainly
        </h2>
        <ul className="max-w-3xl divide-y divide-line border-y border-line">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-6 py-5 text-left font-display text-ink font-semibold"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`text-leaf text-xl leading-none transition-transform shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                {/* Kept in the DOM so the answers are indexable and
                    findable with the browser's own search. */}
                <p
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="prose-body text-ink-muted pb-6 max-w-[62ch]"
                >
                  {item.a}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
