import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputNumber } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputNumber],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label">
        <input auInputNumber
          [min]="0"
          [max]="10"
        />
      </au-form-field>
    </div>
  `,
})
export class InputNumberDemo {
  readonly t = docsPreviewCopy('inputNumber');
}
