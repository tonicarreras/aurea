import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSlider } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-slider-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSlider],
  template: `
    <au-form-field
      [label]="t().basicLabel"
      [hint]="t().hint"
    >
      <au-slider
        [value]="35"
        [min]="0"
        [max]="100"
        [showValue]="true"
      />
    </au-form-field>
  `,
})
export class ExampleSliderBasicDemo {
  readonly t = docsExampleLive('slider');
}

@Component({
  selector: 'docs-example-slider-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSlider],
  template: `
    <au-form-field
      [label]="t().errorLabel"
      [errorMessage]="t().errorMessage"
      [invalid]="true"
    >
      <au-slider
        [value]="120"
        [min]="0"
        [max]="100"
        [showValue]="true"
      />
    </au-form-field>
  `,
})
export class ExampleSliderErrorDemo {
  readonly t = docsExampleLive('slider');
}
