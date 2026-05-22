import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuSnackbar } from '@aurea-design-system/components';

@Component({
  selector: 'docs-example-snackbar-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button
      type="button"
      (click)="open.set(true)"
      >Mostrar éxito</au-button
    >
    <au-snackbar
      [(open)]="open"
      message="Cambios guardados"
      variant="success"
      [durationMs]="3000"
    />
  `,
})
export class ExampleSnackbarSuccessDemo {
  readonly open = model(false);
}

@Component({
  selector: 'docs-example-snackbar-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button
      variant="outline"
      type="button"
      (click)="open.set(true)"
      >Mostrar error</au-button
    >
    <au-snackbar
      [(open)]="open"
      message="No se pudo guardar"
      variant="error"
      [durationMs]="4000"
    />
  `,
})
export class ExampleSnackbarErrorDemo {
  readonly open = model(false);
}

// —— Divider ——
