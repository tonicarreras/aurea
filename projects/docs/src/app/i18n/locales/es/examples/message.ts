import {
  ExampleMessageBannerActionDemo,
  ExampleMessageBannerDemo,
  ExampleMessageDismissibleDemo,
  ExampleMessageErrorDemo,
  ExampleMessageSuccessDemo,
} from '../../../../demos/examples/message.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Éxito',
    demoComponent: ExampleMessageSuccessDemo,
    code: `<au-message
  variant="success"
  title="Perfil actualizado"
  message="Los cambios se guardaron."
/>`,
  },
  {
    title: 'Error',
    demoComponent: ExampleMessageErrorDemo,
    code: `<au-message variant="error" message="Corrige los campos resaltados." />`,
  },
  {
    title: 'Descartable',
    demoComponent: ExampleMessageDismissibleDemo,
    code: `<au-message
  variant="info"
  message="Puedes cerrar este aviso."
  [dismissible]="true"
  (dismiss)="onDismiss()"
/>`,
  },
  {
    title: 'Banner',
    demoComponent: ExampleMessageBannerDemo,
    code: `<au-message
  layout="banner"
  variant="info"
  title="Mantenimiento programado"
  message="Modo solo lectura de 18:00 a 19:00 UTC."
  [dismissible]="true"
/>`,
  },
  {
    title: 'Banner con acción',
    demoComponent: ExampleMessageBannerActionDemo,
    code: `<au-message
  layout="banner"
  variant="warning"
  title="Prueba por terminar"
  message="Actualiza el plan para conservar funciones de equipo."
  actionLabel="Ver planes"
  [dismissible]="true"
/>`,
  },
];
