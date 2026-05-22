import {
  ExampleFormFieldBasicDemo,
  ExampleFormFieldErrorDemo,
  ExampleFormFieldHintDemo,
} from '../../../../demos/examples/form-field.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Campo básico',
    demoComponent: ExampleFormFieldBasicDemo,
    code: `<au-form-field label="Email" [required]="true">
  <au-input-text type="email" placeholder="tu@correo.com" />
</au-form-field>`,
  },
  {
    title: 'Con hint',
    demoComponent: ExampleFormFieldHintDemo,
    code: `<au-form-field label="Usuario" hint="Entre 3 y 20 caracteres.">
  <au-input-text placeholder="nombre" />
</au-form-field>`,
  },
  {
    title: 'Con error',
    demoComponent: ExampleFormFieldErrorDemo,
    code: `<au-form-field
  label="Email"
  errorMessage="Introduce un correo válido."
  [invalid]="true"
>
  <au-input-text type="email" />
</au-form-field>`,
  },
];
