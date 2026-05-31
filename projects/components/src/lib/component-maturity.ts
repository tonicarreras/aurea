/** Nivel de madurez publicado para consumidores y documentación. */
export type ComponentMaturityLevel = 'stable' | 'beta' | 'experimental';

export interface ComponentMaturityMeta {
  level: ComponentMaturityLevel;
  /** Versión semver en la que se marcó este nivel. */
  since: string;
  /** Nota breve (inglés); la docs site puede traducir por nivel. */
  note?: string;
}

/**
 * Catálogo v1.x — actualizar al cambiar APIs o promover componentes.
 * @see projects/components/COMPONENT_DONE.md
 */
export const COMPONENT_MATURITY: Record<string, ComponentMaturityMeta> = {
  button: { level: 'stable', since: '0.1.0' },
  'form-field': { level: 'stable', since: '0.1.0' },
  'input-text': { level: 'stable', since: '0.1.0' },
  textarea: { level: 'stable', since: '0.2.0' },
  checkbox: { level: 'stable', since: '0.1.0' },
  switch: { level: 'stable', since: '0.2.0' },
  select: { level: 'stable', since: '0.2.0' },
  autocomplete: {
    level: 'stable',
    since: '1.5.0',
    note: 'Listbox overlay; test strictSelection in your flows.',
  },
  'radio-group': { level: 'stable', since: '0.2.0' },
  'input-number': { level: 'stable', since: '0.2.0' },
  'input-date': {
    level: 'stable',
    since: '1.5.0',
    note: 'Native date picker styling varies by browser.',
  },
  'input-time': {
    level: 'stable',
    since: '1.5.0',
    note: 'Native time picker styling varies by browser.',
  },
  dialog: { level: 'stable', since: '0.2.0' },
  card: { level: 'stable', since: '0.1.0' },
  tabs: { level: 'stable', since: '1.5.0' },
  steps: { level: 'stable', since: '1.5.0' },
  chip: { level: 'stable', since: '0.2.0' },
  'chip-group': { level: 'stable', since: '1.5.0' },
  list: { level: 'stable', since: '1.5.0' },
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
  menu: {
    level: 'stable',
    since: '0.9.0',
    note: 'Portaled panel; roving tabindex + typeahead (1.2.0).',
  },
  popover: { level: 'stable', since: '0.9.0' },
  table: {
    level: 'stable',
    since: '0.9.0',
    note: 'Shell + sort header; no built-in data source — bring your own rows.',
  },
};

export const COMPONENT_MATURITY_LEVELS: readonly ComponentMaturityLevel[] = [
  'stable',
  'beta',
  'experimental',
] as const;

export function getComponentMaturity(slug: string): ComponentMaturityMeta {
  return (
    COMPONENT_MATURITY[slug] ?? {
      level: 'experimental',
      since: '0.0.0',
      note: 'Undocumented maturity; treat as experimental until listed.',
    }
  );
}
