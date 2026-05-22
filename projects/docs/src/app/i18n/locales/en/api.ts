import type {
  ComponentApiEntry,
  ResolvedComponentApi,
} from '../../../core/component-docs.registry';

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
  i('label', 'string', 'Visible label (`<label for>`). Radio group: becomes `<legend>`.', "''"),
  i('hint', 'string', 'Helper below the control.', "''"),
  i('errorMessage', 'string', 'Manual error when the child has no signal-form message.', "''"),
  i('invalid', 'boolean', 'Forces invalid chrome.', 'false'),
  i('required', 'boolean', 'Required marker on label/legend.', 'false'),
  i('showRequired', 'boolean', 'Shows asterisk when required.', 'true'),
  i('controlIdInput', 'string', 'Stable control id; auto-generated when empty.', "''"),
];

const VALUE_FIELD_BASE: ComponentApiEntry[] = [
  m('value', 'ModelSignal<string | null>', 'Field value; empty ↔ `null`.'),
  i('errors', 'ValidationError[]', 'Errors from signal forms (`formField`).', '[]'),
  i('invalid', 'boolean', 'Marks the control invalid.', 'false'),
  i('disabled', 'boolean', 'Disables editing.', 'false'),
  i('readOnly', 'boolean', 'Read-only.', 'false'),
  i('required', 'boolean', '`required` and `aria-required` on the control.', 'false'),
  i('name', 'string', 'Native `name` attribute.', "''"),
  i('placeholder', 'string', 'Placeholder.', "''"),
  i('size', "'sm' | 'md' | 'lg'", 'Density (`data-au-size`).', "'md'"),
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
          i(
            'variant',
            "'primary' | 'secondary' | 'outline' | 'ghost'",
            'Visual style.',
            "'primary'",
          ),
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
  'form-field': {
    importNames: ['AuFormField'],
    sections: [
      {
        title: 'AuFormField',
        description:
          'Wrap projected controls (`au-input-text`, `au-select`, …). Provides `AU_FORM_FIELD` for shared ids and validation chrome.',
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
          'Project inside `au-form-field`. Implements `FormValueControl<string | null>`. Bind `[formField]` or `[(value)]`.',
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
        description:
          'Project inside `au-form-field`. Implements `FormValueControl<string | null>`.',
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
          i('label', 'string', 'Inline label on the checkbox.', "''"),
          i('description', 'string', 'Supporting text (`aria-describedby`).', "''"),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
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
          'Inline `label` on the switch; wrap in `au-form-field` for hint and error. Implements `FormCheckboxControl`.',
        rows: [
          m('checked', 'ModelSignal<boolean>', 'On/off state.'),
          i('label', 'string', 'Inline label.', "''"),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid state.', 'false'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('showRequired', 'boolean', 'Asterisk on inline label.', 'true'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          i('name', 'string', 'Native `name`.', "''"),
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
        description:
          'Project inside `au-form-field`. Portaled combobox listbox. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Selected option `value`.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('options', 'AuSelectOption[]', '`{ value, label, disabled? }[]`.', '[]'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('readOnly', 'boolean', 'Listbox visible but value locked.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('name', 'string', 'Native `name` (hidden input for POST).', "''"),
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
        description: 'Project inside `au-form-field`. Filter-as-you-type combobox.',
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
          'Project inside `au-form-field`; `label` on the form-field becomes `<legend>`. `FormValueControl<string | null>`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Selected option value.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('options', 'AuRadioOption[]', 'Group options.', '[]'),
          i('disabled', 'boolean', 'Disables the group.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('name', 'string', 'Shared radio `name`.', "''"),
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
        description:
          'Project inside `au-form-field`. Empty ↔ `null`. `FormValueControl<number | null>`.',
        rows: [
          m('value', 'ModelSignal<number | null>', 'Numeric value.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
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
        description:
          'Project inside `au-form-field`. Native `type="date"`; ISO `YYYY-MM-DD` or `null`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Date as ISO string.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
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
        description:
          'Directiva de marcado: `import { AuDialogFooter }` y proyecta `<div auDialogFooter>`.',
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
          {
            name: 'auCardHeader',
            type: 'atributo',
            description: 'Cabecera (usa un heading semántico).',
          },
          { name: 'auCardBody', type: 'atributo', description: 'Cuerpo principal.' },
          {
            name: 'auCardMedia',
            type: 'atributo',
            description: 'Imagen o vídeo a sangre en la parte superior.',
          },
          {
            name: 'auCardFooter',
            type: 'atributo',
            description: 'Pie con acciones; requiere `AuCardFooter` en imports.',
          },
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
          {
            name: 'auTab',
            type: 'string (requerido)',
            description: 'Identificador; coincide con `auTabPanel`.',
          },
          i('auTabDisabled', 'boolean', 'Desactiva la pestaña.', 'false'),
        ],
      },
      {
        title: 'AuTabPanel',
        description: 'En `<div auTabPanel="clave">`.',
        rows: [
          {
            name: 'auTabPanel',
            type: 'string (requerido)',
            description: 'Clave del panel emparejada con `auTab`.',
          },
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
          i(
            'variant',
            "'default' | 'success' | 'warning' | 'error' | 'info'",
            'Semántica visual.',
            "'default'",
          ),
          i('position', 'AuSnackbarPosition', 'Esquina de la pantalla.', "'bottom-center'"),
          i('durationMs', 'number', 'Auto-cierre en ms; `0` desactiva timer.', '5000'),
          i('actionLabel', 'string', 'Etiqueta del botón de acción opcional.', "''"),
          i('showCloseButton', 'boolean', 'Botón cerrar.', 'true'),
          i('showIcon', 'boolean', 'Variant icon (not on default).', 'true'),
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
  'chip-group': {
    importNames: ['AuChipGroup', 'AuChip'],
    sections: [
      {
        title: 'AuChipGroup',
        description:
          '`role="group"` for selectable filter chips. Use `au-list` for removable/static tags.',
        rows: [
          i('ariaLabel', 'string', 'Accessible name when there is no visible caption.', "''"),
          i('ariaLabelledBy', 'string', 'ID of labelling element.', "''"),
        ],
      },
    ],
  },
  list: {
    importNames: ['AuList', 'AuListItem', 'AuChip'],
    sections: [
      {
        title: 'AuList',
        description: '`role="list"` wrapper. Chips inside get `listitem` via `AuListItem`.',
        rows: [
          i('ariaLabel', 'string', 'Accessible name.', "''"),
          i('ariaLabelledBy', 'string', 'ID of labelling element.', "''"),
        ],
      },
      {
        title: 'AuListItem',
        description: 'On custom hosts inside `au-list`: `<div auListItem>`.',
        rows: [
          i(
            'auListItemDisabled',
            'boolean',
            'Suppresses `listitem` (chips use this when `selectable`).',
            'false',
          ),
        ],
      },
    ],
  },
  message: {
    importNames: ['AuMessage'],
    sections: [
      {
        title: 'AuMessage',
        description: 'Inline callout; error/warning use `role="alert"`.',
        rows: [
          i(
            'variant',
            "'default' | 'success' | 'warning' | 'error' | 'info'",
            'Semantic surface.',
            "'default'",
          ),
          i('title', 'string', 'Optional heading.', "''"),
          i('message', 'string', 'Body text (or default slot).', "''"),
          i('dismissible', 'boolean', 'Close button.', 'false'),
          i('showIcon', 'boolean', 'Variant icon (not on default).', 'true'),
          i('closeAriaLabel', 'string', 'Close button label.', "'Dismiss message'"),
          o('dismiss', 'void', 'When the user dismisses.'),
        ],
      },
    ],
  },
  icon: {
    importNames: ['AuIcon'],
    sections: [
      {
        title: 'AuIcon',
        description: 'Decorative (`aria-hidden`). Name the parent for screen readers.',
        rows: [
          { name: 'name', type: 'AuIconName (required)', description: 'Glyph identifier.' },
          i('size', "'sm' | 'md' | 'lg'", 'Dimensions.', "'md'"),
          i('warningScale', 'number', 'Scales warning triangle only.', '1.1'),
        ],
      },
    ],
  },
  skeleton: {
    importNames: ['AuSkeleton'],
    sections: [
      {
        title: 'AuSkeleton',
        description: 'Decorative placeholder; set `aria-busy` on a parent region.',
        rows: [
          i(
            'variant',
            "'text' | 'circular' | 'rectangular' | 'rounded' | 'button'",
            'Shape preset.',
            "'text'",
          ),
          i('animation', "'pulse' | 'wave' | 'none'", 'Motion.', "'pulse'"),
          i('size', "'sm' | 'md' | 'lg'", 'Density for circular/button/text line.', "'md'"),
          i('width', 'string', 'CSS width override.'),
          i('height', 'string', 'CSS height override.'),
          i('radius', 'string', 'Border-radius override.'),
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
          m('value', 'ModelSignal<string>', 'Active step key.'),
          i('ariaLabel', 'string', 'Accessible name of the step list.', "''"),
          i('layout', "'tabs' | 'sections'", 'One panel vs. scrollable sections.', "'tabs'"),
          i('size', "'sm' | 'md'", 'Step button density.', "'md'"),
          i('id', 'string', 'Base id for step/panel elements.', "''"),
          o('valueChange', 'string', 'When the active step changes.'),
        ],
      },
      {
        title: 'AuStep',
        description: 'On `<button type="button" auStep="key">`.',
        rows: [
          {
            name: 'auStep',
            type: 'string (required)',
            description: 'Step key; matches `auStepPanel`.',
          },
          i('auStepDisabled', 'boolean', 'Disables the step.', 'false'),
        ],
      },
      {
        title: 'AuStepPanel',
        description: 'On `<div auStepPanel="key">`.',
        rows: [
          {
            name: 'auStepPanel',
            type: 'string (required)',
            description: 'Panel key paired with `auStep`.',
          },
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
          i(
            'auTooltipPlacement',
            'AuTooltipPlacement',
            'Posición preferida; voltea si no cabe.',
            "'top'",
          ),
          i('auTooltipShowDelay', 'number', 'Retardo al mostrar (ms).', '200'),
          i('auTooltipHideDelay', 'number', 'Retardo al ocultar (ms).', '100'),
          i('auTooltipDisabled', 'boolean', 'Suprime el tooltip.', 'false'),
        ],
      },
    ],
  },
};
