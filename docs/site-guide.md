# Working on the product website

The product site explains connections. A visitor should be able to follow water into storage, understand when the uphill pump can run, and see why a requested irrigation action might not be delivered.

Keep that distinction clear: this website tells the story of the model. The Python twin computes the model.

## Follow the page before changing it

The home page in `src/app/page.tsx` has five main parts:

1. **Introduction and assumed site:** the forest concept and a few clearly labelled synthetic parameters.
2. **The idea:** why water, energy and land should be considered together.
3. **The system:** selectable explanations for water, energy and control.
4. **The twin and evidence:** documented fault previews and the historical controller comparison.
5. **Beyond the model:** measurements, calibration and approvals still needed, followed by the shared-facts panel and footer.

`SiteHeader.tsx` provides the desktop links and mobile menu. `PageMotion.tsx` and `SmoothScroll.tsx` wrap presentation behavior; they do not supply content or physics.

## Where to make a change

| Change                                                         | Start with                                                           |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| Page sections or explanatory paragraphs                        | `src/app/page.tsx`                                                   |
| Page layout, spacing or section colors                         | `src/app/page.module.scss` and `src/app/globals.scss`                |
| System or scenario explanations                                | `src/content/netlave.ts`                                             |
| Shared assumptions, scenario summaries or published comparison | `src/content/ground-truth.json`, synchronized across all three repos |
| System/scenario control behavior                               | `src/components/SystemExplorer.tsx` or `ScenarioExplorer.tsx`        |
| Header and mobile menu                                         | `src/components/SiteHeader.tsx`                                      |
| Glass-control appearance                                       | `src/styles/_glass-buttons.scss`                                     |
| Forest geometry and decorative motion                          | `src/components/scene/Scene.tsx`                                     |
| Scene loading and fallback                                     | `src/components/scene/LazyScene.tsx`                                 |
| Search and social metadata                                     | `src/lib/seo.ts` and `src/app/layout.tsx`                            |

A page-specific sentence can stay in this repo. A physical fact used elsewhere belongs in the shared reference and should be checked against the twin before being copied to all sites.

## The explorers are explanations

The system explorer changes the selected system, its diagram emphasis and its facts. The scenario explorer changes a written narrative, illustrative zone states and a reason-code explanation.

Neither component calls the simulation API. For example, selecting **Low solar** shows the documented reserve-limited pump behavior; it does not create a new low-solar run or measure how long a real pump can operate.

When editing a preview:

- Preserve the difference between requested and delivered irrigation.
- Keep the scenario conditions visible. A result without its assumptions is easy to misread.
- Use the shared summaries where they already exist; do not create another contradictory parameter table.
- Keep `aria-pressed`, the visible selected state and the live-region content intact so controls remain understandable with a keyboard or screen reader.
- Check the updated reason code against `backend/schemas.py` in the twin repo if it describes engine behavior.

## Example: change a scenario explanation

Suppose you want to clarify why Zone B waits in the baseline.

1. Confirm the behavior in the twin preset and safety resolver: A and B share a 140 m³/h gravity manifold.
2. Update the common summary in `ground-truth.json` if it is the shared explanation being changed.
3. Copy the shared JSON to the landing and twin repos. Do not change the physical model just to fit the sentence.
4. Review the scenario's product-only heading and lesson in `netlave.ts`; change them only if needed.
5. Select the preview on desktop and mobile. Its visible status, reason code and wording should tell the same story.
6. Run the shared-file check and the regular project checks.

This is still a documentation change to the model's explanation, not a new simulated result.

## The forest is decorative

`Scene.tsx` draws terraces, trees, storage, pipes, solar panels and a pump. Equipment sizes, tree placement and gentle motion make the concept easier to see; they are not extra physical outputs.

`LazyScene.tsx` checks WebGL2 and waits until the scene is near the viewport. It keeps one renderer mounted after the first reveal to avoid creating another context each time the user scrolls. The `active` flag changes the animation loop to demand rendering offscreen. Reduced motion also uses demand rendering.

The SVG fallback is always part of the page. If the renderer cannot be used, text and controls must remain available. Never put a necessary assumption or safety message only inside the canvas.

Fiber's installed clock compatibility is handled by the tracked pnpm patch, not by changing scene physics. See [troubleshooting](development-troubleshooting.md#clock-and-shadow-warnings) before touching that patch.

## Glass controls and readable emphasis

`_glass-buttons.scss` follows the landing page's button design: a 3rem minimum height, rounded capsule, mono labels, translucent fill and a light rim. Primary controls are tinted; secondary controls are clearer. Selected explorer buttons have a visible active border and fill.

Preserve reduced-transparency solid colors and reduced-motion behavior. Keep plain navigation and source links distinguishable from calls to action; not every link needs the same emphasis.

## Review before a PR

- Read the page without WebGL and without JavaScript. The story and reference links should still make sense.
- Check the menu, hero actions, system buttons and scenario buttons with a keyboard.
- Select every system and scenario at least once.
- Check 390px-wide and desktop layouts for clipped text or horizontal page scrolling.
- Try reduced motion and no-WebGL rendering.
- If evidence text changed, retain its seed, period and synthetic status. The historical baseline and later scheduler validation are different tests.
- Run the checks in the [README](../README.md#check-your-changes).

Use [brand and ground truth](brand-and-ground-truth.md) for cross-repo content and publishing, and [development troubleshooting](development-troubleshooting.md) when the page does not behave as expected.
