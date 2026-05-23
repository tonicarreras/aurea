# Good first issues

Ways to contribute when you are new to Aurea.

## Look for the label

On GitHub, filter issues with label **`good first issue`**. Import suggested labels from [`.github/labels.yml`](../.github/labels.yml) (repo Settings → Labels, or `gh label create`). Maintainers add the label when:

- Scope is under ~200 lines
- No deep overlay or signal-forms architecture required
- Tests and Storybook story are part of the task

## Suggested starter tasks

| Area        | Example task                                                         |
| ----------- | -------------------------------------------------------------------- |
| **Docs**    | Fix typo, add Spanish/English parity in `projects/docs/src/app/i18n` |
| **Stories** | Add a missing variant story for a stable component                   |
| **A11y**    | Improve `aria-*` on a beta component with test-runner proof          |
| **Tokens**  | Sync `projects/design-tokens/*.json` after a CSS token change        |
| **Tests**   | Extend unit spec for edge case (disabled, keyboard)                  |

## Before you open a PR

```bash
bun install
bun run tag:stories
bun run test:coverage
bun run test-storybook:ci   # if you touched UI
bun run build:components
```

Read [CONTRIBUTING.md](../CONTRIBUTING.md) and [COMPONENT_DONE.md](../projects/components/COMPONENT_DONE.md).

## Proposing your own idea

Open a **Feature request** issue first. Small, well-scoped proposals are welcome even without the label.
