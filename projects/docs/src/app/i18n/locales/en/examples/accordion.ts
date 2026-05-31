import {
  ExampleAccordionBasicDemo,
  ExampleAccordionSingleDemo,
} from '../../../../demos/examples/accordion.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Multiple sections',
    description: 'Expand several panels at once with `[(value)]` and `[multiple]="true"`.',
    demoComponent: ExampleAccordionBasicDemo,
    code: `import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';

<au-accordion [(value)]="expanded" ariaLabel="Account settings">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="profile">Profile</button>
    <div auAccordionPanel="profile">Update your name and avatar.</div>
  </div>
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="billing">Billing</button>
    <div auAccordionPanel="billing">Manage payment methods.</div>
  </div>
</au-accordion>`,
  },
  {
    title: 'Single expand',
    description: 'Set `[multiple]="false"` so opening one section closes the others.',
    demoComponent: ExampleAccordionSingleDemo,
    code: `<au-accordion [(value)]="expanded" [multiple]="false" ariaLabel="FAQ">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="one">Section one</button>
    <div auAccordionPanel="one">Panel one</div>
  </div>
</au-accordion>`,
  },
];
