import { Reveal } from "@/components/ui/Reveal";

const PROPS = [
  {
    title: "Domain first",
    body: "Built by sustainability practitioners with 15+ years of frontline experience, not engineers discovering a new market.",
  },
  {
    title: "Verifiable precision",
    body: "RAG-powered intelligence paired with practitioner validation for hallucination-free disclosure and compliance.",
  },
  {
    title: "Forward-deployed",
    body: "Direct-from-source environmental data grounding digital metrics in physical field reality.",
  },
];

// The outer columns sit flush against the page gutter and only the inner
// edges take padding, so the first line of copy starts on the same
// vertical as the hero headline and every section eyebrow below it.
const COLUMN_PADDING = [
  "md:pr-8 lg:pr-12",
  "md:px-8 lg:px-12",
  "md:pl-8 lg:pl-12",
];

export function ValueProps() {
  return (
    <section
      aria-label="What sets Procambrian apart"
      className="border-b border-line bg-panel"
    >
      {/* The grid is a child of the shell rather than the shell itself.
          Putting both on one element meant the shell's horizontal padding
          was filled by the grid's divider colour, which showed as grey
          strips in the left and right gutters. */}
      <div className="shell">
        <div className="grid md:grid-cols-3 divide-y divide-line md:divide-y-0 md:divide-x">
          {PROPS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className={`flex flex-col gap-3 py-8 lg:py-10 ${COLUMN_PADDING[i]}`}
            >
              <span className="eyebrow">{p.title}</span>
              <p className="prose-body text-ink-muted text-[0.98rem]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
