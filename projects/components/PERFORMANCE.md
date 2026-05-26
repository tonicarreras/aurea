# Performance guidelines

Practices for keeping Aurea fast in consumer apps and in this repo.

## Component design

| Practice                         | Status in Aurea                                   |
| -------------------------------- | ------------------------------------------------- |
| `ChangeDetectionStrategy.OnPush` | All components                                    |
| Signal inputs/outputs            | Default API                                       |
| No unnecessary `effect()`        | Prefer computed + template                        |
| Lazy overlay DOM                 | Tooltips/menus create bubble/panel only when open |

## Overlays (tooltip, menu, popover, listbox)

- Panels attach to `document.body` only while open.
- `TooltipOverlay` / listbox sync runs in `afterRenderEffect` — torn down on `DestroyRef`.
- **Do not** mount hundreds of simultaneous open overlays.

## Bundle size

See [BUNDLE.md](./BUNDLE.md). Import symbols individually; avoid `import *`.

## Tables and lists

- `au-table` is a styled shell — virtualization is the app's responsibility (CDK virtual scroll, etc.).
- Large datasets: paginate server-side + `au-pagination`.

## Docs / Storybook

- Storybook test-runner visits all `au`-tagged stories — keep `play` functions short.
- Visual smoke tests cover **all stable** components (`e2e-visual/visual-story-manifest.ts`, 26 stories).

## Checklist for new components

- [ ] OnPush
- [ ] Overlay detached when closed
- [ ] No layout reads in hot paths (avoid `getBoundingClientRect` every CD cycle)
- [ ] `prefers-reduced-motion` respected for animations
- [ ] Story bundle size sanity (no huge inline assets)

## Future (roadmap)

- Virtualized `au-table` data source (optional add-on)
- Deferred overlay class registration for rarely used primitives
