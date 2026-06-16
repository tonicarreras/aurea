import { ExampleButtonGroupBasicDemo } from '../../../../demos/examples/button-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Acciones unidas',
    demoComponent: ExampleButtonGroupBasicDemo,
    code: `import { AuButton, AuButtonGroup } from '@aurea-design-system/components';

<au-button-group ariaLabel="Acciones del documento">
  <button auButton variant="outline">Cancelar</button>
  <button auButton variant="secondary">Borrador</button>
  <button auButton>Publicar</button>
</au-button-group>`,
  },
];
