export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-16 py-5 bg-strata-ink/70 backdrop-blur-sm border-b border-lichen-dim/20">
      <a href="#main" className="font-display font-semibold text-bone">
        Procambrian
      </a>
      <nav className="hidden md:flex gap-8 font-display text-sm text-lichen">
        <a href="#what-we-do" className="hover:text-bone transition-colors">
          Method
        </a>
        <a href="#proof" className="hover:text-bone transition-colors">
          Output
        </a>
        <a href="#approach" className="hover:text-bone transition-colors">
          Origin
        </a>
        <a href="#faq" className="hover:text-bone transition-colors">
          Limits
        </a>
      </nav>
      <a
        href="#contact"
        className="font-display text-sm font-semibold text-bone border border-lichen-dim px-4 py-2 hover:border-oxide-live hover:text-oxide-live transition-colors"
      >
        Talk to us
      </a>
    </header>
  );
}
