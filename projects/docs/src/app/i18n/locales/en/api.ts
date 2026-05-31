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
          i('size', "'sm' | 'md' | 'lg'", 'Height and padding; `lg` ≥ 44px.', "'md'"),
          i('disabled', 'boolean', 'Disables the button.', 'false'),
          i(
            'loading',
            'boolean',
            'Decorative `au-spinner` and `aria-busy`; blocks click.',
            'false',
          ),
          i('type', "'button' | 'submit' | 'reset'", 'Native `type`.', "'button'"),
          i('name', 'string', 'Native `name` for form submission.', "''"),
          i('label', 'string', 'Accessible name when content is icon-only.', "''"),
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
  fieldset: {
    importNames: ['AuFieldset'],
    sections: [
      {
        title: 'AuFieldset',
        description: 'Native fieldset wrapper for grouped form controls.',
        rows: [
          i('legend', 'string', 'Fieldset legend text.', "''"),
          i('description', 'string', 'Supporting copy under the legend.', "''"),
          i('disabled', 'boolean', 'Disables all nested controls.', 'false'),
          i('size', "'sm' | 'md'", 'Typography density.', "'md'"),
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
          'Project inside `au-form-field`. Implements `FormValueControl<string | null>`. Bind `[formField]` or `[(value)]`.',
        rows: [
          ...VALUE_FIELD_BASE,
          i('type', "'text' | 'password' | 'email' | …", 'Native `<input>` type.', "'text'"),
          i('autocomplete', 'string | undefined', 'Native `autocomplete` attribute.'),
          i('minLength', 'number | undefined', 'Native `minlength` validation.'),
          i('maxLength', 'number | undefined', 'Native `maxlength` validation.'),
          i('showPasswordToggle', 'boolean', 'Show/hide button when `type="password"`.', 'true'),
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
          i('rows', 'number', 'Visible `<textarea>` rows.', '4'),
          i('cols', 'number | undefined', 'Native column count.'),
          i('resize', "'vertical' | 'horizontal' | 'both' | 'none'", 'CSS `resize`.', "'vertical'"),
          i('spellcheck', 'boolean | undefined', 'Native `spellcheck` attribute.'),
          i('wrap', "'soft' | 'hard'", 'Native `wrap` attribute.', "'soft'"),
          i('autocomplete', 'string | undefined', 'Native `autocomplete` attribute.'),
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
        description: 'Implements `FormCheckboxControl`. Use `[(checked)]` or `[formField]`.',
        rows: [
          m('checked', 'ModelSignal<boolean>', 'Checked state.'),
          i('label', 'string', 'Inline label on the checkbox.', "''"),
          i('description', 'string', 'Supporting text (`aria-describedby`).', "''"),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid state.', 'false'),
          i('disabled', 'boolean', 'Disables interaction.', 'false'),
          i('required', 'boolean', 'Required field.', 'false'),
          i('indeterminate', 'boolean', 'Indeterminate state (e.g. select all).', 'false'),
          i('size', "'sm' | 'md' | 'lg'", 'Checkbox size.', "'md'"),
          i('name', 'string', 'Native `name` attribute.', "''"),
          o('blur', 'void', 'When the native input blurs.'),
          o('checkedChange', 'boolean', 'When the value changes.'),
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
          o('checkedChange', 'boolean', 'When toggled.'),
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
          i('placeholder', 'string', 'Placeholder when empty.', "''"),
          i('autocomplete', 'string | undefined', 'Native autocomplete.'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'When an option is selected.'),
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
          i('options', 'AuAutocompleteOption[]', 'Suggestion list.', '[]'),
          i('minFilterLength', 'number', 'Minimum characters before filtering.', '0'),
          i('caseSensitive', 'boolean', 'Case-sensitive filter.', 'false'),
          i('strictSelection', 'boolean', 'Blur clears value without an exact match.', 'true'),
          i('noResultsText', 'string', 'No-results message.', "'No results'"),
          i('autocomplete', 'string | undefined', 'Native attribute (default `off`).', "'off'"),
        ],
      },
    ],
  },
  avatar: {
    importNames: ['AuAvatar'],
    sections: [
      {
        title: 'AuAvatar',
        description: 'User image or initials fallback.',
        rows: [
          i('src', 'string', 'Image URL.', "''"),
          i('alt', 'string', 'Alternative text when `src` is set.', "''"),
          i('name', 'string', 'Display name for initials and `aria-label`.', "''"),
          i('size', "'xs' | 'sm' | 'md' | 'lg' | 'xl'", 'Diameter.', "'md'"),
          i(
            'shape',
            "'circle' | 'square'",
            'Circle (default) or square with rounded corners.',
            "'circle'",
          ),
          i('decorative', 'boolean', 'Hide from accessibility tree.', 'false'),
        ],
      },
    ],
  },
  accordion: {
    importNames: ['AuAccordion', 'AuAccordionItem', 'AuAccordionPanel'],
    sections: [
      {
        title: 'AuAccordion',
        description: 'Root accordion; bind expanded section keys with `[(value)]`.',
        rows: [
          m('value', 'ModelSignal<string[]>', 'Expanded section keys.'),
          i('multiple', 'boolean', 'Allow several panels open.', 'true'),
          i('ariaLabel', 'string', 'Accessible name for the region.', "''"),
          i('size', "'sm' | 'md'", 'Trigger typography density.', "'md'"),
          i('id', 'string', 'Stable id prefix for triggers/panels.', "''"),
          o('valueChange', 'string[]', 'When expanded keys change.'),
        ],
      },
      {
        title: 'AuAccordionItem',
        description: 'Place on `<button type="button">` with a string key matching its panel.',
        rows: [
          i('auAccordionItem', 'string', 'Section key (required input).'),
          i('auAccordionItemDisabled', 'boolean', 'Prevents expand/collapse.', 'false'),
        ],
      },
      {
        title: 'AuAccordionPanel',
        description: 'Panel region paired with a trigger key.',
        rows: [i('auAccordionPanel', 'string', 'Section key (required input).')],
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
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          o('blur', 'void', 'When the group blurs.'),
          o('valueChange', 'string | null', 'When an option is selected.'),
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
          i('min', 'number | undefined', 'Native minimum.'),
          i('max', 'number | undefined', 'Native maximum.'),
          i('step', "number | 'any'", 'Spinner step.', '1'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          i('placeholder', 'string', 'Placeholder.', "''"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'number | null', 'When a finite value changes.'),
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
          'Project inside `au-form-field`. Native range input. `FormValueControl<number>`.',
        rows: [
          m('value', 'ModelSignal<number>', 'Current value.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('name', 'string', 'Native `name`.', "''"),
          i('min', 'number | undefined', 'Range minimum (default 0).'),
          i('max', 'number | undefined', 'Range maximum (default 100).'),
          i('step', 'number', 'Native step.', '1'),
          i('showValue', 'boolean', 'Show live value output.', 'false'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'number', 'When a finite value changes.'),
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
          i('minDate', 'string | undefined', 'Native `min` attribute (ISO).'),
          i('maxDate', 'string | undefined', 'Native `max` attribute (ISO).'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'When a date is selected.'),
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
          'Project inside `au-form-field`. Native `type="time"`; value `HH:mm` or `null`.',
        rows: [
          m('value', 'ModelSignal<string | null>', 'Time as 24h string.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('readOnly', 'boolean', 'Read-only.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('minTime', 'string | undefined', 'Native `min` attribute (`HH:mm`).'),
          i('maxTime', 'string | undefined', 'Native `max` attribute (`HH:mm`).'),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          o('blur', 'void', 'Blur.'),
          o('valueChange', 'string | null', 'When a time is selected.'),
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
          'Project inside `au-form-field`. Drag-and-drop file picker. `FormValueControl<File[]>`.',
        rows: [
          m('value', 'ModelSignal<File[]>', 'Selected files.'),
          i('errors', 'ValidationError[]', 'From signal forms.', '[]'),
          i('invalid', 'boolean', 'Invalid.', 'false'),
          i('accept', 'string', 'Native `accept` filter.', "''"),
          i('multiple', 'boolean', 'Allow several files.', 'true'),
          i('disabled', 'boolean', 'Disabled.', 'false'),
          i('required', 'boolean', 'Required.', 'false'),
          i('name', 'string', 'Native `name`.', "''"),
          i('size', "'sm' | 'md' | 'lg'", 'Density.', "'md'"),
          i('browseLabel', 'string', 'Browse button label.', "'Browse files'"),
          i('dropLabel', 'string', 'Dropzone prompt.', "'Drag files here or browse'"),
          i('removeFileLabel', 'string', 'Prefix for remove button `aria-label`.', "'Remove file'"),
          o('blur', 'void', 'When the hidden input blurs.'),
          o('valueChange', 'File[]', 'When the file list changes.'),
        ],
      },
    ],
  },
  dialog: {
    importNames: ['AuDialog', 'AuDialogFooter', 'AuButton'],
    sections: [
      {
        title: 'AuDialog',
        description: 'Native `<dialog>` modal with focus trap and restore on close.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibility (`showModal` / `close`).'),
          i('title', 'string', 'Visible title; feeds `aria-labelledby`.', "''"),
          i('ariaLabel', 'string', 'Accessible name without a visible title.', "''"),
          i('id', 'string', 'Id prefix.', "''"),
          i('size', "'sm' | 'md' | 'lg' | 'full'", 'Panel width.', "'md'"),
          i('showCloseButton', 'boolean', 'Close button in header.', 'true'),
          i('closeOnBackdrop', 'boolean', 'Close on backdrop click.', 'true'),
          i('closeOnEscape', 'boolean', 'Close on Escape.', 'true'),
          o('close', 'void', 'After close (backdrop, Escape, button).'),
        ],
      },
      {
        title: 'AuDialogFooter',
        description:
          'Marker directive: `import { AuDialogFooter }` and project `<div auDialogFooter>`.',
        rows: [
          {
            name: 'auDialogFooter',
            type: 'directive',
            description: 'Footer action slot.',
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
        description: 'Side panel on native `<dialog>`.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibility.'),
          i('title', 'string', 'Visible title.', "''"),
          i('ariaLabel', 'string', 'Accessible name without title.', "''"),
          i('position', "'start' | 'end'", 'Slide-in edge (LTR: start=left, end=right).', "'end'"),
          i('size', "'sm' | 'md' | 'lg' | 'full'", 'Panel width.', "'md'"),
          i('showCloseButton', 'boolean', 'Header close button.', 'true'),
          i('closeOnBackdrop', 'boolean', 'Close on backdrop click.', 'true'),
          i('closeOnEscape', 'boolean', 'Close on Escape.', 'true'),
          o('close', 'void', 'After dismiss.'),
        ],
      },
      {
        title: 'AuDialogFooter / auDrawerFooter',
        description: 'Project `<div auDrawerFooter>` or `<div auDialogFooter>` for actions.',
        rows: [
          {
            name: 'auDrawerFooter',
            type: 'directive',
            description: 'Footer slot (alias of AuDialogFooter).',
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
        description: '`<article>` container with surface variants.',
        rows: [
          i('variant', "'elevated' | 'outlined' | 'filled'", 'Surface style.', "'elevated'"),
          i('size', "'sm' | 'md' | 'lg'", 'Inner padding (`--au-card-*`).', "'md'"),
          {
            name: 'hasFooter',
            type: 'Signal<boolean> (solo lectura)',
            description: 'True when content includes `auCardFooter`.',
          },
        ],
      },
      {
        title: 'Content projection',
        description: 'Attributes on projected content (not component inputs).',
        rows: [
          {
            name: 'auCardHeader',
            type: 'attribute',
            description: 'Header (use a semantic heading).',
          },
          { name: 'auCardBody', type: 'attribute', description: 'Main body.' },
          {
            name: 'auCardMedia',
            type: 'attribute',
            description: 'Full-bleed image or video at the top.',
          },
          {
            name: 'auCardFooter',
            type: 'attribute',
            description: 'Footer actions; requires `AuCardFooter` in imports.',
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
          m('value', 'ModelSignal<string>', 'Active tab key.'),
          i('ariaLabel', 'string', 'Accessible name for `tablist` without a visible label.', "''"),
          i('variant', "'line' | 'contained'", 'Underline or segmented.', "'line'"),
          i('orientation', "'horizontal' | 'vertical'", 'Tablist layout.', "'horizontal'"),
          i('size', "'sm' | 'md' | 'lg'", 'Tab height.', "'md'"),
          i('id', 'string', 'Tab/panel id prefix.', "''"),
          o('valueChange', 'string', 'When another tab is activated.'),
        ],
      },
      {
        title: 'AuTab',
        description: 'On `<button type="button" auTab="key">`.',
        rows: [
          {
            name: 'auTab',
            type: 'string (required)',
            description: 'Identifier; matches `auTabPanel`.',
          },
          i('auTabDisabled', 'boolean', 'Disables the tab.', 'false'),
        ],
      },
      {
        title: 'AuTabPanel',
        description: 'On `<div auTabPanel="key">`.',
        rows: [
          {
            name: 'auTabPanel',
            type: 'string (required)',
            description: 'Panel key paired with `auTab`.',
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
          i('label', 'string', 'Text when you do not project content.', "''"),
          i('variant', "'filled' | 'outline' | 'accent'", 'Visual style.', "'filled'"),
          i('size', "'sm' | 'md'", 'Density.', "'md'"),
          i('disabled', 'boolean', 'Disables interaction.', 'false'),
          i('removable', 'boolean', 'Shows remove button.', 'false'),
          i('selectable', 'boolean', 'Filter chip with `aria-pressed`.', 'false'),
          m('selected', 'ModelSignal<boolean>', 'State when `selectable`.', 'false'),
          i('removeLabel', 'string', 'Accessible name for the remove button.', "''"),
          o('removed', 'void', 'When remove is pressed.'),
          o('selectedChange', 'boolean', 'When selection changes.'),
          o('click', 'MouseEvent', 'When a selectable chip is activated.'),
        ],
      },
    ],
  },
  snackbar: {
    importNames: ['AuSnackbar'],
    sections: [
      {
        title: 'AuSnackbar',
        description: 'Portal toast; `durationMs` 0 = manual dismiss only.',
        rows: [
          m('open', 'ModelSignal<boolean>', 'Visibility.'),
          i('message', 'string', 'Primary text (or projected slot).', "''"),
          i(
            'variant',
            "'default' | 'success' | 'warning' | 'error' | 'info'",
            'Visual semantics.',
            "'default'",
          ),
          i('position', 'AuSnackbarPosition', 'Screen corner.', "'bottom-center'"),
          i('durationMs', 'number', 'Auto-dismiss in ms; `0` disables the timer.', '5000'),
          i('actionLabel', 'string', 'Optional action button label.', "''"),
          i('showCloseButton', 'boolean', 'Close button.', 'true'),
          i('showIcon', 'boolean', 'Variant icon (not on default).', 'true'),
          i('closeAriaLabel', 'string', 'Accessible name for close.', "'Dismiss notification'"),
          o('dismiss', 'void', 'When dismissed (timer, Escape, close).'),
          o('action', 'void', 'When the optional action is pressed.'),
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
          i('orientation', "'horizontal' | 'vertical'", 'Rule orientation.', "'horizontal'"),
          i('inset', 'boolean', 'Inset at the start (horizontal).', 'false'),
          i('label', 'string', 'Centered label (horizontal only).', "''"),
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
          'Centered empty placeholder; project actions in the default slot. Media priority: `[auEmptyStateMedia]` → `imageSrc` → `icon`.',
        rows: [
          i('title', 'string', 'Primary heading text.', "''"),
          i('description', 'string', 'Supporting copy under the title.', "''"),
          i(
            'icon',
            'AuIconName',
            'Decorative glyph in a sunken well; omit when using image or custom media.',
            'undefined',
          ),
          i(
            'imageSrc',
            'string',
            'Illustration URL; ignored when custom media is projected.',
            'undefined',
          ),
          i('imageAlt', 'string', 'Alt text for `imageSrc`; use `""` for decorative images.', "''"),
          i('size', "'sm' | 'md' | 'lg'", 'Layout density.', "'md'"),
          i('headingLevel', '2 | 3 | 4', 'Heading level for `title`.', '2'),
        ],
      },
      {
        title: 'AuEmptyStateMedia',
        description: 'Attribute on projected SVG, img, or markup for a custom illustration.',
        rows: [],
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
        description: 'Inline callout or full-width banner; error/warning use `role="alert"`.',
        rows: [
          i(
            'variant',
            "'default' | 'success' | 'warning' | 'error' | 'info'",
            'Semantic surface.',
            "'default'",
          ),
          i('layout', "'inline' | 'banner'", 'Surface width and chrome.', "'inline'"),
          i('title', 'string', 'Optional heading.', "''"),
          i('message', 'string', 'Body text (or default slot).', "''"),
          i('actionLabel', 'string', 'Optional action button label.', "''"),
          i('dismissible', 'boolean', 'Close button.', 'false'),
          i('showIcon', 'boolean', 'Variant icon (not on default).', 'true'),
          i('closeAriaLabel', 'string', 'Close button label.', "'Dismiss message'"),
          o('dismiss', 'void', 'When the user dismisses.'),
          o('action', 'void', 'When the action button is activated.'),
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
          i('size', "'xs' | 'sm' | 'md' | 'lg'", 'Dimensions.', "'md'"),
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
  spinner: {
    importNames: ['AuSpinner'],
    sections: [
      {
        title: 'AuSpinner',
        description: 'Live region for inline loading; optional visible label.',
        rows: [
          i('size', "'sm' | 'md' | 'lg'", 'Spinner glyph size.', "'md'"),
          i('decorative', 'boolean', 'Glyph only inside a parent that names the wait.', 'false'),
          i(
            'label',
            'string',
            'Visible status copy; omit for glyph-only (`aria-label="Loading"`).',
          ),
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
  badge: {
    importNames: ['AuBadge'],
    sections: [
      {
        title: 'AuBadge',
        rows: [
          i(
            'variant',
            "'default' | 'accent' | 'success' | 'warning' | 'error' | 'info'",
            'Semantic surface.',
            "'default'",
          ),
          i('dot', 'boolean', 'Indicator without visible label text.', 'false'),
          i('label', 'string', 'Visible count or status text.', "''"),
        ],
      },
    ],
  },
  breadcrumb: {
    importNames: ['AuBreadcrumb'],
    sections: [
      {
        title: 'AuBreadcrumb',
        rows: [
          i('items', 'AuBreadcrumbItem[]', 'Trail segments (`label`, optional `href`).', '[]'),
        ],
      },
    ],
  },
  link: {
    importNames: ['AuLink'],
    sections: [
      {
        title: 'AuLink',
        description: 'On `<a auLink>` or `<au-link>`.',
        rows: [
          i('variant', "'default' | 'subtle'", 'Visual emphasis.', "'default'"),
          i('href', 'string', 'Destination URL.', "'#'"),
          i('external', 'boolean', 'Opens in new tab with `noopener noreferrer`.', 'false'),
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
          m('open', 'ModelSignal<boolean>', 'Panel open state.'),
          i('placement', 'AuTooltipPlacement', 'Preferred panel position.', "'bottom'"),
          i('disabled', 'boolean', 'Prevents opening.', 'false'),
          o('openChange', 'boolean', 'When open state changes.'),
        ],
      },
      {
        title: 'AuMenuTrigger',
        description: 'Directive on the toggle control (`auMenuTrigger`).',
        rows: [],
      },
      {
        title: 'AuMenuItem',
        rows: [
          i('disabled', 'boolean', 'Disables the action.', 'false'),
          o('select', 'void', 'When the user activates the item; closes the menu.'),
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
          m('open', 'ModelSignal<boolean>', 'Panel open state.'),
          i('placement', 'AuTooltipPlacement', 'Preferred panel position.', "'bottom'"),
          i('disabled', 'boolean', 'Prevents opening.', 'false'),
          o('openChange', 'boolean', 'When open state changes.'),
        ],
      },
      {
        title: 'AuPopoverTrigger',
        description: 'Directive on the toggle control (`auPopoverTrigger`).',
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
          i('page', 'number', 'Current page (1-based).', '1'),
          i('pageCount', 'number', 'Total pages (≥ 1).', '1'),
          i('disabled', 'boolean', 'Disables all controls.', 'false'),
          o('pageChange', 'number', 'When the user selects a page.'),
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
          i('mode', "'determinate' | 'indeterminate'", 'Progress display mode.', "'determinate'"),
          i('value', 'number', 'Current value (determinate).', '0'),
          i('max', 'number', 'Maximum value (determinate).', '100'),
          i('label', 'string', 'Overrides `aria-valuetext` when set.', "''"),
        ],
      },
    ],
  },
  table: {
    importNames: ['AuTable', 'AuTableColumn', 'AuTableCellDef'],
    sections: [
      {
        title: 'AuTable',
        description: 'Data grid; declare columns with `au-table-column`.',
        rows: [
          i('data', 'readonly unknown[]', 'Rows rendered in the table body.', '—'),
          i('title', 'string', 'Visible heading above the grid.', "''"),
          i('description', 'string', 'Supporting line under `title`.', "''"),
          i('caption', 'string', 'Screen-reader table name.', "''"),
          i('striped', 'boolean', 'Alternating row background.', 'false'),
          i('compact', 'boolean', 'Reduced cell padding.', 'false'),
          i('stickyHeader', 'boolean', 'Sticky header while scrolling.', 'false'),
          i('loading', 'boolean', 'Shows a loading row and sets `aria-busy`.', 'false'),
          i(
            'loadingMessage',
            'string',
            'Visible copy on the loading-row `au-spinner` (`label`).',
            "'Loading…'",
          ),
          i(
            'clientSort',
            'boolean',
            'Sort rows inside the table when headers are clicked.',
            'true',
          ),
          m('sort', 'AuTableSortState | null', 'Active sort column and direction.', 'null'),
          o('sortChange', 'AuTableSortState | null', 'When the user toggles sort.'),
          i('selectionMode', "'none' | 'single' | 'multiple'", 'Row selection behavior.', "'none'"),
          m('selection', 'readonly unknown[]', 'Selected row objects from `[data]`.', '[]'),
          o('selectionChange', 'readonly unknown[]', 'When selection changes.'),
          i(
            'compareSelection',
            '(a, b) => boolean',
            'Equality for matching rows in `selection`.',
            'reference equality',
          ),
          i(
            'selectAllLabel',
            'string',
            'Accessible name for the header checkbox (multiple).',
            "'Select all rows'",
          ),
          i('selectRowLabel', 'string', 'Accessible name for each row checkbox.', "'Select row'"),
          i(
            'trackByFn',
            '(index, row) => unknown',
            'Stable identity for row tracking.',
            'undefined',
          ),
          i(
            'emptyMessage',
            'string',
            'Fallback text when `data` is empty and no `au-empty-state` is projected.',
            "'No data'",
          ),
        ],
      },
      {
        title: 'AuTableColumn',
        description: 'Child of `au-table`; one per column.',
        rows: [
          i('name', 'string', 'Column key (row property).', '—'),
          i('header', 'string', 'Header label.', '—'),
          i('sortable', 'boolean', 'Sort control in header.', 'false'),
          i('align', "'start' | 'end' | 'center'", 'Cell alignment.', "'start'"),
          i(
            'cellVariant',
            "'default' | 'primary' | 'secondary'",
            'Default cell emphasis.',
            "'default'",
          ),
          i('accessor', '(row) => unknown', 'Custom value reader.', 'undefined'),
        ],
      },
      {
        title: 'AuTableCellDef',
        description:
          '`ng-template[auTableCell] let-row` inside `au-table-column` for custom cells.',
        rows: [],
      },
    ],
  },
  tooltip: {
    importNames: ['AuTooltip'],
    sections: [
      {
        title: 'AuTooltip',
        description: 'Directive on a focusable trigger (`button`, `a`, etc.).',
        rows: [
          i('auTooltip', 'string', 'Tooltip text (empty = no tooltip).', "''"),
          i(
            'auTooltipPlacement',
            'AuTooltipPlacement',
            'Preferred placement; flips if there is no room.',
            "'top'",
          ),
          i('auTooltipShowDelay', 'number', 'Show delay (ms).', '200'),
          i('auTooltipHideDelay', 'number', 'Hide delay (ms).', '100'),
          i('auTooltipDisabled', 'boolean', 'Suppresses the tooltip.', 'false'),
        ],
      },
    ],
  },
};
