import {
  ExampleCheckboxBasicDemo,
  ExampleCheckboxCheckedDemo,
  ExampleCheckboxIndeterminateDemo,
} from '../../../../demos/examples/checkbox.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Sin marcar',
    demoComponent: ExampleCheckboxBasicDemo,
    code: `<input type="checkbox" auCheckbox label="Acepto los términos" />`,
  },
  {
    title: 'Marcado',
    demoComponent: ExampleCheckboxCheckedDemo,
    code: `<input type="checkbox" auCheckbox label="Newsletter" [checked]="true" />`,
  },
  {
    title: 'Indeterminado',
    description: 'Útil para patrones «seleccionar todo» con selección parcial.',
    demoComponent: ExampleCheckboxIndeterminateDemo,
    code: `<input type="checkbox" auCheckbox label="Seleccionar todo" [indeterminate]="true" />`,
  },
];
