# Angular compatibility

Supported Angular versions for `@aurea-design-system/components`.

## Current matrix

| Aurea     | Angular (`@angular/core`)    | Node (tooling) | Status      |
| --------- | ---------------------------- | -------------- | ----------- |
| **0.4.x** | **21.2.x** — `^21.2.0` peers | 20.19+         | Active      |
| 0.3.x     | 21.2.x                       | 20.19+         | Maintenance |
| 0.1–0.2.x | 21.x (early)                 | 20.19+         | End of life |

## Requirements

- **Signal forms** (`[formField]`, `form()`) require Angular **21.2+**.
- **Standalone** components only — no NgModule required in consuming apps.
- **Zoneless** apps are supported when change detection is configured per [Angular docs](https://angular.dev/guide/zoneless).

## Upcoming

| Target           | Plan                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------ |
| Angular **22.x** | Evaluate when stable; expect Aurea **1.x** or **0.10+** with peer bump and changelog |
| Angular **20.x** | Not supported (signal forms, CLI 21)                                                 |

## Verifying in your app

```bash
ng version
npm ls @angular/core @aurea-design-system/components
```

Peer dependency warnings during install must be resolved before production use.

## CI

This repo builds and tests against the Angular versions pinned in the root `package.json`. Published peers define the supported range for consumers.
