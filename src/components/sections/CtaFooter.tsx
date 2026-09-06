import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaFooter() {
  return (
    <>
      <section
        id="contact"
        className="py-20 md:py-32 bg-panel border-t border-line"
      >
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-4">Contact us</p>
            <h2 className="font-display font-semibold text-[1.8rem] md:text-[2.75rem] text-ink max-w-3xl text-balance">
              See it against your own disclosure problem.
            </h2>
            <p className="prose-body text-ink-muted mt-5 max-w-[56ch]">
              Request a demo, or join the mailing list for research notes on
              nature, climate and regulatory intelligence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                href="mailto:hello@procambrian.ai?subject=Procambrian%20%E2%80%94%20demo%20request"
                variant="solid"
                arrow
              >
                Request a demo
              </Button>
              <Button
                href="mailto:hello@procambrian.ai?subject=Procambrian%20%E2%80%94%20mailing%20list"
                variant="outline"
              >
                Join the mailing list
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-panel border-t border-line py-10">
        <div className="shell flex flex-col md:flex-row md:items-center justify-between gap-5 text-sm text-ink-faint">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="text-ink-muted">
              Procambrian — nature and climate intelligence, built for industry.
            </span>
          </div>
          <p>Built in India for the global market.</p>
        </div>
      </footer>
    </>
  );
}
