import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuSelect } from '@aurea-design-system/components';
import { selectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuSelect],
  template: `
    <au-select
      label="País"
      placeholder="Elige un país"
      [options]="options"
      style="max-width: 16rem"
    />
  `,
})
export class SelectDemo {
  readonly options = selectOptions;
}
