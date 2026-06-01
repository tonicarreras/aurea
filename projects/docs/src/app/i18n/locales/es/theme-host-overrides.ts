import type { ThemeHostOverride } from '../../types/themes';

export const THEME_HOST_OVERRIDES_ES: ThemeHostOverride[] = [
  {
    host: 'au-card',
    token: '--au-card-padding',
    description: 'Padding interior; `size` en el host define presets sm/md/lg.',
  },
  {
    host: 'au-card',
    token: '--au-card-main-gap',
    description: 'Separación entre cabecera y cuerpo.',
  },
  {
    host: 'au-card',
    token: '--au-card-footer-gap',
    description: 'Espaciado del footer y borde superior.',
  },
  {
    host: 'au-table',
    token: '--au-table-row-hover',
    description: 'Fondo de fila al pasar el ratón.',
  },
  {
    host: 'au-table',
    token: '--au-table-row-stripe',
    description: 'Fondo alterno cuando `striped` está activo.',
  },
  {
    host: 'au-table',
    token: '--au-table-header-bg',
    description: 'Fondo de la fila de cabecera.',
  },
  {
    host: 'au-table',
    token: '--au-table-cell-x / --au-table-cell-y',
    description: 'Padding de celdas; `[data-au-compact]` reduce ambos.',
  },
  {
    host: 'au-message',
    token: '--au-message-bg / --au-message-border',
    description: 'Colores de superficie; la variante define valores por defecto.',
  },
  {
    host: 'au-message',
    token: '--au-message-accent / --au-message-title',
    description: 'Acento del icono y color del título en el host.',
  },
  {
    host: 'au-textarea',
    token: '--au-textarea-min-h-md',
    description: 'Altura mínima; `size` en el host ajusta presets sm/md/lg.',
  },
  {
    host: 'au-textarea',
    token: '--au-textarea-pad-block',
    description: 'Padding vertical del textarea nativo.',
  },
  {
    host: 'au-textarea',
    token: '--au-textarea-pad-inline',
    description: 'Padding horizontal; alinea con presets de `size`.',
  },
  {
    host: 'au-accordion',
    token: 'data-au-variant',
    description: '`plain` (por defecto) o `contained` para superficie elevada.',
  },
];
