# A11Y debt issue templates

Create GitHub issues from these bodies (label: `a11y`). Milestone: `0.10` or `1.0`.

## A11Y-001 — au-snackbar live regions

**Title:** `[A11Y-001] au-snackbar: clarify polite vs assertive live regions`

**Body:**

Multiple concurrent snackbars may register overlapping `aria-live` regions. Audit stacking behavior and document when to use `polite` vs `assertive`. Add tests for concurrent messages.

**Acceptance criteria:**

- [ ] Single live region strategy documented
- [ ] Storybook example for stacked snackbars
- [ ] axe-clean on stable story

---

## A11Y-002 — au-chip-group horizontal scroll keyboard

**Title:** `[A11Y-002] au-chip-group: keyboard on horizontally scrollable groups`

**Body:**

On narrow viewports, chip groups scroll horizontally. Verify arrow keys and focus visibility when chips overflow.

**Acceptance criteria:**

- [ ] Roving tabindex or scroll-into-view on focus
- [ ] Manual QA note in A11Y_AUDIT.md

---

## A11Y-004 — au-menu roving tabindex + typeahead

**Title:** `[A11Y-004] au-menu: roving tabindex and typeahead`

**Body:**

Menu items should support arrow-key navigation and typeahead per WAI-ARIA menu pattern. Currently Escape/outside-click work; full pattern planned for 0.10.

**Acceptance criteria:**

- [ ] Roving `tabindex` on `au-menu-item`
- [ ] Typeahead matches first item by character
- [ ] Storybook play test for keyboard

---

Run:

```bash
gh issue create --title "..." --body-file docs/a11y/issue-a11y-001.md --label a11y
```
