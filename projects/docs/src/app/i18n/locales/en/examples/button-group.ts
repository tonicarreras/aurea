import { ExampleButtonGroupBasicDemo } from '../../../../demos/examples/button-group.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Attached actions',
    demoComponent: ExampleButtonGroupBasicDemo,
    code: `import { AuButton, AuButtonGroup } from '@aurea-design-system/components';

<au-button-group ariaLabel="Document actions">
  <button auButton variant="outline">Cancel</button>
  <button auButton variant="secondary">Draft</button>
  <button auButton>Publish</button>
</au-button-group>`,
  },
];
