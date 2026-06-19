/**
 * Shared spacing scale for layout gap/padding. One source of truth so a given
 * token means the same distance in Stack, Cluster, Split, and Section.
 */
export type AuSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const SPACING_VALUES: Record<AuSpacing, string> = {
  none: '0',
  xs: 'var(--au-space-1)',
  sm: 'var(--au-space-2)',
  md: 'var(--au-space-3)',
  lg: 'var(--au-space-4)',
  xl: 'var(--au-space-6)',
  '2xl': 'var(--au-space-8)',
};

export function auSpacingValue(spacing: AuSpacing): string {
  return SPACING_VALUES[spacing];
}

/** Layout alias — same scale as {@link AuSpacing}. */
export type AuLayoutGap = AuSpacing;

/** Section/container padding alias — same scale. */
export type AuLayoutPadding = AuSpacing;
