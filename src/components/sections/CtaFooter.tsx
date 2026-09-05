export function CtaFooter() {
  return (
    <section
      id="contact"
      className="px-6 md:px-16 py-20 md:py-28 bg-cambium-panel border-t border-lichen-dim/25"
    >
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone max-w-2xl">
        Read the method, or tell us what you&apos;d test it against.
      </h2>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="mailto:hello@procambrian.ai"
          className="inline-flex items-center gap-2 bg-oxide-live text-bone font-display font-semibold px-6 py-3 hover:bg-oxide-live-dim transition-colors"
        >
          Email hello@procambrian.ai
        </a>
        <a
          href="#approach"
          className="inline-flex items-center gap-2 border border-lichen-dim text-bone font-display font-semibold px-6 py-3 hover:border-xylem-amber hover:text-xylem-amber transition-colors"
        >
          Read the approach again
        </a>
      </div>

      <footer className="mt-24 pt-8 border-t border-lichen-dim/25 flex flex-col md:flex-row justify-between gap-4 text-sm text-lichen-dim font-display">
        <p>Procambrian. Pre-product, building in the open.</p>
        <p>Simulation figures generated at build time from seed 1117.</p>
      </footer>
    </section>
  );
}
