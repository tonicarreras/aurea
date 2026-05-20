import {
  ExampleDialogConfirmDemo,
  ExampleDialogFormValidationDemo,
} from '../../../../demos/examples/dialog.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
{
      title: 'Confirmación',
      description: 'Diálogo modal con pie de acciones.',
      demoComponent: ExampleDialogConfirmDemo,
      code: `<au-button (click)="open.set(true)">Abrir</au-button>

<au-dialog [(open)]="open" title="Eliminar proyecto" size="sm">
  <p>Esta acción no se puede deshacer.</p>
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancelar</au-button>
    <au-button (click)="open.set(false)">Eliminar</au-button>
  </div>
</au-dialog>`,
      language: 'typescript',
    },
    {
      title: 'Formulario con errores',
      description: 'Campos con `errorMessage` dentro del diálogo; útil para validación al enviar.',
      demoComponent: ExampleDialogFormValidationDemo,
      code: `<au-button (click)="open.set(true)">Editar perfil</au-button>

<au-dialog [(open)]="open" title="Editar perfil" size="md">
  <au-input-text label="Nombre" errorMessage="El nombre es obligatorio." />
  <au-input-text label="Email" errorMessage="Introduce un correo válido." />
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancelar</au-button>
    <au-button (click)="open.set(false)">Guardar</au-button>
  </div>
</au-dialog>`,
      language: 'typescript',
    },
];
