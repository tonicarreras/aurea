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
    code: `<button type="button" auSwitch label="Notificaciones push"></button>`,
  },
  {
    title: 'Desactivado',
    demoComponent: ExampleSwitchDisabledDemo,
    code: `<button type="button" auSwitch label="Modo avión" [checked]="true" [disabled]="true"></button>`,
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
  <button type="button" auSwitch label="Acepto la política de privacidad"></button>
</au-form-field>`,
  },
];
