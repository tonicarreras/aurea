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
          i(
            'variant',
            "'primary' | 'secondary' | 'outline' | 'ghost'",
            'Estilo visual.',
            "'primary'",
          ),
          i('size', "'sm' | 'md' | 'lg'", 'Altura y padding; `lg` ≥ 44px.', "'md'"),
          i('disabled', 'boolean', 'Desactiva el botón.', 'false'),
          i('loading', 'boolean', '`au-spinner` decorativo y `aria-busy`; bloquea click.', 'false'),
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
  fieldset: {
    importNames: ['AuFieldset'],
    sections: [
      {
        title: 'AuFieldset',
        description: 'Wrapper `fieldset` nativo para agrupar controles de formulario.',
        rows: [
          i('legend', 'string', 'Texto de la leyenda.', "''"),
          i('description', 'string', 'Texto de apoyo bajo la leyenda.', "''"),
          i('disabled', 'boolean', 'Desactiva todos los controles anidados.', 'false'),
          i('size', "'sm' | 'md'", 'Densidad tipográfica.', "'md'"),
        ],
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
        description:
          'Proyecta dentro de `au-form-field`. Implementa `FormValueControl<string | null>`.',
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
        description:
          'Proyecta dentro de `au-form-field`. Combobox con listbox en portal. `FormValueControl<string | null>`.',
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
  avatar: {
    importNames: ['AuAvatar'],
    sections: [
      {
        title: 'AuAvatar',
        description: 'Imagen de usuario o iniciales como respaldo.',
        rows: [
          i('src', 'string', 'URL de imagen.', "''"),
          i('alt', 'string', 'Texto alternativo con `src`.', "''"),
          i('name', 'string', 'Nombre para iniciales y `aria-label`.', "''"),
          i('size', "'xs' | 'sm' | 'md' | 'lg' | 'xl'", 'Diámetro.', "'md'"),
          i(
            'shape',
            "'circle' | 'square'",
            'Círculo (por defecto) o cuadrado con esquinas redondeadas.',
            "'circle'",
          ),
          i('decorative', 'boolean', 'Ocultar del árbol de accesibilidad.', 'false'),
        ],
      },
    ],
  },
  accordion: {
    importNames: ['AuAccordion', 'AuAccordionItem', 'AuAccordionPanel'],
    sections: [
      {
        title: 'AuAccordion',
        description: 'Raíz del acordeón; enlaza claves expandidas con `[(value)]`.',
        rows: [
          m('value', 'ModelSignal<string[]>', 'Claves de secciones expandidas.'),
          i('multiple', 'boolean', 'Permite varios paneles abiertos.', 'true'),
          i('ariaLabel', 'string', 'Nombre accesible de la región.', "''"),
          i('size', "'sm' | 'md'", 'Densidad tipográfica del trigger.', "'md'"),
          i('id', 'string', 'Prefijo de id estable para triggers/paneles.', "''"),
          o('valueChange', 'string[]', 'Al cambiar las claves expandidas.'),
        ],
      },
      {
        title: 'AuAccordionItem',
        description: 'En `<button type="button">` con clave que coincide con su panel.',
        rows: [
          i('auAccordionItem', 'string', 'Clave de sección (input requerido).'),
          i('auAccordionItemDisabled', 'boolean', 'Impide expandir/colapsar.', 'false'),
        ],
      },
      {
        title: 'AuAccordionPanel',
        description: 'Región del panel emparejada con una clave de trigger.',
        rows: [i('auAccordionPanel', 'string', 'Clave de sección (input requerido).')],
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
        description:
          'Proyecta dentro de `au-form-field`. Vacío ↔ `null`. `FormValueControl<number | null>`.',
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
  slider: {
    importNames: ['AuFormField', 'AuSlider'],
    sections: [
      {
        title: 'AuSlider',
        description:
          'Proyecta dentro de `au-form-field`. Range nativo. `FormValueControl<number>`.',
        rows: [
          m('value', 'ModelSignal<number>', 'Valor actual.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Solo lectura.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('name', 'string', '`name` nativo.', "''"),
          i('min', 'number | undefined', 'Mínimo del rango (por defecto 0).'),
          i('max', 'number | undefined', 'Máximo del rango (por defecto 100).'),
          i('step', 'number', 'Paso nativo.', '1'),
          i('showValue', 'boolean', 'Muestra el valor en vivo.', 'false'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'number', 'Al cambiar un valor finito.'),
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
          'Proyecta dentro de `au-form-field`. Selector nativo `type="date"`; ISO `YYYY-MM-DD` o `null`.',
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
  'input-time': {
    importNames: ['AuFormField', 'AuInputTime'],
    sections: [
      {
        title: 'AuInputTime',
        description:
          'Proyecta dentro de `au-form-field`. Selector nativo `type="time"`; valor `HH:mm` o `null`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Hora como string 24h.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('readOnly', 'boolean', 'Solo lectura.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('minTime', 'string | undefined', 'Atributo `min` (`HH:mm`).'),
          i('maxTime', 'string | undefined', 'Atributo `max` (`HH:mm`).'),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'Al elegir hora.'),
        ],
      },
    ],
  },
  'file-upload': {
    importNames: ['AuFormField', 'AuFileUpload'],
    sections: [
      {
        title: 'AuFileUpload',
        description:
          'Proyecta dentro de `au-form-field`. Selector con drag-and-drop. `FormValueControl<File[]>`.',
        rows: [
          m('value', 'ModelSignal<File[]>', 'Archivos seleccionados.'),
          i('errors', 'ValidationError[]', 'Signal forms.', '[]'),
          i('invalid', 'boolean', 'Inválido.', 'false'),
          i('accept', 'string', 'Filtro nativo `accept`.', "''"),
          i('multiple', 'boolean', 'Permite varios archivos.', 'true'),
          i('disabled', 'boolean', 'Desactivado.', 'false'),
          i('required', 'boolean', 'Obligatorio.', 'false'),
          i('name', 'string', '`name` nativo.', "''"),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('browseLabel', 'string', 'Etiqueta del botón explorar.', "'Browse files'"),
          i('dropLabel', 'string', 'Texto de la dropzone.', "'Drag files here or browse'"),
          i('removeFileLabel', 'string', 'Prefijo del `aria-label` de quitar.', "'Remove file'"),
          o('blur', 'void', 'Blur del input oculto.'),
          o('valueChange', 'File[]', 'Al cambiar la lista de archivos.'),
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
  drawer: {
    importNames: ['AuDrawer', 'AuDialogFooter', 'AuButton'],
    sections: [
      {
        title: 'AuDrawer',
        description: 'Panel lateral sobre `<dialog>` nativo.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibilidad.'),
          i('title', 'string', 'Título visible.', "''"),
          i('ariaLabel', 'string', 'Nombre accesible sin título.', "''"),
          i('position', "'start' | 'end'", 'Borde de entrada (LTR: start=izq, end=der).', "'end'"),
          i('size', "'sm' | 'md' | 'lg' | 'full'", 'Ancho del panel.', "'md'"),
          i('showCloseButton', 'boolean', 'Botón cerrar en cabecera.', 'true'),
          i('closeOnBackdrop', 'boolean', 'Cerrar al pulsar fuera.', 'true'),
          i('closeOnEscape', 'boolean', 'Cerrar con Escape.', 'true'),
          o('close', 'void', 'Tras cerrar.'),
        ],
      },
      {
        title: 'AuDialogFooter / auDrawerFooter',
        description: 'Proyecta `<div auDrawerFooter>` o `<div auDialogFooter>` para acciones.',
        rows: [
          {
            name: 'auDrawerFooter',
            type: 'directiva',
            description: 'Slot del pie (alias de AuDialogFooter).',
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
          {
            name: 'auStep',
            type: 'string (requerido)',
            description: 'Clave; coincide con `auStepPanel`.',
          },
          i('auStepDisabled', 'boolean', 'Desactiva el paso.', 'false'),
        ],
      },
      {
        title: 'AuStepPanel',
        description: 'En `<div auStepPanel="clave">`.',
        rows: [
          {
            name: 'auStepPanel',
            type: 'string (requerido)',
            description: 'Clave del panel emparejada con `auStep`.',
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
  'chip-group': {
    importNames: ['AuChipGroup', 'AuChip'],
    sections: [
      {
        title: 'AuChipGroup',
        description:
          '`role="group"` para chips de filtro seleccionables. Etiquetas estáticas/removibles → `au-list`.',
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
        description:
          'Contenedor `role="list"`. Los chips hijos obtienen `listitem` vía `AuListItem`.',
        rows: [
          i('ariaLabel', 'string', 'Nombre accesible.', "''"),
          i('ariaLabelledBy', 'string', 'ID de etiqueta externa.', "''"),
        ],
      },
      {
        title: 'AuListItem',
        description: 'En hosts personalizados: `<div auListItem>`.',
        rows: [
          i(
            'auListItemDisabled',
            'boolean',
            'Suprime `listitem` (chips `selectable` lo usan).',
            'false',
          ),
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
          i('showIcon', 'boolean', 'Icono de variante semántica (no en default).', 'true'),
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
        description: 'Aviso inline o banner a ancho completo; error/warning usan `role="alert"`.',
        rows: [
          i(
            'variant',
            "'default' | 'success' | 'warning' | 'error' | 'info'",
            'Superficie semántica.',
            "'default'",
          ),
          i('layout', "'inline' | 'banner'", 'Ancho y cromado.', "'inline'"),
          i('title', 'string', 'Título opcional.', "''"),
          i('message', 'string', 'Cuerpo (o slot por defecto).', "''"),
          i('actionLabel', 'string', 'Etiqueta del botón de acción opcional.', "''"),
          i('dismissible', 'boolean', 'Botón cerrar.', 'false'),
          i('showIcon', 'boolean', 'Icono de variante (no en default).', 'true'),
          i('closeAriaLabel', 'string', 'Etiqueta del cerrar.', "'Dismiss message'"),
          o('dismiss', 'void', 'Al descartar.'),
          o('action', 'void', 'Al pulsar la acción.'),
        ],
      },
    ],
  },
  icon: {
    importNames: ['AuIcon'],
    sections: [
      {
        title: 'AuIcon',
        description:
          'Decorativo (`aria-hidden`). Nombra el control padre para lectores de pantalla.',
        rows: [
          { name: 'name', type: 'AuIconName (requerido)', description: 'Identificador del glifo.' },
          i('size', "'xs' | 'sm' | 'md' | 'lg'", 'Tamaño.', "'md'"),
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
          i(
            'variant',
            "'text' | 'circular' | 'rectangular' | 'rounded' | 'button'",
            'Forma.',
            "'text'",
          ),
          i('animation', "'pulse' | 'wave' | 'none'", 'Animación.', "'pulse'"),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad.', "'md'"),
          i('width', 'string', 'Ancho CSS.'),
          i('height', 'string', 'Alto CSS.'),
          i('radius', 'string', 'Radio CSS.'),
        ],
      },
    ],
  },
  spinner: {
    importNames: ['AuSpinner'],
    sections: [
      {
        title: 'AuSpinner',
        description: 'Región viva para carga inline; label visible opcional.',
        rows: [
          i('size', "'sm' | 'md' | 'lg'", 'Tamaño del glifo.', "'md'"),
          i('decorative', 'boolean', 'Solo glifo cuando el padre nombra la espera.', 'false'),
          i('label', 'string', 'Copy visible; omítelo para solo glifo (`aria-label="Loading"`).'),
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
  'empty-state': {
    importNames: ['AuEmptyState', 'AuEmptyStateMedia'],
    sections: [
      {
        title: 'AuEmptyState',
        description:
          'Placeholder vacío centrado; proyecta acciones en el slot por defecto. Prioridad de media: `[auEmptyStateMedia]` → `imageSrc` → `icon`.',
        rows: [
          i('title', 'string', 'Texto del encabezado principal.', "''"),
          i('description', 'string', 'Copy de apoyo bajo el título.', "''"),
          i(
            'icon',
            'AuIconName',
            'Glifo decorativo en superficie hundida; omite si usas imagen o media custom.',
            'undefined',
          ),
          i(
            'imageSrc',
            'string',
            'URL de ilustración; ignorada si hay media proyectada.',
            'undefined',
          ),
          i(
            'imageAlt',
            'string',
            'Texto `alt` de `imageSrc`; usa `""` para imágenes decorativas.',
            "''",
          ),
          i('size', "'sm' | 'md' | 'lg'", 'Densidad del layout.', "'md'"),
          i('headingLevel', '2 | 3 | 4', 'Nivel de encabezado del `title`.', '2'),
        ],
      },
      {
        title: 'AuEmptyStateMedia',
        description: 'Atributo en SVG, img o markup proyectado para una ilustración custom.',
        rows: [],
      },
    ],
  },
  badge: {
    importNames: ['AuBadge'],
    sections: [
      {
        title: 'AuBadge',
        rows: [
          i(
            'variant',
            "'default' | 'accent' | 'success' | 'warning' | 'error' | 'info'",
            'Superficie semántica.',
            "'default'",
          ),
          i('dot', 'boolean', 'Indicador sin texto de etiqueta visible.', 'false'),
          i('label', 'string', 'Texto de contador o estado.', "''"),
        ],
      },
    ],
  },
  breadcrumb: {
    importNames: ['AuBreadcrumb'],
    sections: [
      {
        title: 'AuBreadcrumb',
        rows: [i('items', 'AuBreadcrumbItem[]', 'Segmentos (`label`, `href` opcional).', '[]')],
      },
    ],
  },
  link: {
    importNames: ['AuLink'],
    sections: [
      {
        title: 'AuLink',
        description: 'En `<a auLink>` o `<au-link>`.',
        rows: [
          i('variant', "'default' | 'subtle'", 'Énfasis visual.', "'default'"),
          i('href', 'string', 'URL de destino.', "'#'"),
          i('external', 'boolean', 'Abre en pestaña nueva con `noopener noreferrer`.', 'false'),
        ],
      },
    ],
  },
  menu: {
    importNames: ['AuMenu', 'AuMenuItem', 'AuMenuTrigger'],
    sections: [
      {
        title: 'AuMenu',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Estado abierto del panel.'),
          i('placement', 'AuTooltipPlacement', 'Posición preferida del panel.', "'bottom'"),
          i('disabled', 'boolean', 'Impide abrir.', 'false'),
          o('openChange', 'boolean', 'Al cambiar el estado abierto.'),
        ],
      },
      {
        title: 'AuMenuTrigger',
        description: 'Directiva en el control que alterna (`auMenuTrigger`).',
        rows: [],
      },
      {
        title: 'AuMenuItem',
        rows: [
          i('disabled', 'boolean', 'Desactiva la acción.', 'false'),
          o('select', 'void', 'Al activar el ítem; cierra el menú.'),
        ],
      },
    ],
  },
  popover: {
    importNames: ['AuPopover', 'AuPopoverTrigger'],
    sections: [
      {
        title: 'AuPopover',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Estado abierto del panel.'),
          i('placement', 'AuTooltipPlacement', 'Posición preferida del panel.', "'bottom'"),
          i('disabled', 'boolean', 'Impide abrir.', 'false'),
          o('openChange', 'boolean', 'Al cambiar el estado abierto.'),
        ],
      },
      {
        title: 'AuPopoverTrigger',
        description: 'Directiva en el control que alterna (`auPopoverTrigger`).',
        rows: [],
      },
    ],
  },
  pagination: {
    importNames: ['AuPagination'],
    sections: [
      {
        title: 'AuPagination',
        rows: [
          i('page', 'number', 'Página actual (base 1).', '1'),
          i('pageCount', 'number', 'Total de páginas (≥ 1).', '1'),
          i('disabled', 'boolean', 'Desactiva todos los controles.', 'false'),
          o('pageChange', 'number', 'Al elegir una página.'),
        ],
      },
    ],
  },
  progress: {
    importNames: ['AuProgress'],
    sections: [
      {
        title: 'AuProgress',
        rows: [
          i('mode', "'determinate' | 'indeterminate'", 'Modo de visualización.', "'determinate'"),
          i('value', 'number', 'Valor actual (determinado).', '0'),
          i('max', 'number', 'Valor máximo (determinado).', '100'),
          i('label', 'string', 'Sobrescribe `aria-valuetext` si está definido.', "''"),
        ],
      },
    ],
  },
  table: {
    importNames: ['AuTable', 'AuTableColumn', 'AuTableCellDef'],
    sections: [
      {
        title: 'AuTable',
        description: 'Rejilla de datos; declara columnas con `au-table-column`.',
        rows: [
          i('data', 'readonly unknown[]', 'Filas del cuerpo de la tabla.', '—'),
          i('title', 'string', 'Título visible sobre la rejilla.', "''"),
          i('description', 'string', 'Texto de apoyo bajo `title`.', "''"),
          i('caption', 'string', 'Nombre accesible de la tabla.', "''"),
          i('striped', 'boolean', 'Fondo alterno en filas.', 'false'),
          i('compact', 'boolean', 'Padding reducido en celdas.', 'false'),
          i('stickyHeader', 'boolean', 'Cabecera fija al hacer scroll.', 'false'),
          i('loading', 'boolean', 'Muestra fila de carga y pone `aria-busy`.', 'false'),
          i(
            'loadingMessage',
            'string',
            'Copy visible del `au-spinner` en la fila de carga (`label`).',
            "'Loading…'",
          ),
          i('clientSort', 'boolean', 'Ordena filas al pulsar cabeceras.', 'true'),
          m('sort', 'AuTableSortState | null', 'Columna y dirección de orden activas.', 'null'),
          o('sortChange', 'AuTableSortState | null', 'Al alternar el orden.'),
          i(
            'selectionMode',
            "'none' | 'single' | 'multiple'",
            'Comportamiento de selección de filas.',
            "'none'",
          ),
          m('selection', 'readonly unknown[]', 'Filas seleccionadas de `[data]`.', '[]'),
          o('selectionChange', 'readonly unknown[]', 'Al cambiar la selección.'),
          i(
            'compareSelection',
            '(a, b) => boolean',
            'Igualdad para emparejar filas en `selection`.',
            'igualdad por referencia',
          ),
          i(
            'selectAllLabel',
            'string',
            'Nombre accesible del checkbox de cabecera (multiple).',
            "'Select all rows'",
          ),
          i(
            'selectRowLabel',
            'string',
            'Nombre accesible de cada checkbox de fila.',
            "'Select row'",
          ),
          i(
            'trackByFn',
            '(index, row) => unknown',
            'Identidad estable para el tracking de filas.',
            'undefined',
          ),
          i(
            'emptyMessage',
            'string',
            'Texto de respaldo si `data` está vacío y no hay `au-empty-state` proyectado.',
            "'No data'",
          ),
        ],
      },
      {
        title: 'AuTableColumn',
        description: 'Hijo de `au-table`; una por columna.',
        rows: [
          i('name', 'string', 'Clave de columna (propiedad de la fila).', '—'),
          i('header', 'string', 'Etiqueta de cabecera.', '—'),
          i('sortable', 'boolean', 'Control de orden en cabecera.', 'false'),
          i('align', "'start' | 'end' | 'center'", 'Alineación de celdas.', "'start'"),
          i(
            'cellVariant',
            "'default' | 'primary' | 'secondary'",
            'Énfasis de celda por defecto.',
            "'default'",
          ),
          i('accessor', '(row) => unknown', 'Lector de valor personalizado.', 'undefined'),
        ],
      },
      {
        title: 'AuTableCellDef',
        description:
          '`ng-template[auTableCell] let-row` dentro de `au-table-column` para celdas custom.',
        rows: [],
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
