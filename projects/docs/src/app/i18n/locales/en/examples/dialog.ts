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
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Eliminar</au-button>
  </div>
</au-dialog>`,
      language: 'typescript',
    },
    {
      title: 'Form with errors',
      description: 'Fields with `errorMessage` inside the dialog; typical for submit validation.',
      demoComponent: ExampleDialogFormValidationDemo,
      code: `<au-button (click)="open.set(true)">Edit profile</au-button>

<au-dialog [(open)]="open" title="Edit profile" size="md">
  <au-input-text label="Name" errorMessage="Name is required." />
  <au-input-text label="Email" errorMessage="Enter a valid email address." />
  <div auDialogFooter>
    <au-button variant="secondary" (click)="open.set(false)">Cancel</au-button>
    <au-button (click)="open.set(false)">Save</au-button>
  </div>
</au-dialog>`,
      language: 'typescript',
    },
];
