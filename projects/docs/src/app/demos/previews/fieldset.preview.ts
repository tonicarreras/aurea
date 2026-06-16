import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFieldset, AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-fieldset',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFieldset, AuFormField, AuInputText],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-fieldset
        [legend]="t().legend"
        [description]="t().description"
      >
        <au-form-field [label]="t().streetLabel">
          <input
            auInputText
            [placeholder]="t().streetPlaceholder"
          />
        </au-form-field>
      </au-fieldset>
    </div>
  `,
})
export class FieldsetDemo {
  readonly t = docsPreviewCopy('fieldset');
}
