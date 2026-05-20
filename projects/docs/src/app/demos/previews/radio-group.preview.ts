import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuRadioGroup } from '@aurea-design-system/components';
import { radioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `<au-radio-group label="Plan" [options]="options" />`,
})
export class RadioGroupDemo {
  readonly options = radioOptions;
}
