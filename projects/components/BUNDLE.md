# Bundle size & tree-shaking

`@aurea-design-system/components` is built with **ng-packagr** as a flat ES module package. Angular CLI applications tree-shake unused components when imports are **per-symbol**.

## Recommended imports

```ts
// Good — only AuButton is retained
import { AuButton } from '@aurea-design-system/components';

// Avoid — pulls entire public API surface into the analysis graph
import * as Aurea from '@aurea-design-system/components';
```

## Global CSS

These files are **not** tree-shaken; include only what you need:

| File | When |
|------|------|
| `styles/au-tokens.css` | Always (required) |
| `styles/au-field-error.css` | Forms with validation messages |
| `styles/au-field-listbox.css` | Select, autocomplete overlays |

```scss
@import '@aurea-design-system/components/styles/au-tokens.css';
```

Optional density / theme attributes add **no extra CSS files** — only token overrides.

## Measuring in your app

```bash
ng build --configuration=production --stats-json
```

Open `stats.json` with [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) or `esbuild-visualizer` and search for `@aurea-design-system/components`.

Typical footprint (order of magnitude, gzip varies by app):

- Single primitive (e.g. button): tens of kB including Angular runtime share
- Full form set + dialog: low hundreds of kB raw before app splitting

## Lazy loading

Split feature routes and import Aurea components only in routed standalone components:

```ts
export const routes: Routes = [
  {
    path: 'settings',
    loadComponent: () => import('./settings.page').then((m) => m.SettingsPage),
  },
];
```

## Icons

`AuIcon` inlines SVG paths — import only icons you use via the `name` input catalog documented per release.

## Peer dependencies

Angular packages are **peerDependencies** — they are not bundled into the library artifact.
