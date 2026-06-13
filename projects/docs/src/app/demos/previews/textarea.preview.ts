import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuTextarea } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuTextarea],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <textarea auTextarea
          [rows]="3"
          [placeholder]="t().placeholder"></textarea>
      </au-form-field>
    </div>
  `,
})
export class TextareaDemo {
  readonly t = docsPreviewCopy('textarea');
}
