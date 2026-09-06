import { Reveal } from "@/components/ui/Reveal";

const STANDARDS = [
  "GHG Protocol",
  "CSRD / ESRS",
  "TCFD",
  "ISSB / IFRS S2",
  "SBTi",
  "GRI",
  "CDP",
  "ISO 14064",
];

export function Standards() {
  return (
    <section
      aria-label="Frameworks we build against"
      className="py-14 md:py-16 border-b border-line overflow-hidden"
    >
      <div className="shell">
        <Reveal>
          <p className="font-display text-sm text-ink-muted max-w-[62ch]">
            Built against the frameworks organisations are actually judged by —
            none of it through third-party assurance yet.
          </p>
        </Reveal>
      </div>

      {/* Duplicated once so the loop has something to scroll into. The
          copy is hidden from assistive tech; the first pass is read. */}
      <div className="mt-8 relative">
        <div className="marquee">
          {[0, 1].map((pass) => (
            <ul
              key={pass}
              className="flex items-center shrink-0"
              aria-hidden={pass === 1 ? "true" : undefined}
            >
              {STANDARDS.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-8 md:gap-12 px-8 md:px-12"
                >
                  <span className="font-display text-lg md:text-2xl text-ink-faint whitespace-nowrap">
                    {name}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-leaf/50 shrink-0"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
        {/* Feathered edges so marks enter and leave rather than clipping. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-paper to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-paper to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
