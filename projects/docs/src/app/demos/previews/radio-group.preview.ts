import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';
import { radioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field label="Plan">
      <au-radio-group [options]="options" />
    </au-form-field>
  `,
})
export class RadioGroupDemo {
  readonly options = radioOptions;
}
