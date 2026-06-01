import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuInputPassword } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-input-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuInputPassword],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        [label]="t().label"
        [hint]="t().hint"
      >
        <au-input-password autocomplete="current-password" />
      </au-form-field>
    </div>
  `,
})
export class InputPasswordDemo {
  readonly t = docsPreviewCopy('inputPassword');
}
