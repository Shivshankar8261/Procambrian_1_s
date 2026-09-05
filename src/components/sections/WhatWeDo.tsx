const CAPABILITIES = [
  {
    title: "Grows structure without a fixed topology",
    body: "Given a set of seed points, the system grows a routing graph toward them directly, rather than fitting data onto a pre-chosen network shape.",
  },
  {
    title: "Differentiates channels under one growth rule",
    body: "One process produces two behaviors — structural branches and load-bearing branches — the same way procambium differentiates into phloem and xylem.",
  },
  {
    title: "Runs deterministically from a seed",
    body: "Every structure the system grows is reproducible from its seed and parameters, so a result can be re-run and inspected, not just observed once.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="px-6 md:px-16 py-20 md:py-28">
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone max-w-2xl mb-14">
        What it does
      </h2>
      <div className="grid md:grid-cols-3 gap-px bg-lichen-dim/25">
        {CAPABILITIES.map((c, i) => (
          <div
            key={c.title}
            className="bg-strata-ink p-8 flex flex-col gap-4"
            style={{ marginTop: i === 1 ? "2.5rem" : 0 }}
          >
            <span className="block h-px w-8 bg-xylem-amber" aria-hidden="true" />
            <h3 className="font-display font-semibold text-xl text-bone">
              {c.title}
            </h3>
            <p className="prose-body text-lichen text-[0.95rem]">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
