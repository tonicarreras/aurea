import { ExampleButtonGroupBasicDemo } from '../../../../demos/examples/button-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Attached actions',
    demoComponent: ExampleButtonGroupBasicDemo,
    code: `import { AuButton, AuButtonGroup } from '@aurea-design-system/components';

<au-button-group ariaLabel="Document actions">
  <au-button variant="outline">Cancel</au-button>
  <au-button variant="secondary">Draft</au-button>
  <au-button>Publish</au-button>
</au-button-group>`,
  },
];
