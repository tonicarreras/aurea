import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuFormField, AuSlider } from '@aurea-design-system/components';
import { docsPreviewCopy } from '../../core/docs-preview-copy';

@Component({
  selector: 'docs-preview-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuFormField, AuSlider],
  template: `
    <div class="docs-preview docs-preview--field">
      <au-form-field
        [label]="t().label"
        [hint]="t().hint"
      >
        <au-slider
          [value]="40"
          [min]="0"
          [max]="100"
          [showValue]="true"
        />
      </au-form-field>
    </div>
  `,
})
export class SliderDemo {
  readonly t = docsPreviewCopy('slider');
}
