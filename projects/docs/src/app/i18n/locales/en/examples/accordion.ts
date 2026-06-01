import {
  ExampleAccordionBasicDemo,
  ExampleAccordionContainedDemo,
  ExampleAccordionSingleDemo,
} from '../../../../demos/examples/accordion.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Default',
    demoComponent: ExampleAccordionBasicDemo,
    code: `import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';

<au-accordion [(value)]="expanded" ariaLabel="Account settings">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="profile">Profile</button>
    <au-accordion-panel panel="profile">Update your name and avatar.</au-accordion-panel>
  </div>
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="billing">Billing</button>
    <au-accordion-panel panel="billing">Manage payment methods.</au-accordion-panel>
  </div>
</au-accordion>`,
  },
  {
    title: 'Contained',
    demoComponent: ExampleAccordionContainedDemo,
    code: `<au-accordion [(value)]="expanded" variant="contained" ariaLabel="Account settings">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="profile">Profile</button>
    <au-accordion-panel panel="profile">Update your name and avatar.</au-accordion-panel>
  </div>
</au-accordion>`,
  },
  {
    title: 'Single expand',
    demoComponent: ExampleAccordionSingleDemo,
    code: `<au-accordion [(value)]="expanded" [multiple]="false" ariaLabel="FAQ">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="one">Section one</button>
    <au-accordion-panel panel="one">Panel one</au-accordion-panel>
  </div>
</au-accordion>`,
  },
];
