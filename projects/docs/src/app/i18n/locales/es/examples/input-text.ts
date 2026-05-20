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
      code: `<au-input-text label="Email" placeholder="tu@correo.com" />`,
    },
    {
      title: 'Con hint',
      demoComponent: ExampleInputTextHintDemo,
      code: `<au-input-text
  label="Usuario"
  hint="Entre 3 y 20 caracteres."
  placeholder="nombre"
/>`,
    },
    {
      title: 'Con error',
      demoComponent: ExampleInputTextErrorDemo,
      code: `<au-input-text
  label="Email"
  errorMessage="Introduce un correo válido."
/>`,
    },
];
