import { Reveal } from "@/components/ui/Reveal";

export function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 border-t border-line">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">Strategic intent</p>
        </Reveal>
        <div className="grid gap-12 md:gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display font-semibold text-[1.6rem] md:text-3xl text-ink border-t border-line pt-6">
              Vision
            </h2>
            <p className="prose-body text-ink-muted mt-4 text-[1.02rem]">
              To serve as the definitive intelligence layer for a
              nature-positive global economy. We aim to be the world&apos;s most
              trusted nature and climate intelligence platform for the private
              sector — delivering verified science, non-negotiable data
              integrity, and operational clarity.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="font-display font-semibold text-[1.6rem] md:text-3xl text-ink border-t border-line pt-6">
              Mission
            </h2>
            <p className="prose-body text-ink-muted mt-4 text-[1.02rem]">
              To convert complex nature, climate and regulatory data into
              actionable, audit-ready operational decisions. Built in India for
              the global market, Procambrian empowers organisations to meet
              rigid compliance demands, mitigate environmental risks, and
              allocate capital toward sustainable, nature-positive outcomes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
