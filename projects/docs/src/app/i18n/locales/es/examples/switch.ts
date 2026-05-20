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
      title: 'Deshabilitado',
      demoComponent: ExampleSwitchDisabledDemo,
      code: `<au-switch label="Modo avión" [checked]="true" [disabled]="true" />`,
    },
    {
      title: 'Obligatorio con error',
      description: 'Combina `[required]` y `errorMessage` para consentimientos o toggles críticos.',
      demoComponent: ExampleSwitchErrorDemo,
      code: `<au-switch
  label="Acepto la política de privacidad"
  [required]="true"
  errorMessage="Debes activar esta opción para continuar."
/>`,
    },
];
