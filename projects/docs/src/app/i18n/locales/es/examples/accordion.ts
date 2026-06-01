import {
  ExampleAccordionBasicDemo,
  ExampleAccordionSingleDemo,
} from '../../../../demos/examples/accordion.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Por defecto',
    demoComponent: ExampleAccordionBasicDemo,
    code: `import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';

<au-accordion [(value)]="expanded" ariaLabel="Ajustes de cuenta">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="profile">Perfil</button>
    <au-accordion-panel panel="profile">Actualiza nombre y avatar.</au-accordion-panel>
  </div>
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="billing">Facturación</button>
    <au-accordion-panel panel="billing">Gestiona métodos de pago.</au-accordion-panel>
  </div>
</au-accordion>`,
  },
  {
    title: 'Expansión única',
    demoComponent: ExampleAccordionSingleDemo,
    code: `<au-accordion [(value)]="expanded" [multiple]="false" ariaLabel="FAQ">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="one">Sección uno</button>
    <au-accordion-panel panel="one">Panel uno</au-accordion-panel>
  </div>
</au-accordion>`,
  },
];
