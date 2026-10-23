# Development troubleshooting

First decide whether the problem is a page/build error, a decorative renderer failure or a browser diagnostic. The product site has no Python connection, so an offline twin API is not the cause of a broken product page.

## Quick checks

| Symptom                                   | First check                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| The server will not start                 | Is another Next.js repo already on port 3000? Use the separate-port layout.                        |
| A system or scenario does not change      | Is there a browser JavaScript error? These controls update local explanatory content, not the API. |
| The forest is absent                      | Is WebGL2 supported and has the scene reached the viewport? The SVG should remain.                 |
| The forest stops moving offscreen         | Expected: the mounted scene switches to demand rendering.                                          |
| A clock warning appears                   | Confirm the locked Fiber patch is installed and run its check.                                     |
| Canonicals or sitemap entries are missing | Was the verified `SITE_URL` set before building?                                                   |

## Startup, installs and root detection

Use `pnpm install --frozen-lockfile` from this repository. If it fails, inspect the dependency/lockfile mismatch rather than deleting the lockfile or switching package managers.

All three Next.js apps default to port 3000. Use the [README's port layout](../README.md#run-all-three-sites-together) for a cross-site session. Stop a server from its own terminal with Ctrl+C and identify any process still occupying the port before stopping it.

`next.config.ts` explicitly sets `turbopack.root` to the repository. Unrelated home-directory lockfiles should not affect it. Keep the portable file-URL path; do not broaden the watch root to a user's home folder.

Before changing Next.js configuration, read the installed guides in `node_modules/next/dist/docs/`. This repo's Next.js version may differ from examples written for older releases.

## Forest and animation behavior

`LazyScene.tsx` probes WebGL2 and mounts the browser-only scene near the viewport. It keeps one renderer mounted after reveal instead of recreating a context on every scroll. `Scene.tsx` uses a demand loop offscreen and for reduced motion.

A browser without WebGL2 gets the SVG schematic, not a different physical result. The page text and source links remain readable. If a supported browser fails, inspect the console and network requests rather than replacing a real error with a permanently blank layer.

Reduced motion disables smooth scrolling, reveal motion and scene animation. Do not force motion back on because a static page appears less dramatic. A page element that remains hidden in ordinary motion mode needs a separate animation/layout investigation.

## Clock and shadow warnings

Installed Fiber 9.8.2 constructs the deprecated `THREE.Clock`. Both this repo and the twin track a pnpm patch that replaces that construction with a Timer-backed bridge while retaining Fiber's start/stop, elapsed-time and manual-advance contract. The patch covers ESM and development/production CJS bundles.

```bash
pnpm install --frozen-lockfile
pnpm exec node scripts/check-fiber-timer.mjs
```

Restart Next.js after reinstalling dependencies. Do not edit installed `node_modules`, filter console warnings or introduce a frontend physical clock. Remove the patch when a compatible upstream release migrates the code, then rerun its replacement checks and scene tests.

The twin separately selects supported percentage/PCF shadows instead of Fiber's removed soft-shadow constant. That is a twin rendering detail, not a reason to change this site's explanatory model.

## Buttons and mobile controls

Glass controls use `src/styles/_glass-buttons.scss` with the tokens in `src/app/globals.scss`. If a button loses its fill or shape, inspect the importing SCSS module and token names first.

The hero/header actions, mobile menu, back-to-top and explorer controls share the glass design. Selected explorer controls keep a visible active state. Reduced transparency uses solid colors; reduced motion removes active-scale movement. These are supported alternatives, not broken styles.

For clipped text or horizontal page scrolling, inspect the specific flex/grid container. Do not hide overflow on the whole page just to conceal an oversized control.

## Hydration, caches and driver diagnostics

A hydration warning listing only extra `fdprocessedid` attributes was caused by extension DOM injection in the observed browser. Use a clean profile or disable the injecting extension on localhost. Investigate other differing content normally; never suppress every hydration warning or remove SSR to mask it.

Next.js's hard-refresh `cache-bypass-in-dev` notice is informational. GPU/ANGLE shader precision or ReadPixels messages are driver diagnostics; check actual rendering and fallback behavior instead of disabling validation.

Some installed Next.js ESLint plugins declare peer ranges through ESLint 9 while the repo uses ESLint 10. Keep running lint. Do not downgrade merely to remove a peer warning, and do not dismiss a real lint error as the same issue.

## Search metadata

`SITE_URL` must be set to the verified public origin before a production build. If absent, the sitemap is empty and the site does not invent a canonical domain. Changing a running production server's environment alone does not regenerate its built pages.

Use the [publishing guide](brand-and-ground-truth.md#publishing-search-and-generative-discovery) to check `/ground-truth`, canonical tags, social images, robots and sitemap output.

## Confirm a fix

Run the [README checks](../README.md#check-your-changes) and the Timer check when renderer dependencies changed. Try every system/scenario control, keyboard navigation, mobile width, reduced motion and no-WebGL rendering.

For all three running dev sites on 3000/3001/3002 with API 8000, run `pnpm exec node scripts/check-dev-sites.mjs` from the twin repo. It checks dev-console errors, product interactions, mobile overflow and fallbacks. It is a smoke check, not a replacement for source review or every browser/environment test.
