/**
 * Storybook story id prefixes for **stable** components (axe-core CI).
 * Slugs match folder names under src/lib/ and COMPONENT_MATURITY.
 */
export const STABLE_STORY_PREFIXES = [
  'aurea-accordion--',
  'aurea-avatar--',
  'aurea-badge--',
  'aurea-breadcrumb--',
  'aurea-button--',
  'aurea-card--',
  'aurea-checkbox--',
  'aurea-chip--',
  'aurea-dialog--',
  'aurea-divider--',
  'aurea-drawer--',
  'aurea-emptystate--',
  'aurea-fieldset--',
  'aurea-fileupload--',
  'aurea-formfield--',
  'aurea-icon--',
  'aurea-inputdate--',
  'aurea-inputnumber--',
  'aurea-inputtime--',
  'aurea-inputtext--',
  'aurea-link--',
  'aurea-menu--',
  'aurea-message--',
  'aurea-popover--',
  'aurea-table--',
  'aurea-pagination--',
  'aurea-progress--',
  'aurea-radiogroup--',
  'aurea-select--',
  'aurea-skeleton--',
  'aurea-slider--',
  'aurea-snackbar--',
  'aurea-spinner--',
  'aurea-switch--',
  'aurea-textarea--',
  'aurea-tooltip--',
] as const;

export function isStableStoryId(storyId: string): boolean {
  return STABLE_STORY_PREFIXES.some((prefix) => storyId.startsWith(prefix));
}
