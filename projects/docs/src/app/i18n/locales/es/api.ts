import type { ComponentApiEntry, ResolvedComponentApi } from '../../../core/component-docs.registry';

const i = (
  name: string,
  type: string,
  description: string,
  defaultValue?: string,
): ComponentApiEntry => ({ name, type, description, defaultValue, kind: 'input' });

const m = (
  name: string,
  type: string,
  description: string,
  defaultValue?: string,
): ComponentApiEntry => ({ name, type, description, defaultValue, kind: 'model' });

const o = (name: string, type: string, description: string): ComponentApiEntry => ({
  name,
  type,
  description,
  kind: 'output',
});

const FORM_FIELD_CHROME: ComponentApiEntry[] = [
  i('label', 'string', 'Etiqueta visible (`<label for>`). En radio group: `<legend>`.', "''"),
  i('hint', 'string', 'Texto de ayuda bajo el control.', "''"),
  i('errorMessage', 'string', 'Error manual si el hijo no tiene mensaje de signal forms.', "''"),
  i('invalid', 'boolean', 'Fuerza estado inválido.', 'false'),
  i('required', 'boolean', 'Marcador obligatorio en label/legend.', 'false'),
  i('showRequired', 'boolean', 'Muestra asterisco si `required`.', 'true'),
  i('controlIdInput', 'string', 'Id estable del control; autogenerado si vacío.', "''"),
];

const VALUE_FIELD_BASE: ComponentApiEntry[] = [
  m('value', 'ModelSignal<string | null>', 'Valor del campo; vacío ↔ `null`.'),
  i('errors', 'ValidationError[]', 'Errores desde signal forms (`formField`).', '[]'),
  i('invalid', 'boolean', 'Marca el control inválido.', 'false'),
  i('disabled', 'boolean', 'Desactiva edición.', 'false'),
  i('readOnly', 'boolean', 'Solo lectura.', 'false'),
  i('required', 'boolean', '`required` y `aria-required` en el control.', 'false'),
  i('name', 'string', 'Atributo `name` nativo.', "''"),
  i('placeholder', 'string', 'Placeholder.', "''"),
  i('size', "'sm' | 'md' | 'lg'", 'Densidad (`data-au-size`).', "'md'"),
  o('blur', 'void', 'Al perder foco el control nativo.'),
  o('valueChange', 'string | null', 'Cada evento `input` si no está disabled.'),
];

export const COMPONENT_DOC_API_ES: Record<string, ResolvedComponentApi> = {
  button: {
    importNames: ['AuButton'],
    sections: [
      {
        title: 'AuButton',
        rows: [
          i('variant', "'primary' | 'secondary' | 'outline' | 'ghost'", 'Estilo visual.', "'primary'"),
          i('size', "'sm' | 'md' | 'lg'", 'Altura y padding; `lg` ≥ 44px.', "'md'"),
          i('disabled', 'boolean', 'Desactiva el botón.', 'false'),
          i('loading', 'boolean', 'Spinner y `aria-busy`; bloquea click.', 'false'),
          i('type', "'button' | 'submit' | 'reset'", 'Tipo nativo.', "'button'"),
          i('name', 'string', 'Atributo `name` para envío de formulario.', "''"),
          i('label', 'string', 'Texto accesible si el contenido es solo icono.', "''"),
          o('click', 'MouseEvent', 'Click si no está disabled ni loading.'),
        ],
      },
    ],
  },
  'form-field': {
    importNames: ['AuFormField'],
    sections: [
      {
        title: 'AuFormField',
        description:
          'Envuelve controles proyectados (`au-input-text`, `au-select`, …). Provee `AU_FORM_FIELD` para ids y cromado de validación.',
        rows: FORM_FIELD_CHROME,
      },
    ],
  },
  'input-text': {
    importNames: ['AuFormField', 'AuInputText'],
    sections: [
      {
        title: 'AuInputText',
        description:
          'Proyecta dentro de `au-form-field`. Implementa `FormValueControl<string | null>`. Enlaza `[formField]` o `[(value)]`.',
        rows: [
          ...VALUE_FIELD_BASE,
          i('type', "'text' | 'password' | 'email' | …", 'Tipo nativo del `<input>`.', "'text'"),
          i('autocomplete', 'string | undefined', 'Atributo `autocomplete`.'),
          i('minLength', 'number | undefined', 'Validación nativa `minlength`.'),
          i('maxLength', 'number | undefined', 'Validación nativa `maxlength`.'),
          i('showPasswordToggle', 'boolean', 'Botón mostrar/ocultar si `type="password"`.', 'true'),
        ],
      },
    ],
  },
  textarea: {
    importNames: ['AuFormField', 'AuTextarea'],
    sections: [
      {
        title: 'AuTextarea',
        description: 'Proyecta dentro de `au-form-field`. Implementa `FormValueControl<string | null>`.',
        rows: [
          ...VALUE_FIELD_BASE,
          i('rows', 'number', 'Filas visibles del `<textarea>`.', '4'),
          i('cols', 'number | undefined', 'Columnas nativas.'),
          i('resize', "'vertical' | 'horizontal' | 'both' | 'none'", 'CSS `resize`.', "'vertical'"),
          i('spellcheck', 'boolean | undefined', 'Atributo `spellcheck`.'),
          i('wrap', "'soft' | 'hard'", 'Atributo `wrap`.', "'soft'"),
          i('autocomplete', 'string | undefined', 'Atributo `autocomplete`.'),
          i('minLength', 'number | undefined', '`minlength`.'),
          i('maxLength', 'number | undefined', '`maxlength`.'),
        ],
      },
    ],
  },
  checkbox: {
    importNames: ['AuCheckbox'],
    sections: [
      {
        title: 'AuCheckbox',
        description: 'Implementa `FormCheckboxControl`. Usa `[(checked)]` o `[formField]`.',
        rows: [
          m('checked', 'ModelSignal<boolean>', 'Estado marcado.'),
          i('label', 'string', 'Etiqueta inline en el control.', "''"),
          i('description', 'string', 'Texto de apoyo (`aria-describedby`).', "''"),
          i('errors', 'ValidationError[]', 'Desde signal forms.', '[]'),
          i('invalid', 'boolean', 'Estado inválido.', 'false'),
          i('disabled', 'boolean', 'Desactiva interacción.', 'false'),
          i('required', 'boolean', 'Campo obligatorio.', 'false'),
          i('indeterminate', 'boolean', 'Estado parcial (p. ej. «seleccionar todo»).', 'false'),
          i('size', "'sm' | 'md' | 'lg'", 'Tamaño de la casilla.', "'md'"),
          i('name', 'string', 'Atributo `name`.', "''"),
          o('blur', 'void', 'Blur del input nativo.'),
          o('checkedChange', 'boolean', 'Al cambiar el valor.'),
        ],
      },
    ],
  },
  switch: {
    importNames: ['AuFormField', 'AuSwitch'],
    sections: [
      {
        title: 'AuSwitch',
        description:
          'Etiqueta inline en el switch; envuelve en `au-form-field` para hint y error. Implementa `FormCheckboxControl`.',
        rows: [
          m('checked', 'ModelSignal<boolean>', 'Estado on/off.'),
          i('label', 'string', 'Etiqueta inline.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('showRequired', 'boolean', 'Asterisco en etiqueta inline.', 'true'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('name', 'string', 'Name nativo.', "''"),
          o('blur', 'void', 'Blur.'),
          o('checkedChange', 'boolean', 'Al alternar.'),
        ],
      },
    ],
  },
  select: {
    importNames: ['AuFormField', 'AuSelect', 'type AuSelectOption'],
    sections: [
      {
        title: 'AuSelect',
        description: 'Proyecta dentro de `au-form-field`. Combobox con listbox en portal. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Opción seleccionada (`value` de la opción).'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('options', 'AuSelectOption[]', '`{ value, label, disabled? }[]`.', '[]'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Listbox visible pero sin cambiar valor.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('name', 'string', 'Name (input oculto para POST).', "''"),
          i('placeholder', 'string', 'Texto cuando no hay valor.', "''"),
          i('autocomplete', 'string | undefined', 'Autocomplete nativo.'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'Al elegir opción.'),
        ],
      },
    ],
  },
  autocomplete: {
    importNames: ['AuFormField', 'AuAutocomplete', 'type AuAutocompleteOption'],
    sections: [
      {
        title: 'AuAutocomplete',
        description: 'Proyecta dentro de `au-form-field`. Filtra opciones al escribir.',
        rows: [
          ...VALUE_FIELD_BASE,
          i('options', 'AuAutocompleteOption[]', 'Lista de sugerencias.', '[]'),
          i('minFilterLength', 'number', 'Caracteres mínimos antes de filtrar.', '0'),
          i('caseSensitive', 'boolean', 'Filtro sensible a mayúsculas.', 'false'),
          i('strictSelection', 'boolean', 'Blur limpia si no hay coincidencia exacta.', 'true'),
          i('noResultsText', 'string', 'Texto sin resultados.', "'No results'"),
          i('autocomplete', 'string | undefined', 'Atributo nativo (por defecto `off`).', "'off'"),
        ],
      },
    ],
  },
  'radio-group': {
    importNames: ['AuFormField', 'AuRadioGroup', 'type AuRadioOption'],
    sections: [
      {
        title: 'AuRadioGroup',
        description:
          'Proyecta dentro de `au-form-field`; el `label` del form-field es el `<legend>`. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Valor de la opción seleccionada.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('options', 'AuRadioOption[]', 'Opciones del grupo.', '[]'),
          i('disabled', 'boolean', 'Desactiva todo el grupo.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('name', 'string', 'Name compartido de radios.', "''"),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur del grupo.'),
          o('valueChange', 'string | null', 'Al seleccionar.'),
        ],
      },
    ],
  },
  'input-number': {
    importNames: ['AuFormField', 'AuInputNumber'],
    sections: [
      {
        title: 'AuInputNumber',
        description: 'Proyecta dentro de `au-form-field`. Vacío ↔ `null`. `FormValueControl<number | null>`.',
        rows: [
          m('value', 'ModelSignal<number | null>', 'Valor numérico.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Solo lectura.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('min', 'number | undefined', 'Mínimo nativo.'),
          i('max', 'number | undefined', 'Máximo nativo.'),
          i('step', "number | 'any'", 'Paso del spinner.', '1'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('placeholder', 'string', 'Placeholder.', "''"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'number | null', 'Al cambiar valor finito.'),
        ],
      },
    ],
  },
  'input-date': {
    importNames: ['AuFormField', 'AuInputDate'],
    sections: [
      {
        title: 'AuInputDate',
        description: 'Proyecta dentro de `au-form-field`. Selector nativo `type="date"`; ISO `YYYY-MM-DD` o `null`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Fecha como string ISO.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Solo lectura.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('minDate', 'string | undefined', 'Atributo `min` (ISO).'),
          i('maxDate', 'string | undefined', 'Atributo `max` (ISO).'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'Al elegir fecha.'),
        ],
      },
    ],
  },
  dialog: {
    importNames: ['AuDialog', 'AuDialogFooter', 'AuButton'],
    sections: [
      {
        title: 'AuDialog',
        description: 'Modal nativo `<dialog>` con trampa de foco y restauración al cerrar.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibilidad (`showModal` / `close`).'),
          i('title', 'string', 'Título visible; alimenta `aria-labelledby`.', "''"),
          i('ariaLabel', 'string', 'Nombre accesible sin título visible.', "''"),
          i('id', 'string', 'Prefijo de ids.', "''"),
          i('size', "'sm' | 'md' | 'lg' | 'full'", 'Ancho del panel.', "'md'"),
          i('showCloseButton', 'boolean', 'Botón cerrar en cabecera.', 'true'),
          i('closeOnBackdrop', 'boolean', 'Cerrar al pulsar fuera.', 'true'),
          i('closeOnEscape', 'boolean', 'Cerrar con Escape.', 'true'),
          o('close', 'void', 'Tras cerrar (backdrop, Escape, botón).'),
        ],
      },
      {
        title: 'AuDialogFooter',
        description: 'Directiva de marcado: `import { AuDialogFooter }` y proyecta `<div auDialogFooter>`.',
        rows: [
          {
            name: 'auDialogFooter',
            type: 'directiva',
            description: 'Slot de acciones en el pie del diálogo.',
          },
        ],
      },
    ],
  },
  card: {
    importNames: ['AuCard', 'AuCardFooter'],
    sections: [
      {
        title: 'AuCard',
        description: 'Contenedor `<article>` con variantes de superficie.',
        rows: [
          i('variant', "'elevated' | 'outlined' | 'filled'", 'Estilo de superficie.', "'elevated'"),
          i('size', "'sm' | 'md' | 'lg'", 'Padding interno (`--au-card-*`).', "'md'"),
          {
            name: 'hasFooter',
            type: 'Signal<boolean> (solo lectura)',
            description: 'True si hay contenido con `auCardFooter`.',
          },
        ],
      },
      {
        title: 'Proyección de contenido',
        description: 'Atributos en el contenido proyectado (no son inputs del componente).',
        rows: [
          { name: 'auCardHeader', type: 'atributo', description: 'Cabecera (usa un heading semántico).' },
          { name: 'auCardBody', type: 'atributo', description: 'Cuerpo principal.' },
          { name: 'auCardMedia', type: 'atributo', description: 'Imagen o vídeo a sangre en la parte superior.' },
          { name: 'auCardFooter', type: 'atributo', description: 'Pie con acciones; requiere `AuCardFooter` en imports.' },
        ],
      },
    ],
  },
  tabs: {
    importNames: ['AuTabs', 'AuTab', 'AuTabPanel'],
    sections: [
      {
        title: 'AuTabs',
        rows: [
          m('value', 'ModelSignal<string>', 'Clave de la pestaña activa.'),
          i('ariaLabel', 'string', 'Nombre del `tablist` sin etiqueta visible.', "''"),
          i('variant', "'line' | 'contained'", 'Subrayado o segmented.', "'line'"),
          i('orientation', "'horizontal' | 'vertical'", 'Disposición del tablist.', "'horizontal'"),
          i('size', "'sm' | 'md' | 'lg'", 'Altura de tabs.', "'md'"),
          i('id', 'string', 'Prefijo de ids tab/panel.', "''"),
          o('valueChange', 'string', 'Al activar otra pestaña.'),
        ],
      },
      {
        title: 'AuTab',
        description: 'En `<button type="button" auTab="clave">`.',
        rows: [
          { name: 'auTab', type: 'string (requerido)', description: 'Identificador; coincide con `auTabPanel`.' },
          i('auTabDisabled', 'boolean', 'Desactiva la pestaña.', 'false'),
        ],
      },
      {
        title: 'AuTabPanel',
        description: 'En `<div auTabPanel="clave">`.',
        rows: [
          { name: 'auTabPanel', type: 'string (requerido)', description: 'Clave del panel emparejada con `auTab`.' },
        ],
      },
    ],
  },
  steps: {
    importNames: ['AuSteps', 'AuStep', 'AuStepPanel'],
    sections: [
      {
        title: 'AuSteps',
        rows: [
          m('value', 'ModelSignal<string>', 'Clave del paso activo.'),
          i('ariaLabel', 'string', 'Nombre accesible de la lista de pasos.', "''"),
          i('layout', "'tabs' | 'sections'", 'Un panel vs. secciones con scroll.', "'tabs'"),
          i('size', "'sm' | 'md'", 'Densidad de los botones.', "'md'"),
          i('id', 'string', 'Id base para step/panel.', "''"),
          o('valueChange', 'string', 'Al cambiar el paso activo.'),
        ],
      },
      {
        title: 'AuStep',
        description: 'En `<button type="button" auStep="clave">`.',
        rows: [
          { name: 'auStep', type: 'string (requerido)', description: 'Clave; coincide con `auStepPanel`.' },
          i('auStepDisabled', 'boolean', 'Desactiva el paso.', 'false'),
        ],
      },
      {
        title: 'AuStepPanel',
        description: 'En `<div auStepPanel="clave">`.',
        rows: [
          { name: 'auStepPanel', type: 'string (requerido)', description: 'Clave del panel emparejada con `auStep`.' },
        ],
      },
    ],
  },
  chip: {
    importNames: ['AuChip'],
    sections: [
      {
        title: 'AuChip',
        rows: [
          i('label', 'string', 'Texto si no proyectas contenido.', "''"),
          i('variant', "'filled' | 'outline' | 'accent'", 'Estilo.', "'filled'"),
          i('size', "'sm' | 'md'", 'Densidad.', "'md'"),
          i('disabled', 'boolean', 'Desactiva interacción.', 'false'),
          i('removable', 'boolean', 'Muestra botón quitar.', 'false'),
          i('selectable', 'boolean', 'Chip filtro con `aria-pressed`.', 'false'),
          m('selected', 'ModelSignal<boolean>', 'Estado si `selectable`.', 'false'),
          i('removeLabel', 'string', 'Nombre accesible del botón quitar.', "''"),
          o('removed', 'void', 'Al pulsar quitar.'),
          o('selectedChange', 'boolean', 'Al cambiar selección.'),
          o('click', 'MouseEvent', 'Al activar chip seleccionable.'),
        ],
      },
    ],
  },
  'chip-group': {
    importNames: ['AuChipGroup', 'AuChip'],
    sections: [
      {
        title: 'AuChipGroup',
        description: '`role="group"` para chips de filtro seleccionables. Etiquetas estáticas/removibles → `au-list`.',
        rows: [
          i('ariaLabel', 'string', 'Nombre accesible sin leyenda visible.', "''"),
          i('ariaLabelledBy', 'string', 'ID del elemento que etiqueta el grupo.', "''"),
        ],
      },
    ],
  },
  list: {
    importNames: ['AuList', 'AuListItem', 'AuChip'],
    sections: [
      {
        title: 'AuList',
        description: 'Contenedor `role="list"`. Los chips hijos obtienen `listitem` vía `AuListItem`.',
        rows: [
          i('ariaLabel', 'string', 'Nombre accesible.', "''"),
          i('ariaLabelledBy', 'string', 'ID de etiqueta externa.', "''"),
        ],
      },
      {
        title: 'AuListItem',
        description: 'En hosts personalizados: `<div auListItem>`.',
        rows: [
          i('auListItemDisabled', 'boolean', 'Suprime `listitem` (chips `selectable` lo usan).', 'false'),
        ],
      },
    ],
  },
  snackbar: {
    importNames: ['AuSnackbar'],
    sections: [
      {
        title: 'AuSnackbar',
        description: 'Toast en portal; `durationMs` 0 = solo cierre manual.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibilidad.'),
          i('message', 'string', 'Texto principal (o slot proyectado).', "''"),
          i('variant', "'default' | 'success' | 'warning' | 'error' | 'info'", 'Semántica visual.', "'default'"),
          i('position', 'AuSnackbarPosition', 'Esquina de la pantalla.', "'bottom-center'"),
          i('durationMs', 'number', 'Auto-cierre en ms; `0` desactiva timer.', '5000'),
          i('actionLabel', 'string', 'Etiqueta del botón de acción opcional.', "''"),
          i('showCloseButton', 'boolean', 'Botón cerrar.', 'true'),
          i('closeAriaLabel', 'string', 'Nombre accesible del cerrar.', "'Dismiss notification'"),
          o('dismiss', 'void', 'Al cerrar (timer, Escape, cerrar).'),
          o('action', 'void', 'Al pulsar la acción opcional.'),
        ],
      },
    ],
  },
  message: {
    importNames: ['AuMessage'],
    sections: [
      {
        title: 'AuMessage',
        description: 'Aviso inline; error/warning usan `role="alert"`.',
        rows: [
          i('variant', "'default' | 'success' | 'warning' | 'error' | 'info'", 'Superficie semántica.', "'default'"),
          i('title', 'string', 'Título opcional.', "''"),
          i('message', 'string', 'Cuerpo (o slot por defecto).', "''"),
          i('dismissible', 'boolean', 'Botón cerrar.', 'false'),
          i('showIcon', 'boolean', 'Icono de variante (no en default).', 'true'),
          i('closeAriaLabel', 'string', 'Etiqueta del cerrar.', "'Dismiss message'"),
          o('dismiss', 'void', 'Al descartar.'),
        ],
      },
    ],
  },
  icon: {
    importNames: ['AuIcon'],
    sections: [
      {
        title: 'AuIcon',
        description: 'Decorativo (`aria-hidden`). Nombra el control padre para lectores de pantalla.',
        rows: [
          { name: 'name', type: 'AuIconName (requerido)', description: 'Identificador del glifo.' },
          i('size', "'sm' | 'md' | 'lg'", 'Tamaño.', "'md'"),
          i('warningScale', 'number', 'Escala solo el triángulo de warning.', '1.1'),
        ],
      },
    ],
  },
  skeleton: {
    importNames: ['AuSkeleton'],
    sections: [
      {
        title: 'AuSkeleton',
        description: 'Placeholder decorativo; `aria-busy` en el contenedor padre.',
        rows: [
          i('variant', "'text' | 'circular' | 'rectangular' | 'rounded' | 'button'", 'Forma.', "'text'"),
          i('animation', "'pulse' | 'wave' | 'none'", 'Animación.', "'pulse'"),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('width', 'string', 'Ancho CSS.'),
          i('height', 'string', 'Alto CSS.'),
          i('radius', 'string', 'Radio CSS.'),
        ],
      },
    ],
  },
  divider: {
    importNames: ['AuDivider'],
    sections: [
      {
        title: 'AuDivider',
        rows: [
          i('orientation', "'horizontal' | 'vertical'", 'Dirección de la regla.', "'horizontal'"),
          i('inset', 'boolean', 'Sangría al inicio (horizontal).', 'false'),
          i('label', 'string', 'Etiqueta centrada (solo horizontal).', "''"),
        ],
      },
    ],
  },
  tooltip: {
    importNames: ['AuTooltip'],
    sections: [
      {
        title: 'AuTooltip',
        description: 'Directiva en el disparador enfocable (`button`, `a`, etc.).',
        rows: [
          i('auTooltip', 'string', 'Texto del globo (vacío = sin tooltip).', "''"),
          i('auTooltipPlacement', 'AuTooltipPlacement', 'Posición preferida; voltea si no cabe.', "'top'"),
          i('auTooltipShowDelay', 'number', 'Retardo al mostrar (ms).', '200'),
          i('auTooltipHideDelay', 'number', 'Retardo al ocultar (ms).', '100'),
          i('auTooltipDisabled', 'boolean', 'Suprime el tooltip.', 'false'),
        ],
      },
    ],
  },
};
