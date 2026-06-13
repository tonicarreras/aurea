import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputDate } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputDate],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <input auInputDate />
      </au-form-field>
    </div>
  `,
})
export class InputDateDemo {
  readonly t = docsPreviewCopy('inputDate');
}
