import { L, type LStr } from '../core/docs-locale';

/** Localized component summaries keyed by slug. */
export const COMPONENT_SUMMARIES: Record<string, LStr> = {
  button: L(
    'Primary and secondary actions with variants, loading states, and an accessible focus ring.',
    'Acciones principales y secundarias con variantes, estados de carga y anillo de foco accesible.',
  ),
  'form-field': L(
    'Shared label, hint, and error chrome around projected inputs; wires ids and ARIA via `AU_FORM_FIELD`.',
    'Cromado compartido de label, hint y error; enlaza ids y ARIA vía `AU_FORM_FIELD`.',
  ),
  'input-text': L(
    'Single-line control inside `au-form-field`; signal forms via `formField`.',
    'Control de una línea dentro de `au-form-field`; signal forms con `formField`.',
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
  'chip-group': L(
    'Accessible `role="group"` wrapper for selectable filter chips.',
    'Contenedor `role="group"` para chips de filtro seleccionables.',
  ),
  list: L(
    'Accessible `role="list"` for removable tags or custom list items.',
    'Contenedor `role="list"` para etiquetas removibles o ítems personalizados.',
  ),
  snackbar: L(
    'Transient messages with optional action and auto-dismiss.',
    'Mensajes transitorios con acción opcional y auto-cierre.',
  ),
  message: L(
    'Inline callout with semantic variants, optional icon, and dismiss.',
    'Aviso inline con variantes semánticas, icono opcional y cierre.',
  ),
  icon: L(
    'Shared SVG glyphs (decorative); used in message, chips, and buttons.',
    'Glifos SVG compartidos (decorativos); usados en message, chips y botones.',
  ),
  skeleton: L(
    'Loading placeholders (text, avatar, button) with pulse or wave.',
    'Placeholders de carga (texto, avatar, botón) con pulse o wave.',
  ),
  steps: L(
    'Documentation stepper with `auStep` / `auStepPanel` and keyboard nav.',
    'Stepper de documentación con `auStep` / `auStepPanel` y teclado.',
  ),
  divider: L(
    'Horizontal or vertical rules with optional inset and label.',
    'Reglas horizontales o verticales con sangría y etiqueta opcionales.',
  ),
  tooltip: L(
    'Directive on a focusable trigger; positions with collision handling.',
    'Directiva en disparador enfocable; posiciona con detección de colisiones.',
  ),
  badge: L('Status or count label with semantic variants and dot mode.', 'Etiqueta de estado o contador con variantes semánticas y modo dot.'),
  progress: L('Determinate or indeterminate progressbar.', 'Barra de progreso determinada o indeterminada.'),
  breadcrumb: L('Hierarchical navigation trail with optional links.', 'Ruta jerárquica con enlaces opcionales.'),
  pagination: L('Previous/next and numbered page controls (1-based).', 'Controles de página anterior/siguiente y numeración (base 1).'),
  link: L('Inline link styled with Aurea token colors.', 'Enlace inline con colores de tokens Aurea.'),
  menu: L('Dropdown menu with portaled panel and menu items.', 'Menú desplegable con panel en portal e ítems de acción.'),
  popover: L('Anchored panel for filters or compact content.', 'Panel anclado para filtros o contenido compacto.'),
  table: L('Table shell with striped/compact modes and sortable headers.', 'Tabla con modos striped/compact y cabeceras ordenables.'),
};
