import { Reveal } from "@/components/ui/Reveal";

const OFFERINGS = [
  {
    n: "01",
    name: "Climate Resilience Intelligence",
    body: "Risk assessments, physical and transition scenario modelling, and adaptation strategy for enterprises and financial portfolios.",
    meta: "Aligned with TCFD, TNFD and BRSR mandates",
  },
  {
    n: "02",
    name: "Agroecology & Supply Chain Intelligence",
    body: "Nature-positive supply chain analytics, food system vulnerability assessments, and smallholder resilience toolkits.",
    meta: "For agribusinesses, development finance institutions and sourcing networks",
  },
  {
    n: "03",
    name: "Biodiversity & Nature Capital Intelligence",
    body: "TNFD-aligned biodiversity reporting, ecosystem dependency mapping, and natural capital valuation frameworks.",
    meta: "Baseline ecosystem health and nature-related exposure",
  },
  {
    n: "04",
    name: "IRIS",
    body: "A privacy-first, RAG-powered engine trained on global sustainability frameworks, regional climate policies and internal corporate documents. Source-cited answers, live document side-by-side coordinate mapping, and exact metric retrieval without hallucination.",
    meta: "Integrated Regulatory & Policy Intelligence",
  },
];

export function Offerings() {
  return (
    <section id="offerings" className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">Products</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            Four intelligence products, one domain-validated core.
          </h2>
        </Reveal>

        {/* A plain 2x2: four equal cells, so there is no empty half-row
            and every card carries the same weight. */}
        <ul className="mt-14 grid gap-px bg-line md:grid-cols-2 border border-line">
          {OFFERINGS.map((o, i) => (
            <li key={o.name} className="bg-paper">
              <Reveal
                delay={i * 80}
                className="group relative h-full bg-paper p-8 lg:p-10 flex flex-col transition-colors hover:bg-panel"
              >
                <span
                  className="absolute left-0 top-0 h-[2px] w-0 bg-leaf transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                {/* The number sits on its own line rather than sharing one
                    with the descriptor. Sharing it meant a descriptor that
                    wrapped to two lines pushed that card's heading down out
                    of line with its neighbour's. */}
                <span className="font-display text-sm font-semibold text-water tabular-nums">
                  {o.n}
                </span>
                <h3 className="font-display font-semibold text-ink text-xl md:text-2xl mt-3 text-balance">
                  {o.name}
                </h3>
                <p className="prose-body text-ink-muted text-[0.98rem] mt-3 max-w-[52ch]">
                  {o.body}
                </p>
                {/* Pushed to the floor of the cell, so the descriptors line
                    up across a row however unevenly the bodies run. */}
                <p className="eyebrow !text-ink-faint mt-auto pt-6">{o.meta}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
