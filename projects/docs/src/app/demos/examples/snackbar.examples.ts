import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuSnackbar } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-snackbar-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button
      type="button"
      (click)="open.set(true)"
      >{{ t().showSuccess }}</au-button
    >
    <au-snackbar
      [(open)]="open"
      [message]="t().successMessage"
      variant="success"
      [durationMs]="3000"
    />
  `,
})
export class ExampleSnackbarSuccessDemo {
  readonly t = docsExampleLive('snackbar');
  readonly open = model(false);
}

@Component({
  selector: 'docs-example-snackbar-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <au-button
      type="button"
      (click)="open.set(true)"
      >{{ t().showError }}</au-button
    >
    <au-snackbar
      [(open)]="open"
      [message]="t().errorMessage"
      variant="error"
    />
  `,
})
export class ExampleSnackbarErrorDemo {
  readonly t = docsExampleLive('snackbar');
  readonly open = model(false);
}
