import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputText],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [label]="t().label" [hint]="t().hint" [required]="true">
        <au-input-text type="email" [placeholder]="t().placeholder" />
      </au-form-field>
    </div>
  `,
})
export class FormFieldDemo {
  readonly t = docsPreviewCopy('formField');
}
