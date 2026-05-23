import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';

import { radioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field label="Plan">
        <au-radio-group [options]="options" />
      </au-form-field>
    </div>
  `,
})
export class RadioGroupDemo {
  readonly options = radioOptions;
}
