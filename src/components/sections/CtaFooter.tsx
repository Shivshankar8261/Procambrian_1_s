export function CtaFooter() {
  return (
    <section
      id="contact"
      className="px-6 md:px-16 py-20 md:py-28 bg-cambium-panel border-t border-lichen-dim/25"
    >
      <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone max-w-3xl">
        Tell us which reporting problem you&apos;d test this against.
      </h2>
      <p className="prose-body text-lichen mt-4 max-w-[56ch]">
        We are looking for organisations with messy emissions data and a
        disclosure deadline. Email us and we will tell you plainly whether
        the method is ready for your case.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="mailto:hello@procambrian.ai"
          className="inline-flex items-center gap-2 bg-oxide-live text-on-accent font-display font-semibold px-6 py-3 hover:bg-oxide-live-dim transition-colors"
        >
          Email hello@procambrian.ai
        </a>
        <a
          href="#approach"
          className="inline-flex items-center gap-2 border border-lichen-dim text-bone font-display font-semibold px-6 py-3 hover:border-xylem-amber hover:text-xylem-amber transition-colors"
        >
          Read the method
        </a>
      </div>

      <footer className="mt-24 pt-8 border-t border-lichen-dim/25 flex flex-col md:flex-row justify-between gap-4 text-sm text-lichen-dim font-display">
        <p>Procambrian. Pre-product, building in the open.</p>
        <p>Figures on this page are illustrative, not customer results.</p>
      </footer>
    </section>
  );
}
