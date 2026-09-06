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

export function ValueProps() {
  return (
    <section
      aria-label="What sets Procambrian apart"
      className="border-b border-line bg-panel"
    >
      <div className="shell grid gap-px bg-line md:grid-cols-3 border-x border-line">
        {PROPS.map((p, i) => (
          <div key={p.title} className="bg-panel">
            <Reveal delay={i * 80} className="h-full p-8 lg:p-10 flex flex-col gap-3">
              <span className="eyebrow">{p.title}</span>
              <p className="prose-body text-ink-muted text-[0.98rem]">{p.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
