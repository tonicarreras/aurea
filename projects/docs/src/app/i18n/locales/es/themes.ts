import type { ThemeTokenGroup } from '../../types/themes';

export const THEME_TOKEN_GROUPS_ES: ThemeTokenGroup[] = [
  {
    title: 'Superficies',
    description: 'Jerarquía de fondos en modo claro y oscuro.',
    tokens: [
      { token: '--au-color-surface-canvas', description: 'Fondo de página y shell de la app.' },
      { token: '--au-color-surface-raised', description: 'Paneles, campos y tarjetas elevadas.' },
      { token: '--au-color-surface-elevated', description: 'Hover y capas ligeramente más altas.' },
      { token: '--au-color-surface-sunken', description: 'Rieles, fondos inset y tabs contained.' },
      { token: '--au-color-surface-inverted', description: 'Tooltips, backdrop de diálogo.' },
    ],
  },
  {
    title: 'Texto',
    tokens: [
      { token: '--au-color-text-primary', description: 'Cuerpo y títulos principales.' },
      { token: '--au-color-text-secondary', description: 'Texto de apoyo y pestañas inactivas.' },
      { token: '--au-color-text-tertiary', description: 'Hints y metadatos (contraste AA).' },
      { token: '--au-color-text-label', description: 'Etiquetas de formulario.' },
      { token: '--au-color-text-on-solid', description: 'Texto sobre botones y superficies invertidas.' },
      { token: '--au-color-text-disabled', description: 'Controles deshabilitados.' },
    ],
  },
  {
    title: 'Bordes y acciones',
    tokens: [
      { token: '--au-color-border-subtle', description: 'Separadores y contornos discretos.' },
      { token: '--au-color-border-default', description: 'Bordes estándar de controles.' },
      { token: '--au-color-border-strong', description: 'Énfasis y estados hover de borde.' },
      { token: '--au-color-action-primary', description: 'Acento principal, foco y enlaces.' },
      { token: '--au-color-action-primary-hover', description: 'Hover del acento.' },
      { token: '--au-color-action-primary-pressed', description: 'Estado activo/pulsado.' },
      { token: '--au-color-link', description: 'Enlaces en texto y acciones de snackbar.' },
      { token: '--au-color-focus-ring', description: 'Anillo de foco (no confundir con error).' },
    ],
  },
  {
    title: 'Formularios (compartidos)',
    description: 'Usados por input, select, checkbox y el resto de campos.',
    tokens: [
      { token: '--au-color-form-border', description: 'Borde del shell del campo.' },
      { token: '--au-color-form-border-hover', description: 'Hover del borde.' },
      { token: '--au-color-form-text', description: 'Valor escrito.' },
      { token: '--au-color-form-placeholder', description: 'Placeholder nativo.' },
      { token: '--au-color-form-error', description: 'Borde y texto de error.' },
      { token: '--au-color-form-error-bg', description: 'Fondo del shell inválido.' },
      { token: '--au-color-form-disabled-surface', description: 'Fondo deshabilitado.' },
      { token: '--au-radius-field', description: 'Radio de campos (2px por defecto).' },
      { token: '--au-size-field-h-sm / md / lg', description: 'Alturas de controles de formulario.' },
      { token: '--au-shadow-focus-ring', description: 'Sombra de foco en campos.' },
    ],
  },
  {
    title: 'Semánticos',
    tokens: [
      { token: '--au-color-semantic-success', description: 'Éxito (snackbar, estados).' },
      { token: '--au-color-semantic-error', description: 'Error crítico.' },
      { token: '--au-color-semantic-warning', description: 'Advertencia.' },
      { token: '--au-color-semantic-info', description: 'Información.' },
      { token: '--au-color-semantic-*-surface', description: 'Fondos suaves emparejados a cada semántico.' },
    ],
  },
  {
    title: 'Tipografía y espaciado',
    tokens: [
      { token: '--au-font-sans', description: 'Familia UI por defecto.' },
      { token: '--au-font-mono', description: 'Código y datos tabulares.' },
      { token: '--au-text-xs … --au-text-xl', description: 'Escala tipográfica.' },
      { token: '--au-space-1 … --au-space-12', description: 'Escala de espaciado (rem).' },
      { token: '--au-radius-sm … --au-radius-lg', description: 'Radios de componentes y chips.' },
      { token: '--au-touch-target-min', description: 'Mínimo 44px (WCAG 2.5.5).' },
    ],
  },
  {
    title: 'Elevación y capas',
    tokens: [
      { token: '--au-shadow-raised', description: 'Tarjetas elevated.' },
      { token: '--au-shadow-overlay', description: 'Diálogos, listbox y tooltips.' },
      { token: '--au-z-dropdown', description: 'Listas desplegables.' },
      { token: '--au-z-modal', description: 'Diálogos modales.' },
      { token: '--au-z-toast', description: 'Snackbars.' },
      { token: '--au-z-popover', description: 'Tooltips.' },
    ],
  },
  {
    title: 'Movimiento',
    tokens: [
      { token: '--au-duration-short', description: '120ms — hover y bordes.' },
      { token: '--au-duration-default', description: '200ms — paneles y snackbar.' },
      { token: '--au-ease-out / --au-ease-in-out', description: 'Curvas de animación.' },
      { token: '--au-transition-control', description: 'Paquete usado en shells de campo.' },
    ],
  },
];