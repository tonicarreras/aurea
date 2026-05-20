import {
  ExampleSnackbarErrorDemo,
  ExampleSnackbarSuccessDemo,
} from '../../../../demos/examples/snackbar.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Éxito',
      demoComponent: ExampleSnackbarSuccessDemo,
      code: `<au-snackbar
  [(open)]="saved"
  message="Cambios guardados"
  variant="success"
  [durationMs]="3000"
/>`,
      language: 'typescript',
    },
    {
      title: 'Error',
      demoComponent: ExampleSnackbarErrorDemo,
      code: `<au-snackbar
  [(open)]="failed"
  message="No se pudo guardar"
  variant="error"
/>`,
      language: 'typescript',
    },
];
