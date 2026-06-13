import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        [label]="t().label"
        [hint]="t().hint"
      >
        <input auInputText [placeholder]="t().placeholder" />
      </au-form-field>
    </div>
  `,
})
export class InputTextDemo {
  readonly t = docsPreviewCopy('inputText');
}
