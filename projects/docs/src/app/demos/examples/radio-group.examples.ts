import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuRadioGroup, type RadioOption } from '@aurea-design-system/components';
import { radioOptions } from '../shared/demo-fixtures';

@Component({
  selector: 'docs-example-radio-group-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `<au-radio-group label="Plan" [options]="options" />`,
})
export class ExampleRadioGroupBasicDemo {
  readonly options = radioOptions;
}

@Component({
  selector: 'docs-example-radio-group-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `
    <au-radio-group
      label="Plan"
      [options]="options"
      [required]="true"
      errorMessage="Elige un plan para continuar."
    />
  `,
})
export class ExampleRadioGroupErrorDemo {
  readonly options = radioOptions;
}

@Component({
  selector: 'docs-example-radio-group-disabled-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuRadioGroup],
  template: `
    <au-radio-group label="Plan" [options]="options" hint="La opción Pro estará disponible pronto." />
  `,
})
export class ExampleRadioGroupDisabledOptionDemo {
  readonly options: RadioOption[] = [
    { value: 'free', label: 'Gratis' },
    { value: 'pro', label: 'Pro', disabled: true },
  ];
}
