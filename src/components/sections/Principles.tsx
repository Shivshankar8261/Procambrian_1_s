import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    number: "01",
    title: "Data sovereignty",
    quote:
      "AI should not require you to give up control of your data. We believe in local, on-device, and sovereign AI, where you own what you generate.",
  },
  {
    number: "02",
    title: "AI democratisation",
    quote:
      "AI is still a playground for the few. Billions of people remain completely outside it, and are often the ones most affected by its consequences. We build for them too.",
  },
  {
    number: "03",
    title: "AI for nature. Not against it.",
    quote:
      "AI has a footprint (energy, water, hardware). We want solutions that operate within planetary bounds. Even if it is a losing battle, we want to go down bravely.",
  },
];

export function Principles() {
  return (
    <section
      id="principles"
      className="py-20 md:py-32 bg-night text-on-night relative overflow-hidden"
    >
      {/* A single soft bloom keeps the dark band from reading as flat ink. */}
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-leaf/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow !text-leaf/90 mb-4">Principles</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-[2.75rem] text-on-night max-w-2xl text-balance">
            The Three AI Laws of Procambrian
          </h2>
          <p className="prose-body text-on-night-muted mt-5 max-w-[58ch]">
            These constrain what we build, including when they cost us
            capability. Where we fall short of them, we would rather say so
            than quietly drop one.
          </p>
        </Reveal>

        <ol className="mt-14 md:mt-20 grid gap-10 md:gap-12 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.number} delay={i * 90}>
              <div className="group h-full flex flex-col gap-4 border-t border-night-line pt-6 transition-colors hover:border-leaf">
                <span className="font-display text-sm font-semibold text-leaf tabular-nums">
                  Principle {p.number}
                </span>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-on-night">
                  {p.title}
                </h3>
                <blockquote className="prose-body text-on-night-muted text-[1.02rem]">
                  {p.quote}
                </blockquote>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
