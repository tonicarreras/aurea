Multiple concurrent snackbars may register overlapping `aria-live` regions. Audit stacking behavior and document when to use `polite` vs `assertive`. Add tests for concurrent messages.

**Acceptance criteria:**

- [ ] Single live region strategy documented
- [ ] Storybook example for stacked snackbars
- [ ] axe-clean on stable story
