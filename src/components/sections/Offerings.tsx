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
    featured: true,
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

        <ul className="mt-14 grid gap-px bg-line md:grid-cols-2 border border-line">
          {OFFERINGS.map((o, i) => (
            <li
              key={o.name}
              className={`bg-paper ${o.featured ? "md:col-span-2" : ""}`}
            >
              <Reveal
                delay={i * 80}
                className={`group relative h-full p-8 lg:p-10 flex flex-col gap-3 transition-colors ${
                  o.featured
                    ? "bg-panel hover:bg-panel-2"
                    : "bg-paper hover:bg-panel"
                }`}
              >
                <span
                  className="absolute left-0 top-0 h-[2px] w-0 bg-leaf transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-semibold text-water tabular-nums">
                    {o.n}
                  </span>
                  <span className="eyebrow !text-ink-faint">{o.meta}</span>
                </div>
                <h3
                  className={`font-display font-semibold text-ink ${
                    o.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {o.name}
                </h3>
                <p className="prose-body text-ink-muted text-[0.98rem] max-w-[62ch]">
                  {o.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
