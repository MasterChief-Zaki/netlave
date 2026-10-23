# NetLave product website

This is the product-facing explanation of NetLave, a simulation-driven prototype of treated-wastewater forestry in Egypt. It walks through the water network, renewable power and irrigation decisions, then shows what the documented scenarios teach us.

The system explorer and scenario previews are interactive **explanations**, not a simulation engine. Selecting a tab changes the explanation on the page; it does not run Python, query field sensors or change irrigation equipment. The working simulation lives in [digitalTwin-netlave](https://github.com/MasterChief-Zaki/digitalTwin-netlave).

## Start here

| If you want to…                                     | Read…                                                    |
| --------------------------------------------------- | -------------------------------------------------------- |
| Run the website                                     | The setup below                                          |
| Change content, controls or the forest illustration | [Site guide](docs/site-guide.md)                         |
| Keep facts, logos and search metadata consistent    | [Brand and ground truth](docs/brand-and-ground-truth.md) |
| Diagnose rendering or development warnings          | [Troubleshooting](docs/development-troubleshooting.md)   |
| Contribute a change                                 | [Repository rules](AGENTS.md)                            |

## Run locally

Use Node.js 24 and pnpm 10. Run these commands from this repository:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. No backend, database or account setup is needed for this site. Initial installs and builds need network access for dependencies and web fonts; the built site serves its own font files.

Use **pnpm**, not npm or yarn. Frozen installs also apply the tracked React Three Fiber compatibility patch.

### Run all three sites together

Each app normally starts on port 3000. Use separate terminals and ports when working across the project:

| Repository            | Command, run inside that repo | URL                   |
| --------------------- | ----------------------------- | --------------------- |
| `landing-netlave`     | `pnpm dev --port 3000`        | http://localhost:3000 |
| `netlave`             | `pnpm dev --port 3001`        | http://localhost:3001 |
| `digitalTwin-netlave` | `pnpm dev --port 3002`        | http://localhost:3002 |

The twin also needs `pnpm backend:dev` in a separate terminal, on port 8000. The two explanatory sites do not connect to it.

Ctrl+C stops a dev server. If a port stays occupied, identify the process before stopping it; another application may be using that port.

## How the site works

The stack is Next.js 16.4.2, React 19.3.0, strict TypeScript and SCSS modules. React Three Fiber, drei and postprocessing draw the decorative forest. Lenis handles smooth scrolling; GSAP handles page reveals. The buttons use the landing page's rounded glass style.

```text
src/app/page.tsx            Page sections, evidence table and footer
src/app/page.module.scss   Page layout and section styling
src/components/            Header, system/scenario controls and page motion
src/components/scene/      Lazy forest illustration and SVG fallback
src/content/netlave.ts     Product-specific explanations
src/content/ground-truth.json  Shared facts and pinned provenance
src/app/ground-truth/      Shared public reference page
src/styles/               Fonts and glass-button mixins
src/lib/seo.ts             Search and social metadata
public/brand/             Supplied logo and generated assets
patches/                  Locked renderer-compatibility patch
scripts/                  Asset and consistency checks
```

The forest loads only in the browser, after the scene approaches the viewport. It stays mounted after its first reveal, avoiding repeated WebGL context creation when you scroll. Offscreen or reduced-motion rendering uses a demand loop rather than continuous animation. An SVG schematic remains available if WebGL2 is absent or rendering fails.

Content and native links are server-rendered. Reduced-motion preferences disable smooth scrolling, scroll reveals and scene motion. The drawing is schematic and not to scale; it must not be treated as a surveyed installation or a live twin.

## What the evidence means

The published seed-7, 14-day synthetic baseline did **not** show a water saving from smart hysteresis. It delivered slightly more water and used more pump energy than the ET-sized fixed timer. We keep that result visible rather than turning the site into a promise of savings.

Later resource-aware scheduler trials are a separate experiment. That controller remains experimental and opt-in because held-out testing did not establish acceptable irrigation service at every endpoint. The product site's previews do not reproduce those trials in the browser.

All three repos share `ground-truth.json` and `/ground-truth`. Read the [shared guide](docs/brand-and-ground-truth.md) before changing a parameter, result or claim. Python remains the physical authority; static site copy never takes its place.

## Check your changes

```bash
pnpm lint
pnpm lint:styles
pnpm format:check
pnpm typecheck
pnpm build
pnpm exec node scripts/check-shared-truth.mjs
pnpm exec node scripts/check-fiber-timer.mjs
```

The first five commands check code, styles, formatting, types and the production build. The shared-facts check validates the local reference; add `--siblings` when the three repos are adjacent to compare common files. The Timer check verifies the installed Fiber patch in its ESM and CJS bundles.

For cross-site browser checks, start the three dev sites on 3000/3001/3002 and the twin API on 8000, then run `pnpm exec node scripts/check-dev-sites.mjs` **from the twin repo**. It checks dev-console errors, mobile overflow, product controls and no-WebGL fallbacks. This product repository does not have a separate Playwright test command.

Keep the Husky pre-commit hooks enabled. Use scoped branches and plain-English commits, and submit a PR to `main`. Larger work follows the epic-branch workflow in [AGENTS.md](AGENTS.md).

## Build and publish

```bash
pnpm build
pnpm start
```

These serve a local production build. Before a public build, set `SITE_URL` to the website's verified HTTP(S) origin. Canonical links, absolute social-card URLs and the populated sitemap depend on it; without it, no domain is invented and the sitemap is empty.

See [publishing guidance](docs/brand-and-ground-truth.md#publishing-search-and-generative-discovery) for metadata and preview checks. Better search and generative discovery comes from clear, cited content—not fabricated claims or a guarantee of placement.
