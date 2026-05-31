import {
  ExampleAccordionBasicDemo,
  ExampleAccordionSingleDemo,
} from '../../../../demos/examples/accordion.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Varias secciones',
    description: 'Varios paneles abiertos a la vez con `[(value)]` y `[multiple]="true"`.',
    demoComponent: ExampleAccordionBasicDemo,
    code: `import { AuAccordion, AuAccordionItem, AuAccordionPanel } from '@aurea-design-system/components';

<au-accordion [(value)]="expanded" ariaLabel="Ajustes de cuenta">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="profile">Perfil</button>
    <div auAccordionPanel="profile">Actualiza nombre y avatar.</div>
  </div>
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="billing">Facturación</button>
    <div auAccordionPanel="billing">Gestiona métodos de pago.</div>
  </div>
</au-accordion>`,
  },
  {
    title: 'Expansión única',
    description: 'Con `[multiple]="false"` abrir una sección cierra las demás.',
    demoComponent: ExampleAccordionSingleDemo,
    code: `<au-accordion [(value)]="expanded" [multiple]="false" ariaLabel="FAQ">
  <div class="au-accordion__item">
    <button type="button" auAccordionItem="one">Sección uno</button>
    <div auAccordionPanel="one">Panel uno</div>
  </div>
</au-accordion>`,
  },
];
