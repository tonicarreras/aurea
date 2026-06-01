import {
  ExampleInputPasswordBasicDemo,
  ExampleInputPasswordSignUpDemo,
} from '../../../../demos/examples/input-password.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Inicio de sesión',
    demoComponent: ExampleInputPasswordBasicDemo,
    code: `<au-form-field label="Contraseña" hint="Usa al menos 12 caracteres.">
  <au-input-password autocomplete="current-password" />
</au-form-field>`,
  },
  {
    title: 'Registro',
    description: 'Usa `autocomplete="new-password"` en flujos de alta.',
    demoComponent: ExampleInputPasswordSignUpDemo,
    code: `<au-form-field label="Crear contraseña" [required]="true">
  <au-input-password autocomplete="new-password" [required]="true" />
</au-form-field>`,
  },
];
