Menu items should support arrow-key navigation and typeahead per WAI-ARIA menu pattern. **Resolved in 1.2.0.**

**Acceptance criteria:**

- [x] Roving `tabindex` on `au-menu-item`
- [x] Typeahead matches first item by character
- [x] Unit tests for keyboard navigation (`menu.spec.ts`, `menu-item.spec.ts`)
