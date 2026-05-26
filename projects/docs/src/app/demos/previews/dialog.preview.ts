import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialog, AuDialogFooter } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <div class="docs-preview docs-preview--action">
      <au-button
        type="button"
        (click)="open.set(true)"
        >{{ t().open }}</au-button
      >
      <au-dialog
        [(open)]="open"
        [title]="t().title"
        size="sm"
      >
        <p>{{ t().body }}</p>
        <div auDialogFooter>
          <au-button
            variant="secondary"
            type="button"
            (click)="open.set(false)"
            >{{ t().cancel }}</au-button
          >
          <au-button
            type="button"
            (click)="open.set(false)"
            >{{ t().confirm }}</au-button
          >
        </div>
      </au-dialog>
    </div>
  `,
})
export class DialogDemo {
  readonly t = docsPreviewCopy('dialog');
  readonly open = model(false);
}
