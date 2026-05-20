import { examples as buttonExamples } from './button';
import { examples as inputTextExamples } from './input-text';
import { examples as textareaExamples } from './textarea';
import { examples as checkboxExamples } from './checkbox';
import { examples as switchExamples } from './switch';
import { examples as selectExamples } from './select';
import { examples as autocompleteExamples } from './autocomplete';
import { examples as radioGroupExamples } from './radio-group';
import { examples as inputNumberExamples } from './input-number';
import { examples as inputDateExamples } from './input-date';
import { examples as dialogExamples } from './dialog';
import { examples as cardExamples } from './card';
import { examples as tabsExamples } from './tabs';
import { examples as chipExamples } from './chip';
import { examples as snackbarExamples } from './snackbar';
import { examples as dividerExamples } from './divider';
import { examples as tooltipExamples } from './tooltip';
import type { ComponentDocExample } from '../../../types/example';

export type { ComponentDocExample } from '../../../types/example';

export const COMPONENT_DOC_EXAMPLES_ES: Record<string, ComponentDocExample[]> = {
  button: buttonExamples,
  'input-text': inputTextExamples,
  textarea: textareaExamples,
  checkbox: checkboxExamples,
  switch: switchExamples,
  select: selectExamples,
  autocomplete: autocompleteExamples,
  'radio-group': radioGroupExamples,
  'input-number': inputNumberExamples,
  'input-date': inputDateExamples,
  dialog: dialogExamples,
  card: cardExamples,
  tabs: tabsExamples,
  chip: chipExamples,
  snackbar: snackbarExamples,
  divider: dividerExamples,
  tooltip: tooltipExamples,
};
