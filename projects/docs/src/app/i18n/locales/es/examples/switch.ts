import {
  ExampleSwitchBasicDemo,
  ExampleSwitchDisabledDemo,
  ExampleSwitchErrorDemo,
} from '../../../../demos/examples/switch.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Switch básico',
    demoComponent: ExampleSwitchBasicDemo,
    code: `<au-switch label="Notificaciones push" />`,
  },
  {
    title: 'Desactivado',
    demoComponent: ExampleSwitchDisabledDemo,
    code: `<au-switch label="Modo avión" [checked]="true" [disabled]="true" />`,
  },
  {
    title: 'Obligatorio con error',
    description: '`label` inline en el switch; hint y error en `au-form-field`.',
    demoComponent: ExampleSwitchErrorDemo,
    code: `<au-form-field
  errorMessage="Debes activar esta opción para continuar."
  [required]="true"
  [invalid]="true"
>
  <au-switch label="Acepto la política de privacidad" />
</au-form-field>`,
  },
];
