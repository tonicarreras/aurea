/** Shared Storybook chrome for field controls wrapped in `au-form-field`. */

/** Chrome args for stories that wrap a control in `au-form-field`. */
export interface FieldChromeStoryArgs {
  label: string;
  hint: string;
  errorMessage: string;
  invalid: boolean;
  required: boolean;
  /** Story arg only — maps to `au-form-field` `[controlIdInput]` (not the control's `controlId()` signal). */
  controlIdInput: string;
  showRequired?: boolean;
}

export const fieldChromeArgTypes = {
  label: {
    control: 'text' as const,
    description: 'Label on `au-form-field` (or `<legend>` for radio group).',
    table: { category: 'Chrome' },
  },
  hint: {
    control: 'text' as const,
    description: 'Helper text on `au-form-field`.',
    table: { category: 'Content' },
  },
  errorMessage: {
    control: 'text' as const,
    description: 'Manual error on `au-form-field`.',
    table: { category: 'Validation' },
  },
  invalid: {
    control: 'boolean' as const,
    table: { category: 'Validation' },
  },
  required: {
    control: 'boolean' as const,
    table: { category: 'Validation' },
  },
  controlIdInput: {
    control: 'text' as const,
    description:
      'Stable id on `au-form-field` (`controlIdInput`); shared with the projected control.',
    table: { category: 'Accessibility' },
  },
  showRequired: {
    control: 'boolean' as const,
    table: { category: 'Chrome' },
  },
};

export const defaultFieldChromeArgs: FieldChromeStoryArgs = {
  label: '',
  hint: '',
  errorMessage: '',
  invalid: false,
  required: false,
  controlIdInput: '',
  showRequired: true,
};

export const fieldChromeHintOnlyArgTypes = {
  hint: fieldChromeArgTypes.hint,
  errorMessage: fieldChromeArgTypes.errorMessage,
  invalid: fieldChromeArgTypes.invalid,
  required: fieldChromeArgTypes.required,
  controlIdInput: fieldChromeArgTypes.controlIdInput,
  showRequired: fieldChromeArgTypes.showRequired,
};

/** Renders projected control markup inside `au-form-field` (visible in Storybook “Show code”). */
export function formFieldControlRender(
  moduleImports: unknown[],
  args: Record<string, unknown>,
  controlTemplate: string,
) {
  return {
    props: args,
    moduleMetadata: { imports: moduleImports },
    template: `<au-form-field
  [label]="label"
  [hint]="hint"
  [errorMessage]="errorMessage"
  [invalid]="invalid"
  [required]="required"
  [showRequired]="showRequired"
  [controlIdInput]="controlIdInput"
>
${controlTemplate}
</au-form-field>`,
  };
}

/** Checkbox/switch: hint and error on `au-form-field`; inline `label` stays on the control. */
export function formFieldHintOnlyRender(
  moduleImports: unknown[],
  args: Record<string, unknown>,
  controlTemplate: string,
) {
  return {
    props: args,
    moduleMetadata: { imports: moduleImports },
    template: `<au-form-field
  [hint]="hint"
  [errorMessage]="errorMessage"
  [invalid]="invalid"
  [required]="required"
  [showRequired]="showRequired"
  [controlIdInput]="controlIdInput"
>
${controlTemplate}
</au-form-field>`,
  };
}
