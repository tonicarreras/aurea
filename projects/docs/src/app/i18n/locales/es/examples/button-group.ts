import { ExampleButtonGroupBasicDemo } from '../../../../demos/examples/button-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Acciones unidas',
    demoComponent: ExampleButtonGroupBasicDemo,
    code: `import { AuButton, AuButtonGroup } from '@aurea-design-system/components';

<au-button-group ariaLabel="Acciones del documento">
  <au-button variant="outline">Cancelar</au-button>
  <au-button variant="secondary">Borrador</au-button>
  <au-button>Publicar</au-button>
</au-button-group>`,
  },
];
