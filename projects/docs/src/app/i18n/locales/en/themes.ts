import type { ThemeTokenGroup } from '../../types/themes';

export const THEME_TOKEN_GROUPS_EN: ThemeTokenGroup[] = [
  {
    title: 'Surfaces',
    description: 'Background hierarchy in light and dark mode.',
    tokens: [
      { token: '--au-color-surface-canvas', description: 'Page and app shell background.' },
      { token: '--au-color-surface-raised', description: 'Panels, fields, and raised cards.' },
      { token: '--au-color-surface-elevated', description: 'Hover and slightly higher layers.' },
      {
        token: '--au-color-surface-sunken',
        description: 'Rails, inset backgrounds, contained tabs.',
      },
      { token: '--au-color-surface-inverted', description: 'Tooltips, dialog backdrop.' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { token: '--au-color-text-primary', description: 'Body and primary headings.' },
      { token: '--au-color-text-secondary', description: 'Supporting text and inactive tabs.' },
      { token: '--au-color-text-tertiary', description: 'Hints and metadata (AA contrast).' },
      { token: '--au-color-text-label', description: 'Form labels.' },
      { token: '--au-color-text-on-solid', description: 'Text on buttons and inverted surfaces.' },
      { token: '--au-color-text-disabled', description: 'Disabled controls.' },
    ],
  },
  {
    title: 'Borders & actions',
    tokens: [
      { token: '--au-color-border-subtle', description: 'Subtle separators and outlines.' },
      { token: '--au-color-border-default', description: 'Standard control borders.' },
      { token: '--au-color-border-strong', description: 'Emphasis and border hover states.' },
      { token: '--au-color-action-primary', description: 'Primary accent, focus, and links.' },
      { token: '--au-color-action-primary-hover', description: 'Accent hover.' },
      { token: '--au-color-action-primary-pressed', description: 'Active/pressed state.' },
      { token: '--au-color-link', description: 'In-text links and snackbar actions.' },
      { token: '--au-color-focus-ring', description: 'Focus ring (not error).' },
    ],
  },
  {
    title: 'Forms (shared)',
    description: 'Used by inputs, select, checkbox, and other fields.',
    tokens: [
      { token: '--au-color-form-border', description: 'Field shell border.' },
      { token: '--au-color-form-border-hover', description: 'Border hover.' },
      { token: '--au-color-form-text', description: 'Entered value.' },
      { token: '--au-color-form-placeholder', description: 'Native placeholder.' },
      { token: '--au-color-form-error', description: 'Error border and text.' },
      { token: '--au-color-form-error-bg', description: 'Invalid shell background.' },
      { token: '--au-color-form-disabled-surface', description: 'Disabled background.' },
      { token: '--au-radius-field', description: 'Field corner radius (4px default).' },
      { token: '--au-size-field-h-sm / md / lg', description: 'Form control heights.' },
      { token: '--au-chrome-border', description: 'Shared field shell border (comboboxes, inputs).' },
      { token: '--au-elevation-flat', description: 'Resting elevation on field shells.' },
      {
        token: '--au-focus-inset / --au-focus-tab',
        description: 'Pointer and keyboard focus on field shells.',
      },
    ],
  },
  {
    title: 'Semantic',
    tokens: [
      { token: '--au-color-semantic-success', description: 'Success (snackbar, states).' },
      { token: '--au-color-semantic-error', description: 'Critical error.' },
      { token: '--au-color-semantic-warning', description: 'Warning.' },
      { token: '--au-color-semantic-info', description: 'Information.' },
      {
        token: '--au-color-semantic-*-surface',
        description: 'Soft backgrounds paired to each semantic.',
      },
    ],
  },
  {
    title: 'Typography & spacing',
    tokens: [
      { token: '--au-font-sans', description: 'Default UI family.' },
      { token: '--au-font-mono', description: 'Code and tabular data.' },
      { token: '--au-text-xs … --au-text-xl', description: 'Type scale.' },
      { token: '--au-space-1 … --au-space-12', description: 'Spacing scale (rem).' },
      { token: '--au-radius-sm … --au-radius-lg', description: 'Component and chip radii.' },
      { token: '--au-touch-target-min', description: '44px minimum (WCAG 2.5.5).' },
    ],
  },
  {
    title: 'Elevation & focus roles',
    description:
      'Use role tokens in components — not raw `--au-shadow-*` primitives. Primitives exist for internal token composition only.',
    tokens: [
      { token: '--au-elevation-flat', description: 'Inputs, cards, tables, chips, badges.' },
      { token: '--au-elevation-tactile', description: 'Buttons (secondary/outline resting state).' },
      { token: '--au-elevation-raised', description: 'Snackbars.' },
      { token: '--au-elevation-floating', description: 'Menu and popover panels.' },
      { token: '--au-elevation-overlay', description: 'Dialog, drawer, tooltip, listbox.' },
      { token: '--au-focus-inset / --au-focus-inset-error', description: 'Pointer focus on flat controls.' },
      { token: '--au-focus-tactile / --au-focus-tactile-error', description: 'Pointer focus on buttons.' },
      { token: '--au-focus-tab / --au-focus-tab-error', description: 'Keyboard Tab focus (`--from-tab`).' },
      { token: '--au-color-focus-ring', description: 'Focus color only (with `--au-focus-ring-width`).' },
      { token: '--au-z-raised', description: 'Sticky headers, floating caret.' },
      { token: '--au-z-dropdown', description: 'Listboxes, menus, tooltips.' },
      { token: '--au-z-drawer', description: 'Drawer shell.' },
      { token: '--au-z-modal', description: 'Modal dialogs.' },
      { token: '--au-z-toast', description: 'Snackbars.' },
      { token: '--au-z-popover', description: 'Tooltip layer.' },
    ],
  },
  {
    title: 'Motion',
    description: 'Duration + easing bundles for micro-interactions and overlays.',
    tokens: [
      { token: '--au-motion-tap', description: '80ms — button press feedback.' },
      {
        token: '--au-motion-control',
        description: '120ms — borders, backgrounds, shadows on fields.',
      },
      { token: '--au-motion-modal', description: '200ms — dialog backdrop and panel.' },
      { token: '--au-motion-toast', description: '300ms — snackbar enter/exit.' },
      { token: '--au-duration-short / default / slow', description: 'Primitive durations (ms).' },
      { token: '--au-ease-out / --au-ease-in-out', description: 'Animation curves.' },
      { token: '--au-transition-control', description: 'Bundle used on field shells.' },
      { token: '--au-transition-motion-tap', description: 'Bundle for button hover/active.' },
    ],
  },
  {
    title: 'Density (v2)',
    description: 'Set data-au-density on the shell; scales field heights and spacing.',
    tokens: [
      { token: 'data-au-density="compact"', description: 'Tighter fields and spacing scale.' },
      {
        token: 'data-au-density="comfortable"',
        description: 'Default — matches :root field sizes.',
      },
      { token: 'data-au-density="spacious"', description: 'Larger touch targets and gaps.' },
      { token: '--au-density-space-scale', description: 'Multiplier applied to spacing tokens.' },
      { token: '--au-size-field-h-md', description: 'Overridden per density preset.' },
    ],
  },
];
