import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialog, AuDialogFooter } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button
        type="button"
        (click)="open.set(true)"
        >Abrir diálogo</au-button
      >
      <au-dialog
        [(open)]="open"
        title="Confirmar acción"
        size="sm"
      >
        <p>Esta acción no se puede deshacer.</p>
        <div auDialogFooter>
          <au-button
            variant="secondary"
            type="button"
            (click)="open.set(false)"
            >Cancelar</au-button
          >
          <au-button
            type="button"
            (click)="open.set(false)"
            >Confirmar</au-button
          >
        </div>
      </au-dialog>
    </div>
  `,
})
export class DialogDemo {
  readonly open = model(false);
}
