"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";

/**
 * Fade-and-rise on first entry. Deliberately not a state update per
 * element: the observer writes one data attribute and disconnects, so a
 * page full of revealed blocks costs no React renders.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: "div" | "li";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const props = {
    ref,
    className: `reveal ${className}`,
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  };

  if (as === "li") {
    return <li {...(props as ComponentPropsWithRef<"li">)}>{children}</li>;
  }
  return <div {...(props as ComponentPropsWithRef<"div">)}>{children}</div>;
}
