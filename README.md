# Procambrian

Procambrian uses AI and data to solve sustainability, ESG, climate and
environmental intelligence problems for organisations. Light-themed marketing
site with a procedural GLSL 3D hero: a vascular strand that grows via space colonization and differentiates from structural green into live blue, mirroring the logo mark.

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind v4 (tokens as CSS
custom properties) · Three.js + React Three Fiber + drei · Lenis (smooth
scroll) · custom GLSL shaders for the growth/differentiation animation.

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build + type-check
```

## Design tokens

All color/type tokens live in `src/app/globals.css` under `:root`, mirrored
into Tailwind via `@theme inline` so they're usable as `bg-strata-ink`,
`text-oxide-live`, etc.

| Token | Hex | Role |
|---|---|---|
| `strata-ink` | `#f6f8f6` | page ground (cool paper) |
| `cambium-panel` / `-2` | `#eaefeb` / `#dfe7e1` | raised surfaces |
| `bone` | `#17241e` | primary text (deep green-black ink) |
| `lichen` / `lichen-dim` | `#4f5e56` / `#93a49a` | secondary text, borders |
| `xylem-amber` / `-dim` | `#4f9d52` / `#3b7a3e` | dominant structural accent (logo green) |
| `oxide-live` / `-dim` | `#2c8fd6` / `#1e6fa8` | **reserved for live/interactive states only** (logo blue) |
| `on-accent` | `#ffffff` | text on filled accent surfaces |

Type: `Familjen Grotesk` (display/UI, `--font-display`) + `Newsreader`
(body/editorial, `--font-body`), loaded via `next/font/google` in
`src/app/layout.tsx`.

## Editing content

Section copy lives directly in each component under `src/components/sections/`
— there's no CMS yet. Each section is a plain React component; edit the
arrays at the top of `WhatWeDo.tsx`, `ProofBand.tsx`, and `Faq.tsx` to change
copy without touching layout.

## Tuning the 3D hero

The growth algorithm is in `src/lib/growth.ts` (`generateGrowth`), a
deterministic space-colonization implementation — same seed always produces
the same structure. Key parameters (all overridable via the function's
second argument):

- `attractorCount`, `volumeRadius`, `height` — shape and density of the
  field the strand grows toward.
- `influenceRadius`, `killRadius`, `stepSize` — how the growth branches and
  terminates; larger `killRadius`/`stepSize` = sparser, more legible
  branches; smaller = denser, more tangled.
- `differentiationHeight` — the y-threshold above which branches are tagged
  `resolved: true` (rendered oxide-red / "live") instead of structural amber.

The GLSL is in `src/components/hero3d/GrowthField.tsx`:
- Vertex shader staggers each instance's reveal by growth `order` — tune
  `uGrowDuration` (total animation length) and `uGrowWindow` (how fast each
  individual segment pops in) on the material's uniforms in that file.
- Fragment shader does simple fixed-light lambert shading and colors by
  `vResolved`; `uAmber`/`uOxide` are the two colors, `glow` in the shader
  controls brightness per state.

Composition (camera position, group position/scale, lights) is in
`src/components/hero3d/HeroCanvas.tsx`.

### Fallback & performance

- `src/lib/capabilities.ts` detects WebGL support, `prefers-reduced-motion`,
  and viewport/core count to pick a device tier (caps DPR accordingly).
- `src/components/hero3d/HeroFallback.tsx` is the static SVG shown when
  WebGL is unavailable or motion is reduced — keep its composition in sync
  with the 3D version if you change the growth story materially.
- The canvas's `frameloop` is set to `"never"` when off-screen
  (`IntersectionObserver`) or the tab is hidden, via `HeroCanvas.tsx`.

## What's built vs. outstanding

Built: home page (preloader, hero, capabilities, proof band, approach, FAQ,
CTA/footer), design tokens, depth-rail navigation, smooth scroll.

Outstanding (per the original site plan): `/platform`, `/research` (MDX),
`/about`, `/contact` (working form), custom 404, per-route SEO metadata +
OG image generation, JSON-LD, sitemap/robots, analytics, and a full
accessibility/Lighthouse pass.
