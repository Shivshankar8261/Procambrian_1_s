import { Reveal } from "@/components/ui/Reveal";

const CAPABILITIES = [
  {
    n: "01",
    title: "Scope 1, 2 & 3 emissions tracking",
    body: "Complete carbon accounting for holistic climate reporting.",
  },
  {
    n: "02",
    title: "Audit-ready disclosures",
    body: "Guided automation producing verified reports aligned with global and regional standards.",
  },
  {
    n: "03",
    title: "Actionable risk hotspots",
    body: "Translates complex datasets into field-level priorities and transition pathways.",
  },
  {
    n: "04",
    title: "Human-in-the-loop validation",
    body: "High-stakes AI outputs are verified by domain specialists within a 24-hour SLA to guarantee institutional trust.",
  },
];

export function Solution() {
  return (
    <section
      id="solution"
      className="py-20 md:py-28 bg-panel border-y border-line"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">The solution</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            An intelligence layer that bridges policy intent with operational
            reality.
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            Procambrian automates data collection, carbon tracking, risk
            modelling and regulatory reporting through domain-validated
            workflows.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 80}>
              <div className="flex flex-col gap-3">
                <span className="font-display text-sm font-semibold text-water tabular-nums">
                  {c.n}
                </span>
                <span
                  className="block h-px w-full bg-leaf/50"
                  aria-hidden="true"
                />
                <h3 className="font-display font-semibold text-lg md:text-xl text-ink mt-1">
                  {c.title}
                </h3>
                <p className="prose-body text-ink-muted text-[0.95rem]">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
