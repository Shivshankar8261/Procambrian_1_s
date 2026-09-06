"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Which organisations is this for?",
    a: "Enterprises and financial portfolios carrying nature and climate disclosure obligations, agribusinesses and sourcing networks with supply chain exposure, and development finance institutions assessing resilience. If you have assets or suppliers whose environmental risk you cannot currently see at site level, that is the case we are built for.",
  },
  {
    q: "Which frameworks do you align to?",
    a: "BRSR, CSRD/ESRS, TNFD and TCFD for disclosure and risk reporting, with GHG Protocol scopes 1, 2 and 3 underneath for emissions accounting. IRIS is trained on global sustainability frameworks and regional climate policies so the alignment is source-cited rather than asserted.",
  },
  {
    q: "How do you prevent AI hallucination in a disclosure?",
    a: "Two ways. IRIS is retrieval-augmented and answers only with source citations and live side-by-side coordinate mapping back into the original document, so every claim can be checked against the page it came from. On top of that, high-stakes outputs are verified by domain specialists within a 24-hour SLA before they reach a report.",
  },
  {
    q: "Where does the data come from?",
    a: "An organisation's own operational records and internal documents, combined with public environmental and climate datasets — and, critically, direct-from-source field data. We deploy domain expertise to the physical source of truth: real assets, supply chain nodes and local ecosystems, rather than relying on satellite feeds and scraped datasets alone.",
  },
  {
    q: "Does our data have to leave our infrastructure?",
    a: "That is the point of our first principle. IRIS is privacy-first, and the pipeline is built to run where your data already lives — on your own infrastructure, and on-device for the parts that fit there. Anything that would require handing over custody of your records is a design failure on our side, not a condition of use.",
  },
  {
    q: "What is the energy cost of running this?",
    a: "Real, and we account for it. We size models to the job rather than defaulting to the largest one available, and we would rather lose some accuracy than run a workload whose footprint outweighs the reductions it identifies. We publish our own compute footprint alongside the results it produced.",
  },
  {
    q: "What makes you different from an ESG software vendor?",
    a: "Sequence. Most platforms are engineered first and given a sustainability domain second. Procambrian was founded by practitioners with fifteen-plus years inside frontline environmental work across India, Southeast Asia and Europe, advising bodies including UNDP, GIZ, EY, PwC and Deloitte. The domain model came first; the AI is how we scale it.",
  },
  {
    q: "What does the human-in-the-loop step actually cover?",
    a: "Any output where being wrong carries regulatory or financial consequence — disclosure lines, risk classifications and metric retrievals that feed a filing. A domain specialist verifies these within 24 hours. Routine retrieval and exploratory questions are not gated on that review.",
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
