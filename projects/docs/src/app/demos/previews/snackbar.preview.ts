import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuSnackbar } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button type="button" (click)="open.set(true)">Mostrar snackbar</au-button>
    <au-snackbar
      [(open)]="open"
      message="Cambios guardados"
      variant="success"
      [durationMs]="3500"
    />
  `,
})
export class SnackbarDemo {
  readonly open = model(false);
}
