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

const FIELD_STRING: ComponentApiEntry[] = [
  m('value', 'ModelSignal<string | null>', 'Field value; empty ↔ `null`.'),
  i('label', 'string', 'Visible label linked with `for`/`id`.', "''"),
  i('hint', 'string', 'Help text (`aria-describedby`).', "''"),
  i('errorMessage', 'string', 'Manual error message.', "''"),
  i('errors', 'ValidationError[]', 'Errors from signal forms (`formField`).', '[]'),
  i('invalid', 'boolean', 'Marks the field invalid.', 'false'),
  i('disabled', 'boolean', 'Disables editing.', 'false'),
  i('readOnly', 'boolean', 'Read-only.', 'false'),
  i('required', 'boolean', '`required` and `aria-required`.', 'false'),
  i('showRequired', 'boolean', 'Shows asterisk when `required`.', 'true'),
  i('id', 'string', 'Stable id; generated when empty.', "''"),
  i('name', 'string', 'Native `name` attribute.', "''"),
  i('placeholder', 'string', 'Placeholder.', "''"),
  i('size', "'sm' | 'md' | 'lg'", 'Densidad (`data-au-size`).', "'md'"),
  o('blur', 'void', 'When the native control blurs.'),
  o('valueChange', 'string | null', 'Each `input` event when not disabled.'),
];

export const COMPONENT_DOC_API_EN: Record<string, ResolvedComponentApi> = {
  button: {
    importNames: ['AuButton'],
    sections: [
      {
        title: 'AuButton',
        rows: [
          i('variant', "'primary' | 'secondary' | 'outline' | 'ghost'", 'Visual style.', "'primary'"),
          i('size', "'sm' | 'md' | 'lg'", 'Altura y padding; `lg` ≥ 44px.', "'md'"),
          i('disabled', 'boolean', 'Disables the button.', 'false'),
          i('loading', 'boolean', 'Spinner and `aria-busy`; blocks click.', 'false'),
          i('type', "'button' | 'submit' | 'reset'", 'Tipo nativo.', "'button'"),
          i('name', 'string', 'Atributo `name` para envío de formulario.', "''"),
          i('label', 'string', 'Texto accesible si el contenido es solo icono.', "''"),
          o('click', 'MouseEvent', 'Click when not disabled or loading.'),
        ],
      },
    ],
  },
  'input-text': {
    importNames: ['AuInputText'],
    sections: [
      {
        title: 'AuInputText',
        description: 'Implementa `FormValueControl<string | null>`. Enlaza `[formField]` o `[(value)]`.',
        rows: [
          ...FIELD_STRING,
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
    importNames: ['AuTextarea'],
    sections: [
      {
        title: 'AuTextarea',
        description: 'Implementa `FormValueControl<string | null>`.',
        rows: [
          ...FIELD_STRING,
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
          i('label', 'string', 'Etiqueta del control.', "''"),
          i('description', 'string', 'Texto secundario bajo la etiqueta.', "''"),
          i('errorMessage', 'string', 'Error visible.', "''"),
          i('errors', 'ValidationError[]', 'Desde signal forms.', '[]'),
          i('invalid', 'boolean', 'Estado inválido.', 'false'),
          i('disabled', 'boolean', 'Desactiva interacción.', 'false'),
          i('required', 'boolean', 'Campo obligatorio.', 'false'),
          i('indeterminate', 'boolean', 'Estado parcial (p. ej. «seleccionar todo»).', 'false'),
          i('size', "'sm' | 'md' | 'lg'", 'Tamaño de la casilla.', "'md'"),
          i('id', 'string', 'Id para `label for`.', "''"),
          i('name', 'string', 'Atributo `name`.', "''"),
          o('blur', 'void', 'Blur del input nativo.'),
          o('checkedChange', 'boolean', 'Al cambiar el valor.'),
        ],
      },
    ],
  },
  switch: {
    importNames: ['AuSwitch'],
    sections: [
      {
        title: 'AuSwitch',
        description: 'Implementa `FormCheckboxControl` con `role="switch"`.',
        rows: [
          m('checked', 'ModelSignal<boolean>', 'Estado on/off.'),
          i('label', 'string', 'Etiqueta.', "''"),
          i('hint', 'string', 'Ayuda contextual.', "''"),
          i('errorMessage', 'string', 'Mensaje de error.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('showRequired', 'boolean', 'Asterisco visual.', 'true'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('id', 'string', 'Id del control.', "''"),
          i('name', 'string', 'Name nativo.', "''"),
          o('blur', 'void', 'Blur.'),
          o('checkedChange', 'boolean', 'Al alternar.'),
        ],
      },
    ],
  },
  select: {
    importNames: ['AuSelect', 'type AuSelectOption'],
    sections: [
      {
        title: 'AuSelect',
        description: 'Combobox con listbox en portal. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Opción seleccionada (`value` de la opción).'),
          i('label', 'string', 'Etiqueta.', "''"),
          i('hint', 'string', 'Ayuda.', "''"),
          i('errorMessage', 'string', 'Error.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('options', 'AuSelectOption[]', '`{ value, label, disabled? }[]`.', '[]'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Listbox visible pero sin cambiar valor.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('showRequired', 'boolean', 'Asterisco.', 'true'),
          i('id', 'string', 'Id.', "''"),
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
    importNames: ['AuAutocomplete', 'type AuAutocompleteOption'],
    sections: [
      {
        title: 'AuAutocomplete',
        description: 'Filtra opciones al escribir. Patrón combobox ARIA.',
        rows: [
          ...FIELD_STRING,
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
    importNames: ['AuRadioGroup', 'type AuRadioOption'],
    sections: [
      {
        title: 'AuRadioGroup',
        description: 'Elección única. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Valor de la opción seleccionada.'),
          i('label', 'string', 'Leyenda del grupo.', "''"),
          i('hint', 'string', 'Ayuda.', "''"),
          i('errorMessage', 'string', 'Error.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('options', 'AuRadioOption[]', 'Opciones del grupo.', '[]'),
          i('disabled', 'boolean', 'Desactiva todo el grupo.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('id', 'string', 'Prefijo de ids.', "''"),
          i('name', 'string', 'Name compartido de radios.', "''"),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur del grupo.'),
          o('valueChange', 'string | null', 'Al seleccionar.'),
        ],
      },
    ],
  },
  'input-number': {
    importNames: ['AuInputNumber'],
    sections: [
      {
        title: 'AuInputNumber',
        description: '`<input type="number">`; vacío ↔ `null`. `FormValueControl<number | null>`.',
        rows: [
          m('value', 'ModelSignal<number | null>', 'Valor numérico.'),
          i('label', 'string', 'Etiqueta.', "''"),
          i('hint', 'string', 'Ayuda.', "''"),
          i('errorMessage', 'string', 'Error.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('showRequired', 'boolean', 'Asterisco.', 'true'),
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
    importNames: ['AuInputDate'],
    sections: [
      {
        title: 'AuInputDate',
        description: 'Selector nativo `type="date"`. Valor ISO `YYYY-MM-DD` o `null`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Fecha como string ISO.'),
          i('label', 'string', 'Etiqueta.', "''"),
          i('hint', 'string', 'Ayuda.', "''"),
          i('errorMessage', 'string', 'Error.', "''"),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('showRequired', 'boolean', 'Asterisco.', 'true'),
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
