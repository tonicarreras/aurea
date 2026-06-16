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
    code: `<button auButton (click)="open.set(true)">Abrir</button>

<au-dialog [(open)]="open" title="¿Quieres aceptar?" size="sm">
  <p>Esta acción no se puede deshacer.</p>
  <div auDialogFooter>
    <button auButton style="margin-right: var(--au-space-2);" variant="secondary" (click)="open.set(false)">Cancelar</button>
    <button auButton (click)="open.set(false)">Eliminar</button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
  {
    title: 'Formulario con errores',
    demoComponent: ExampleDialogFormValidationDemo,
    code: `<button auButton (click)="open.set(true)">Editar perfil</button>

<au-dialog [(open)]="open" title="Editar perfil" size="md">
  <au-form-field label="Nombre" errorMessage="El nombre es obligatorio." [invalid]="true">
    <input auInputText />
  </au-form-field>
  <au-form-field label="Email" errorMessage="Introduce un email válido." [invalid]="true">
    <input auInputText type="email" />
  </au-form-field>
  <div auDialogFooter>
    <button auButton variant="secondary" (click)="open.set(false)">Cancelar</button>
    <button auButton (click)="open.set(false)">Guardar</button>
  </div>
</au-dialog>`,
    language: 'typescript',
  },
];
