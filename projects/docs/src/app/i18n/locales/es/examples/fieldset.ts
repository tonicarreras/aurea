import {
  ExampleFieldsetBasicDemo,
  ExampleFieldsetDisabledDemo,
} from '../../../../demos/examples/fieldset.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Campos agrupados',
    description: '`fieldset` nativo con leyenda, descripción y campos proyectados.',
    demoComponent: ExampleFieldsetBasicDemo,
    code: `import { AuFieldset, AuFormField, AuInputText } from '@aurea-design-system/components';

<au-fieldset legend="Dirección de envío" description="Dónde entregamos tu pedido.">
  <au-form-field label="Calle">
    <au-input-text />
  </au-form-field>
</au-fieldset>`,
  },
  {
    title: 'Grupo deshabilitado',
    description: 'Deshabilita todos los controles anidados vía el atributo nativo del `fieldset`.',
    demoComponent: ExampleFieldsetDisabledDemo,
    code: `<au-fieldset legend="Dirección de envío" [disabled]="true">
  <au-form-field label="Calle">
    <au-input-text />
  </au-form-field>
</au-fieldset>`,
  },
];
