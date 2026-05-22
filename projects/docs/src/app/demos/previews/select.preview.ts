import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSelect } from '@aurea-design-system/components';
import { selectOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-preview-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSelect],
  template: `
    <au-form-field label="País">
      <au-select
        placeholder="Elige un país"
        [options]="options"
        style="max-width: 16rem"
      />
    </au-form-field>
  `,
})
export class SelectDemo {
  readonly options = selectOptions;
}
