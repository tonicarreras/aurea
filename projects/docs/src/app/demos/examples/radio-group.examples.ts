import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuRadioGroup } from '@aurea-design-system/components';
import { radioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-radio-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field label="Plan">
      <au-radio-group [options]="options" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupBasicDemo {
  readonly options = radioOptions;
}

@Component({
  selector: 'docs-example-radio-group-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field
      label="Plan"
      errorMessage="Elige un plan para continuar."
      [invalid]="true"
    >
      <au-radio-group [options]="options" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupErrorDemo {
  readonly options = radioOptions;
}

@Component({
  selector: 'docs-example-radio-group-hint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuRadioGroup],
  template: `
    <au-form-field
      label="Plan"
      hint="La opción Pro estará disponible pronto."
    >
      <au-radio-group [options]="options" />
    </au-form-field>
  `,
})
export class ExampleRadioGroupHintDemo {
  readonly options = radioOptions;
}
