import {
  ExampleInputTextBasicDemo,
  ExampleInputTextErrorDemo,
  ExampleInputTextHintDemo,
} from '../../../../demos/examples/input-text.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Campo básico',
    demoComponent: ExampleInputTextBasicDemo,
    code: `<au-form-field label="Email">
  <au-input-text type="email" placeholder="tu@correo.com" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleInputTextHintDemo,
    code: `<au-form-field label="Usuario" hint="Entre 3 y 20 caracteres.">
  <au-input-text placeholder="nombre" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleInputTextErrorDemo,
    code: `<au-form-field
  label="Email"
  errorMessage="Introduce un correo válido."
  [invalid]="true"
>
  <au-input-text type="email" />
</au-form-field>`,
  },
];
