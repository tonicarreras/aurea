import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputTime } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-input-time',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputTime],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <input auInputTime />
      </au-form-field>
    </div>
  `,
})
export class InputTimeDemo {
  readonly t = docsPreviewCopy('inputTime');
}
