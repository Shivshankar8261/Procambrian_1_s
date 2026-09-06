import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="shell grid gap-10 md:gap-12 md:grid-cols-[1fr_1.35fr]">
        <div className="md:sticky md:top-[calc(var(--nav-h)+4rem)] md:self-start">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink text-balance">
              Domain expertise first. AI second. Always.
            </h2>
          </Reveal>
        </div>
        <Reveal className="prose-body text-ink-muted space-y-5 text-[1.02rem]">
          <p>
            Most AI companies discover sustainability as a market opportunity.
            Procambrian came directly from the field. You cannot build software
            for environmental challenges you have never lived.
          </p>
          <p>
            Procambrian was founded by domain practitioners who spent over
            fifteen years inside frontline sustainability challenges across
            India, Southeast Asia and Europe. Our team has advised leading
            international bodies, multilateral development agencies and global
            consultancies — including UNDP, GIZ, EY, PwC and Deloitte.
          </p>
          <p>
            <span className="font-display font-semibold text-ink">
              The forward-deployed reality.
            </span>{" "}
            True environmental impact cannot be understood solely from
            satellite feeds or scraped public datasets. We build at the
            intersection of bits and bios. By deploying domain expertise
            directly to the physical source of truth — real assets, supply
            chain nodes and local ecosystems — we turn raw metrics into
            verified ecological survival and economic value.
          </p>
          <p>
            The name carries the same idea. Procambium is the tissue in a plant
            that hasn&apos;t decided yet what it will become; Precambrian is a
            reminder that environmental work is long accumulation before
            visible change. We build for that timescale.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
