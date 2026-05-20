import { L, type LStr } from '../core/docs-locale';

/** Localized component summaries keyed by slug. */
export const COMPONENT_SUMMARIES: Record<string, LStr> = {
  button: L(
    'Primary and secondary actions with variants, loading states, and an accessible focus ring.',
    'Acciones principales y secundarias con variantes, estados de carga y anillo de foco accesible.',
  ),
  'input-text': L(
    'Single-line field with label, hint, error, and signal forms support (`formField`).',
    'Campo de una línea con etiqueta, hint, error y soporte para signal forms (`formField`).',
  ),
  textarea: L(
    'Multi-line text with the same visual grammar as other fields.',
    'Texto multilínea con la misma gramática visual que el resto de campos.',
  ),
  checkbox: L(
    'Boolean selection with indeterminate state and optional description.',
    'Selección booleana con estado indeterminado y descripción opcional.',
  ),
  switch: L(
    'Toggle on/off settings with switch role and associated label.',
    'Alternar configuraciones on/off con rol de switch y etiqueta asociada.',
  ),
  select: L(
    'Dropdown with portaled listbox and full keyboard support.',
    'Lista desplegable con listbox en portal y teclado completo.',
  ),
  autocomplete: L(
    'Search with filtering and the same field surface as select.',
    'Búsqueda con filtrado y misma superficie de campo que select.',
  ),
  'radio-group': L(
    'Single choice among related options.',
    'Elección única entre opciones relacionadas.',
  ),
  'input-number': L(
    'Numeric input with optional steppers and formatting.',
    'Entrada numérica con steppers y formato opcionales.',
  ),
  'input-date': L(
    'Date field with native picker and shared field chrome.',
    'Campo de fecha con selector nativo y cromado de campo compartido.',
  ),
  dialog: L(
    'Modal dialog with focus trap, backdrop, and projected actions.',
    'Diálogo modal con trampa de foco, backdrop y acciones proyectadas.',
  ),
  card: L(
    'Content container with header, body, and footer projection.',
    'Contenedor con proyección de cabecera, cuerpo y pie.',
  ),
  tabs: L(
    'Tabbed regions with keyboard navigation and `au-tab-panel`.',
    'Regiones con pestañas, teclado y `au-tab-panel`.',
  ),
  chip: L(
    'Compact labels; removable or selectable variants.',
    'Etiquetas compactas; variantes removibles o seleccionables.',
  ),
  snackbar: L(
    'Transient messages with optional action and auto-dismiss.',
    'Mensajes transitorios con acción opcional y auto-cierre.',
  ),
  divider: L(
    'Horizontal or vertical rules with optional inset and label.',
    'Reglas horizontales o verticales con sangría y etiqueta opcionales.',
  ),
  tooltip: L(
    'Directive on a focusable trigger; positions with collision handling.',
    'Directiva en disparador enfocable; posiciona con detección de colisiones.',
  ),
};
