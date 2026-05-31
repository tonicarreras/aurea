/**
 * Docs-side maturity map — keep in sync with
 * `projects/components/src/lib/component-maturity.ts`.
 * Local copy avoids pulling the full component catalog into the index chunk.
 */
export type DocsComponentMaturityLevel = 'stable' | 'beta' | 'experimental';

export interface DocsComponentMaturityMeta {
  level: DocsComponentMaturityLevel;
  since: string;
}

const MATURITY: Record<string, DocsComponentMaturityMeta> = {
  button: { level: 'stable', since: '0.1.0' },
  'form-field': { level: 'stable', since: '0.1.0' },
  'input-text': { level: 'stable', since: '0.1.0' },
  textarea: { level: 'stable', since: '0.2.0' },
  checkbox: { level: 'stable', since: '0.1.0' },
  switch: { level: 'stable', since: '0.2.0' },
  select: { level: 'stable', since: '0.2.0' },
  autocomplete: { level: 'beta', since: '0.2.0' },
  'radio-group': { level: 'stable', since: '0.2.0' },
  'input-number': { level: 'stable', since: '0.2.0' },
  'input-date': { level: 'beta', since: '0.2.0' },
  dialog: { level: 'stable', since: '0.2.0' },
  card: { level: 'stable', since: '0.1.0' },
  tabs: { level: 'beta', since: '0.2.0' },
  steps: { level: 'beta', since: '0.3.0' },
  chip: { level: 'stable', since: '0.2.0' },
  'chip-group': { level: 'beta', since: '0.2.0' },
  list: { level: 'beta', since: '0.2.0' },
  snackbar: { level: 'stable', since: '0.2.0' },
  message: { level: 'stable', since: '0.1.0' },
  icon: { level: 'stable', since: '0.1.0' },
  skeleton: { level: 'stable', since: '0.2.0' },
  spinner: { level: 'stable', since: '1.0.0' },
  divider: { level: 'stable', since: '0.1.0' },
  'empty-state': { level: 'stable', since: '1.2.0' },
  accordion: { level: 'stable', since: '1.2.0' },
  fieldset: { level: 'stable', since: '1.2.0' },
  slider: { level: 'stable', since: '1.2.0' },
  'file-upload': { level: 'stable', since: '1.2.0' },
  avatar: { level: 'stable', since: '1.4.0' },
  drawer: { level: 'stable', since: '1.4.0' },
  tooltip: { level: 'stable', since: '0.2.0' },
  badge: { level: 'stable', since: '0.4.0' },
  progress: { level: 'stable', since: '0.4.0' },
  breadcrumb: { level: 'stable', since: '0.4.0' },
  pagination: { level: 'stable', since: '0.4.0' },
  link: { level: 'stable', since: '0.4.0' },
  menu: { level: 'stable', since: '0.9.0' },
  popover: { level: 'stable', since: '0.9.0' },
  table: { level: 'stable', since: '0.9.0' },
};

export function getDocsComponentMaturity(slug: string): DocsComponentMaturityMeta {
  return MATURITY[slug] ?? { level: 'experimental', since: '0.0.0' };
}

/** All slugs with documented maturity (for the public matrix page). */
export function listDocsMaturityEntries(): { slug: string; meta: DocsComponentMaturityMeta }[] {
  return Object.entries(MATURITY)
    .map(([slug, meta]) => ({ slug, meta }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
