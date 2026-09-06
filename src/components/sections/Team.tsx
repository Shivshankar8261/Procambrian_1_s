import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The content brief lists "Our Team" as a section but supplies no names,
 * roles or biographies. Rather than invent people, this states what the
 * team is — which the brief does establish — and leaves an obvious place
 * for the profiles to drop in.
 */
export function Team() {
  return (
    <section id="team" className="py-20 md:py-28 bg-panel border-y border-line">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4">Our team</p>
          <h2 className="font-display font-semibold text-[1.8rem] md:text-4xl lg:text-[2.75rem] text-ink max-w-3xl text-balance">
            Practitioners who worked the problem before they built for it.
          </h2>
          <p className="prose-body text-ink-muted mt-5 max-w-[58ch]">
            Fifteen-plus years inside frontline sustainability challenges
            across India, Southeast Asia and Europe, advising international
            bodies, multilateral development agencies and global consultancies.
          </p>
          <div className="mt-9">
            <Button href="#contact" variant="outline" arrow>
              Get in touch
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
