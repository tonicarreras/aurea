# Security

## Reporting vulnerabilities

**Do not** open public GitHub issues for undisclosed security problems.

Email or DM the maintainer listed in `package.json` (`author`) with:

- Description and impact
- Reproduction steps
- Affected versions

We aim to acknowledge within **5 business days** and publish a fix or advisory via GitHub Security Advisories when confirmed.

## Dependency policy

| Check                     | Where                              | Frequency                              |
| ------------------------- | ---------------------------------- | -------------------------------------- |
| `bun audit` / `npm audit` | CI workflow `Test`                 | Every PR and push to `main`            |
| Lockfile                  | `bun.lock` committed               | Review on dependency bumps             |
| Peer deps                 | `projects/components/package.json` | No bundled Angular — consumer supplies |

### CI behavior

- **Critical** vulnerabilities → fail the build (`scripts/audit-ci.mjs`).
- High / moderate → GitHub Actions warning in the job log; tracked for scheduled `bun update` PRs (often transitive dev tooling).

### Updating dependencies

1. Prefer patch/minor bumps in a focused PR.
2. Run `bun run test:coverage`, `bun run test-storybook:ci`, and `bun run build`.
3. Note security fixes in `CHANGELOG.md` under `[Unreleased]`.

## Supply chain

- Publish only from GitHub Actions (`publish.yml`) on protected branches.
- npm package: `@aurea-design-system/components` with [provenance](https://docs.npmjs.com/generating-provenance-statements) when enabled in CI.
