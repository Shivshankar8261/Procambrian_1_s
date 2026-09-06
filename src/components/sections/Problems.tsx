import { Reveal } from "@/components/ui/Reveal";

const PROBLEMS = [
  {
    tag: "Asset-level blind spots",
    title: "Risks unclear at asset level",
    body: "Nature and climate vulnerabilities remain poorly understood across specific operational sites and assets.",
  },
  {
    tag: "Framework overload",
    title: "Regulation outpaces capacity",
    body: "ESG frameworks — BRSR, CSRD, TNFD — are proliferating faster than teams can track or execute against.",
  },
  {
    tag: "The know-how gap",
    title: "No roadmap to begin",
    body: "Companies recognise the need to transition but lack the domain-specific roadmap to start.",
  },
  {
    tag: "Misaligned tools",
    title: "Platforms built without the domain",
    body: "Existing platforms are engineered by technocrats without deep, applied understanding of environmental systems.",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">The problem</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            The bottleneck is no longer data availability — it is the capacity
            to act on it.
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            Four failures show up again and again inside corporate
            sustainability teams, and they compound.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px bg-line md:grid-cols-2 border border-line">
          {PROBLEMS.map((d, i) => (
            /* The reveal sits inside the cell, not on it: an invisible
               grid item would leave the gap colour showing as one large
               block until the animation ran. */
            <li key={d.tag} className="bg-paper">
              <Reveal
                delay={i * 80}
                className="group relative h-full bg-paper p-8 lg:p-10 flex flex-col gap-3 transition-colors hover:bg-panel"
              >
                <span
                  className="absolute left-0 top-0 h-[2px] w-0 bg-leaf transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <span className="eyebrow">{d.tag}</span>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-ink">
                  {d.title}
                </h3>
                <p className="prose-body text-ink-muted text-[0.98rem]">
                  {d.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="prose-body text-ink mt-10 max-w-[58ch] border-l-2 border-leaf pl-5">
            <span className="font-display font-semibold">The risk:</span>{" "}
            delayed decisions, exposure to greenwashing, compliance penalties,
            and unmitigated financial risk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
