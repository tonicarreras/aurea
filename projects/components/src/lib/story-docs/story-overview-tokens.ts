import type { StoryDocsTokenRow } from './build-story-docs-overview';

/** First tokens per component (from docs styling reference). */
export const STORY_OVERVIEW_TOKENS: Partial<Record<string, StoryDocsTokenRow[]>> = {
  button: [
    { concern: 'Primary action', examples: '`--au-color-action-primary`, hover/pressed variants' },
    { concern: 'Focus', examples: '`--au-focus-tactile`, `--au-focus-tab`' },
    {
      concern: 'Elevation',
      examples: '`--au-elevation-tactile`, `--au-elevation-tactile-primary`',
    },
    { concern: 'Size', examples: '`--au-size-field-h-*`, `--au-touch-target-min` (lg)' },
  ],
  'form-field': [
    {
      concern: 'Label / hint / error',
      examples: '`--au-color-text-label`, `--au-color-form-error`, `--au-color-text-tertiary`',
    },
    { concern: 'Spacing', examples: '`--au-space-2`, `--au-text-sm`' },
  ],
  fieldset: [
    { concern: 'Legend', examples: '`--au-fieldset-legend-size`, `--au-color-text-primary`' },
  ],
  'file-upload': [
    { concern: 'Dropzone', examples: '`--au-color-surface-sunken`, `--au-color-border-subtle`' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  'input-text': [
    {
      concern: 'Field chrome',
      examples: '`--au-chrome-border`, `--au-elevation-flat`, `--au-color-form-error-bg`',
    },
    { concern: 'Focus', examples: '`--au-focus-inset`, `--au-focus-tab`' },
  ],
  textarea: [
    { concern: 'Field shell', examples: '`--au-chrome-border`, `--au-radius-field`' },
    {
      concern: 'Min height & padding',
      examples: '`--au-textarea-min-h-*`, `--au-textarea-pad-block`, `--au-textarea-pad-inline`',
    },
  ],
  checkbox: [
    { concern: 'Box', examples: '`--au-checkbox-size-*`, `--au-color-action-primary`' },
    { concern: 'Focus', examples: '`--au-focus-inset`, `--au-focus-tab`' },
  ],
  switch: [
    {
      concern: 'Track / thumb',
      examples: '`--au-color-switch-track-*`, `--au-color-action-primary`',
    },
    { concern: 'Focus', examples: '`--au-focus-inset`, `--au-focus-tab`' },
  ],
  select: [
    {
      concern: 'Trigger / menu',
      examples: '`--au-color-listbox-menu-bg`, `--au-elevation-overlay`, `--au-z-dropdown`',
    },
  ],
  autocomplete: [
    {
      concern: 'Combobox',
      examples: '`--au-color-listbox-menu-bg`, `--au-elevation-overlay`, `--au-z-dropdown`',
    },
  ],
  accordion: [
    {
      concern: 'Contained shell',
      examples: '`--au-color-surface-raised`, `--au-chrome-border`, `--au-elevation-flat`',
    },
    { concern: 'Sections', examples: '`--au-color-border-subtle`' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  'radio-group': [
    { concern: 'Group shell', examples: '`--au-color-form-border`, `--au-color-action-primary`' },
    { concern: 'Focus', examples: '`--au-focus-inset`, `--au-focus-tab`' },
  ],
  'input-number': [
    {
      concern: 'Field',
      examples: '`--au-color-form-border`, `--au-color-action-primary` (steppers)',
    },
  ],
  slider: [
    { concern: 'Track', examples: '`--au-color-action-primary`, `--au-slider-fill`' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  'input-date': [
    { concern: 'Native picker', examples: '`--au-color-form-border`, `--au-radius-field`' },
  ],
  dialog: [
    {
      concern: 'Modal',
      examples:
        '`--au-color-surface-inverted` (backdrop), `--au-z-modal`, `--au-elevation-overlay`',
    },
  ],
  card: [
    {
      concern: 'Surface',
      examples: '`--au-color-surface-raised`, `--au-elevation-flat`, `--au-radius-surface`',
    },
    { concern: 'Layout', examples: '`--au-card-padding`, `--au-card-main-gap`' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  tabs: [
    { concern: 'Tabs', examples: '`--au-color-action-primary`, `--au-color-border-subtle`' },
    { concern: 'Focus', examples: '`--au-focus-tab`, `--au-focus-tab-offset-loose`' },
  ],
  chip: [
    { concern: 'Surface', examples: '`--au-color-surface-elevated`, `--au-elevation-flat`' },
    { concern: 'Focus', examples: '`--au-focus-inset`, `--au-focus-tab`' },
  ],
  snackbar: [
    {
      concern: 'Toast',
      examples: '`--au-z-toast`, `--au-elevation-raised`, semantic feedback tokens',
    },
  ],
  'chip-group': [{ concern: 'Layout', examples: '`--au-space-2`, `--au-focus-inset`' }],
  list: [{ concern: 'Layout', examples: '`--au-space-2`, `--au-focus-inset`' }],
  message: [
    { concern: 'Variants', examples: '`--au-message-bg`, `--au-message-border`, feedback tokens' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
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
  steps: [
    { concern: 'Rail', examples: '`--au-color-border-subtle`, `--au-color-action-primary`' },
    { concern: 'Focus', examples: '`--au-focus-tab`' },
  ],
  divider: [
    {
      concern: 'Rule',
      examples: '`--au-color-border-subtle`, `--au-color-text-secondary` (label)',
    },
  ],
  badge: [
    {
      concern: 'Shape',
      examples: '`--au-radius-full`, `--au-text-xs`, `--au-elevation-flat`, semantic surfaces',
    },
  ],
  breadcrumb: [{ concern: 'Trail', examples: '`--au-color-link`, `--au-focus-inset`' }],
  link: [
    { concern: 'Link', examples: '`--au-color-link`, `--au-color-link-hover`' },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  menu: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-elevation-overlay`, `--au-z-dropdown`',
    },
  ],
  popover: [
    {
      concern: 'Panel',
      examples: '`--au-color-surface-elevated`, `--au-elevation-floating`, `--au-z-dropdown`',
    },
  ],
  pagination: [{ concern: 'Layout', examples: '`--au-space-2`, `--au-text-sm`' }],
  progress: [
    { concern: 'Bar', examples: '`--au-color-surface-sunken`, `--au-color-action-primary`' },
  ],
  table: [
    {
      concern: 'Table',
      examples: '`--au-color-surface-raised`, `--au-elevation-flat`, `--au-text-sm`',
    },
    { concern: 'Focus', examples: '`--au-focus-inset`' },
  ],
  tooltip: [
    {
      concern: 'Bubble',
      examples: '`--au-color-surface-inverted`, `--au-elevation-overlay`, `--au-z-popover`',
    },
  ],
};
