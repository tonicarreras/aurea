import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { AuButton, AuDialog, AuDialogFooter } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuButton, AuDialog, AuDialogFooter],
  template: `
    <div class="docs-preview docs-preview--action">
      <button auButton
        type="button"
        (click)="open.set(true)"
        >{{ t().open }}</button
      >
      <au-dialog
        [(open)]="open"
        [title]="t().title"
        size="sm"
      >
        <p>{{ t().body }}</p>
        <div auDialogFooter>
          <button auButton
            variant="secondary"
            type="button"
            (click)="open.set(false)"
            >{{ t().cancel }}</button
          >
          <button auButton
            type="button"
            (click)="open.set(false)"
            >{{ t().confirm }}</button
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
