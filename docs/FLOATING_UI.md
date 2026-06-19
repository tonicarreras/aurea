# Floating UI platform

Shared behaviour for portaled panels: **menu**, **popover**, **tooltip**, **select/autocomplete listbox**, **date/time pickers**.

## Stack

```text
Component (AuMenu, AuPopover, …)
  → TooltipOverlay | FloatingPickerOverlay | FieldListboxOverlay
  → document.body or open <dialog> (top layer)
  → .au-floating-panel + data-au-theme on portaled node
```

## Tokens (domain layer)

| Token | Use |
| ----- | --- |
| `--au-floating-panel-bg` / `-border` | Glass popovers, menus (desktop) |
| `--au-floating-blur` | Backdrop blur on floating panels |
| `--au-floating-gap` | Anchor ↔ panel distance |
| `--au-floating-arrow-size` / `-inset` | Tooltip & menu/popover arrow |
| `--au-dialog-bg` / `-border` / `-shadow` | Modal surfaces (dialog, drawer, mobile picker sheet) |
| `--au-color-overlay-scrim` | Backdrop behind modals and picker sheets |

Mobile pickers (`max-width: 42rem`) use **opaque dialog tokens**, not translucent glass.

## Components

| Component | Overlay | Arrow | Scroll lock | Dismiss |
| --------- | ------- | ----- | ----------- | ------- |
| `AuTooltip` | `TooltipOverlay` | Yes | No | Hover/focus leave |
| `AuMenu` | `TooltipOverlay` | Yes | Page wheel/touch | Outside click, Escape, scroll outside |
| `AuPopover` | `TooltipOverlay` | Yes (inner scroll body) | Page while open | Outside click, Escape, scroll outside |
| `AuSelect` / `AuAutocomplete` | `FieldListboxOverlay` | No | Page while open | Outside click, Escape, select |
| `AuInputDate` / `AuInputTime` | `FloatingPickerOverlay` | Popover / bottom sheet | Page while open | Outside click, Escape, pick |

## Portaling rules

1. Default portal: `document.body`.
2. Inside an open `<dialog>`: portal to the dialog so content stays in the top layer ([`resolveFieldListboxPortalRoot`](../../projects/components/src/lib/overlay/field-listbox-overlay.ts)).
3. Copy `data-au-theme` and density to portaled nodes ([`portaled-theme-context`](../../projects/components/src/lib/overlay/portaled-theme-context.ts)).

## Accessibility checklist (new floating UI)

Use this when adding or changing an anchored panel:

- [ ] **Trigger:** `aria-expanded`, `aria-haspopup`, `aria-controls` (or `aria-describedby` for tooltips).
- [ ] **Panel:** appropriate `role` (`menu`, `dialog`, `listbox`, `tooltip`).
- [ ] **Focus:** move focus into panel on open when modal; return focus to trigger on close.
- [ ] **Keyboard:** Escape closes; menu/listbox arrow keys; popover/dialog Tab trap when modal.
- [ ] **Pointer:** outside click dismisses unless interaction is inside panel or trigger row.
- [ ] **Scroll:** dismiss or reposition on ancestor scroll; block page scroll only while open.
- [ ] **Motion:** respect `prefers-reduced-motion` for enter animations.
- [ ] **Contrast:** portaled theme matches trigger context (especially drawer/dialog).

## Extending

1. Reuse `TooltipOverlay` or `FloatingPickerOverlay` — do not reimplement `position: fixed` math.
2. Add layout-only CSS on the component; shared chrome stays in `au-floating-panel.css`.
3. Wire `installPageScrollPrevention` / `installOutsideInteractionBlock` from overlay guards when behaviour matches menu/popover.

## Code entry points

- [`projects/components/src/lib/overlay/tooltip-overlay.ts`](../../projects/components/src/lib/overlay/tooltip-overlay.ts)
- [`projects/components/src/lib/overlay/floating-picker-overlay.ts`](../../projects/components/src/lib/overlay/floating-picker-overlay.ts)
- [`projects/components/src/lib/overlay/field-listbox-overlay.ts`](../../projects/components/src/lib/overlay/field-listbox-overlay.ts)
- [`projects/components/src/lib/styles/au-floating-panel.css`](../../projects/components/src/lib/styles/au-floating-panel.css)
