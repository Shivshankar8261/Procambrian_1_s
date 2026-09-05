import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="shell grid gap-10 md:gap-12 md:grid-cols-[1fr_1.35fr]">
        <div className="md:sticky md:top-[calc(var(--nav-h)+4rem)] md:self-start">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink text-balance">
              Why the method comes from biology
            </h2>
          </Reveal>
        </div>
        <Reveal className="prose-body text-ink-muted space-y-5 text-[1.02rem]">
          <p>
            Procambium is the tissue in a plant that hasn&apos;t decided yet
            what it will become. It differentiates into xylem, which carries
            water up, and phloem, which carries sugar down — two jobs, one
            origin layer, no blueprint drawn in advance.
          </p>
          <p>
            An organisation&apos;s environmental data behaves the same way. It
            arrives as scattered records from sites, fleets, suppliers and
            meters, with no fixed shape. Most tools force it into a template
            and lose the detail that mattered. We grow the structure from the
            data instead, then decide what each branch carries — an emissions
            figure, a risk exposure, a disclosure line.
          </p>
          <p>
            The other half of the name — Precambrian — is a reminder that
            sustainability work is long accumulation before visible change. We
            build for that timescale: figures that stay traceable years later,
            and a stated difference between what we measured, what we modelled
            and what we estimated.
          </p>
          <p>
            This is a method, not a finished product. We are validating it on
            public and synthetic datasets before claiming it works on an
            organisation&apos;s own reporting.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
