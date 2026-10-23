# NetLave

An immersive website for the NetLave treated-wastewater forestry digital twin. Built with Next.js 16, React 19, strict TypeScript and SCSS modules. The schematic forest uses React Three Fiber, drei and postprocessing; Lenis and GSAP handle scrolling and reveals.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. For the production version, run `pnpm build` followed by `pnpm start`.

See [development troubleshooting](docs/development-troubleshooting.md) for Next.js root configuration, renderer compatibility, browser-extension hydration diagnostics and the landing-style glass controls.

## Checks

```bash
pnpm lint
pnpm lint:styles
pnpm typecheck
pnpm format:check
pnpm build
```

Follow [AGENTS.md](AGENTS.md) for repository conventions and the branch workflow.

## Content and scope

- Shared branding comes from the supplied `NetLave.png`; all three repos use the same derived assets and Space Grotesk / IBM Plex Mono configuration.
- Shared project facts live in `src/content/ground-truth.json`, pinned to the Python twin's configuration, scenarios and published validation. `/ground-truth` renders the same crawlable reference on all three sites.
- Product-specific explanations live in `src/content/netlave.ts` and consume shared assumptions, scenario summaries and the historical comparison.
- The system explorer and scenario previews are interactive explanations, **not a simulation engine**. They do not fetch live telemetry or advance the Python backend. The page links to the full digital twin project and its assumptions.
- All numerical claims describe synthetic assumptions or simulated outputs, not field measurements, real-world savings or regulatory compliance.
- The reference identifies Eyad, Mahmoud, Omar and Hana from the founder landing page. Unprovided biographies/roles and the unverified placeholder email are not published.
- Resource-aware scheduling is experimental and opt-in; smart hysteresis remains the default. Historical startup-inclusive comparisons are not held-out scheduler validation.

See [brand, ground truth and SEO/GEO](docs/brand-and-ground-truth.md) for logo regeneration, synchronization and deployment. Run `pnpm exec node scripts/check-shared-truth.mjs --siblings` when the three repos are adjacent. Set `SITE_URL` to this site's verified production origin at build time to enable canonicals, absolute social image URLs and the sitemap; no domain is guessed.

The WebGL scene is browser-only, unloaded outside the viewport, and backed by an SVG schematic if rendering fails. Reduced-motion preferences disable smooth scrolling, scroll reveals and scene motion. The content and native anchor navigation remain available without JavaScript.
