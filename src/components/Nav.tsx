"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const NAV_LINKS = [
  { href: "#problems", label: "What we solve" },
  { href: "#method", label: "How it works" },
  { href: "#principles", label: "Principles" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // The hero is a full-bleed film frame, so the bar rides over it in
  // white and only takes on the paper ground once the page moves.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  const inverted = !solid && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        inverted
          ? "bg-transparent border-b border-white/15"
          : "bg-paper border-b border-line"
      }`}
    >
      <div className="shell h-[var(--nav-h)] flex items-center justify-between gap-6">
        <a
          href="#main"
          className={`flex items-center gap-2.5 font-display font-semibold transition-colors ${
            inverted ? "text-white" : "text-ink"
          }`}
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span>Procambrian</span>
        </a>

        <nav
          aria-label="Sections"
          className={`hidden md:flex gap-7 lg:gap-8 font-display text-sm transition-colors ${
            inverted ? "text-white/80" : "text-ink-muted"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors ${
                inverted ? "hover:text-white" : "hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`pill hidden sm:inline-flex !px-5 !py-2.5 !text-sm ${
              inverted
                ? "border-white/45 text-white hover:bg-white hover:text-ink"
                : "bg-water text-on-accent hover:bg-water-deep"
            }`}
          >
            Talk to us
          </a>
          <button
            type="button"
            className={`md:hidden pill !px-4 !py-2.5 !text-sm ${
              inverted ? "border-white/45 text-white" : "border-line text-ink"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* The desktop nav is hidden below md, so without this panel a phone
          visitor had no way to reach any section but the one they land on. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-line bg-paper"
      >
        <nav aria-label="Sections" className="shell py-4 flex flex-col">
          {[...NAV_LINKS, { href: "#contact", label: "Talk to us" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-base text-ink py-3 border-b border-line last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
