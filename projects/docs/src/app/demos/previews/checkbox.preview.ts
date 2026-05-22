import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuCheckbox } from '@aurea-design-system/components';
import { DEMO_STACK } from '../shared/demo-layout';

@Component({
  selector: 'docs-preview-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuCheckbox],
  template: `
    <div class="docs-demo-stack">
      <au-checkbox label="Acepto los términos" />
      <au-checkbox
        label="Newsletter"
        [checked]="true"
      />
    </div>
  `,
  styles: [DEMO_STACK],
})
export class CheckboxDemo {}
