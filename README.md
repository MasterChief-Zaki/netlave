# NetLave

An immersive website for the NetLave treated-wastewater forestry digital twin. Built with Next.js 16, React 19, strict TypeScript and SCSS modules. The schematic forest uses React Three Fiber, drei and postprocessing; Lenis and GSAP handle scrolling and reveals.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. For the production version, run `pnpm build` followed by `pnpm start`.

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

- Branding, typography and project framing come from `../landing-netlave/`.
- Site assumptions, fault scenarios and the published 14-day comparison come from `../digitalTwin-netlave/README.md`; initial storage values were checked against its step-0 fixture.
- Website content is collected in `src/content/netlave.ts`.
- The system explorer and scenario previews are interactive explanations, **not a simulation engine**. They do not fetch live telemetry or advance the Python backend. The page links to the full digital twin project and its assumptions.
- All numerical claims describe synthetic assumptions or simulated outputs, not field measurements, real-world savings or regulatory compliance.
- The reference landing site's founder names and contact email are placeholders, so this site does not publish them.

The WebGL scene is browser-only, unloaded outside the viewport, and backed by an SVG schematic if rendering fails. Reduced-motion preferences disable smooth scrolling, scroll reveals and scene motion. The content and native anchor navigation remain available without JavaScript.
