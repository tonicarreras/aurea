import type { StoryDocsTokenRow } from './build-story-docs-overview';

/** First tokens per component (from docs styling reference). */
export const STORY_OVERVIEW_TOKENS: Partial<Record<string, StoryDocsTokenRow[]>> = {
  button: [
    { concern: 'Primary action', examples: '`--au-color-action-primary`, hover/pressed variants' },
    { concern: 'Focus', examples: '`--au-color-focus-ring`, `--au-shadow-focus-ring`' },
    { concern: 'Size', examples: '`--au-size-field-h-*`, `--au-touch-target-min` (lg)' },
  ],
  'form-field': [
    {
      concern: 'Label / hint / error',
      examples: '`--au-color-text-label`, `--au-color-form-error`, `--au-color-text-tertiary`',
    },
    { concern: 'Spacing', examples: '`--au-space-2`, `--au-text-sm`' },
  ],
  'input-text': [
    {
      concern: 'Field chrome',
      examples: '`--au-color-form-border`, `--au-color-surface-raised`, `--au-color-form-error-bg`',
    },
    { concern: 'Focus', examples: '`--au-color-focus-ring`, `--au-shadow-focus-ring`' },
  ],
  textarea: [
    { concern: 'Field shell', examples: '`--au-color-form-border`, `--au-radius-field`' },
    { concern: 'Min height', examples: '`--au-textarea-min-h-*`, `--au-textarea-pad-y`' },
  ],
  checkbox: [
    { concern: 'Box', examples: '`--au-checkbox-size-*`, `--au-color-action-primary`' },
    { concern: 'Focus', examples: '`--au-color-focus-ring`' },
  ],
  switch: [
    {
      concern: 'Track / thumb',
      examples: '`--au-color-switch-track-*`, `--au-color-action-primary`',
    },
  ],
  select: [
    {
      concern: 'Trigger / menu',
      examples: '`--au-color-select-menu-bg`, `--au-shadow-overlay`, `--au-z-dropdown`',
    },
  ],
  autocomplete: [
    {
      concern: 'Combobox',
      examples: '`--au-color-select-menu-bg`, `--au-shadow-overlay`, `--au-z-dropdown`',
    },
  ],
  'radio-group': [
    { concern: 'Group shell', examples: '`--au-color-form-border`, `--au-color-action-primary`' },
  ],
  'input-number': [
    {
      concern: 'Field',
      examples: '`--au-color-form-border`, `--au-color-action-primary` (steppers)',
    },
  ],
  'input-date': [
    { concern: 'Native picker', examples: '`--au-color-form-border`, `--au-radius-field`' },
  ],
  dialog: [
    {
      concern: 'Modal',
      examples: '`--au-color-surface-inverted` (backdrop), `--au-z-modal`, `--au-shadow-overlay`',
    },
  ],
  card: [
    {
      concern: 'Surface',
      examples: '`--au-color-surface-raised`, `--au-shadow-raised`, `--au-radius-lg`',
    },
    { concern: 'Layout', examples: '`--au-card-padding`, `--au-card-main-gap`' },
  ],
  tabs: [{ concern: 'Tabs', examples: '`--au-color-action-primary`, `--au-color-border-subtle`' }],
  chip: [{ concern: 'Surface', examples: '`--au-color-surface-elevated`, `--au-radius-sm`' }],
  snackbar: [
    {
      concern: 'Toast',
      examples: '`--au-z-toast`, `--au-shadow-raised`, semantic feedback tokens',
    },
  ],
  'chip-group': [{ concern: 'Layout', examples: '`--au-space-2`, `--au-color-focus-ring`' }],
  list: [{ concern: 'Layout', examples: '`--au-space-2`, `--au-color-focus-ring`' }],
  message: [
    { concern: 'Variants', examples: '`--au-message-bg`, `--au-message-border`, feedback tokens' },
  ],
  icon: [
    { concern: 'Glyph', examples: '`data-au-icon`, `data-au-size`, `--au-color-text-primary`' },
  ],
  skeleton: [
    {
      concern: 'Placeholder',
      examples: '`--au-color-skeleton-base`, `--au-color-skeleton-shimmer`',
    },
  ],
  steps: [{ concern: 'Rail', examples: '`--au-color-border-subtle`, `--au-color-action-primary`' }],
  divider: [
    {
      concern: 'Rule',
      examples: '`--au-color-border-subtle`, `--au-color-text-secondary` (label)',
    },
  ],
  badge: [{ concern: 'Shape', examples: '`--au-radius-pill`, `--au-text-xs`, semantic surfaces' }],
  breadcrumb: [{ concern: 'Trail', examples: '`--au-color-link`, `--au-shadow-focus-ring`' }],
  link: [{ concern: 'Link', examples: '`--au-color-link`, `--au-color-link-hover`' }],
  menu: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-shadow-overlay`, `--au-z-dropdown`',
    },
  ],
  popover: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-radius-md`, `--au-z-dropdown`',
    },
  ],
  pagination: [{ concern: 'Layout', examples: '`--au-space-2`, `--au-text-sm`' }],
  progress: [
    { concern: 'Bar', examples: '`--au-color-surface-sunken`, `--au-color-action-primary`' },
  ],
  table: [
    {
      concern: 'Table',
      examples: '`--au-color-surface-raised`, `--au-color-border-subtle`, `--au-text-sm`',
    },
  ],
  tooltip: [
    {
      concern: 'Bubble',
      examples: '`--au-color-surface-inverted`, `--au-shadow-overlay`, `--au-z-popover`',
    },
  ],
};
