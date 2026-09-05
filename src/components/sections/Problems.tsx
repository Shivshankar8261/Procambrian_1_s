import { Reveal } from "@/components/ui/Reveal";

const DOMAINS = [
  {
    tag: "Sustainability",
    title: "Where the footprint actually is",
    body: "Energy, fuel, travel, procurement and waste records arrive in different formats, units and levels of detail. We reconcile them into one inventory and tag every figure as measured, modelled or estimated.",
  },
  {
    tag: "ESG",
    title: "Disclosures that survive scrutiny",
    body: "Reporting lines built on GHG Protocol scopes 1, 2 and 3 and structured for CSRD/ESRS and TCFD, with every number linked back to the record and the assumption behind it.",
  },
  {
    tag: "Climate",
    title: "Risk mapped to specific assets",
    body: "Sites, routes and suppliers assessed against physical climate hazard data, with the confidence interval printed per asset instead of a single portfolio-level score.",
  },
  {
    tag: "Environmental intelligence",
    title: "Signal from outside your own data",
    body: "Public environmental, land-use and hazard datasets joined to your operational records, so conditions on the ground inform a decision rather than arriving after it.",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">What we solve</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            Four problems organisations keep hitting — and one pipeline
            underneath them.
          </h2>
          <p className="prose-body text-ink-muted mt-4 max-w-[58ch]">
            They are usually treated as four separate reporting exercises. They
            run on the same underlying records, so we build them on one
            structure.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px bg-line md:grid-cols-2 border border-line">
          {DOMAINS.map((d, i) => (
            /* The reveal sits inside the cell, not on it: an invisible
               grid item would leave the gap colour showing as one large
               block until the animation ran. */
            <li key={d.tag} className="bg-paper">
              <Reveal
                delay={i * 80}
                className="group relative h-full bg-paper p-8 lg:p-10 flex flex-col gap-3 transition-colors hover:bg-panel"
              >
                {/* The rule draws itself across the card on hover — the
                    same "branch extending" idea as the hero structure. */}
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
      </div>
    </section>
  );
}
