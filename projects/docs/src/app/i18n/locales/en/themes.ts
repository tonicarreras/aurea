import type { ThemeTokenGroup } from '../../types/themes';

export const THEME_TOKEN_GROUPS_EN: ThemeTokenGroup[] = [
  {
    title: 'Surfaces',
    description: 'Background hierarchy in light and dark mode.',
    tokens: [
      { token: '--au-color-surface-canvas', description: 'Page and app shell background.' },
      { token: '--au-color-surface-raised', description: 'Panels, fields, and raised cards.' },
      { token: '--au-color-surface-elevated', description: 'Hover and slightly higher layers.' },
      { token: '--au-color-surface-sunken', description: 'Rails, inset backgrounds, contained tabs.' },
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
      { token: '--au-radius-field', description: 'Field corner radius (2px default).' },
      { token: '--au-size-field-h-sm / md / lg', description: 'Form control heights.' },
      { token: '--au-shadow-focus-ring', description: 'Field focus shadow.' },
    ],
  },
  {
    title: 'Semantic',
    tokens: [
      { token: '--au-color-semantic-success', description: 'Success (snackbar, states).' },
      { token: '--au-color-semantic-error', description: 'Critical error.' },
      { token: '--au-color-semantic-warning', description: 'Warning.' },
      { token: '--au-color-semantic-info', description: 'Information.' },
      { token: '--au-color-semantic-*-surface', description: 'Soft backgrounds paired to each semantic.' },
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
    title: 'Elevation & layers',
    tokens: [
      { token: '--au-shadow-raised', description: 'Elevated cards.' },
      { token: '--au-shadow-overlay', description: 'Dialogs, listbox, tooltips.' },
      { token: '--au-z-dropdown', description: 'Dropdown lists.' },
      { token: '--au-z-modal', description: 'Modal dialogs.' },
      { token: '--au-z-toast', description: 'Snackbars.' },
      { token: '--au-z-popover', description: 'Tooltips.' },
    ],
  },
  {
    title: 'Motion',
    tokens: [
      { token: '--au-duration-short', description: '120ms — hover and borders.' },
      { token: '--au-duration-default', description: '200ms — panels and snackbar.' },
      { token: '--au-ease-out / --au-ease-in-out', description: 'Animation curves.' },
      { token: '--au-transition-control', description: 'Bundle used on field shells.' },
    ],
  },
];