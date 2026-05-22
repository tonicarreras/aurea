import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuSnackbar } from '@aurea-design-system/components';


@Component({
  selector: 'docs-preview-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button
        type="button"
        (click)="open.set(true)"
        >Mostrar snackbar</au-button
      >
      <au-snackbar
        [(open)]="open"
        message="Cambios guardados"
        variant="success"
        [durationMs]="3500"
      />
    </div>
  `,
})
export class SnackbarDemo {
  readonly open = model(false);
}
