export interface DocsNavLink {
  path: string;
  label: string;
  /** When true, active only on exact URL (e.g. índice vs. /componentes/:slug). */
  exact?: boolean;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavLink[];
}

export const DOCS_NAV: DocsNavSection[] = [
  {
    title: 'Introducción',
    items: [
      { path: '/', label: 'Inicio' },
      { path: '/empezar', label: 'Empezar' },
      { path: '/temas', label: 'Temas y tokens' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { path: '/componentes', label: 'Índice', exact: true },
      { path: '/componentes/button', label: 'Button' },
      { path: '/componentes/input-text', label: 'Input text' },
      { path: '/componentes/textarea', label: 'Textarea' },
      { path: '/componentes/checkbox', label: 'Checkbox' },
      { path: '/componentes/switch', label: 'Switch' },
      { path: '/componentes/select', label: 'Select' },
      { path: '/componentes/autocomplete', label: 'Autocomplete' },
      { path: '/componentes/radio-group', label: 'Radio group' },
      { path: '/componentes/input-number', label: 'Input number' },
      { path: '/componentes/input-date', label: 'Input date' },
      { path: '/componentes/dialog', label: 'Dialog' },
      { path: '/componentes/card', label: 'Card' },
      { path: '/componentes/tabs', label: 'Tabs' },
      { path: '/componentes/chip', label: 'Chip' },
      { path: '/componentes/snackbar', label: 'Snackbar' },
      { path: '/componentes/divider', label: 'Divider' },
      { path: '/componentes/tooltip', label: 'Tooltip' },
    ],
  },
];
