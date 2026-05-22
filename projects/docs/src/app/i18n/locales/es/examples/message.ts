import {
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
];
