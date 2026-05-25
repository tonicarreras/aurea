import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSwitch } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSwitch],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field [hint]="t().hint">
        <au-switch [label]="t().label" />
      </au-form-field>
    </div>
  `,
})
export class SwitchDemo {
  readonly t = docsPreviewCopy('switch');
}
