/** All registered `au-icon` glyph names (stable API surface). */
export const AU_ICON_NAMES = [
  'check-circle',
  'check',
  'warning',
  'error',
  'info',
  'close',
  'spinner',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'sort-asc',
  'sort-desc',
  'sort-neutral',
  'calendar',
  'clock',
  'search',
  'plus',
  'minus',
  'eye',
  'eye-off',
  'menu',
  'more-vertical',
  'arrow-left',
  'arrow-right',
] as const;

export type AuIconName = (typeof AU_ICON_NAMES)[number];

export type AuIconSize = 'xs' | 'sm' | 'md' | 'lg';
