# Aurea library

Angular library package for **Aurea** UI components. Generated with [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build aurea
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing to GitHub Packages

Package name: **`@tonicarreras/aurea`**. Published to `https://npm.pkg.github.com` on each
[GitHub Release](https://github.com/tonicarreras/aurea-ds/releases) (workflow
`.github/workflows/publish.yml`).

**CI publish:** job `environment: production` reads **`GH_PACKAGES_TOKEN`** from that environment
(PAT with `write:packages` / `read:packages`). If unset, falls back to **`GITHUB_TOKEN`**.

**Manual publish** (PAT with `write:packages`, or a fine-grained token with Packages read/write):

```bash
export NODE_AUTH_TOKEN=ghp_...
bun run publish:github
```

**Dry run** (creates a `.tgz` in the repo root):

```bash
bun run pack:package
```

### Installing in an Angular app

**CI (same repo or org):** `NODE_AUTH_TOKEN: ${{ github.token }}` with `packages: read` on the job.

**Other repos / local:** PAT with `read:packages` — `export NODE_AUTH_TOKEN=ghp_…` before
`npm install`, or `npm login --registry=https://npm.pkg.github.com` (user config only).

```bash
npm install @tonicarreras/aurea
```

```scss
@import '@tonicarreras/aurea/styles/au-tokens.css';
```

```ts
import { Button, Divider } from '@tonicarreras/aurea';
```

## Running unit tests

This library uses **Vitest** via `ng test` (Angular 21 `unit-test` builder). Use **Node.js 20.19+** (required by the Angular CLI).

```bash
ng test aurea --no-watch
```

Runs in **jsdom** by default. To run against a real browser with **Playwright**, use a Vitest-supported name (not `ChromeHeadless`):

```bash
ng test aurea --no-watch --browsers=ChromiumHeadless
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
