# Development warnings and rendering compatibility

## Next.js root

`next.config.ts` explicitly sets `turbopack.root` to the repository directory using `fileURLToPath(new URL(".", import.meta.url))`. Unrelated lockfiles in a parent/home directory no longer trigger root detection warnings. Keep this path portable; do not hard-code a Windows home directory or broaden the watch root.

## Three.js / React Three Fiber

The installed Fiber 9.8.2 is the latest available version checked during this change, but still constructs the deprecated `THREE.Clock`. The tracked pnpm patch in `patches/` replaces that construction with a small Timer-backed bridge preserving Fiber's start/stop, writable elapsed time and manual-advance contract in ESM and both CJS bundles. `pnpm install --frozen-lockfile` applies the patch reproducibly. Do not edit installed `node_modules` or filter console warnings. Remove the patch when a compatible upstream release migrates this code.

Run `pnpm exec node scripts/check-fiber-timer.mjs` to test the installed bridge. The twin explicitly uses `shadows="percentage"` (supported PCF shadows), not the removed soft-shadow constant.

The product scene checks WebGL2 before mounting and keeps one renderer mounted after its first reveal. Offscreen/reduced-motion rendering uses a demand loop. The landing site releases each renderer's context during cleanup. Neither site attempts to construct a renderer when WebGL2 is absent.

## Browser-only messages

A hydration mismatch listing only extra `fdprocessedid` attributes is caused by browser-extension DOM injection, not values emitted by this application. Disable the injecting extension for localhost or use a clean browser profile. Do not suppress hydration warnings or disable server rendering to mask it.

The Next.js `cache-bypass-in-dev` notice during a hard refresh is informational: dev cache bypass is not a production failure. Browser GPU/ANGLE shader precision and ReadPixels performance messages are driver diagnostics; the app must still render correctly and preserve its fallback. These are not silenced.

Existing Next.js ESLint plugins currently declare peer ranges through ESLint 9 while this repository uses ESLint 10. The project lint suite passes. Downgrading to the now-unsupported ESLint 9 solely to remove install warnings is not a fix; retain the supported stack and update plugins when upstream adds support.

## Product glass controls

`src/styles/_glass-buttons.scss` mirrors the landing page's 3rem, pill-shaped, mono-label, tinted primary / clear secondary glass styles. It preserves reduced-motion and reduced-transparency behavior. Hero/header calls to action, menu, back-to-top and explorer controls consume these mixins; selected explorer controls retain a visible active state.

From the sibling digital twin repo, with dev servers running on landing 3000, product 3001 and twin 3002 (API 8000), run `pnpm exec node scripts/check-dev-sites.mjs` for dev-console, mobile, interaction and no-WebGL checks.
