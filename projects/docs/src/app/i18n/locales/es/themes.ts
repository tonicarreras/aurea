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
      {
        token: '--au-color-text-on-solid',
        description: 'Texto sobre botones y superficies invertidas.',
      },
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
      {
        token: '--au-size-field-h-sm / md / lg',
        description: 'Alturas de controles de formulario.',
      },
      { token: '--au-shadow-control', description: 'Sombra en reposo de shells de campo.' },
      {
        token: '--au-shadow-focus-control',
        description: 'Sombra de foco (profundidad + anillo) en campos.',
      },
    ],
  },
  {
    title: 'Semánticos',
    tokens: [
      { token: '--au-color-semantic-success', description: 'Éxito (snackbar, estados).' },
      { token: '--au-color-semantic-error', description: 'Error crítico.' },
      { token: '--au-color-semantic-warning', description: 'Advertencia.' },
      { token: '--au-color-semantic-info', description: 'Información.' },
      {
        token: '--au-color-semantic-*-surface',
        description: 'Fondos suaves emparejados a cada semántico.',
      },
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
    description: 'Escala de sombras de controles a overlays; z-index para UI en portal.',
    tokens: [
      { token: '--au-shadow-control', description: 'Campos, chips, badges, botones outline.' },
      { token: '--au-shadow-raised', description: 'Cards, messages, tablas.' },
      { token: '--au-shadow-float', description: 'Cards elevated y snackbars.' },
      { token: '--au-shadow-overlay', description: 'Diálogos, listbox, tooltips, menús.' },
      { token: '--au-shadow-button-primary', description: 'Sombra en reposo del botón primary.' },
      { token: '--au-shadow-button-hover', description: 'Elevación en hover de botones.' },
      {
        token: '--au-shadow-focus-control',
        description: 'Profundidad + anillo de foco en campos.',
      },
      { token: '--au-z-dropdown', description: 'Listas desplegables.' },
      { token: '--au-z-modal', description: 'Diálogos modales.' },
      { token: '--au-z-toast', description: 'Snackbars.' },
      { token: '--au-z-popover', description: 'Tooltips.' },
    ],
  },
  {
    title: 'Movimiento',
    description: 'Paquetes de duración + easing para micro-interacciones y overlays.',
    tokens: [
      { token: '--au-motion-tap', description: '80ms — feedback al pulsar botones.' },
      {
        token: '--au-motion-control',
        description: '120ms — bordes, fondos y sombras en campos.',
      },
      { token: '--au-motion-modal', description: '200ms — backdrop y panel de diálogo.' },
      { token: '--au-motion-toast', description: '300ms — entrada/salida de snackbar.' },
      { token: '--au-duration-short / default / slow', description: 'Duraciones primitivas (ms).' },
      { token: '--au-ease-out / --au-ease-in-out', description: 'Curvas de animación.' },
      { token: '--au-transition-control', description: 'Paquete usado en shells de campo.' },
      { token: '--au-transition-motion-tap', description: 'Paquete para hover/active de botones.' },
    ],
  },
  {
    title: 'Densidad (v2)',
    description: 'data-au-density en el shell; escala alturas de campo y espaciado.',
    tokens: [
      { token: 'data-au-density="compact"', description: 'Campos y espaciado más compactos.' },
      {
        token: 'data-au-density="comfortable"',
        description: 'Por defecto — coincide con tamaños en :root.',
      },
      { token: 'data-au-density="spacious"', description: 'Targets táctiles y gaps mayores.' },
      { token: '--au-density-space-scale', description: 'Multiplicador de tokens de espacio.' },
      { token: '--au-size-field-h-md', description: 'Sobrescrito por cada preset de densidad.' },
    ],
  },
];
