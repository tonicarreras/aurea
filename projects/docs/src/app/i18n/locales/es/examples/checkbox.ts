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
    code: `<au-checkbox label="Acepto los términos" />`,
  },
  {
    title: 'Marcado',
    demoComponent: ExampleCheckboxCheckedDemo,
    code: `<au-checkbox label="Newsletter" [checked]="true" />`,
  },
  {
    title: 'Indeterminado',
    description: 'Útil para patrones «seleccionar todo» con selección parcial.',
    demoComponent: ExampleCheckboxIndeterminateDemo,
    code: `<au-checkbox label="Seleccionar todo" [indeterminate]="true" />`,
  },
];
