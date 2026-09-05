const CAPABILITIES = [
  {
    title: "Reconciles emissions data into one inventory",
    body: "Energy, fuel, travel, procurement and supplier records arrive in different formats and units. We pull them into a single structure and tag every figure as measured, modelled or estimated.",
  },
  {
    title: "Ranks reduction levers by modelled impact",
    body: "Rather than scoring every activity, the model isolates the operational changes that actually move the footprint, so effort goes to the few that shift the number.",
  },
  {
    title: "Maps climate risk onto specific assets",
    body: "Sites and supply routes are assessed against physical climate hazard data, with the confidence interval printed per asset instead of a single portfolio-level score.",
  },
  {
    title: "Produces disclosures you can trace back",
    body: "Every reported figure links to the records and assumptions behind it, so an auditor or regulator can follow a number to its source.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="px-6 md:px-16 py-20 md:py-28">
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone max-w-2xl mb-14">
        What it does
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-lichen-dim/25">
        {CAPABILITIES.map((c, i) => (
          <div
            key={c.title}
            className="bg-strata-ink p-8 flex flex-col gap-4"
            style={{ marginTop: i % 2 === 1 ? "2.5rem" : 0 }}
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
