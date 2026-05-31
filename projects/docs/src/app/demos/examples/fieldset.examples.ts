import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFieldset, AuFormField, AuInputText } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-fieldset-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFieldset, AuFormField, AuInputText],
  template: `
    <au-fieldset
      [legend]="t().legend"
      [description]="t().description"
    >
      <au-form-field [label]="t().streetLabel">
        <au-input-text [placeholder]="t().streetPlaceholder" />
      </au-form-field>
      <au-form-field [label]="t().cityLabel">
        <au-input-text [placeholder]="t().cityPlaceholder" />
      </au-form-field>
    </au-fieldset>
  `,
})
export class ExampleFieldsetBasicDemo {
  readonly t = docsExampleLive('fieldset');
}

@Component({
  selector: 'docs-example-fieldset-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFieldset, AuFormField, AuInputText],
  template: `
    <au-fieldset
      [legend]="t().legend"
      [disabled]="true"
    >
      <au-form-field [label]="t().streetLabel">
        <au-input-text [placeholder]="t().streetPlaceholder" />
      </au-form-field>
    </au-fieldset>
  `,
})
export class ExampleFieldsetDisabledDemo {
  readonly t = docsExampleLive('fieldset');
}
