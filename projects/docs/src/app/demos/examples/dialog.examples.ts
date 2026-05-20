import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialog, AuDialogFooter, AuInputText } from '@aurea-design-system/components';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-example-dialog-confirm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <au-button type="button" (click)="open.set(true)">Abrir diálogo</au-button>
    <au-dialog [(open)]="open" title="Eliminar proyecto" size="sm">
      <p>Esta acción no se puede deshacer.</p>
      <div auDialogFooter>
        <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
        <au-button type="button" (click)="open.set(false)">Eliminar</au-button>
      </div>
    </au-dialog>
  `,
})
export class ExampleDialogConfirmDemo {
  readonly open = model(false);
}

@Component({
  selector: 'docs-example-dialog-form-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter, AuInputText],
  template: `
    <au-button type="button" (click)="open.set(true)">Editar perfil</au-button>
    <au-dialog [(open)]="open" title="Editar perfil" size="md">
      <div class="docs-demo-stack">
        <au-input-text
          label="Nombre"
          errorMessage="El nombre es obligatorio."
          placeholder="Tu nombre"
          style="max-width: 100%"
        />
        <au-input-text
          label="Email"
          errorMessage="Introduce un correo válido."
          placeholder="tu@correo.com"
          style="max-width: 100%"
        />
      </div>
      <div auDialogFooter>
        <au-button variant="secondary" type="button" (click)="open.set(false)">Cancelar</au-button>
        <au-button type="button" (click)="open.set(false)">Guardar</au-button>
      </div>
    </au-dialog>
  `,
  styles: [DEMO_STACK],
})
export class ExampleDialogFormValidationDemo {
  readonly open = model(false);
}

// —— Card ——
