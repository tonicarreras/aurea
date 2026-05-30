import {
  ExampleSpinnerDefaultDemo,
  ExampleSpinnerLabeledEsDemo,
} from '../../../../demos/examples/spinner.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Solo glifo',
    description: 'Omite `label` para un indicador compacto (`aria-label="Loading"`).',
    demoComponent: ExampleSpinnerDefaultDemo,
    code: `import { AuSpinner } from '@aurea-design-system/components';

<au-spinner size="md" />`,
  },
  {
    title: 'Con label',
    description: '`label` muestra el texto visible y nombra la región viva.',
    demoComponent: ExampleSpinnerLabeledEsDemo,
    code: `import { AuSpinner } from '@aurea-design-system/components';

<au-spinner size="sm" label="Cargando miembros del equipo…" />`,
  },
];
