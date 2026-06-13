import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuSnackbar } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuSnackbar],
  template: `
    <div class="docs-preview docs-preview--action">
      <button auButton
        type="button"
        (click)="open.set(true)"
        >{{ t().show }}</button
      >
      <au-snackbar
        [(open)]="open"
        [message]="t().message"
        variant="success"
        [durationMs]="3500"
      />
    </div>
  `,
})
export class SnackbarDemo {
  readonly t = docsPreviewCopy('snackbar');
  readonly open = model(false);
}
