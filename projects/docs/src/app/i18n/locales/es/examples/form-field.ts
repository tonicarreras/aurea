import {
  ExampleFormFieldBasicDemo,
  ExampleFormFieldErrorDemo,
  ExampleFormFieldHintDemo,
} from '../../../../demos/examples/form-field.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Con hint',
    demoComponent: ExampleFormFieldHintDemo,
    code: `<au-form-field label="Usuario" hint="Entre 3 y 20 caracteres.">
  <input auInputText placeholder="nombre" />
</au-form-field>`,
  },
  {
    title: 'Campo básico',
    demoComponent: ExampleFormFieldBasicDemo,
    code: `<au-form-field
  label="Email"
  hint="Usamos tu correo solo para avisos."
  [required]="true"
>
  <input auInputText type="email" placeholder="tu@correo.com" />
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
  <input auInputText type="email" />
</au-form-field>`,
  },
];
