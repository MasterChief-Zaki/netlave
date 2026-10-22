<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NetLave

The NetLave site: a Next.js page with a WebGL scene, smooth scrolling and GSAP animation. Keep it simple: build only what is asked, the way it is asked. No speculative abstractions, features or dependencies.

## Stack

- Next.js 16 (App Router, `src/app/`), React 19, TypeScript (strict)
- Styling: SCSS modules (`*.module.scss`), globals in `src/app/globals.scss`
- 3D: three.js through React Three Fiber (`@react-three/fiber`), with drei (`@react-three/drei`) helpers and `@react-three/postprocessing` effects
- Scrolling: Lenis (`lenis`)
- Animation: GSAP (`gsap`), with `useGSAP` from `@gsap/react` in components
- Import alias: `@/*` → `src/*`

## Commands

Use **pnpm** only. Never npm or yarn, and never commit another lockfile.

| Command             | Purpose                         |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Start the dev server            |
| `pnpm build`        | Production build                |
| `pnpm lint`         | ESLint (`next lint` is removed) |
| `pnpm lint:styles`  | Stylelint for CSS/SCSS          |
| `pnpm format`       | Prettier, write changes         |
| `pnpm format:check` | Prettier, check only            |
| `pnpm typecheck`    | Generate Next types, run `tsc`  |

A Husky pre-commit hook runs lint-staged (ESLint, Stylelint, Prettier on staged files) and then `pnpm typecheck`. Never bypass it with `--no-verify`. Fix the problem instead.

## Code style

- Clean, readable design. Give components, classes, CSS classes, variables and functions clear, descriptive names. No vague names like `data`, `tmp` or `x`.
- TypeScript is stricter than `strict`: `noUncheckedIndexedAccess`, `noImplicitOverride`, `noImplicitReturns` and `noFallthroughCasesInSwitch` are on, and ESLint uses typescript-eslint's strict type-checked rules. Handle the `undefined` cases instead of silencing them with `!` or `as`.
- Don't allocate inside `useFrame`: no `new` and no `.clone()` in the frame loop (enforced by `@react-three/eslint-plugin`). Create objects once, outside the loop.
- Let Prettier and the linters decide formatting. Don't hand-tune it.

## Git workflow

- `main` is protected: every change goes through a PR targeting `main`.
- Branch names: `<type>/<short-description>`, e.g. `ci-cd/precommit-and-linting`, `docs/add-agent-md`.
- Larger work goes on an `epic/<short-description>` branch: build each part on its own branch, merge it into the epic with `--no-ff`, and open one PR from the epic to `main`.
- Keep commits atomic and scoped: one logical change per commit.
- Write commit messages like a human: short, plain-English summaries of what changed.
- No AI attribution anywhere: no `Co-Authored-By` trailers or "Generated with" lines in commits, PRs or code.
