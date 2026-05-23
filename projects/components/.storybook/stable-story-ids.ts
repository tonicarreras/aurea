/**
 * Storybook story id prefixes for **stable** components (axe-core CI).
 * Slugs match folder names under src/lib/ and COMPONENT_MATURITY.
 */
export const STABLE_STORY_PREFIXES = [
  'aurea-badge--',
  'aurea-breadcrumb--',
  'aurea-button--',
  'aurea-card--',
  'aurea-checkbox--',
  'aurea-chip--',
  'aurea-dialog--',
  'aurea-divider--',
  'aurea-form-field--',
  'aurea-icon--',
  'aurea-input-number--',
  'aurea-inputtext--',
  'aurea-link--',
  'aurea-menu--',
  'aurea-message--',
  'aurea-popover--',
  'aurea-table--',
  'aurea-pagination--',
  'aurea-progress--',
  'aurea-radio-group--',
  'aurea-select--',
  'aurea-skeleton--',
  'aurea-snackbar--',
  'aurea-switch--',
  'aurea-textarea--',
  'aurea-tooltip--',
] as const;

export function isStableStoryId(storyId: string): boolean {
  return STABLE_STORY_PREFIXES.some((prefix) => storyId.startsWith(prefix));
}
